"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Log_1 = __importDefault(require("../utils/Log"));
var ServiceBase = /** @class */ (function () {
    function ServiceBase() {
        this.service_name = "ServiceBase"; // 服务名称
        this.is_transfer = false; // 是否为转发模块,
    }
    // 收到客户端发来的数据
    ServiceBase.on_recv_client_player_cmd = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        Log_1["default"].info("base on_recv_client_player_cmd");
    };
    //收到连接的服务发过来的数据;
    ServiceBase.on_recv_server_player_cmd = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        Log_1["default"].info("base on_recv_server_player_cmd");
    };
    // 收到客户端断开连接;
    ServiceBase.on_player_disconnect = function (session, stype) {
        Log_1["default"].info("base on_player_disconnect");
    };
    return ServiceBase;
}());
exports["default"] = ServiceBase;
//# sourceMappingURL=ServiceBase.js.map