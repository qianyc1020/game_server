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
var is_use_local_ip = true; //是否启用本地ip来测试，启用后只能用当前电脑ip调试服务端程序
if (Platform_1["default"].isWin32()) {
    if (is_use_local_ip) {
        localhost = "192.168.0.103"; //本地电脑ip，这里主要是为了游戏在web测试用,暂时写死
    }
    wss_port = 6081;
}
else if (Platform_1["default"].isLinux()) {
    localhost = "172.16.166.106"; //阿里云外网ip
    wss_port = 6061;
}
// websocket wss://172.16.166.106:6061 阿里云服务内网端口
// 6061 服务端内网端口
// 6081 服务端wss外网端口(nginx.conf外网配置)
var GameAppConfig = /** @class */ (function () {
    function GameAppConfig() {
    }
    GameAppConfig.KW_BORN_EXP = 0; //出生经验
    GameAppConfig.KW_BORN_CHIP = 1500; //出生金币
    GameAppConfig.KW_WIN_RATE = 100; //输赢分数* 金币数
    GameAppConfig.KW_MIN_GOLD_ENTER_ROOM = 300; //最少进入房间金币
    GameAppConfig.KW_IS_GOLD_LIMIT = false; //是否金币不足，禁止加入房间
    //网关服
    GameAppConfig.gateway_config = {
        host: localhost,
        tcp_port: 6080,
        wbsocket_port: wss_port
    };
    //web服务
    GameAppConfig.webserver = {
        host: localhost,
        port: 10001
    };
    //系统服务
    GameAppConfig.game_system_server = {
        host: localhost,
        port: 6087,
        stypes: [Stype_1.Stype.GameSystem]
    };
    //游戏服务
    GameAppConfig.game_server = {
        host: localhost,
        port: 6088,
        stypes: [Stype_1.Stype.GameHoodle]
    };
    //游戏数据库服务
    GameAppConfig.game_database = {
        host: localhost,
        port: 3306,
        db_name: "moba_game",
        uname: "root",
        upwd: "123456"
    };
    //用户中心服务
    GameAppConfig.auth_server = {
        host: localhost,
        port: 6086,
        stypes: [Stype_1.Stype.Auth]
    };
    //用户中心数据库
    GameAppConfig.auth_database = {
        host: localhost,
        port: 3306,
        db_name: "auth_center",
        uname: "root",
        upwd: "123456"
    };
    //用户中心redis
    GameAppConfig.auth_redis = {
        host: localhost,
        port: 6379,
        db_index: 0
    };
    //游戏服务redis
    GameAppConfig.game_redis = {
        host: localhost,
        port: 6379,
        db_index: 1
    };
    //网关连接其他服务
    GameAppConfig.gw_connect_servers = (_a = {},
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
    return GameAppConfig;
}());
exports["default"] = GameAppConfig;
//# sourceMappingURL=GameAppConfig.js.map