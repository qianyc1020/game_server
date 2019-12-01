"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ProtoManager_1 = __importDefault(require("../../../netbus/ProtoManager"));
var AuthProto_1 = require("../../protocol/AuthProto");
var Log = require("../../../utils/Log");
var AuthMsg = /** @class */ (function () {
    function AuthMsg() {
    }
    AuthMsg.getInstance = function () {
        return AuthMsg.Instance;
    };
    AuthMsg.prototype.decode_cmd = function (proto_type, raw_cmd) {
        return ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
    };
    AuthMsg.prototype.recv_cmd_msg = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        Log.info("recv_cmd_msg: ", stype, ctype, utag, proto_type, this.decode_cmd(proto_type, raw_cmd));
        switch (ctype) {
            case AuthProto_1.Cmd.eUserLostConnectRes:
                this.on_user_lost_connect(session, utag, proto_type, raw_cmd);
                break;
            default:
                break;
        }
    };
    AuthMsg.prototype.on_user_lost_connect = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("game on_user_lost_connect utag:", utag, body);
    };
    AuthMsg.Instance = new AuthMsg();
    return AuthMsg;
}());
exports["default"] = AuthMsg;
//# sourceMappingURL=AtuhMsg.js.map