"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameConf_1 = __importDefault(require("../GameConf"));
var NetBus_1 = __importDefault(require("../../netbus/NetBus"));
var GatewayService_1 = __importDefault(require("./GatewayService"));
var ServiceManager_1 = __importDefault(require("../../netbus/ServiceManager"));
var host = GameConf_1.default.gateway_config.host;
var posts = GameConf_1.default.gateway_config.ports;
NetBus_1.default.start_tcp_server(host, posts[0], false);
NetBus_1.default.start_ws_server(host, posts[1], false);
// 链接其他服务器
var game_server = GameConf_1.default.gw_connect_servers;
for (var key in game_server) {
    NetBus_1.default.connect_tcp_server(game_server[key].stype, game_server[key].host, game_server[key].port, false);
    ServiceManager_1.default.register_service(game_server[key].stype, GatewayService_1.default);
}
//# sourceMappingURL=GatewayMain.js.map