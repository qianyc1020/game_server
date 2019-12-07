import ProtoManager from '../../../netbus/ProtoManager';
import { Cmd, CmdName } from '../../protocol/GameHoodleProto';
import GameSendMsg from './GameSendMsg';
import CommonProto from '../../protocol/CommonProto';
import PlayerManager from './PlayerManager';
import Player from './Player';
import RoomManager from './RoomManager';

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
            default:
            break;
        }
    }
    //玩家离开逻辑服务
    on_user_lost_connect(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.info("game on_user_lost_connect utag:" ,utag , body)
        PlayerManager.getInstance().delete_player(utag)
    }
    //登录逻辑服务
    private login_logic(session:any, utag:number, proto_type:number, raw_cmd:any){
        let player:Player = PlayerManager.getInstance().get_player(utag)
        if(player){
            Log.info("player is exist, uid: " , utag)
            player.init_session(session, utag, proto_type)
        }else{
            Log.info("player is not exist , new player uid: " , utag)
            PlayerManager.getInstance().alloc_player(session, utag, proto_type)
        }
        GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, {status: 1})
    }
    //玩家检测
    private check_player(utag:number){
        let player = PlayerManager.getInstance().get_player(utag);
        if(player){
            return true;
        }else{
            return false;
        }
    }
    //创建房间
    private create_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        if (!this.check_player(utag)){
            Log.info("create_room player is not exist!")
            return;
        }

        let room = RoomManager.getInstance().alloc_room();
        GameSendMsg.send(session, Cmd.eCreateRoomRes, utag, proto_type, {status: 1})
    }
    //加入房间
    private join_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: 1})
    }
    //离开房间
    private exit_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eExitRoomRes, utag, proto_type, {status: 1})
    }
    //解散房间
    private dessolve_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eDessolveRes, utag, proto_type, {status: 1})
    }
    //获取是否创建过房间
    private get_room_status(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eGetRoomStatusRes, utag, proto_type, {status: 1})
    }
    //返回房间
    private back_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eBackRoomRes, utag, proto_type, {status: 1})
    }
}

export default GameHoodleModle;