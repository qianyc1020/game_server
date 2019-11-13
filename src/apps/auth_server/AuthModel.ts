import NetBus from '../../netbus/NetBus';
import {Cmd,CmdName} from "../protocol/AuthProto"
import ProtoManater from "../../netbus/ProtoManager"
import { Stype , StypeName } from '../protocol/Stype';
import MySqlAuth from '../../database/MySqlAuth';
import Response from '../Response';

var Log =  require("../../utils/Log")

class AuthModel {
    private static readonly Instance: AuthModel = new AuthModel();

    public static getInstance(){
        return AuthModel.Instance;
    }

    public recv_cmd_msg(session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:Buffer){
        Log.info("recv_cmd_msg: ",stype,ctype,utag,proto_type,this.decode_cmd(proto_type,raw_cmd))
        
        switch(ctype){
            case Cmd.eUnameLoginReq:
                this.uname_login(session,utag,proto_type,raw_cmd)
                break;
            case Cmd.eGuestLoginReq:
                this.guest_login(session,utag,proto_type,raw_cmd);
            break;
            case Cmd.eUnameRegistReq:
                this.uname_regist(session,utag,proto_type,raw_cmd)
            break;
            case Cmd.ePhoneRegistReq:
                this.phone_regist(session,utag,proto_type,raw_cmd);
            break;
            case Cmd.eGetPhoneRegVerNumReq:
                this.get_phone_regist_virtify_num(session,utag,proto_type,raw_cmd);
            break;
            case Cmd.eBindPhoneNumberReq:
            break;
            case Cmd.eResetUserPwdReq:
            break;
            case Cmd.eLoginOutReq:
            break;
            case Cmd.eEditProfileReq:
            break;
            case Cmd.eAccountUpgradeReq:
            break;
            case Cmd.eGetUserCenterInfoReq:
                this.get_user_center_info(session,utag,proto_type,raw_cmd);
            break;
            case Cmd.eReloginRes:
            break;
            case Cmd.eUserLostConnectRes:
            break;
            default:
            break;
        }
    }

    public recv_cmd_disconnect(session:any){
        
    }

    private decode_cmd(proto_type:number,raw_cmd:any){
        return ProtoManater.decode_cmd(proto_type,raw_cmd);
    }
    
    uname_login(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.info("uname_login cmd: " , body)
        // let res_body = {status:1}
        // NetBus.send_cmd(session,Stype.Auth,Cmd.eUnameLoginRes,utag, proto_type,res_body);

        if(!body.uname || !body.upwd){
            return
        }

        MySqlAuth.get_uinfo_by_uname_upwd(body.uname , body.upwd , function(status:number , data:any) {
            Log.info("mysql ret: " , data)
            if(status == Response.OK){
                if(data.length <= 0){
                    NetBus.send_cmd(session, Stype.Auth, Cmd.eUnameLoginRes, utag, proto_type, {status: Response.UNAME_OR_UPWD_ERR})    
                }else{
                    let sql_info = data[0]
                    if(sql_info.status != 0){
                        NetBus.send_cmd(session, Stype.Auth, Cmd.eUnameLoginRes, utag, proto_type, {status: Response.ILLEGAL_ACCOUNT})
                    }else{
                        NetBus.send_cmd(session, Stype.Auth, Cmd.eUnameLoginRes, utag, proto_type, {status: 1})
                    }
                }
            }else{
                NetBus.send_cmd(session, Stype.Auth, Cmd.eUnameLoginRes, utag, proto_type, {status: Response.UNAME_OR_UPWD_ERR})    
            }
        })
    }
    
    guest_login(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.info("guest_login cmd: " , body)
        // NetBus.send_encoded_cmd(session,raw_cmd);
        let res_body = {status:1}
        NetBus.send_cmd(session, Stype.Auth, Cmd.eGuestLoginRes, utag, proto_type, res_body)
    }

    uname_regist(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.info("uname_regist cmd: " , body)
        // NetBus.send_encoded_cmd(session,raw_cmd);
        let res_body  = {status: 1}
        NetBus.send_cmd(session, Stype.Auth, Cmd.eUnameRegistRes, utag, proto_type, res_body)
    }

    phone_regist(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.info("phone_regist cmd: " , body)
        NetBus.send_encoded_cmd(session,raw_cmd);
    }

    get_phone_regist_virtify_num(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.info("phone_regist cmd: " , body)
        NetBus.send_encoded_cmd(session,raw_cmd);
    }

    get_user_center_info(session:any, utag:number, proto_type:number, raw_cmd:any){
        let body =  this.decode_cmd(proto_type,raw_cmd);
        Log.info("get_user_center_info cmd: " , body)
        NetBus.send_encoded_cmd(session,raw_cmd);
    }
}

export default AuthModel;