"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var NetBus_1 = __importDefault(require("../../netbus/NetBus"));
var AuthProto_1 = require("../protocol/AuthProto");
var ProtoManager_1 = __importDefault(require("../../netbus/ProtoManager"));
var Stype_1 = require("../protocol/Stype");
var Log = require("../../utils/Log");
var AuthModel = /** @class */ (function () {
    function AuthModel() {
    }
    AuthModel.getInstance = function () {
        return AuthModel.Instance;
    };
    AuthModel.prototype.recv_cmd_msg = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        Log.info("recv_cmd_msg: ", stype, ctype, utag, proto_type, this.decode_cmd(proto_type, raw_cmd));
        switch (ctype) {
            case AuthProto_1.Cmd.eUnameLoginReq:
                this.uname_login(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eGuestLoginReq:
                this.guest_login(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eUnameRegistReq:
                this.uname_regist(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.ePhoneRegistReq:
                this.phone_regist(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eGetPhoneRegVerNumReq:
                this.get_phone_regist_virtify_num(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eBindPhoneNumberReq:
                break;
            case AuthProto_1.Cmd.eResetUserPwdReq:
                break;
            case AuthProto_1.Cmd.eLoginOutReq:
                break;
            case AuthProto_1.Cmd.eEditProfileReq:
                break;
            case AuthProto_1.Cmd.eAccountUpgradeReq:
                break;
            case AuthProto_1.Cmd.eGetUserCenterInfoReq:
                this.get_user_center_info(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eReloginRes:
                break;
            case AuthProto_1.Cmd.eUserLostConnectRes:
                break;
            default:
                break;
        }
    };
    AuthModel.prototype.recv_cmd_disconnect = function (session) {
    };
    AuthModel.prototype.decode_cmd = function (proto_type, raw_cmd) {
        return ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
    };
    AuthModel.prototype.uname_login = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("uname_login cmd: ", body);
        // NetBus.send_encoded_cmd(session,raw_cmd);
        var res_body = { status: 1 };
        NetBus_1["default"].send_cmd(session, Stype_1.Stype.Auth, AuthProto_1.Cmd.eUnameLoginRes, utag, proto_type, res_body);
    };
    AuthModel.prototype.guest_login = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("guest_login cmd: ", body);
        NetBus_1["default"].send_encoded_cmd(session, raw_cmd);
    };
    AuthModel.prototype.uname_regist = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("uname_regist cmd: ", body);
        NetBus_1["default"].send_encoded_cmd(session, raw_cmd);
    };
    AuthModel.prototype.phone_regist = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("phone_regist cmd: ", body);
        NetBus_1["default"].send_encoded_cmd(session, raw_cmd);
    };
    AuthModel.prototype.get_phone_regist_virtify_num = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("phone_regist cmd: ", body);
        NetBus_1["default"].send_encoded_cmd(session, raw_cmd);
    };
    AuthModel.prototype.get_user_center_info = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("get_user_center_info cmd: ", body);
        NetBus_1["default"].send_encoded_cmd(session, raw_cmd);
    };
    AuthModel.Instance = new AuthModel();
    return AuthModel;
}());
exports["default"] = AuthModel;
//# sourceMappingURL=AuthModel.js.map