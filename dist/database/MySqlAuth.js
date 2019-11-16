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
var TimeUtil_1 = __importDefault(require("../utils/TimeUtil"));
var util = __importStar(require("util"));
var Response_1 = __importDefault(require("../apps/Response"));
var Log = require("../utils/Log");
var MAX_NUMBER_ID = 1000000;
var MySqlAuth = /** @class */ (function () {
    function MySqlAuth() {
    }
    MySqlAuth.engine = function () {
        return MySqlAuth.mysqlEngine;
    };
    MySqlAuth.connect = function (host, port, db_name, uname, upwd) {
        MySqlAuth.engine().connect(host, port, db_name, uname, upwd);
    };
    MySqlAuth.query = function (sql, callback) {
        MySqlAuth.engine().mysql_query(sql, callback);
    };
    MySqlAuth.login_by_uname_upwd = function (uname, upwd, callback) {
        var sql = "select uname, upwd ,uid from uinfo where uname = \"%s\" and upwd = \"%s\" and is_guest = 0 limit 1";
        var sql_cmd = util.format(sql, uname, upwd);
        // Log.info("sql: " , sql_cmd)
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK, sql_ret);
        });
    };
    MySqlAuth.get_uinfo_by_uname_upwd = function (uname, upwd, callback) {
        var sql = "select * from uinfo where uname = \"%s\" and upwd = \"%s\" and is_guest = 0 limit 1";
        var sql_cmd = util.format(sql, uname, upwd);
        // Log.info("sql: " , sql_cmd)
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK, sql_ret);
        });
    };
    MySqlAuth.guest_login_by_guestkey = function (guestkey, callback) {
        var sql = "select guest_key , uid from uinfo where guest_key = \"%s\" limit 1";
        var sql_cmd = util.format(sql, guestkey);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK, sql_ret);
        });
    };
    MySqlAuth.insert_uname_upwd_user = function (uname, upwdmd5, unick, uface, usex, callback) {
        var max_numid = MAX_NUMBER_ID;
        MySqlAuth.get_max_uid(function (status, maxuid) {
            if (status == Response_1["default"].OK) {
                max_numid = max_numid + maxuid + 1;
                Log.info("max_numid: ", max_numid);
                var sql = "insert into uinfo(`uname`, `upwd` ,`unick`, `uface`, `usex`, `numberid`, `guest_key`)values(\"%s\", \"%s\", \"%s\", %d, %d, %d,0)";
                var sql_cmd = util.format(sql, uname, upwdmd5, unick, uface, usex, max_numid);
                MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
                    if (err) {
                        callback(Response_1["default"].SYSTEM_ERR, err);
                        return;
                    }
                    callback(Response_1["default"].OK, sql_ret);
                });
            }
            else {
                callback(Response_1["default"].SYSTEM_ERR);
            }
        });
    };
    MySqlAuth.insert_guest_user = function (unick, uface, usex, ukey, callback) {
        var max_numid = MAX_NUMBER_ID;
        MySqlAuth.get_max_uid(function (status, maxuid) {
            if (status == Response_1["default"].OK) {
                max_numid = max_numid + maxuid + 1;
                var sql = "insert into uinfo(`guest_key`, `unick`, `uface`, `usex`, `numberid`, `is_guest`)values(\"%s\", \"%s\", %d, %d, %d,1)";
                var sql_cmd = util.format(sql, ukey, unick, uface, usex, max_numid);
                MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
                    if (err) {
                        callback(Response_1["default"].SYSTEM_ERR, err);
                        return;
                    }
                    callback(Response_1["default"].OK, sql_ret);
                });
            }
            else {
                callback(Response_1["default"].SYSTEM_ERR);
            }
        });
    };
    MySqlAuth.check_uname_exist = function (uname, callback) {
        var sql = "select uid from uinfo where binary uname = \"%s\"";
        var sql_cmd = util.format(sql, uname);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            if (sql_ret.length <= 0) {
                callback(Response_1["default"].INVALID_PARAMS);
                return;
            }
            if (sql_ret[0].uid != undefined) {
                callback(Response_1["default"].OK);
                return;
            }
            callback(Response_1["default"].INVALID_PARAMS);
        });
    };
    MySqlAuth.get_max_uid = function (callback) {
        var sql = "select uid from uinfo order by uid desc";
        MySqlAuth.query(sql, function (err, sql_ret, fields_desic) {
            if (err) {
                return callback(Response_1["default"].INVALIDI_OPT, err);
            }
            if (sql_ret.length <= 0) {
                callback(Response_1["default"].OK, 0);
                return;
            }
            callback(Response_1["default"].OK, sql_ret[0].uid);
        });
    };
    ////////////////////////////////////
    MySqlAuth.get_guest_uinfo_by_guestkey = function (guestkey, callback) {
        var sql = "select * from uinfo where guest_key = \"%s\" limit 1";
        var sql_cmd = util.format(sql, guestkey);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK, sql_ret);
        });
    };
    MySqlAuth.insert_phone_account_user = function (unick, uface, usex, phone, pwd_md5, callback) {
        var sql = "insert into uinfo(`uname`, `upwd`, `unick`, `uface`, `usex`, `is_guest`)values(\"%s\", \"%s\", \"%s\", %d, %d, 0)";
        var sql_cmd = util.format(sql, phone, pwd_md5, unick, uface, usex);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK, sql_ret);
        });
    };
    MySqlAuth.edit_profile = function (uid, unick, usex, uface, callback) {
        var sql = "update uinfo set unick = \"%s\", usex = %d, uface = %d where uid = %d";
        var sql_cmd = util.format(sql, unick, usex, uid, uface);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK, sql_ret);
        });
    };
    MySqlAuth.is_exist_guest = function (uid, callback) {
        var sql = "select is_guest, status from uinfo where uid = %d limit 1";
        var sql_cmd = util.format(sql, uid);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            if (sql_ret.length <= 0) {
                callback(Response_1["default"].INVALID_PARAMS);
                return;
            }
            if (sql_ret[0].is_guest === 1 && sql_ret[0].status === 0) {
                callback(Response_1["default"].OK);
                return;
            }
            callback(Response_1["default"].INVALID_PARAMS);
        });
    };
    //TODO 手机号不能作为账号
    MySqlAuth.check_phone_code_valid = function (phone, phone_code, opt_type, callback) {
        var sql = "select id from phone_chat where phone = \"%s\" and opt_type = %d and code = \"%s\" and end_time >= %d limit 1";
        var t = TimeUtil_1["default"].timestamp();
        var sql_cmd = util.format(sql, phone, opt_type, phone_code, t);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            if (sql_ret.length <= 0) { // 找不到，才是验证码不对
                callback(Response_1["default"].PHONE_CODE_ERR);
                return;
            }
            callback(Response_1["default"].OK);
        });
    };
    MySqlAuth.check_phone_unuse = function (phone_num, callback) {
        var sql = "select uid from uinfo where uname = %s limit 1";
        var sql_cmd = util.format(sql, phone_num);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            if (sql_ret.length <= 0) {
                callback(Response_1["default"].OK);
                return;
            }
            callback(Response_1["default"].PHONE_IS_REG);
        });
    };
    MySqlAuth.check_phone_is_reged = function (phone_num, callback) {
        var sql = "select uid from uinfo where uname = %s limit 1";
        var sql_cmd = util.format(sql, phone_num);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            if (sql_ret.length <= 0) {
                callback(Response_1["default"].PHONE_IS_NOT_REG);
                return;
            }
            callback(Response_1["default"].OK);
        });
    };
    MySqlAuth._is_phone_indentify_exist = function (phone, opt, callback) {
        var sql = "select id from phone_chat where phone = \"%s\" and opt_type = %d";
        var sql_cmd = util.format(sql, phone, opt);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(false);
                return;
            }
            if (sql_ret.length <= 0) {
                callback(false);
                return;
            }
            callback(true);
        });
    };
    MySqlAuth._update_phone_indentify_time = function (code, phone, opt, end_duration) {
        var end_time = TimeUtil_1["default"].timestamp() + end_duration;
        var sql = "update phone_chat set code = \"%s\", end_time=%d, count=count+1 where phone = \"%s\" and opt_type = %d";
        var sql_cmd = util.format(sql, code, end_time, phone, opt);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
        });
    };
    MySqlAuth._insert_phone_indentify = function (code, phone, opt, end_duration) {
        var end_time = TimeUtil_1["default"].timestamp() + end_duration;
        var sql = "insert into phone_chat(`code`, `phone`, `opt_type`, `end_time`, `count`)values(\"%s\", \"%s\", %d, %d, 1)";
        var sql_cmd = util.format(sql, code, phone, opt, end_time);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
        });
    };
    // callback(Respons.OK)
    MySqlAuth.update_phone_indentify = function (code, phone, opt, end_duration, callback) {
        MySqlAuth._is_phone_indentify_exist(phone, opt, function (b_exisit) {
            if (b_exisit) {
                // 更新时间和操作次数
                MySqlAuth._update_phone_indentify_time(code, phone, opt, end_duration);
            }
            else { // 插入一条记录
                MySqlAuth._insert_phone_indentify(code, phone, opt, end_duration);
            }
            callback(Response_1["default"].OK);
        });
    };
    MySqlAuth.do_upgrade_guest_account = function (uid, uname, upwd, callback) {
        var sql = "update uinfo set uname = \"%s\", upwd = \"%s\", is_guest = 0 where uid = %d";
        var sql_cmd = util.format(sql, uname, upwd, uid);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
            }
            else {
                callback(Response_1["default"].OK);
            }
        });
    };
    MySqlAuth.reset_account_pwd = function (uname, upwd, callback) {
        var sql = "update uinfo set upwd = \"%s\" where uname = \"%s\"";
        var sql_cmd = util.format(sql, upwd, uname);
        MySqlAuth.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
            }
            else {
                callback(Response_1["default"].OK);
            }
        });
    };
    MySqlAuth.mysqlEngine = new MySqlEngine_1["default"]();
    return MySqlAuth;
}());
exports["default"] = MySqlAuth;
//# sourceMappingURL=MySqlAuth.js.map