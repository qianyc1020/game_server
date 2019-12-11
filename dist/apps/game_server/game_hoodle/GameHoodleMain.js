"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameConf_1 = __importDefault(require("../../GameConf"));
var NetBus_1 = __importDefault(require("../../../netbus/NetBus"));
var ServiceManager_1 = __importDefault(require("../../../netbus/ServiceManager"));
var Stype_1 = require("../../protocol/Stype");
var GameHoodleService_1 = __importDefault(require("./GameHoodleService"));
var MySqlAuth_1 = __importDefault(require("../../../database/MySqlAuth"));
var game_server = GameConf_1["default"].game_server;
NetBus_1["default"].start_tcp_server(game_server.host, game_server.port, false);
ServiceManager_1["default"].register_service(Stype_1.Stype.GameHoodle, GameHoodleService_1["default"]);
// var db_game = GameConf.game_database;
// MySqlGame.connect(db_game.host, db_game.port, db_game.db_name, db_game.uname, db_game.upwd)
var db_auth = GameConf_1["default"].auth_database;
MySqlAuth_1["default"].connect(db_auth.host, db_auth.port, db_auth.db_name, db_auth.uname, db_auth.upwd);
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
//# sourceMappingURL=GameHoodleMain.js.map