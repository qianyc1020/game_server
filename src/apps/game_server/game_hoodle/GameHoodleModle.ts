import ProtoManager from '../../../netbus/ProtoManager';
import { Cmd, CmdName } from '../../protocol/GameHoodleProto';
import GameSendMsg from './GameSendMsg';
import CommonProto from '../../protocol/CommonProto';
import PlayerManager from './PlayerManager';
import Player from './Player';
import RoomManager from './RoomManager';
import Response from '../../Response';
import Room from './Room';
import Log from '../../../utils/Log';
import { UserState, GameState } from './State';
import GameHoodleInterface from './GameHoodleInterface';
import GameHoodleLogic from './GameHoodleLogic';

class GameHoodleModle {
    private static readonly Instance: GameHoodleModle = new GameHoodleModle();

    private constructor(){

    }

    public static getInstance(){
        return GameHoodleModle.Instance;
    }
    
    private decode_cmd(proto_type:number,raw_cmd:any){
        return ProtoManager.decode_cmd(proto_type,raw_cmd);
    }

    public recv_cmd_msg(session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:Buffer){
        Log.info("recv_cmd_msg: ",stype,ctype,utag,proto_type,this.decode_cmd(proto_type,raw_cmd))

        switch(ctype){
            case CommonProto.eUserLostConnectRes:
                this.on_user_lost_connect(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eLoginLogicReq:
                this.on_login_logic(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eCreateRoomReq:
                this.on_create_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eJoinRoomReq:
                this.on_join_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eExitRoomReq:
                this.on_exit_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eDessolveReq:
                this.on_dessolve_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eGetRoomStatusReq:
                this.on_get_room_status(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eBackRoomReq:
                this.on_back_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eCheckLinkGameReq:
                this.on_check_link_game(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eUserReadyReq:
                this.on_user_ready(session,utag,proto_type,raw_cmd)
                break;
            case Cmd.ePlayerShootReq:
                this.on_player_shoot(session,utag,proto_type,raw_cmd);
                break;
            case Cmd.ePlayerBallPosReq:
                this.on_player_ball_pos(session,utag,proto_type,raw_cmd);
                break;
            case Cmd.ePlayerIsShootedReq:
                this.on_player_is_shooted(session,utag,proto_type,raw_cmd);
                break;
            default:
            break;
        }
    }

    //玩家离开逻辑服务
    on_user_lost_connect(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.warn("game on_user_lost_connect utag:" ,utag , body)
        if(!GameHoodleInterface.check_player(utag)){
            return;
        }
        let player:Player = PlayerManager.getInstance().get_player(utag);
        if(player){
            let room = RoomManager.getInstance().get_room_by_uid(utag);
            if(room){
                player.set_offline(true)
                //send to room other player user lost connect
                room.broadcast_in_room(Cmd.eUserOfflineRes,{seatid: player.get_seat_id()},player);
                GameHoodleInterface.broadcast_player_info_in_rooom(room, player);
            }
        }
        PlayerManager.getInstance().delete_player(utag)
        
    }
    //登录逻辑服务
    private on_login_logic(session:any, utag:number, proto_type:number, raw_cmd:any){
        let player:Player = PlayerManager.getInstance().get_player(utag)
        if(player){
            Log.info("player is exist, uid: " , utag)
            player.init_session(session, utag, proto_type,function (status:number, data:any) {
                if(status == Response.OK){
                    //如果是重连进来，需要重新获取老玩家的信息
                    let room = RoomManager.getInstance().get_room_by_uid(utag);
                    if(room){
                        let oldPlayer:Player = room.get_player(utag);
                        if(oldPlayer){
                            player.set_player_info(oldPlayer.get_player_info())
                        }                
                    }
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, {status: Response.OK})
                }else{
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, {status: Response.SYSTEM_ERR})
                }
            })
        }else{
            Log.info("player is not exist , new player uid: " , utag)
            PlayerManager.getInstance().alloc_player(session, utag, proto_type,function(status:number, data:any) {
                if(status == Response.OK){
                     //如果是重连进来，需要重新获取老玩家的信息
                     let newPlayer:Player = PlayerManager.getInstance().get_player(utag);
                     let room = RoomManager.getInstance().get_room_by_uid(utag);
                     if(room){
                         let oldPlayer:Player = room.get_player(utag);
                         if(oldPlayer){
                             newPlayer.set_player_info(oldPlayer.get_player_info())
                         }                
                     }
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, {status: Response.OK})
                }else{
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, {status: Response.SYSTEM_ERR})
                }      
            })
        }
    }

