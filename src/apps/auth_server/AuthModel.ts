import {Cmd,CmdName} from "../protocol/AuthProto"
import Response from '../protocol/Response';
import ProtoManager from '../../netbus/ProtoManager';
import AuthSendMsg from './AuthSendMsg';
import CommonProto from '../protocol/CommonProto';
import Log from '../../utils/Log';
import AuthInfoInterface from './interface/AuthInfoInterface';
import AuthLoginInterface from './interface/AuthLoginInterface';
import AuthRegistInterface from './interface/AuthRegistInterface';
import { Stype, StypeName } from '../protocol/Stype';

interface CmdHandlerMap {
    [cmdtype: number]: Function;
}

class AuthModel {
    private static readonly Instance: AuthModel = new AuthModel();
    _cmd_handler_map: CmdHandlerMap = {};

    private constructor(){
        this._cmd_handler_map = {
            [CommonProto.eUserLostConnectRes]:      this.on_player_lost_connect,
            [Cmd.eUnameLoginReq]:                   this.on_uname_login_req,
            [Cmd.eGuestLoginReq]:                   this.on_guest_login_req,
            [Cmd.eUnameRegistReq]:                  this.on_uname_regist_req,
            [Cmd.eLoginOutReq]:                     this.on_login_out_req,
            [Cmd.eGetUserCenterInfoReq]:            this.on_get_user_center_info_req,
            [Cmd.ePhoneRegistReq]:                  () => {},
            [Cmd.eGetPhoneRegVerNumReq]:            () => {},
            [Cmd.eBindPhoneNumberReq]:              () => {},
            [Cmd.eResetUserPwdReq]:                 () => {},
            [Cmd.eEditProfileReq]:                  () => {},
            [Cmd.eAccountUpgradeReq]:               () => {},
            [Cmd.eReloginRes]:                      () => {},
        }
    }

    public static getInstance(){
        return AuthModel.Instance;
    }

    private decode_cmd(proto_type:number,raw_cmd:any){
        return ProtoManager.decode_cmd(proto_type,raw_cmd);
    }

    public recv_cmd_msg(session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:Buffer){
        // Log.info("recv_cmd_msg: ", stype, ctype, utag, proto_type, ProtoManager.decode_cmd(proto_type, raw_cmd))
        let ctypeName = ctype == CommonProto.eUserLostConnectRes ? "UserLostConnectRes" : CmdName[ctype];
        Log.info("recv_cmd_msg: stype:", StypeName[stype], " ,cmdName: ", ctypeName, " ,utag: ",utag)
        if (this._cmd_handler_map[ctype]) {
            this._cmd_handler_map[ctype].call(this, session, utag, proto_type, raw_cmd);
        }
    }
    
    on_player_lost_connect(session: any, utag: number, proto_type: number, raw_cmd: any) {
        let body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("on_player_lost_connect utag:", utag, body)
    }

    on_uname_login_req(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (utag == 0) {
            AuthSendMsg.send(session, Cmd.eUnameLoginRes, utag, proto_type, { status: Response.ILLEGAL_ACCOUNT })
            return;
        }
        AuthLoginInterface.do_uname_login_req(session, utag, proto_type, raw_cmd);
    }
    
    on_guest_login_req(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (utag == 0) {
            AuthSendMsg.send(session, Cmd.eGuestLoginRes, utag, proto_type, { status: Response.ILLEGAL_ACCOUNT })
            return;
        }
        AuthLoginInterface.do_guest_login_req(session, utag, proto_type, raw_cmd);
    }

    on_uname_regist_req(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (utag == 0) {
            AuthSendMsg.send(session, Cmd.eUnameRegistRes, utag, proto_type, { status: Response.ILLEGAL_ACCOUNT })
            return;
        }
        AuthRegistInterface.do_uname_regist_req(session, utag, proto_type, raw_cmd);
    }

    on_get_user_center_info_req(session:any, utag:number, proto_type:number, raw_cmd:any){
        if (utag == 0) {
            AuthSendMsg.send(session, Cmd.eGetUserCenterInfoRes, utag, proto_type, { status: Response.ILLEGAL_ACCOUNT })
            return;
        }
        AuthInfoInterface.do_get_user_center_info_req(session, utag, proto_type, raw_cmd);
    }

    on_login_out_req(session:any, utag:number, proto_type:number,raw_cmd:any){
        if (utag == 0) {
            AuthSendMsg.send(session, Cmd.eLoginOutRes, utag, proto_type, { status: Response.ILLEGAL_ACCOUNT })
            return;
        }
        AuthLoginInterface.do_login_out_req(session, utag, proto_type, raw_cmd);
    }
}

export default AuthModel;