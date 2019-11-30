"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ProtoManager_1 = __importDefault(require("./ProtoManager"));
var Log = require("../utils/Log");
var ServiceManager = /** @class */ (function () {
    function ServiceManager() {
    }
    ServiceManager.register_service = function (stype, service) {
        if (ServiceManager.service_modules[stype]) {
            Log.warn(ServiceManager.service_modules[stype].name + " service is registed !!!!");
        }
        ServiceManager.service_modules[stype] = service;
        Log.info(ServiceManager.service_modules[stype].name + " service registed success !!!!");
    };
    ServiceManager.on_recv_server_cmd = function (session, cmd_buf) {
        if (session.is_encrypt) {
            cmd_buf = ProtoManager_1["default"].decrypt_cmd(cmd_buf);
        }
        var cmd = ProtoManager_1["default"].decode_cmd_header(cmd_buf);
        if (!cmd) {
            return false;
        }
        var stype = cmd[0];
        var ctype = cmd[1];
        var utag = cmd[2];
        var proto_type = cmd[3];
        if (!ServiceManager.service_modules[stype]) {
            Log.error("ServiceManager.service_modules not exist");
            return false;
        }
        if (stype == null || ctype == null || utag == null || proto_type == null) {
            Log.error("cmd error");
            return false;
        }
        ServiceManager.service_modules[stype].on_recv_server_player_cmd(session, stype, ctype, utag, proto_type, cmd_buf);
        return true;
    };
    ServiceManager.on_recv_client_cmd = function (session, cmd_buf) {
        // 根据收到的数据解码命令
        if (!cmd_buf) {
            return false;
        }
        if (session.is_encrypt) {
            cmd_buf = ProtoManager_1["default"].decrypt_cmd(cmd_buf);
        }
        var cmd = ProtoManager_1["default"].decode_cmd_header(cmd_buf);
        if (!cmd) {
            return false;
        }
        var stype = cmd[0];
        var ctype = cmd[1];
        var utag = cmd[2];
        var proto_type = cmd[3];
        if (!ServiceManager.service_modules[stype]) {
            Log.error("ServiceManager.service_modules not exist");
            return false;
        }
        if (stype == null || ctype == null || utag == null || proto_type == null) {
            Log.error("cmd error");
            return false;
        }
        ServiceManager.service_modules[stype].on_recv_client_player_cmd(session, stype, ctype, utag, proto_type, cmd_buf);
        // Log.info("on_recv_client_cmd>> " , stype, ctype, utag, proto_type)
        return true;
    };
    // 玩家掉线
    ServiceManager.on_client_lost_connect = function (session) {
        var uid = session.uid;
        if (uid === 0) {
            return;
        }
        // 遍历所有的服务模块通知在这个服务上的这个玩家掉线了
        for (var stype in ServiceManager.service_modules) {
            ServiceManager.service_modules[stype].on_player_disconnect(session, stype);
        }
    };
    ServiceManager.service_modules = {};
    return ServiceManager;
}());
exports["default"] = ServiceManager;
//# sourceMappingURL=ServiceManager.js.map