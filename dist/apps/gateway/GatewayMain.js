"use strict";
/*
    服务器启动文件
    注意： vscode调试服务器: 先用compile_src.bat编译成js,再找到服务器的xxxxMain.ts文件打开，f5调试，看到日志后才算成功。
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameAppConfig_1 = __importDefault(require("../config/GameAppConfig"));
var NetBus_1 = __importDefault(require("../../netbus/NetBus"));
var GatewayService_1 = __importDefault(require("./GatewayService"));
var ServiceManager_1 = __importDefault(require("../../netbus/ServiceManager"));
NetBus_1["default"].start_tcp_server(GameAppConfig_1["default"].gateway_config.host, GameAppConfig_1["default"].gateway_config.tcp_port, false);
NetBus_1["default"].start_ws_server(GameAppConfig_1["default"].gateway_config.host, GameAppConfig_1["default"].gateway_config.wbsocket_port, false);
// 连接其他服务器
var game_server = GameAppConfig_1["default"].gw_connect_servers;
for (var key in game_server) {
    NetBus_1["default"].connect_tcp_server(game_server[key].stype, game_server[key].host, game_server[key].port, false);
    ServiceManager_1["default"].register_service(game_server[key].stype, GatewayService_1["default"]);
}
//# sourceMappingURL=GatewayMain.js.map