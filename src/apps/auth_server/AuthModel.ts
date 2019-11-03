import NetBus from '../../netbus/NetBus';
import {protoName,Cmd,CmdName} from "../protocol/AuthProto"
import ProtoManater from "../../netbus/ProtoManager"

var Log =  require("../../utils/Log")

class AuthModel {
    private static readonly Instance: AuthModel = new AuthModel();

    public static getInstance(){
        return AuthModel.Instance;
    }

    public recv_cmd_msg(session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:Buffer){
        switch(ctype){
            case Cmd.eLoginReq:
                this.guest_login(session,utag,proto_type,raw_cmd);
            break;
            case Cmd.eEmptyReq:
                this.empty_req(session,utag,proto_type,raw_cmd)
            break;
        }
    }

    public recv_cmd_disconnect(session:any){
        
    }

    private decode_cmd(proto_type:number,raw_cmd:any){
        return ProtoManater.decode_cmd(proto_type,raw_cmd);
    }

    guest_login(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.info("login cmd: " , body)
        NetBus.send_encoded_cmd(session,raw_cmd);
    }

    empty_req(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.info("empty cmd: " , body)
        NetBus.send_encoded_cmd(session,raw_cmd);
    }
}

export default AuthModel;