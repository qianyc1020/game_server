"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var NetBus_1 = __importDefault(require("../../../netbus/NetBus"));
var MySqlAuth_1 = __importDefault(require("../../../database/MySqlAuth"));
var Response_1 = __importDefault(require("../../Response"));
var Stype_1 = require("../../protocol/Stype");
var ArrayUtil_1 = __importDefault(require("../../../utils/ArrayUtil"));
var Log = require("../../../utils/Log");
var Player = /** @class */ (function () {
    function Player() {
        this._uid = 0;
        this._session = null;
        this._proto_type = -1;
        this._ugame_info = {};
        this._ucenter_info = {};
        this._is_off_line = false;
        //test
        // this._ugame_info["test_gameinfo"] = "info_test";
        // this._ugame_info["test_gameinfo2"] = "info_test2";
        // this._ugame_info["test_gameinfo3"] = false;
    }
    //中心数据，游戏数据
    Player.prototype.init_session = function (session, uid, proto_type, callback) {
        this._session = session;
        this._uid = uid;
        this._proto_type = proto_type;
        var _this = this;
        MySqlAuth_1["default"].get_uinfo_by_uid(uid, function (status, data) {
            if (status == Response_1["default"].OK) {
                var sql_info = data[0];
                _this._ucenter_info = sql_info;
                // Log.info("hcc>>init_session>>sql_info: " , sql_info)
                if (callback) {
                    callback(Response_1["default"].OK, sql_info);
                }
            }
            else {
                if (callback) {
                    callback(Response_1["default"].SYSTEM_ERR);
                }
            }
        });
    };
    Player.prototype.get_uid = function () {
        return this._uid;
    };
    Player.prototype.get_numberid = function () {
        return this._ucenter_info.numberid;
    };
    Player.prototype.set_ugame_info = function (ugame_info) {
        this._ugame_info = ugame_info;
    };
    //游戏服务信息
    Player.prototype.get_ugame_info = function () {
        return this._ugame_info;
    };
    //玩家中心信息
    Player.prototype.get_ucenter_info = function () {
        return this._ucenter_info;
    };
    //玩家信息汇总
    Player.prototype.get_player_info = function () {
        var info = ArrayUtil_1["default"].ObjCat(this._ugame_info, this._ucenter_info);
        info.is_off_line = this._is_off_line;
        // Log.info("hcc>>get_player_info: " , info)
        return info;
    };
    Player.prototype.set_offline = function (is_offline) {
        this._is_off_line = is_offline;
    };
    Player.prototype.get_offline = function () {
        return this._is_off_line;
    };
    Player.prototype.send_cmd = function (ctype, body) {
        if (!this._session) {
            Log.error("send_cmd error, session is null!!");
            return;
        }
        NetBus_1["default"].send_cmd(this._session, Stype_1.Stype.GameHoodle, ctype, this._uid, this._proto_type, body);
    };
    return Player;
}());
exports["default"] = Player;
//# sourceMappingURL=Player.js.map