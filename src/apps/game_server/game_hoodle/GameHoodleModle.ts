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
import GameHoodleLogicInterface from './GameHoodleLogicInterface';
import MatchManager from './MatchManager';
import MySqlGame from '../../../database/MySqlGame';
import ArrayUtil from '../../../utils/ArrayUtil';
import GameConf from '../../GameConf';

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
        // Log.info("recv_cmd_msg: ",stype,ctype,utag,proto_type,this.decode_cmd(proto_type,raw_cmd))

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
            case Cmd.eUserMatchReq:
                this.on_user_match(session,utag,proto_type,raw_cmd);
            break;
            case Cmd.eUserStopMatchReq:
                this.on_user_stop_match(session,utag,proto_type,raw_cmd);
            break;
            case Cmd.eUserGameInfoReq:
                this.on_user_get_ugame_info(session,utag,proto_type,raw_cmd);
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
        let ret = MatchManager.getInstance().stop_player_match(player.get_uid());
        if(ret){
            Log.info(player.get_uname() , "delete from match")
        }
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
        let uname = player.get_uname();
        if(player.get_user_state() == UserState.MatchIng){
            player.send_cmd(Cmd.eCreateRoomRes,{status: Response.INVALIDI_OPT})
            Log.warn(uname ," create room error, player is in matching")
            return;
        }
        
        let rmanager:RoomManager = RoomManager.getInstance()
        if (rmanager.get_room_by_uid(player.get_uid())){
            player.send_cmd(Cmd.eCreateRoomRes,{status: Response.INVALIDI_OPT})
            Log.warn(uname , "create room error, already create one")
            return;
        }

        let room:Room = RoomManager.getInstance().alloc_room();
        if(!room){
            player.send_cmd(Cmd.eCreateRoomRes, {status: Response.SYSTEM_ERR})
            Log.warn(uname , "create room error, alloc room error")
            return;
        }

        //是否金币不足
        if(GameConf.KW_IS_GOLD_LIMIT){
            if(player.get_uchip() < GameConf.KW_MIN_GOLD_ENTER_ROOM){
                player.send_cmd(Cmd.eCreateRoomRes, {status: Response.SYSTEM_ERR})
                Log.warn(uname , "create room error, gold is not enough")
                return;
            }
        }

        let body = this.decode_cmd(proto_type,raw_cmd);
        if(body){
            room.set_game_rule(body.gamerule)
            Log.info(uname ,"create room, gamerule: ",body)
        }

        if(!room.add_player(player)){
            Log.warn("create room error,add host player error")
            player.send_cmd(Cmd.eCreateRoomRes,{status: Response.INVALIDI_OPT})
            RoomManager.getInstance().delete_room(room.get_room_id())
            return;
        }
        room.set_room_host_uid(player.get_uid())
        player.set_offline(false);
        player.set_ishost(true);
        player.send_cmd(Cmd.eCreateRoomRes,{status: Response.OK})
    }
    //加入房间
    private on_join_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("join_room error, player is not exist!")
            GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        let uname = player.get_uname();
        if(player.get_user_state() == UserState.MatchIng){
            Log.warn(uname , "join_room error, player is in matching!")
            player.send_cmd(Cmd.eJoinRoomRes,{status: Response.INVALID_PARAMS})
            return;
        }

        let roomid = body.roomid;
        if(!roomid || roomid == ""){
            Log.warn(uname , "join_room error, roomid" , roomid ,"is invalid")
            player.send_cmd(Cmd.eJoinRoomRes,{status: Response.INVALID_PARAMS})
            return;
        }

        let room:Room = RoomManager.getInstance().get_room_by_roomid(roomid)
        if(!room){
            Log.warn(uname , "join_room error, room is not exist!")
            player.send_cmd(Cmd.eJoinRoomRes,{status: Response.SYSTEM_ERR})
            return;
        }

        //是否金币不足
        if(GameConf.KW_IS_GOLD_LIMIT){
            if(player.get_uchip() < GameConf.KW_MIN_GOLD_ENTER_ROOM){
                player.send_cmd(Cmd.eJoinRoomRes,{status: Response.SYSTEM_ERR})
                Log.warn(uname , "join_room error, gold is not enough")
                return;
            }
        }

        //自己创建了一个房间，不能加入其它人的房间，只能加入自己的房间
        let uroom = RoomManager.getInstance().get_room_by_uid(utag);
        let is_back_room = false;
        if(uroom){
            //自己已经创建了一个房间
            if(room.get_room_id() !== uroom.get_room_id()){
                Log.warn(uname , "join_room error, player is create one room!")
                player.send_cmd(Cmd.eJoinRoomRes,{status: Response.INVALIDI_OPT})
                return;
            }
            //掉线返回房间
            if(room.get_room_id() == uroom.get_room_id()){
                is_back_room = true;
            }
        }
        
        if(!room.add_player(player, is_back_room)){
            Log.warn(uname + "join_room error")
            player.send_cmd(Cmd.eJoinRoomRes,{status: Response.INVALIDI_OPT})
            return;
        } 
        player.set_offline(false);
        player.send_cmd(Cmd.eJoinRoomRes, {status: Response.OK})
       
        //send uinfo to other player in room
        GameHoodleInterface.broadcast_player_info_in_rooom(room, player);
        Log.info(uname , "join_room success, roomid: " , room.get_room_id())
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
            player.send_cmd( Cmd.eExitRoomRes, {status: Response.INVALIDI_OPT})
            return;
        }

        //start game
        if(room.get_game_state() != GameState.InView){
            Log.warn("exit_room error, game is start !");
            player.send_cmd(Cmd.eExitRoomRes, {status: Response.INVALIDI_OPT})
            return;
        }

        if(room.is_room_host(player.get_uid())){
            player.set_offline(true);
        }else{
            room.kick_player(player.get_uid())
            player.clear_room_info();
        }
        player.send_cmd(Cmd.eExitRoomRes,{status: Response.OK})
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
            player.send_cmd(Cmd.eDessolveRes,{status: Response.INVALIDI_OPT})
            return;
        }

        if(room.is_room_host(player.get_uid()) == false){
            Log.warn("dessolve_room error, player is not host!")
            player.send_cmd(Cmd.eDessolveRes, {status: Response.INVALIDI_OPT})
            return;
        }

        let roomID = room.get_room_id();
        let ret = rmanager.delete_room(roomID);
        if(ret == false){
            Log.warn("dessolve_room error ,roomid: " , roomID , "is not exist!")
            player.send_cmd(Cmd.eDessolveRes,{status: Response.INVALIDI_OPT})
            return;
        }

        room.broadcast_in_room(Cmd.eDessolveRes,{status: Response.OK},player);
        room.kick_all_player();
        player.send_cmd(Cmd.eDessolveRes,{status: Response.OK})
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
            player.send_cmd(Cmd.eGetRoomStatusRes,{status: Response.SYSTEM_ERR})
            Log.info("get_room_status , player is not in room")
            return;
        }

        Log.info("get_room_status player is in room! roomid: " , room.get_room_id())
        player.send_cmd( Cmd.eGetRoomStatusRes, {status: Response.OK})
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
            player.send_cmd(Cmd.eBackRoomRes, {status: Response.INVALIDI_OPT})
            Log.warn("back_room error, player is not in room")
            return;
        }

        Log.info("back room success! roomid: " , room.get_room_id())
        player.set_offline(false);
        if(room.is_room_host(player.get_uid())){
            player.set_ishost(true)
        }
        
        if(!room.add_player(player,true)){
            player.send_cmd(Cmd.eBackRoomRes,{status: Response.INVALIDI_OPT})
            Log.warn("back room error!")
            return;
        }
        player.send_cmd(Cmd.eBackRoomRes,{status: Response.OK})
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
            player.send_cmd(Cmd.eCheckLinkGameRes, {status: Response.OK})
            player.send_cmd(Cmd.eRoomIdRes,{roomid: room.get_room_id()})
            player.send_cmd(Cmd.eGameRuleRes,{gamerule: room.get_game_rule()})
            player.send_cmd(Cmd.ePlayCountRes, {playcount: String(room.get_play_count()), totalplaycount: String(room.get_conf_play_count())})
            GameHoodleInterface.send_player_info(player);
            
            //处理断线重连,只发送给重连玩家
            //玩家位置，局数，玩家权限，玩家得分
            if(room.get_game_state() == GameState.Gameing){
                player.send_cmd(Cmd.eGameStartRes,{status : Response.OK})
                GameHoodleLogicInterface.send_player_ball_pos(room, undefined, player);
                GameHoodleLogicInterface.send_player_power(room, undefined, player);
                GameHoodleLogicInterface.send_player_score(room, undefined, player);
            }
        }
    }

    //玩家准备
    on_user_ready(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            Log.warn("on_user_ready player is not exist!")
            GameSendMsg.send(session, Cmd.eUserReadyRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        if(!GameHoodleInterface.check_room(utag)){
            Log.warn("on_user_ready room is not exist!")
            player.send_cmd(Cmd.eUserReadyRes,{status: Response.INVALIDI_OPT})
            return;
        }

        let userstate = player.get_user_state()
        if(userstate == UserState.Ready || userstate == UserState.Playing){
            Log.warn("on_user_ready user is already ready or is playing!")
            player.send_cmd(Cmd.eUserReadyRes, {status: Response.INVALIDI_OPT})
            return;
        }

        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid());
        if(room){
            //已经在游戏中了
            if(room.get_game_state() == GameState.Gameing){
                player.send_cmd( Cmd.eUserReadyRes,{status: Response.INVALIDI_OPT})
                Log.warn("on_user_ready error ,game is playing!")
                return;
            }

            //已经大结算了
            if(room.get_play_count() == room.get_conf_play_count()){
                player.send_cmd(Cmd.eUserReadyRes,{status: Response.INVALIDI_OPT})
                Log.warn("on_user_ready error ,game is over!")
                return;
            }
            //有玩家准备了，发送状态
            player.set_user_state(UserState.Ready);
            GameHoodleInterface.send_player_state(room, player)
            
            //游戏开始了
            let is_game_start = GameHoodleInterface.check_game_start(room);
            if(is_game_start){
                GameHoodleInterface.set_all_player_state(room,UserState.Playing);
                GameHoodleInterface.broadcast_player_info_in_rooom(room); //刷新局内玩家信息：Playing

                //设置游戏状态为游戏中
                room.set_game_state(GameState.Gameing);
                //发送游戏开始
                room.broadcast_in_room(Cmd.eGameStartRes,{status : Response.OK})

                //游戏逻辑发送
                GameHoodleLogicInterface.send_player_first_pos(room);
                //设置初始权限
                GameHoodleLogicInterface.set_player_start_power(room);
                //玩家权限发送
                GameHoodleLogicInterface.send_player_power(room);
                //发送分数
                GameHoodleLogicInterface.send_player_score(room);

                //局数自加
                room.set_play_count(room.get_play_count() + 1);
                //发送局数
                GameHoodleInterface.send_play_count(room);
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
            //发送玩家射击信息
            let body = this.decode_cmd(proto_type,raw_cmd);
            GameHoodleLogicInterface.send_player_shoot(room, body, player);
            //设置下一个玩家射击权限
            GameHoodleLogicInterface.set_next_player_power(room);
            //发送权限
            GameHoodleLogicInterface.send_player_power(room);
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
            // Log.info("hcc>>on_player_ball_pos ", body);
            for(let key in body.positions){
                let posinfo = body.positions[key];
                let seatid = posinfo.seatid;
                let posx = posinfo.posx;
                let posy = posinfo.posy;
                for(let k in player_set){
                    let p:Player = player_set[k];
                    if(p && p.get_seat_id() == seatid){
                        let pos_info = {posx:posx, posy: posy};
                        p.set_user_pos(pos_info);
                        break;
                    }
                }
            }
            GameHoodleLogicInterface.send_player_ball_pos(room);
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

            //先转发射中消息
            let body = this.decode_cmd(proto_type,raw_cmd);
            GameHoodleLogicInterface.send_player_is_shooted(room,body)

            //分数计算
            let src_player = room.get_player_by_seatid(body.srcseatid);
            let des_player = room.get_player_by_seatid(body.desseatid);
            if(src_player && des_player){
                src_player.set_user_score(src_player.get_user_score() + 1);
                des_player.set_user_score(des_player.get_user_score() - 1);
                Log.info("hcc>>playerScore: src_player:", src_player.get_uname(), "+1", " des_player:", des_player.get_uname() , "-1");
            }
            //发送分数
            GameHoodleLogicInterface.send_player_score(room);

            //设置游戏状态为结算状态
            room.set_game_state(GameState.CheckOut);
            //发送玩家状态
            GameHoodleInterface.set_all_player_state(room,UserState.InView);
            GameHoodleInterface.broadcast_player_info_in_rooom(room);
            //清除上一局数据
            GameHoodleLogicInterface.clear_all_player_cur_data(room);
            //发送权限
            GameHoodleLogicInterface.send_player_power(room);
            //发送结算
            GameHoodleLogicInterface.send_game_result(room);
            //大结算: 踢出所有玩家，房间解散
            if(room.get_play_count() == room.get_conf_play_count()){
                GameHoodleLogicInterface.write_player_chip(room);
                GameHoodleLogicInterface.send_game_total_result(room);
                room.kick_all_player();
                RoomManager.getInstance().delete_room(room.get_room_id());
            }
        }
    }

    on_user_match(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            GameSendMsg.send(session, Cmd.eUserMatchRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            Log.warn("on_user_match player is not exist!")
            return;
        }

        let match_mgr = MatchManager.getInstance();
        let player:Player = PlayerManager.getInstance().get_player(utag);
        let uname = player.get_uname();
        //如果在房间内，不能匹配
        let room =  RoomManager.getInstance().get_room_by_uid(player.get_uid())
        if(room){
            Log.warn(uname , "on_user_match error user is at room!")
            player.send_cmd(Cmd.eUserMatchRes,{status: Response.INVALIDI_OPT});
            return;
        }

        //是否金币不足
        if(GameConf.KW_IS_GOLD_LIMIT){
            if(player.get_uchip() < GameConf.KW_MIN_GOLD_ENTER_ROOM){
                player.send_cmd(Cmd.eUserMatchRes,{status: Response.INVALIDI_OPT})
                Log.warn(uname , "on_user_match error, gold is not enough")
                return;
            }
        }

        //加入匹配等待列表
        let ret = match_mgr.add_player_to_match_list(player);
        if(!ret){
            Log.warn(uname , "on_user_match error user is in matching!")
            player.send_cmd(Cmd.eUserMatchRes,{status: Response.NOT_YOUR_TURN});
            return;
        }

        //发送匹配信息
        let userinfo_array = [];
        let userinfo = {
            numberid: String(player.get_numberid()),
            userInfoString: JSON.stringify(player.get_player_info()),
        }
        userinfo_array.push(userinfo);

        let body = {
            status: Response.OK,
            matchsuccess: false,
            userinfo: userinfo_array,
        }
        player.send_cmd(Cmd.eUserMatchRes,body)
        Log.info(uname , "on_user_match user add matching success!")
    }

    on_user_stop_match(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            GameSendMsg.send(session, Cmd.eUserStopMatchRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            Log.warn("on_user_stop_match error player is not exist!")
            return;
        }

        let match_mgr = MatchManager.getInstance();
        let player:Player = PlayerManager.getInstance().get_player(utag);
        let uname = player.get_uname();
        let ret = match_mgr.stop_player_match(player.get_uid());
        if(!ret){
            Log.warn(uname , "on_user_stop_match failed!")
            player.send_cmd(Cmd.eUserStopMatchRes,{status: Response.INVALIDI_OPT});
            return;
        }
        player.send_cmd(Cmd.eUserStopMatchRes,{status: Response.OK});
        match_mgr.send_match_player();
        Log.info(uname , "on_user_stop_match success!")
    }

    //游戏服信息
    on_user_get_ugame_info(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!GameHoodleInterface.check_player(utag)){
            GameSendMsg.send(session, Cmd.eUserGameInfoRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            Log.warn("on_user_match player is not exist!")
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        MySqlGame.get_ugame_info_by_uid(utag,function(status:number, data_game:any) {
            if(status == Response.OK){
                let data_game_len = ArrayUtil.GetArrayLen(data_game);
                if( data_game_len > 0){
                    // Log.info("hcc>>on_user_get_ugame_info1111>>", data_game[0] , "data_game: " , data_game);
                    let ugameInfo = data_game[0];
                    let ugameInfoStr = JSON.stringify(ugameInfo);
                    let body = {
                        status:Response.OK,
                        userInfoString: ugameInfoStr,
                    }
                    player.set_ugame_info(ugameInfo);
                    player.send_cmd(Cmd.eUserGameInfoRes, body);
                }else{
                    MySqlGame.insert_ugame_user(utag, GameConf.KW_BORN_EXP, GameConf.KW_BORN_CHIP,function(status_game_ins:number, data_game_ins:any) 
                    {
                        Log.info("hcc>>on_user_get_ugame_info2222");
                        if(status_game_ins == Response.OK)
                        {
                            MySqlGame.get_ugame_info_by_uid(utag, function(status_game_ins_get:number, data_game_ins_get:any)
                            {
                                if(status_game_ins_get == Response.OK)
                                {
                                    // Log.info("hcc>>on_user_get_ugame_info3333>>", data_game_ins_get[0]);
                                    let ugameInfo = data_game_ins_get[0];
                                    let ugameInfoStr = JSON.stringify(ugameInfo);
                                    let body = {
                                        status:Response.OK,
                                        userInfoString: ugameInfoStr,
                                    }
                                    player.set_ugame_info(ugameInfo);
                                    player.send_cmd(Cmd.eUserGameInfoRes,body);
                                }else
                                {
                                    Log.info("hcc>>on_user_get_ugame_info4444>>error");
                                    player.send_cmd(Cmd.eUserGameInfoRes,{status: Response.INVALIDI_OPT});
                                }
                            })
                        }else{
                            Log.info("hcc>>on_user_get_ugame_info5555>>error");
                            player.send_cmd(Cmd.eUserGameInfoRes,{status: Response.INVALIDI_OPT});
                        }
                    })
                }
            }else{
                Log.info("hcc>>on_user_get_ugame_info6666>>error");
                player.send_cmd(Cmd.eUserGameInfoRes,{status: Response.INVALIDI_OPT});
            }
        })
    }

}

export default GameHoodleModle;