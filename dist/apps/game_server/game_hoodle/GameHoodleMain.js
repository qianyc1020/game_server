"use strict";
/*
    服务器启动文件
    注意： vscode调试服务器: 先用compile_src.bat编译成js,再找到服务器的xxxxMain.ts文件打开，f5调试，看到日志后才算成功。
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameAppConfig_1 = __importDefault(require("../../GameAppConfig"));
var NetBus_1 = __importDefault(require("../../../netbus/NetBus"));
var ServiceManager_1 = __importDefault(require("../../../netbus/ServiceManager"));
var Stype_1 = require("../../protocol/Stype");
var MySqlGame_1 = __importDefault(require("../../../database/MySqlGame"));
var GameHoodleService_1 = __importDefault(require("./GameHoodleService"));
var MySqlAuth_1 = __importDefault(require("../../../database/MySqlAuth"));
var MatchManager_1 = __importDefault(require("./MatchManager"));
var game_server = GameAppConfig_1["default"].game_server;
NetBus_1["default"].start_tcp_server(game_server.host, game_server.port, false);
ServiceManager_1["default"].register_service(Stype_1.Stype.GameHoodle, GameHoodleService_1["default"]);
//游戏服务
var db_game = GameAppConfig_1["default"].game_database;
MySqlGame_1["default"].connect(db_game.host, db_game.port, db_game.db_name, db_game.uname, db_game.upwd);
//用户中心服务
var db_auth = GameAppConfig_1["default"].auth_database;
MySqlAuth_1["default"].connect(db_auth.host, db_auth.port, db_auth.db_name, db_auth.uname, db_auth.upwd);
//匹配场
MatchManager_1["default"].getInstance().start_match();
//test
/*
let obj1 = {
    ["h"] :1,
    ["c"] :2,
    ["v"] :"333",
    ["000000"] :"@",
    333333: 44444,
    ["boj"]:{
        [1]:1,
        [3]:2222,
        [6]:3333,
    },
}

let obj2 = {
    ["0"] :7,
    ["3"] :8,
    ["6"] :9,
    ["a"] :"empty",
}

let obj = ArrayUtil.ObjCat(obj1, obj2)
console.log("hcc>>>obj: " , obj)
*/
/*
let array = [];
array.push(1)
array.push(3)
array.push(5)
array.push(6)
array.forEach(value => {
    Log.info("hcc>> value: " , value)
})
*/
//绝对值
// Log.info(Math.abs(-1000), Math.abs(1500))
//# sourceMappingURL=GameHoodleMain.js.map