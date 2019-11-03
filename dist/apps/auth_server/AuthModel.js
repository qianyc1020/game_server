"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var AuthProto_1 = require("../protocol/AuthProto");
var ProtoManager_1 = __importDefault(require("../../netbus/ProtoManager"));
var Log = require("../../utils/Log");
var AuthModel = /** @class */ (function () {
    function AuthModel() {
    }
    AuthModel.getInstance = function () {
        return AuthModel.Instance;
    };
    AuthModel.prototype.recv_cmd_msg = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        switch (ctype) {
            case AuthProto_1.Cmd.eLoginReq:
                this.guest_login(session, utag, proto_type, raw_cmd);
                break;
            case AuthProto_1.Cmd.eEmptyReq:
                break;
        }
    };
    AuthModel.prototype.recv_cmd_disconnect = function (session) {
    };
    AuthModel.prototype.guest_login = function (session, utag, proto_type, raw_cmd) {
        var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
        Log.info("login cmd: ", body);
    };
    AuthModel.Instance = new AuthModel();
    return AuthModel;
}());
exports["default"] = AuthModel;
//# sourceMappingURL=AuthModel.js.map