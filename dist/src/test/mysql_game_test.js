"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameConf_1 = __importDefault(require("../apps/GameConf"));
var MySqlGame_1 = __importDefault(require("../database/MySqlGame"));
var Log = require("../utils/Log");
var db = GameConf_1["default"].game_database;
MySqlGame_1["default"].connect(db.host, db.port, db.db_name, db.uname, db.upwd);
MySqlGame_1["default"].get_ugame_info_by_uid(31, function (rescode, ret) {
    Log.info("hcc>>info: ", rescode, ret);
});
//# sourceMappingURL=mysql_game_test.js.map