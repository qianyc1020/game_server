"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameConf_1 = __importDefault(require("../../GameConf"));
var NetBus_1 = __importDefault(require("../../../netbus/NetBus"));
var ServiceManager_1 = __importDefault(require("../../../netbus/ServiceManager"));
var Stype_1 = require("../../protocol/Stype");
var MySqlGame_1 = __importDefault(require("../../../database/MySqlGame"));
var GameHoodleService_1 = __importDefault(require("./GameHoodleService"));
var game_server = GameConf_1["default"].game_server;
NetBus_1["default"].start_tcp_server(game_server.host, game_server.port, false);
ServiceManager_1["default"].register_service(Stype_1.Stype.GameHoodle, GameHoodleService_1["default"]);
var db_game = GameConf_1["default"].game_database;
MySqlGame_1["default"].connect(db_game.host, db_game.port, db_game.db_name, db_game.uname, db_game.upwd);
//# sourceMappingURL=GameHoodleMain.js.map