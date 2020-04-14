"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var MySqlAuth_1 = __importDefault(require("../../../database/MySqlAuth"));
var Response_1 = __importDefault(require("../../protocol/Response"));
var Log_1 = __importDefault(require("../../../utils/Log"));
var AuthSendMsg_1 = __importDefault(require("../AuthSendMsg"));
var AuthProto_1 = require("../../protocol/AuthProto");
var ProtoManager_1 = __importDefault(require("../../../netbus/ProtoManager"));
var StringUtil_1 = __importDefault(require("../../../utils/StringUtil"));
var AuthRegistInterface = /** @class */ (function () {
    function AuthRegistInterface() {
    }
    AuthRegistInterface.do_uname_regist_req = function (session, utag, proto_type, raw_cmd) {
        var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
        // Log.info("uname_regist cmd: ", body)
        if (!body) {
            Log_1["default"].warn("uname_regist error, regist body is null");
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        if (!body.uname || !body.upwdmd5) {
            Log_1["default"].warn("uname_regist error, regist uname or upwdmd5 is null");
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        if (body.uname.length < 6 || body.upwdmd5.length < 6) {
            Log_1["default"].warn("uname_regist error, regist uname or upwdmd5 length is < 6");
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        var unick = "gst" + StringUtil_1["default"].random_int_str(5);
        var usex = StringUtil_1["default"].random_int(0, 1);
        var uface = StringUtil_1["default"].random_int(1, 9);
        MySqlAuth_1["default"].check_uname_exist(body.uname, function (status, data) {
            if (status == Response_1["default"].OK) {
                Log_1["default"].warn("uname_regist error, uname: ", body.uname, "is exist!!");
                AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
                return;
            }
            MySqlAuth_1["default"].insert_uname_upwd_user(body.uname, body.upwdmd5, unick, uface, usex, function (status, data) {
                if (status == Response_1["default"].OK) {
                    Log_1["default"].info("uname_regist success!!! , uname: ", body.uname, " ,upwdmd5: ", body.upwdmd5);
                    AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: 1 });
                }
                else {
                    Log_1["default"].info("uname_regist failed!!! ");
                    AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
                }
            });
        });
    };
    return AuthRegistInterface;
}());
exports["default"] = AuthRegistInterface;
//# sourceMappingURL=AuthRegistInterface.js.map