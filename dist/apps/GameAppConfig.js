"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var Stype_1 = require("./protocol/Stype");
var Platform_1 = __importDefault(require("../utils/Platform"));
var Log_1 = __importDefault(require("../utils/Log"));
var LOCAL_HOST = "127.0.0.1";
var WSS_WEBSOCKET_PORT = 6081;
var IS_LOCAL_DEBUG = true; //是否启用本地ip来测试，启用后只能用当前电脑ip调试服务端程序
if (Platform_1["default"].isWin32()) {
    if (IS_LOCAL_DEBUG) {
        LOCAL_HOST = Platform_1["default"].getLocalIP(); //本地电脑ip,pc调试用
    }
    WSS_WEBSOCKET_PORT = 6081;
}
else if (Platform_1["default"].isLinux()) {
    LOCAL_HOST = "172.16.166.106"; //阿里云外网ip
    WSS_WEBSOCKET_PORT = 6061;
}
Log_1["default"].info("hcc>>localIP: ", LOCAL_HOST);
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
        host: LOCAL_HOST,
        tcp_port: 6080,
        wbsocket_port: WSS_WEBSOCKET_PORT
    };
    //web服务
    GameAppConfig.webserver = {
        host: LOCAL_HOST,
        port: 10001
    };
    //系统服务
    GameAppConfig.game_system_server = {
        host: LOCAL_HOST,
        port: 6087,
        stypes: [Stype_1.Stype.GameSystem]
    };
    //游戏服务
    GameAppConfig.game_server = {
        host: LOCAL_HOST,
        port: 6088,
        stypes: [Stype_1.Stype.GameHoodle]
    };
    //游戏数据库服务
    GameAppConfig.game_database = {
        host: LOCAL_HOST,
        port: 3306,
        db_name: "moba_game",
        uname: "root",
        upwd: "123456"
    };
    //用户中心服务
    GameAppConfig.auth_server = {
        host: LOCAL_HOST,
        port: 6086,
        stypes: [Stype_1.Stype.Auth]
    };
    //用户中心数据库
    GameAppConfig.auth_database = {
        host: LOCAL_HOST,
        port: 3306,
        db_name: "auth_center",
        uname: "root",
        upwd: "123456"
    };
    //用户中心redis
    GameAppConfig.auth_redis = {
        host: LOCAL_HOST,
        port: 6379,
        db_index: 0
    };
    //游戏服务redis
    GameAppConfig.game_redis = {
        host: LOCAL_HOST,
        port: 6379,
        db_index: 1
    };
    //网关连接其他服务
    GameAppConfig.gw_connect_servers = (_a = {},
        _a[1] = {
            stype: Stype_1.Stype.Auth,
            host: LOCAL_HOST,
            port: 6086
        },
        _a[2] = {
            stype: Stype_1.Stype.GameHoodle,
            host: LOCAL_HOST,
            port: 6088
        },
        _a);
    return GameAppConfig;
}());
exports["default"] = GameAppConfig;
//# sourceMappingURL=GameAppConfig.js.map