    //创建房间
    private on_create_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("create_room player is not exist!")
            GameSendMsg.send(session, Cmd.eCreateRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }
        let player:Player = PlayerManager.getInstance().get_player(utag);
        let rmanager:RoomManager = RoomManager.getInstance()
        if (rmanager.get_room_by_uid(player.get_uid())){
            GameSendMsg.send(session, Cmd.eCreateRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            Log.warn("create room error, already create one")
            return;
        }

        let room:Room = RoomManager.getInstance().alloc_room();
        if(!room){
            GameSendMsg.send(session, Cmd.eCreateRoomRes, utag, proto_type, {status: Response.SYSTEM_ERR})
            Log.warn("create room error, alloc room error")
            return;
        }

        let body = this.decode_cmd(proto_type,raw_cmd);
        if(body){
            room.set_game_rule(body.gamerule)
            Log.info("create room, gamerule: ",body)
        }

        if(!room.add_player(player)){
            Log.warn("create room error,add host player error")
            GameSendMsg.send(session, Cmd.eCreateRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            RoomManager.getInstance().delete_room(room.get_room_id())
            return;
        }
        room.set_room_host_uid(player.get_uid())
        player.set_offline(false);
        player.set_ishost(true);
        GameSendMsg.send(session, Cmd.eCreateRoomRes, utag, proto_type, {status: Response.OK})
    }
    //加入房间
    private on_join_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("join_room error, player is not exist!")
            GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        let roomid = body.roomid;
        if(!roomid || roomid == ""){
            Log.warn("join_room error, roomid" , roomid ,"is invalid")
            GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: Response.INVALID_PARAMS})
            return;
        }

        let room:Room = RoomManager.getInstance().get_room_by_roomid(roomid)
        if(!room){
            Log.warn("join_room error, room is not exist!")
            GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: Response.SYSTEM_ERR})
            return;
        }
        //自己创建了一个房间，不能加入其它人的房间，只能加入自己的房间
        let uroom = RoomManager.getInstance().get_room_by_uid(utag);
        let is_back_room = false;
        if(uroom){
            //自己已经创建了一个房间
            if(room.get_room_id() !== uroom.get_room_id()){
                Log.warn("join_room error, player is create one room!")
                GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
                return;
            }
            //掉线返回房间
            if(room.get_room_id() == uroom.get_room_id()){
                is_back_room = true;
            }
        }
        
        let player:Player = PlayerManager.getInstance().get_player(utag);
        if(!room.add_player(player, is_back_room)){
            Log.warn("join_room error")
            GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        } 
        player.set_offline(false);
        GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: Response.OK})
       
        //send uinfo to other player in room
        GameHoodleInterface.broadcast_player_info_in_rooom(room, player);
        Log.warn("join_room success, roomid: " , room.get_room_id())
    }
    //离开房间
    private on_exit_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("exit_room player is not exist!")
            GameSendMsg.send(session, Cmd.eExitRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        let rmanager:RoomManager = RoomManager.getInstance()
        let room = rmanager.get_room_by_uid(player.get_uid())
        if(!room){
            Log.warn("exit_room error, room is not exist!")
            GameSendMsg.send(session, Cmd.eExitRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }
        // TODO start game
        if(room.is_room_host(player.get_uid())){
            player.set_offline(true);
        }else{
            room.kick_player(player.get_uid())
            player.clear_room_info();
        }
        GameSendMsg.send(session, Cmd.eExitRoomRes, utag, proto_type, {status: Response.OK})
        GameHoodleInterface.broadcast_player_info_in_rooom(room);
    }
    //解散房间
    private on_dessolve_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("dessolve_room error, player is not exist!")
            GameSendMsg.send(session, Cmd.eDessolveRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }
        let player:Player = PlayerManager.getInstance().get_player(utag);
        let rmanager:RoomManager = RoomManager.getInstance()
        let room = rmanager.get_room_by_uid(player.get_uid())
        if(!room){
            Log.warn("dessolve_room error, room is not exist!")
            GameSendMsg.send(session, Cmd.eDessolveRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        if(room.is_room_host(player.get_uid()) == false){
            Log.warn("dessolve_room error, player is not host!")
            GameSendMsg.send(session, Cmd.eDessolveRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        let roomID = room.get_room_id();
        let ret = rmanager.delete_room(roomID);
        if(ret == false){
            Log.warn("dessolve_room error ,roomid: " , roomID , "is not exist!")
            GameSendMsg.send(session, Cmd.eDessolveRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        room.broadcast_in_room(Cmd.eDessolveRes,{status: Response.OK},player);
        room.kick_all_player();
        GameSendMsg.send(session, Cmd.eDessolveRes, utag, proto_type, {status: Response.OK})
    }
    //获取是否创建过房间
    private on_get_room_status(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("get_room_status player is not exist!")
            GameSendMsg.send(session, Cmd.eGetRoomStatusRes, utag, proto_type, {status: Response.SYSTEM_ERR})
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        let room =  RoomManager.getInstance().get_room_by_uid(player.get_uid())
        if(!room){
            GameSendMsg.send(session, Cmd.eGetRoomStatusRes, utag, proto_type, {status: Response.SYSTEM_ERR})
            Log.warn("get_room_status , player is not in room")
            return;
        }

        Log.info("get_room_status player is in room! roomid: " , room.get_room_id())
        GameSendMsg.send(session, Cmd.eGetRoomStatusRes, utag, proto_type, {status: Response.OK})
    }

    //返回房间
    private on_back_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("back_room player is not exist!")
            GameSendMsg.send(session, Cmd.eBackRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }
        let player:Player = PlayerManager.getInstance().get_player(utag);
        let rmanager:RoomManager = RoomManager.getInstance()
        let room = rmanager.get_room_by_uid(player.get_uid())
        if(!room){
            GameSendMsg.send(session, Cmd.eBackRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            Log.warn("back_room error, player is not in room")
            return;
        }

        Log.info("back room success! roomid: " , room.get_room_id())
        player.set_offline(false);
        if(room.is_room_host(player.get_uid())){
            player.set_ishost(true)
        }
        
        if(!room.add_player(player,true)){
            GameSendMsg.send(session, Cmd.eBackRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            Log.warn("back room error!")
            return;
        }
        GameSendMsg.send(session, Cmd.eBackRoomRes, utag, proto_type, {status: Response.OK})
        GameHoodleInterface.broadcast_player_info_in_rooom(room, player)
    }

    //进游戏房间后，服务推送房间内信息
    on_check_link_game(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("check_link_game player is not exist!")
            GameSendMsg.send(session, Cmd.eCheckLinkGameRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        if(!GameHoodleInterface.check_room(utag)){
            Log.warn("check_link_game room is not exist!")
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid())
        if(room){
            let gamerule = room.get_game_rule();
            GameHoodleInterface.send_player_info(player);
            player.send_cmd(Cmd.ePlayCountRes, {playcount:"0", totalplaycount:"0"})
            player.send_cmd(Cmd.eCheckLinkGameRes, {status: Response.OK})
            player.send_cmd(Cmd.eRoomIdRes,{roomid: room.get_room_id()})
            player.send_cmd(Cmd.eGameRuleRes,{gamerule: gamerule})
        }
    }

    //玩家准备
    on_user_ready(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("on_user_ready player is not exist!")
            GameSendMsg.send(session, Cmd.eUserReadyRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        if(!GameHoodleInterface.check_room(utag)){
            Log.warn("on_user_ready room is not exist!")
            GameSendMsg.send(session, Cmd.eUserReadyRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        let userstate = player.get_user_state()
        if(userstate == UserState.Ready || userstate == UserState.Playing){
            Log.warn("on_user_ready user is already ready or is playing!")
            GameSendMsg.send(session, Cmd.eUserReadyRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid());
        if(room){
            if(room.get_game_state() == GameState.Gameing){
                GameSendMsg.send(session, Cmd.eUserReadyRes, utag, proto_type, {status: Response.INVALIDI_OPT})
                Log.warn("on_user_ready error ,game is playing!")
                return;
            }

            player.set_user_state(UserState.Ready);
            GameHoodleInterface.send_player_state(room, player)
            
            //游戏开始了
            let is_game_start = GameHoodleInterface.check_game_start(room);
            if(is_game_start){
                room.set_game_state(GameState.Gameing);
                room.broadcast_in_room(Cmd.eGameStartRes,{status : Response.OK})

                GameHoodleInterface.set_all_player_state(room,UserState.Playing);
                GameHoodleInterface.broadcast_player_info_in_rooom(room); //刷新局内玩家信息：Playing
                
                //游戏逻辑发送
                GameHoodleLogic.send_player_first_pos(room);
            }
        }
    }
    
    //玩家射击
    on_player_shoot(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("on_player_shoot player is not exist!")
            return;
        }

        if(!GameHoodleInterface.check_room(utag)){
            Log.warn("on_player_shoot room is not exist!")
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        let userstate = player.get_user_state()
        if(userstate != UserState.Playing){
            Log.warn("on_player_shoot user is not in playing state!")
            return;
        }

        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid());
        if(room){
            if(room.get_game_state() != GameState.Gameing){
                Log.warn("on_player_shoot room is not in playing state!")
                return;
            }
            let body = this.decode_cmd(proto_type,raw_cmd);
            GameHoodleLogic.send_player_shoot(room, body, player);
        }
    }

    //玩家位置信息
    on_player_ball_pos(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("on_player_ball_pos player is not exist!")
            return;
        }

        if(!GameHoodleInterface.check_room(utag)){
            Log.warn("on_player_ball_pos room is not exist!")
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        let userstate = player.get_user_state()
        if(userstate != UserState.Playing){
            Log.warn("on_player_ball_pos user is not in playing state!")
            return;
        }

        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid());
        if(room){
            if(room.get_game_state() != GameState.Gameing){
                Log.warn("on_player_ball_pos room is not in playing state!")
                return;
            }

            let player_set = room.get_all_player();
            //保存玩家位置信息
            let body = this.decode_cmd(proto_type,raw_cmd);
            for(let key in body){
                let posinfo = body[key];
                let seatid = posinfo.seatid;
                let posx = posinfo.posx;
                let posy = posinfo.posy;
                for(let k in player_set){
                    let p:Player = player_set[k];
                    if(p.get_seat_id() == seatid){
                        let pos_info = {posx:posx, posy: posy};
                        p.set_user_pos(pos_info);
                        break;
                    }
                }
            }
            GameHoodleLogic.send_player_ball_pos(room);
        }
    }

    //玩家被射中
    on_player_is_shooted(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("on_player_is_shooted player is not exist!")
            return;
        }

        if(!GameHoodleInterface.check_room(utag)){
            Log.warn("on_player_is_shooted room is not exist!")
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        let userstate = player.get_user_state()
        if(userstate != UserState.Playing){
            Log.warn("on_player_is_shooted user is not in playing state!")
            return;
        }

        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid());
        if(room){
            if(room.get_game_state() != GameState.Gameing){
                Log.warn("on_player_is_shooted room is not in playing state!")
                return;
            }
            GameHoodleLogic.send_game_result(room);
            GameHoodleInterface.set_all_player_state(room,UserState.InView);
            GameHoodleInterface.broadcast_player_info_in_rooom(room);
            GameHoodleLogic.clear_all_player_data(room);
        }
    }
}

export default GameHoodleModle;