import MySqlAuth from "../../../database/MySqlAuth"
import Response from '../../protocol/Response';
import Log from "../../../utils/Log";
import AuthSendMsg from "../AuthSendMsg";
import { Cmd } from "../../protocol/AuthProto";
import ProtoManager from '../../../netbus/ProtoManager';
import StringUtil from "../../../utils/StringUtil";

class AuthLoginInterface {

    static do_uname_login_req(session: any, utag: number, proto_type: number, raw_cmd: any){
        let body = ProtoManager.decode_cmd(proto_type, raw_cmd);
        if (!body) {
            AuthSendMsg.send(session, Cmd.eUnameLoginRes, utag, proto_type, { status: Response.INVALID_PARAMS })
            return;
        }
        // Log.info("uname_login cmd: ", body)

        if (!body.uname || !body.upwd) {
            AuthSendMsg.send(session, Cmd.eUnameLoginRes, utag, proto_type, { status: Response.INVALID_PARAMS })
            return;
        }

        if (body.uname.length < 6 || body.upwd.length < 6) {
            AuthSendMsg.send(session, Cmd.eUnameLoginRes, utag, proto_type, { status: Response.INVALID_PARAMS })
            return;
        }

        MySqlAuth.login_by_uname_upwd(body.uname, body.upwd, function (status: number, data: any) {
            // Log.info("login_by_uname_upwd ret: ", data)
            if (status == Response.OK) {
                if (data.length <= 0) {
                    AuthSendMsg.send(session, Cmd.eUnameLoginRes, utag, proto_type, { status: Response.UNAME_OR_UPWD_ERR })
                } else {
                    let sql_info = data[0]
                    let resbody = {
                        status: 1,
                        uid: sql_info.uid,
                        userlogininfo: JSON.stringify(sql_info)
                    }
                    // Log.info("hcc>>uname_login", JSON.stringify(sql_info))
                    AuthSendMsg.send(session, Cmd.eUnameLoginRes, utag, proto_type, resbody)
                }
            } else {
                AuthSendMsg.send(session, Cmd.eUnameLoginRes, utag, proto_type, { status: Response.UNAME_OR_UPWD_ERR })
            }
        })
    }

    static do_guest_login_req(session: any, utag: number, proto_type: number, raw_cmd: any){
        let body = ProtoManager.decode_cmd(proto_type, raw_cmd);
        if (!body) {
            AuthSendMsg.send(session, Cmd.eGuestLoginRes, utag, proto_type, { status: Response.INVALID_PARAMS })
            return;
        }
        // Log.info("guest_login cmd: ", body)
        if (!body.guestkey) {
            AuthSendMsg.send(session, Cmd.eGuestLoginRes, utag, proto_type, { status: Response.INVALID_PARAMS })
            return;
        }
        if (body.guestkey.length < 32) {
            AuthSendMsg.send(session, Cmd.eGuestLoginRes, utag, proto_type, { status: Response.INVALID_PARAMS })
            return;
        }
        
        MySqlAuth.login_by_guestkey(body.guestkey, function (status: number, data: any) {
            Log.info("login_by_guestkey ret: ", data)
            if (status == Response.OK) {
                if (data.length <= 0) { //
                    var unick = "gst" + StringUtil.random_int_str(5);
                    var usex = StringUtil.random_int(0, 1);
                    var uface = StringUtil.random_int(1, 9);
                    MySqlAuth.insert_guest_user(unick, uface, usex, body.guestkey, function (status: number, data: any) {
                        if (status != Response.OK) {
                            AuthSendMsg.send(session, Cmd.eGuestLoginRes, utag, proto_type, { status: Response.INVALID_PARAMS })
                            return;
                        }
                        AuthLoginInterface.do_guest_login_req(session, utag, proto_type, raw_cmd);
                    })
                } else {
                    let sql_info = data[0]
                    let resbody = {
                        status: 1,
                        uid: sql_info.uid,
                        userlogininfo: JSON.stringify(sql_info)
                    }
                    Log.info("hcc>>login_by_guestkey: ", resbody)
                    AuthSendMsg.send(session, Cmd.eGuestLoginRes, utag, proto_type, resbody)
                }
            } else {
                AuthSendMsg.send(session, Cmd.eGuestLoginRes, utag, proto_type, { status: Response.UNAME_OR_UPWD_ERR })
            }
        })
    }

    static do_login_out_req(session: any, utag: number, proto_type: number, raw_cmd: any){
        // Log.info("user login out uid:" , utag)
        if(utag != 0){
            AuthSendMsg.send(session, Cmd.eLoginOutRes, utag, proto_type, {status: 1})
        }
    }

}

export default AuthLoginInterface;