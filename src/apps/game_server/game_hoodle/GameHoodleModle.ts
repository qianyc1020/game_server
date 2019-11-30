import ProtoManager from '../../../netbus/ProtoManager';
import { Cmd, CmdName } from '../../protocol/GameHoodleProto';
import GameSendMsg from './GameSendMsg';

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

    private create_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eCreateRoomRes, utag, proto_type, {status: 1})
    }

    private join_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eJoinRoomRes, utag, proto_type, {status: 1})
    }

    private exit_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eExitRoomRes, utag, proto_type, {status: 1})
    }

    private dessolve_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eDessolveRes, utag, proto_type, {status: 1})
    }

    private get_room_status(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eGetRoomStatusRes, utag, proto_type, {status: 1})
    }

    private back_room(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        GameSendMsg.send(session, Cmd.eBackRoomRes, utag, proto_type, {status: 1})
    }
}

export default GameHoodleModle;