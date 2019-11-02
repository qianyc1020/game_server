"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var MySqlEngine_1 = __importDefault(require("./MySqlEngine"));
var util = __importStar(require("util"));
var Response_1 = __importDefault(require("../apps/Response"));
var Log = require("../utils/Log");
var MySqlGame = /** @class */ (function () {
    function MySqlGame() {
    }
    MySqlGame.engine = function () {
        return MySqlGame.mysqlEngine;
    };
    MySqlGame.connect = function (host, port, db_name, uname, upwd) {
        MySqlGame.engine().connect(host, port, db_name, uname, upwd);
    };
    MySqlGame.query = function (sql, callback) {
        MySqlGame.engine().mysql_query(sql, callback);
    };
    MySqlGame.get_ugame_info_by_uid = function (uid, callback) {
        var sql = "select * from ugame where uid = %d limit 1";
        var sql_cmd = util.format(sql, uid);
        MySqlGame.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK, sql_ret);
        });
    };
    MySqlGame.insert_ugame_user = function (uid, uexp, uchip, callback) {
        var sql = "insert into ugame(`uid`, `uexp`, `uchip`)values(%d, %d, %d)";
        var sql_cmd = util.format(sql, uid, uexp, uchip);
        MySqlGame.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK);
        });
    };
    // 有增加，也减少
    MySqlGame.add_ugame_uchip = function (uid, uchip, is_add, callback) {
        if (!is_add) { // 扣除
            uchip = -uchip; // 负数
        }
        var sql = "update ugame set uchip = uchip + %d where uid = %d";
        var sql_cmd = util.format(sql, uchip, uid);
        MySqlGame.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK);
        });
    };
    MySqlGame.mysqlEngine = new MySqlEngine_1["default"]();
    return MySqlGame;
}());
exports["default"] = MySqlGame;
//# sourceMappingURL=MySqlGame.js.map