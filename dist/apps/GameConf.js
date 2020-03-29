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
var GameConf = /** @class */ (function () {
    function GameConf() {
    }
    GameConf.KW_BORN_EXP = 0; //出生经验
    GameConf.KW_BORN_CHIP = 1500; //出生金币
    GameConf.KW_WIN_RATE = 100; //输赢分数* 金币数
    GameConf.KW_MIN_GOLD_ENTER_ROOM = 300; //最少进入房间金币
    GameConf.KW_IS_GOLD_LIMIT = false; //是否金币不足，禁止加入房间
    //网关服
    GameConf.gateway_config = {
        host: localhost,
        tcp_port: 6080,
        wbsocket_port: wss_port
    };
    //web服务
    GameConf.webserver = {
        host: localhost,
        port: 10001
    };
    //系统服务
    GameConf.game_system_server = {
        host: localhost,
        port: 6087,
        stypes: [Stype_1.Stype.GameSystem]
    };
    //游戏服务
    GameConf.game_server = {
        host: localhost,
        port: 6088,
        stypes: [Stype_1.Stype.GameHoodle]
    };
    //游戏数据库服务
    GameConf.game_database = {
        host: localhost,
        port: 3306,
        db_name: "moba_game",
        uname: "root",
        upwd: "123456"
    };
    //用户中心服务
    GameConf.auth_server = {
        host: localhost,
        port: 6086,
        stypes: [Stype_1.Stype.Auth]
    };
    //用户中心数据库
    GameConf.auth_database = {
        host: localhost,
        port: 3306,
        db_name: "auth_center",
        uname: "root",
        upwd: "123456"
    };
    //用户中心redis
    GameConf.auth_redis = {
        host: localhost,
        port: 6379,
        db_index: 0
    };
    //游戏服务redis
    GameConf.game_redis = {
        host: localhost,
        port: 6379,
        db_index: 1
    };
    //网关连接其他服务
    GameConf.gw_connect_servers = (_a = {},
        _a[1] = {
            stype: Stype_1.Stype.Auth,
            host: localhost,
            port: 6086
        },
        _a[2] = {
            stype: Stype_1.Stype.GameHoodle,
            host: localhost,
            port: 6088
        },
        _a);
    return GameConf;
}());
exports["default"] = GameConf;
//# sourceMappingURL=GameConf.js.map