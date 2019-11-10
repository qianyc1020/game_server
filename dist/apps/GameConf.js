"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var Stype_1 = require("./protocol/Stype");
var Platform_1 = __importDefault(require("../utils/Platform"));
var localhost = "127.0.0.1";
var wss_port = 6081;
if (Platform_1["default"].isWin32()) {
    localhost = "127.0.0.1";
    wss_port = 6081;
}
else if (Platform_1["default"].isLinux()) {
    localhost = "172.16.166.106";
    wss_port = 6061;
}
// websocket wss://172.16.166.106:6061 阿里云服务内网端口
// 6061 服务端内网端口
// 6081 服务端wss外网端口(nginx.conf外网配置)
var GameConf = {
    gateway_config: {
        host: localhost,
        tcp_port: 6080,
        wbsocket_port: wss_port
    },
    webserver: {
        host: localhost,
        port: 10001
    },
    game_system_server: {
        host: localhost,
        port: 6087,
        stypes: [Stype_1.Stype.GameSystem]
    },
    // game_server: {
    // 	host: localhost,
    // 	port: 6088,
    // 	stypes: [Stype.Game5Chess],
    // },
    game_database: {
        host: localhost,
        port: 3306,
        db_name: "moba_game",
        uname: "root",
        upwd: "123456"
    },
    auth_server: {
        host: localhost,
        port: 6086,
        stypes: [Stype_1.Stype.Auth]
    },
    auth_database: {
        host: localhost,
        port: 3306,
        db_name: "auth_center",
        uname: "root",
        upwd: "123456"
    },
    auth_redis: {
        host: localhost,
        port: 6379,
        db_index: 0
    },
    game_redis: {
        host: localhost,
        port: 6379,
        db_index: 1
    },
    // 代码来生成
    gw_connect_servers: (_a = {},
        _a[1] = {
            stype: Stype_1.Stype.Auth,
            host: localhost,
            port: 6086
        },
        _a)
};
exports["default"] = GameConf;
//# sourceMappingURL=GameConf.js.map