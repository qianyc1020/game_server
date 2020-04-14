import MySqlAuth from "../../../database/MySqlAuth"
import Response from '../../protocol/Response';
import Log from "../../../utils/Log";
import AuthSendMsg from "../AuthSendMsg";
import { Cmd } from "../../protocol/AuthProto";
import ProtoManager from '../../../netbus/ProtoManager';
import StringUtil from "../../../utils/StringUtil";

class AuthRegistInterface {

    static do_uname_regist_req(session: any, utag: number, proto_type: number, raw_cmd: any) {
        let body = ProtoManager.decode_cmd(proto_type, raw_cmd);
        // Log.info("uname_regist cmd: ", body)

        if (!body) {
            Log.warn("uname_regist error, regist body is null")
            AuthSendMsg.send(session, Cmd.eUnameRegistRes, utag, proto_type, { status: Response.INVALID_PARAMS })
            return;
        }

        if (!body.uname || !body.upwdmd5) {
            Log.warn("uname_regist error, regist uname or upwdmd5 is null")
            AuthSendMsg.send(session, Cmd.eUnameRegistRes, utag, proto_type, { status: Response.INVALID_PARAMS })
            return;
        }

        if (body.uname.length < 6 || body.upwdmd5.length < 6) {
            Log.warn("uname_regist error, regist uname or upwdmd5 length is < 6")
            AuthSendMsg.send(session, Cmd.eUnameRegistRes, utag, proto_type, { status: Response.INVALID_PARAMS })
            return;
        }

        let unick = "gst" + StringUtil.random_int_str(5);
        var usex = StringUtil.random_int(0, 1);
        var uface = StringUtil.random_int(1, 9);
        MySqlAuth.check_uname_exist(body.uname, function (status: number, data: any) {
            if (status == Response.OK) {
                Log.warn("uname_regist error, uname: ", body.uname, "is exist!!")
                AuthSendMsg.send(session, Cmd.eUnameRegistRes, utag, proto_type, { status: Response.ILLEGAL_ACCOUNT })
                return;
            }
            MySqlAuth.insert_uname_upwd_user(body.uname, body.upwdmd5, unick, uface, usex, function (status: number, data: any) {
                if (status == Response.OK) {
                    Log.info("uname_regist success!!! , uname: ", body.uname, " ,upwdmd5: ", body.upwdmd5);
                    AuthSendMsg.send(session, Cmd.eUnameRegistRes, utag, proto_type, { status: 1 })
                } else {
                    Log.info("uname_regist failed!!! ");
                    AuthSendMsg.send(session, Cmd.eUnameRegistRes, utag, proto_type, { status: Response.ILLEGAL_ACCOUNT })
                }
            })
        })
    }

}

export default AuthRegistInterface;