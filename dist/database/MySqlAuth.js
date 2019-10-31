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
Object.defineProperty(exports, "__esModule", { value: true });
var MySqlEngine_1 = __importDefault(require("./MySqlEngine"));
var Response_1 = __importDefault(require("../apps/Response"));
var util = __importStar(require("util"));
var Log = require("../utils/Log");
var MySqlAuth = /** @class */ (function () {
    function MySqlAuth() {
    }
    MySqlAuth.get_engine = function () {
        if (!MySqlAuth.mysqlEngine) {
            MySqlAuth.mysqlEngine = new MySqlEngine_1.default();
        }
        return MySqlAuth.mysqlEngine;
    };
    MySqlAuth.connect = function (host, port, db_name, uname, upwd) {
        MySqlAuth.get_engine().connect(host, port, db_name, uname, upwd);
    };
    MySqlAuth.mysql_query = function (sql, callback) {
        MySqlAuth.get_engine().mysql_query(sql, callback);
    };
    MySqlAuth.get_uinfo_by_uname_upwd = function (uname, upwd, callback) {
        var sql = "select uid, unick, usex, uface, uvip, status from uinfo where uname = \"%s\" and upwd = \"%s\" and is_guest = 0 limit 1";
        var sql_cmd = util.format(sql, uname, upwd);
        MySqlAuth.mysql_query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1.default.SYSTEM_ERR, null);
                return;
            }
            callback(Response_1.default.OK, sql_ret);
        });
    };
    MySqlAuth.mysqlEngine = new MySqlEngine_1.default();
    return MySqlAuth;
}());
exports.default = MySqlAuth;
//# sourceMappingURL=MySqlAuth.js.map