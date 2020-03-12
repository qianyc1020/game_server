"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ArrayUtil_1 = __importDefault(require("../../../utils/ArrayUtil"));
var Log_1 = __importDefault(require("../../../utils/Log"));
var State_1 = require("./State");
var Room = /** @class */ (function () {
    function Room(roomid) {
        this._roomid = "";
        this._gamerule = "";
        this._gamerule_obj = {};
        this._player_set = {}; //uid->player
        this._host_player_uid = -1;
        ///////
        this._game_state = State_1.GameState.InView; //游戏状态
        this._play_count = -1; //总的配置局数
        this._player_count = -1; //总的配置玩家数量
        this._roomid = roomid;
    }
    Room.prototype.get_room_id = function () {
        return this._roomid;
    };
    Room.prototype.set_game_rule = function (gamerule) {
        this._gamerule = gamerule;
        var gameruleObj = {};
        try {
            gameruleObj = JSON.parse(gamerule);
        }
        catch (error) {
            Log_1["default"].error(error);
            return;
        }
        this._gamerule_obj = gameruleObj;
        this._player_count = gameruleObj.playerCount;
        this._play_count = gameruleObj.playCount;
    };
    Room.prototype.get_game_rule = function () {
        return this._gamerule;
    };
    //玩家加入房间
    //is_back: 是否本来就在房间里面，只是返回
    Room.prototype.add_player = function (player, is_back) {
        if (is_back == null || is_back == false || is_back == undefined || !is_back) {
            //不是返回房间
            if (this._player_count <= 0 || this._player_count == null || this._player_count == undefined) {
                Log_1["default"].warn("add_player error, playercount is not exist!!");
                return false;
            }
            if (this.get_player_count() >= this._player_count) {
                Log_1["default"].warn("add_player error, playercount is full");
                return false;
            }
            var seatid = this.born_seatid();
            if (seatid == -1) {
                Log_1["default"].warn("add_player error,seatid is invalid");
                return false;
            }
            player.set_seat_id(seatid);
        }
        this._player_set[player.get_uid()] = player;
        Log_1["default"].info("add player , playercount: ", this.get_player_count());
        return true;
    };
    //生成一个seatid
    Room.prototype.born_seatid = function () {
        var exist_seatid = [];
        var all_seatid = [];
        for (var uid in this._player_set) {
            var player = this._player_set[uid];
            var seatid = player.get_seat_id();
            if (seatid != -1) {
                exist_seatid.push(seatid);
            }
        }
        for (var seatid = 1; seatid <= this._player_count; seatid++) {
            all_seatid[seatid] = seatid;
        }
        for (var i = 0; i <= exist_seatid.length; i++) {
            var seatid = exist_seatid[i];
            for (var j = 1; j <= this._player_count; j++) {
                if (seatid == all_seatid[j]) {
                    all_seatid.splice(j, 1);
                }
            }
        }
        if (all_seatid.length > 0) {
            for (var i = 1; i <= all_seatid.length; i++) {
                var seatid = all_seatid[i];
                if (seatid && seatid != -1) {
                    return seatid;
                }
            }
        }
        return -1;
    };
    Room.prototype.kick_player = function (uid) {
        if (this._player_set[uid]) {
            delete this._player_set[uid];
            Log_1["default"].info("room kick player by uid success , playercount: ", this.get_player_count());
            return true;
        }
        return false;
    };
    Room.prototype.kick_all_player = function () {
        var _this = this;
        var key_set = [];
        for (var key in this._player_set) {
            key_set.push(key);
        }
        key_set.forEach(function (value) {
            if (_this._player_set[value]) {
                _this._player_set[value].clear_room_info();
                delete _this._player_set[value];
            }
        });
        Log_1["default"].info("room kick all player, playercount: ", this.get_player_count());
    };
    Room.prototype.get_all_player = function () {
        return this._player_set;
    };
    Room.prototype.get_player = function (uid) {
        return this._player_set[uid];
    };
    Room.prototype.is_player_in_room = function (uid) {
        if (this._player_set[uid]) {
            return true;
        }
        return false;
    };
    //当前房间内人数
    Room.prototype.get_player_count = function () {
        return ArrayUtil_1["default"].GetArrayLen(this._player_set);
    };
    //房间配置的最多人数
    Room.prototype.get_conf_player_count = function () {
        return this._player_count;
    };
    //配置的最多局数
    Room.prototype.get_conf_play_count = function () {
        return this._play_count;
    };
    Room.prototype.set_room_host_uid = function (uid) {
        this._host_player_uid = uid;
    };
    Room.prototype.get_room_host_uid = function () {
        return this._host_player_uid;
    };
    Room.prototype.is_room_host = function (uid) {
        return this._host_player_uid === uid;
    };
    Room.prototype.set_game_state = function (game_state) {
        this._game_state = game_state;
    };
    Room.prototype.get_game_state = function () {
        return this._game_state;
    };
    Room.prototype.broadcast_in_room = function (ctype, body, not_to_player) {
        if (!ctype) {
            return;
        }
        if (not_to_player) {
            for (var key in this._player_set) {
                var player = this._player_set[key];
                if (player) {
                    if (player.get_uid() != not_to_player.get_uid()) {
                        player.send_cmd(ctype, body);
                    }
                }
            }
        }
        else {
            for (var key in this._player_set) {
                var player = this._player_set[key];
                if (player) {
                    player.send_cmd(ctype, body);
                }
            }
        }
    };
    return Room;
}());
exports["default"] = Room;
//# sourceMappingURL=Room.js.map