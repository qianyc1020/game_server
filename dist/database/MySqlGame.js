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
var Log_1 = __importDefault(require("../utils/Log"));
var querystring_1 = __importDefault(require("querystring"));
var ArrayUtil_1 = __importDefault(require("../utils/ArrayUtil"));
var GameHoodleConfig_1 = __importDefault(require("../apps/game_server/game_hoodle/GameHoodleConfig"));
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
    //查找所有字段（一般不建议用这个接口，效率较低）
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
    //查找玩家金币
    MySqlGame.get_ugame_uchip_by_uid = function (uid, callback) {
        var sql = "select uchip from ugame where uid = %d limit 1";
        var sql_cmd = util.format(sql, uid);
        MySqlGame.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK, sql_ret);
        });
    };
    //创建玩家游戏信息
    MySqlGame.insert_ugame_user = function (uid, uexp, uchip, callback) {
        var sql = "insert into ugame(`uid`, `uexp`, `uchip`, `uball_info`)values(%d, %d, %d, \"%s\")";
        var sql_cmd = util.format(sql, uid, uexp, uchip, GameHoodleConfig_1["default"].KW_BORN_USER_BALL);
        Log_1["default"].info("hcc>>insert: ", sql_cmd);
        MySqlGame.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK);
        });
    };
    // 玩家金币修改
    // 有增加,也减少
    MySqlGame.add_ugame_uchip = function (uid, uchip, is_add, callback) {
        if (!is_add) { // 扣除
            uchip = Math.abs(uchip) * (-1); // 负数
        }
        var sql = "update ugame set uchip = uchip + %d where uid = %d";
        var sql_cmd = util.format(sql, uchip, uid);
        MySqlGame.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                if (callback) {
                    callback(Response_1["default"].SYSTEM_ERR, err);
                }
                return;
            }
            if (callback) {
                callback(Response_1["default"].OK);
            }
        });
    };
    //获得玩家小球信息字符串: querystirng串
    //外层调用querystring.decode()去解码,解码成对象
    //对象可以用json转成字符串
    MySqlGame.get_ugame_uball_info = function (uid, callback) {
        var sql = "select uball_info from ugame where uid = %d limit 1";
        var sql_cmd = util.format(sql, uid);
        MySqlGame.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            else {
                var ret_len = ArrayUtil_1["default"].GetArrayLen(sql_ret);
                if (ret_len > 0) {
                    try {
                        var info = sql_ret[0];
                        var uball_info_obj = querystring_1["default"].decode(info.uball_info);
                        var uball_json = JSON.stringify(uball_info_obj);
                        callback(Response_1["default"].OK, uball_json);
                    }
                    catch (error) {
                        callback(Response_1["default"].SYSTEM_ERR);
                        Log_1["default"].error(error);
                        return;
                    }
                }
                else {
                    callback(Response_1["default"].SYSTEM_ERR);
                }
            }
        });
    };
    //设置玩家小球信息 uball_obj_json: json字符串
    //uball_obj_json小球集合对象转成json字符串:uball_obj = {lv_1:1,lv_2:2,lv_3:0}
    //querystring.encode() 转成 "lv_1=0&lv_2=1&lv_3=3&lv_4=4&lv_5=155"
    MySqlGame.update_ugame_uball_info = function (uid, uball_obj_json, callback) {
        var uball_qstring = "";
        try {
            uball_qstring = querystring_1["default"].encode(JSON.parse(uball_obj_json));
        }
        catch (error) {
            Log_1["default"].error(error);
            callback(Response_1["default"].SYSTEM_ERR);
            return;
        }
        if (uball_qstring == "") {
            Log_1["default"].warn("update_ugame_uball_info quertstring error");
            callback(Response_1["default"].SYSTEM_ERR);
            return;
        }
        var sql = "update ugame set uball_info = \"%s\" where uid = %d";
        var sql_cmd = util.format(sql, uball_qstring, uid);
        // Log.info("update_ugame_uball_info: sql: " , sql_cmd);
        MySqlGame.query(sql_cmd, function (err, sql_ret, fields_desic) {
            if (err) {
                callback(Response_1["default"].SYSTEM_ERR, err);
                return;
            }
            callback(Response_1["default"].OK, sql_ret);
        });
    };
    MySqlGame.mysqlEngine = new MySqlEngine_1["default"]();
    return MySqlGame;
}());
exports["default"] = MySqlGame;
//# sourceMappingURL=MySqlGame.js.map