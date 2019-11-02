"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ProtoCmd_1 = __importDefault(require("../ProtoCmd"));
var ProtoManager_1 = __importDefault(require("../../netbus/ProtoManager"));
var NetBus_1 = __importDefault(require("../../netbus/NetBus"));
var ServiceBase_1 = __importDefault(require("../../netbus/ServiceBase"));
var Log = require("../../utils/Log");
var AuthService = /** @class */ (function (_super) {
    __extends(AuthService, _super);
    function AuthService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.service_name = "AuthService"; // 服务名称
        _this.is_transfer = false; // 是否为转发模块,
        return _this;
    }
    // 收到客户端发来的数据
    AuthService.on_recv_client_player_cmd = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        Log.info("on_recv_player_cmd:", ProtoCmd_1["default"].getProtoName(stype) + ",", ProtoCmd_1["default"].getCmdName(stype, ctype) + ",", "utag:" + utag);
        Log.info("decode_cmd: ", ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd));
        NetBus_1["default"].send_encoded_cmd(session, raw_cmd);
        // var resbody = {status:1}
        // NetBus.send_cmd(session,stype,AuthProto.Cmd.eLoginRes,utag,proto_type,resbody)
        // NetBus.send_encoded_cmd(session, raw_cmd);
        // NetBus.send_cmd(session,stype,AuthProto.Cmd.eEmptyRes,utag,proto_type);
    };
    // 收到连接的服务发过来的数据;
    AuthService.on_recv_server_player_cmd = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        Log.info('on_recv_server_player_cmd', stype, ctype);
    };
    // 收到客户端断开连接;
    AuthService.on_player_disconnect = function (session, stype) {
        Log.info("on_player_disconnect uid: " + session.uid, " ,stype: " + stype);
    };
    return AuthService;
}(ServiceBase_1["default"]));
exports["default"] = AuthService;
//# sourceMappingURL=AuthService.js.map