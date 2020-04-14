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
var AuthLoginInterface = /** @class */ (function () {
    function AuthLoginInterface() {
    }
    AuthLoginInterface.do_uname_login_req = function (session, utag, proto_type, raw_cmd) {
        var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
        if (!body) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        // Log.info("uname_login cmd: ", body)
        if (!body.uname || !body.upwd) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        if (body.uname.length < 6 || body.upwd.length < 6) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        MySqlAuth_1["default"].login_by_uname_upwd(body.uname, body.upwd, function (status, data) {
            // Log.info("login_by_uname_upwd ret: ", data)
            if (status == Response_1["default"].OK) {
                if (data.length <= 0) {
                    AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].UNAME_OR_UPWD_ERR });
                }
                else {
                    var sql_info = data[0];
                    var resbody = {
                        status: 1,
                        uid: sql_info.uid,
                        userlogininfo: JSON.stringify(sql_info)
                    };
                    // Log.info("hcc>>uname_login", JSON.stringify(sql_info))
                    AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, resbody);
                }
            }
            else {
                AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].UNAME_OR_UPWD_ERR });
            }
        });
    };
    AuthLoginInterface.do_guest_login_req = function (session, utag, proto_type, raw_cmd) {
        var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
        if (!body) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        // Log.info("guest_login cmd: ", body)
        if (!body.guestkey) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        if (body.guestkey.length < 32) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        MySqlAuth_1["default"].login_by_guestkey(body.guestkey, function (status, data) {
            Log_1["default"].info("login_by_guestkey ret: ", data);
            if (status == Response_1["default"].OK) {
                if (data.length <= 0) { //
                    var unick = "gst" + StringUtil_1["default"].random_int_str(5);
                    var usex = StringUtil_1["default"].random_int(0, 1);
                    var uface = StringUtil_1["default"].random_int(1, 9);
                    MySqlAuth_1["default"].insert_guest_user(unick, uface, usex, body.guestkey, function (status, data) {
                        if (status != Response_1["default"].OK) {
                            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
                            return;
                        }
                        AuthLoginInterface.do_guest_login_req(session, utag, proto_type, raw_cmd);
                    });
                }
                else {
                    var sql_info = data[0];
                    var resbody = {
                        status: 1,
                        uid: sql_info.uid,
                        userlogininfo: JSON.stringify(sql_info)
                    };
                    Log_1["default"].info("hcc>>login_by_guestkey: ", resbody);
                    AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, resbody);
                }
            }
            else {
                AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, { status: Response_1["default"].UNAME_OR_UPWD_ERR });
            }
        });
    };
    AuthLoginInterface.do_login_out_req = function (session, utag, proto_type, raw_cmd) {
        // Log.info("user login out uid:" , utag)
        if (utag != 0) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eLoginOutRes, utag, proto_type, { status: 1 });
        }
    };
    return AuthLoginInterface;
}());
exports["default"] = AuthLoginInterface;
//# sourceMappingURL=AuthLoginInterface.js.map