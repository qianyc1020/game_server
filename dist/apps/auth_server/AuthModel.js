"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var AuthProto_1 = require("../protocol/AuthProto");
var Response_1 = __importDefault(require("../protocol/Response"));
var ProtoManager_1 = __importDefault(require("../../netbus/ProtoManager"));
var AuthSendMsg_1 = __importDefault(require("./AuthSendMsg"));
var CommonProto_1 = __importDefault(require("../protocol/CommonProto"));
var Log_1 = __importDefault(require("../../utils/Log"));
var AuthInfoInterface_1 = __importDefault(require("./interface/AuthInfoInterface"));
var AuthLoginInterface_1 = __importDefault(require("./interface/AuthLoginInterface"));
var AuthRegistInterface_1 = __importDefault(require("./interface/AuthRegistInterface"));
var Stype_1 = require("../protocol/Stype");
var AuthModel = /** @class */ (function () {
    function AuthModel() {
        var _a;
        this._cmd_handler_map = {};
        this._cmd_handler_map = (_a = {},
            _a[CommonProto_1["default"].eUserLostConnectRes] = this.on_player_lost_connect,
            _a[AuthProto_1.Cmd.eUnameLoginReq] = this.on_uname_login_req,
            _a[AuthProto_1.Cmd.eGuestLoginReq] = this.on_guest_login_req,
            _a[AuthProto_1.Cmd.eUnameRegistReq] = this.on_uname_regist_req,
            _a[AuthProto_1.Cmd.eLoginOutReq] = this.on_login_out_req,
            _a[AuthProto_1.Cmd.eGetUserCenterInfoReq] = this.on_get_user_center_info_req,
            _a[AuthProto_1.Cmd.ePhoneRegistReq] = function () { },
            _a[AuthProto_1.Cmd.eGetPhoneRegVerNumReq] = function () { },
            _a[AuthProto_1.Cmd.eBindPhoneNumberReq] = function () { },
            _a[AuthProto_1.Cmd.eResetUserPwdReq] = function () { },
            _a[AuthProto_1.Cmd.eEditProfileReq] = function () { },
            _a[AuthProto_1.Cmd.eAccountUpgradeReq] = function () { },
            _a[AuthProto_1.Cmd.eReloginRes] = function () { },
            _a);
    }
    AuthModel.getInstance = function () {
        return AuthModel.Instance;
    };
    AuthModel.prototype.decode_cmd = function (proto_type, raw_cmd) {
        return ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
    };
    AuthModel.prototype.recv_cmd_msg = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        // Log.info("recv_cmd_msg: ", stype, ctype, utag, proto_type, ProtoManager.decode_cmd(proto_type, raw_cmd))
        var ctypeName = ctype == CommonProto_1["default"].eUserLostConnectRes ? "UserLostConnectRes" : AuthProto_1.CmdName[ctype];
        Log_1["default"].info("recv_cmd_msg: stype:", Stype_1.StypeName[stype], " ,cmdName: ", ctypeName, " ,utag: ", utag);
        if (this._cmd_handler_map[ctype]) {
            this._cmd_handler_map[ctype].call(this, session, utag, proto_type, raw_cmd);
        }
    };
    AuthModel.prototype.on_player_lost_connect = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log_1["default"].info("on_player_lost_connect utag:", utag, body);
    };
    AuthModel.prototype.on_uname_login_req = function (session, utag, proto_type, raw_cmd) {
        if (utag == 0) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
            return;
        }
        AuthLoginInterface_1["default"].do_uname_login_req(session, utag, proto_type, raw_cmd);
    };
    AuthModel.prototype.on_guest_login_req = function (session, utag, proto_type, raw_cmd) {
        if (utag == 0) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGuestLoginRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
            return;
        }
        AuthLoginInterface_1["default"].do_guest_login_req(session, utag, proto_type, raw_cmd);
    };
    AuthModel.prototype.on_uname_regist_req = function (session, utag, proto_type, raw_cmd) {
        if (utag == 0) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eUnameRegistRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
            return;
        }
        AuthRegistInterface_1["default"].do_uname_regist_req(session, utag, proto_type, raw_cmd);
    };
    AuthModel.prototype.on_get_user_center_info_req = function (session, utag, proto_type, raw_cmd) {
        if (utag == 0) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGetUserCenterInfoRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
            return;
        }
        AuthInfoInterface_1["default"].do_get_user_center_info_req(session, utag, proto_type, raw_cmd);
    };
    AuthModel.prototype.on_login_out_req = function (session, utag, proto_type, raw_cmd) {
        if (utag == 0) {
            AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eLoginOutRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
            return;
        }
        AuthLoginInterface_1["default"].do_login_out_req(session, utag, proto_type, raw_cmd);
    };
    AuthModel.Instance = new AuthModel();
    return AuthModel;
}());
exports["default"] = AuthModel;
//# sourceMappingURL=AuthModel.js.map