"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var Stype_1 = require("../apps/Stype");
var Platform_1 = __importDefault(require("../utils/Platform"));
var localhost = "127.0.0.1";
if (Platform_1.default.isWin32()) {
    localhost = "127.0.0.1";
}
else if (Platform_1.default.isLinux()) {
    localhost = "172.16.166.106";
}
var GameConf = {
    gateway_config: {
        host: localhost,
        ports: [6080, 6081],
    },
    webserver: {
        host: localhost,
        port: 10001,
    },
    game_system_server: {
        host: localhost,
        port: 6087,
        stypes: [Stype_1.Stype.GameSystem],
    },
    // game_server: {
    // 	host: localhost,
    // 	port: 6088,
    // 	stypes: [Stype.Game5Chess],
    // },
    game_database: {
        host: localhost,
        port: 3306,
        db_name: "game_database",
        uname: "root",
        upwd: "123456",
    },
    auth_server: {
        host: localhost,
        port: 6086,
        stypes: [Stype_1.Stype.Auth],
    },
    auth_database: {
        host: localhost,
        port: 3306,
        db_name: "auth_center",
        uname: "root",
        upwd: "123456",
    },
    auth_redis: {
        host: localhost,
        port: 6379,
        db_index: 0,
    },
    game_redis: {
        host: localhost,
        port: 6379,
        db_index: 1,
    },
    // 代码来生成
    gw_connect_servers: (_a = {},
        _a[1] = {
            stype: Stype_1.Stype.Auth,
            host: localhost,
            port: 6086,
        },
        _a),
};
exports.default = GameConf;
//# sourceMappingURL=GameConf.js.map