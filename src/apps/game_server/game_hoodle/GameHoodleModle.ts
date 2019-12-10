import ProtoManager from '../../../netbus/ProtoManager';
import { Cmd, CmdName } from '../../protocol/GameHoodleProto';
import GameSendMsg from './GameSendMsg';
import CommonProto from '../../protocol/CommonProto';
import PlayerManager from './PlayerManager';
import Player from './Player';
import RoomManager from './RoomManager';
import Response from '../../Response';
import Room from './Room';
import ArrayUtil from '../../../utils/ArrayUtil';

var Log =  require("../../../utils/Log")

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
                this.login_logic(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eCreateRoomReq:
                this.create_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eJoinRoomReq:
                this.join_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eExitRoomReq:
                this.exit_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eDessolveReq:
                this.dessolve_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eGetRoomStatusReq:
                this.get_room_status(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eBackRoomReq:
                this.back_room(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.eCheckLinkGameReq:
                this.check_link_game(session,utag,proto_type,raw_cmd)
            break;
            default:
            break;
        }
    }
    //玩家离开逻辑服务
    on_user_lost_connect(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.warn("game on_user_lost_connect utag:" ,utag , body)
        if(!this.check_player(utag)){
            return;
        }
        let player:Player = PlayerManager.getInstance().get_player(utag);
        if(player){
            player.set_offline(true)
            let room = RoomManager.getInstance().get_room_by_uid(utag);
            if(room){
                //send to room other player user lost connect
                // room.broadcast_in_room()
            }
        }
        PlayerManager.getInstance().delete_player(utag)
        
    }
    //登录逻辑服务
    private login_logic(session:any, utag:number, proto_type:number, raw_cmd:any){
        let player:Player = PlayerManager.getInstance().get_player(utag)
        if(player){
            Log.info("player is exist, uid: " , utag)
            player.init_session(session, utag, proto_type,function (status:number, data:any) {
                if(status == Response.OK){
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, {status: Response.OK})
                }else{
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, {status: Response.SYSTEM_ERR})
                }
            })
        }else{
            Log.info("player is not exist , new player uid: " , utag)
            PlayerManager.getInstance().alloc_player(session, utag, proto_type,function(status:number, data:any) {
                if(status == Response.OK){
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, {status: Response.OK})
                }else{
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, {status: Response.SYSTEM_ERR})
                }      
            })
        }
        
    }

    ///////////////////////////////////////
    //检测是否非法玩家
    private check_player(utag:number){
        let player = PlayerManager.getInstance().get_player(utag);
        if(player){
            return true;
        }else{
            return false;
        }
    }

    //检测是否非法房间
    private check_room(utag:number){
        let player:Player = PlayerManager.getInstance().get_player(utag);
        if(!player){
            return false;
        }

        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid())
        if(!room){
            return false;
        }
        return true;
    }
    //向房间内所有人发送局内玩家信息
    private broadcast_player_info_in_rooom(room: Room, not_to_player?: Player){
       if(!room){
         return;
       }
       let player_set = room.get_all_player();
       Log.info("broadcast_player_info_in_rooom000")
       let userinfo_array = [];
       try {
           for(let key in player_set){
               let player:Player = player_set[key];
               Log.info("broadcast_player_info_in_rooom111: " , player.get_uid())
               if (player){
                Log.info("broadcast_player_info_in_rooom222: " , player.get_uid())
                   let userinfo = {
                       numberid: String(player.get_numberid()),
                       userInfoString: JSON.stringify(player.get_ucenter_info()),
                   }
                   userinfo_array.push(userinfo);
                   Log.info("broadcast_player_info_in_rooom333: len: " , userinfo_array.length)
               }
           }
        room.broadcast_in_room(Cmd.eUserInfoRes,{userinfo: userinfo_array}, not_to_player)
       } catch (error) {
           Log.error(error);
       }
    }

    //向某个玩家发送局内玩家信息
    private send_player_info(player:Player){
        if(!player){
            return;
        }
        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid());
        if(!room){
            return;
        }

        let player_set = room.get_all_player();
        if(ArrayUtil.GetArrayLen(player_set) <= 0){
            return;
        }

        let userinfo_array = [];
        try {
            for(let key in player_set){
                let player = player_set[key];
                if (player){
                    let userinfo = {
                        numberid: String(player.get_numberid()),
                        userInfoString: JSON.stringify(player.get_ucenter_info()),
                    }
                    userinfo_array.push(userinfo);
                }
            }
            player.send_cmd(Cmd.eUserInfoRes,{userinfo: userinfo_array});
        } catch (error) {
            Log.error(error);
        }
    }
    ///////////////////////////////////////

    //创建房间
    private create_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!this.check_player(utag)){
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
            return;
        }

        room.add_player(player);
        room.set_room_host_uid(player.get_uid())
        player.set_offline(false);
        let body = this.decode_cmd(proto_type,raw_cmd);
        if(body){
            room.set_game_rule(body.gamerule)
            Log.info("create room, gamerule: ",body)
        }
        GameSendMsg.send(session, Cmd.eCreateRoomRes, utag, proto_type, {status: Response.OK})
    }
    //加入房间
    private join_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        if (!this.check_player(utag)){
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

        let player:Player = PlayerManager.getInstance().get_player(utag);
        room.add_player(player);
        player.set_offline(false);
        GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: Response.OK})
       
        //send uinfo to other player in room
        this.broadcast_player_info_in_rooom(room, player);
        Log.warn("join_room success, roomid: " , room.get_room_id())
    }
    //离开房间
    private exit_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!this.check_player(utag)){
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
        }
        GameSendMsg.send(session, Cmd.eExitRoomRes, utag, proto_type, {status: Response.OK})
        this.broadcast_player_info_in_rooom(room);
    }
    //解散房间
    private dessolve_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!this.check_player(utag)){
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
    private get_room_status(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!this.check_player(utag)){
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
    private back_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!this.check_player(utag)){
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
        GameSendMsg.send(session, Cmd.eBackRoomRes, utag, proto_type, {status: Response.OK})
        this.broadcast_player_info_in_rooom(room, player)
    }
    //进游戏房间后，发送房间信息
    check_link_game(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (!this.check_player(utag)){
            Log.warn("check_link_game player is not exist!")
            GameSendMsg.send(session, Cmd.eCheckLinkGameRes, utag, proto_type, {status: Response.INVALIDI_OPT})
            return;
        }

        if(!this.check_room(utag)){
            Log.warn("check_link_game room is not exist!")
            return;
        }

        let player:Player = PlayerManager.getInstance().get_player(utag);
        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid())
        if(room){
            this.send_player_info(player);
            player.send_cmd(Cmd.ePlayCountRes, {playcount:"0", totalplaycount:"0"})
            player.send_cmd(Cmd.eCheckLinkGameRes, {status: Response.OK})
            player.send_cmd(Cmd.eRoomIdRes,{roomid: room.get_room_id()})
            let gamerule = room.get_game_rule();
            player.send_cmd(Cmd.eGameRuleRes,{gamerule: gamerule})
        }
    }
}

export default GameHoodleModle;