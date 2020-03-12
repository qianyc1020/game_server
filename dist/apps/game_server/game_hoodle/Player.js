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
var Log_1 = __importDefault(require("../../../utils/Log"));
var State_1 = require("./State");
var Player = /** @class */ (function () {
    /////////
    function Player() {
        this._uid = 0;
        this._session = null;
        this._proto_type = -1;
        this._ugame_info = {};
        this._ucenter_info = {};
        ///////房间相关
        this._is_off_line = false;
        this._is_host = false;
        this._seat_id = -1;
        //居内数据
        this._user_state = State_1.UserState.InView; //玩家状态
        this._user_pos = { posx: 0, posy: 0 }; //玩家位置 
        this._user_power = 0; // 玩家权限
        this._user_score = 0; //玩家得分
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
    //获取uid
    Player.prototype.get_uid = function () {
        return this._uid;
    };
    //获取numid
    Player.prototype.get_numberid = function () {
        return this._ucenter_info.numberid;
    };
    //设置游戏局内信息
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
        info.isoffline = this._is_off_line;
        info.ishost = this._is_host;
        info.seatid = this._seat_id;
        info.userstate = this._user_state;
        info.userpos = this._user_pos;
        info.userpower = this._user_power;
        // Log.info("hcc>>get_player_info: " , info)
        return info;
    };
    //重连后拷贝老玩家的信息
    Player.prototype.set_player_info = function (uinfo) {
        this._is_off_line = uinfo.isoffline;
        this._is_host = uinfo.ishost;
        this._seat_id = uinfo.seatid;
        this._user_state = uinfo.userstate;
        this._user_pos = uinfo.userpos;
        this._user_power = uinfo.userpower;
    };
    //设置是否掉线
    Player.prototype.set_offline = function (is_offline) {
        this._is_off_line = is_offline;
    };
    //获取是否掉线
    Player.prototype.get_offline = function () {
        return this._is_off_line;
    };
    //设置是否房主
    Player.prototype.set_ishost = function (is_host) {
        this._is_host = is_host;
    };
    //获取是否房主
    Player.prototype.get_ishost = function () {
        return this._is_host;
    };
    //设置玩家座位号
    Player.prototype.set_seat_id = function (seatid) {
        this._seat_id = seatid;
    };
    //获取玩家座位号
    Player.prototype.get_seat_id = function () {
        return this._seat_id;
    };
    //设置玩家状态
    Player.prototype.set_user_state = function (user_state) {
        this._user_state = user_state;
    };
    //获取玩家状态
    Player.prototype.get_user_state = function () {
        return this._user_state;
    };
    //设置位置
    Player.prototype.set_user_pos = function (pos) {
        this._user_pos = pos;
    };
    //获取位置
    Player.prototype.get_user_pos = function () {
        return this._user_pos;
    };
    Player.prototype.set_user_power = function (power) {
        this._user_power = power;
    };
    Player.prototype.get_user_power = function () {
        return this._user_power;
    };
    Player.prototype.set_user_score = function (score) {
        this._user_score = score;
    };
    Player.prototype.get_user_score = function () {
        return this._user_score;
    };
    //清除玩家在房间内的相关信息
    Player.prototype.clear_room_info = function () {
        this.set_offline(false);
        this.set_ishost(false);
        this.set_seat_id(-1);
        this.set_user_state(State_1.UserState.InView);
    };
    //发送消息
    Player.prototype.send_cmd = function (ctype, body) {
        if (!this._session) {
            Log_1["default"].error("send_cmd error, session is null!!");
            return;
        }
        NetBus_1["default"].send_cmd(this._session, Stype_1.Stype.GameHoodle, ctype, this._uid, this._proto_type, body);
    };
    return Player;
}());
exports["default"] = Player;
//# sourceMappingURL=Player.js.map