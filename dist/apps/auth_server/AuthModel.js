"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var AuthProto_1 = require("../protocol/AuthProto");
var MySqlAuth_1 = __importDefault(require("../../database/MySqlAuth"));
var Response_1 = __importDefault(require("../Response"));
var StringUtil_1 = __importDefault(require("../../utils/StringUtil"));
var ProtoManager_1 = __importDefault(require("../../netbus/ProtoManager"));
var AuthSendMsg_1 = __importDefault(require("./AuthSendMsg"));
var CommonProto_1 = __importDefault(require("../protocol/CommonProto"));
var Log_1 = __importDefault(require("../../utils/Log"));
var AuthModel = /** @class */ (function () {
    function AuthModel() {
    }
    AuthModel.getInstance = function () {
        return AuthModel.Instance;
    };
    AuthModel.prototype.decode_cmd = function (proto_type, raw_cmd) {
        return ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
    };
    AuthModel.prototype.recv_cmd_msg = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        Log_1["default"].info("recv_cmd_msg: ", stype, ctype, utag, proto_type, this.decode_cmd(proto_type, raw_cmd));
        switch (ctype) {
            case CommonProto_1["default"].eUserLostConnectRes:
                this.on_user_lost_connect(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eUnameLoginReq:
                this.uname_login(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eGuestLoginReq:
                this.guest_login(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eUnameRegistReq:
                this.uname_regist(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eLoginOutReq:
                this.on_login_out(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eGetUserCenterInfoReq:
                this.get_user_center_info(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.ePhoneRegistReq:
                break;
            case AuthProto_1.Cmd.eGetPhoneRegVerNumReq:
                break;
            case AuthProto_1.Cmd.eBindPhoneNumberReq:
                break;
            case AuthProto_1.Cmd.eResetUserPwdReq:
                break;
            case AuthProto_1.Cmd.eEditProfileReq:
                break;
            case AuthProto_1.Cmd.eAccountUpgradeReq:
                break;
            case AuthProto_1.Cmd.eReloginRes:
                break;
            default:
                break;
        }
    };
    AuthModel.prototype.uname_login = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        if (!body) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        Log_1["default"].info("uname_login cmd: ", body);
        if (!body.uname || !body.upwd) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        if (body.uname.length < 6 || body.upwd.length < 6) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        MySqlAuth_1["default"].login_by_uname_upwd(body.uname, body.upwd, function (status, data) {
            Log_1["default"].info("login_by_uname_upwd ret: ", data);
            if (status == Response_1["default"].OK) {
                if (data.length <= 0) {
                    AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].UNAME_OR_UPWD_ERR });
                }
                else {
                    var sql_info = data[0];
                    var resbody = {
                        status: 1,
                        uid: sql_info.uid,
                        userLoginInfo: JSON.stringify(sql_info)
                    };
                    Log_1["default"].info("hcc>>uname_login", JSON.stringify(sql_info));
                    AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, resbody);
                }
            }
            else {
                AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].UNAME_OR_UPWD_ERR });
            }
        });
    };
    AuthModel.prototype.guest_login = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        if (!body) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        Log_1["default"].info("guest_login cmd: ", body);
        if (!body.guestkey) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        if (body.guestkey.length < 32) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        var _this = this;
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
                        _this.guest_login(session, utag, proto_type, raw_cmd);
                    });
                }
                else {
                    var sql_info = data[0];
                    var resbody = {
                        status: 1,
                        uid: sql_info.uid,
                        userLoginInfo: JSON.stringify(sql_info)
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
    AuthModel.prototype.uname_regist = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log_1["default"].info("uname_regist cmd: ", body);
        if (!body) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        if (!body.uname || !body.upwdmd5) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        if (body.uname.length < 6 || body.upwdmd5.length < 6) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        var unick = "gst" + StringUtil_1["default"].random_int_str(5);
        var usex = StringUtil_1["default"].random_int(0, 1);
        var uface = StringUtil_1["default"].random_int(1, 9);
        MySqlAuth_1["default"].check_uname_exist(body.uname, function (status, data) {
            if (status == Response_1["default"].OK) {
                AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
                return;
            }
            MySqlAuth_1["default"].insert_uname_upwd_user(body.uname, body.upwdmd5, unick, uface, usex, function (status, data) {
                if (status == Response_1["default"].OK) {
                    AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: 1 });
                }
                else {
                    AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
                }
            });
        });
    };
    AuthModel.prototype.get_user_center_info = function (session, utag, proto_type, raw_cmd) {
        if (utag == 0) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGetUserCenterInfoRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
        }
        MySqlAuth_1["default"].get_uinfo_by_uid(utag, function (status, data) {
            if (status == Response_1["default"].OK) {
                var sql_info = data[0];
                var resbody = {
                    status: 1,
                    userCenterInfoString: JSON.stringify(sql_info)
                };
                Log_1["default"].info("get_user_center_info:", resbody);
                AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGetUserCenterInfoRes, utag, proto_type, resbody);
            }
            else {
                AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGetUserCenterInfoRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
            }
        });
    };
    AuthModel.prototype.on_login_out = function (session, utag, proto_type, raw_cmd) {
        Log_1["default"].info("user login out uid:", utag);
        if (utag != 0) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eLoginOutRes, utag, proto_type, { status: 1 });
        }
    };
    AuthModel.prototype.on_user_lost_connect = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log_1["default"].info("on_user_lost_connect utag:", utag, body);
    };
    AuthModel.Instance = new AuthModel();
    return AuthModel;
}());
exports["default"] = AuthModel;
//# sourceMappingURL=AuthModel.js.map