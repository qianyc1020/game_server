"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ArrayUtil_1 = __importDefault(require("../../../utils/ArrayUtil"));
var Log = require("../../../utils/Log");
var Room = /** @class */ (function () {
    function Room(roomid) {
        this._roomid = "";
        this._room_info = "";
        this._player_set = {};
        this._host_player_uid = -1;
        this._roomid = roomid;
    }
    Room.prototype.get_room_id = function () {
        return this._roomid;
    };
    Room.prototype.set_room_info = function (roominfo) {
        this._room_info = roominfo;
    };
    Room.prototype.get_room_info = function () {
        return this._room_info;
    };
    Room.prototype.add_player = function (player) {
        this._player_set[player.get_uid()] = player;
        Log.info("add player , playercount: ", this.get_player_count());
    };
    Room.prototype.kick_player = function (uid) {
        if (this._player_set[uid]) {
            delete this._player_set[uid];
            Log.info("delete player by uid success , playercount: ", this.get_player_count());
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
                delete _this._player_set[value];
            }
        });
        Log.info("delete all player, playercount: ", this.get_player_count());
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
    Room.prototype.get_player_count = function () {
        return ArrayUtil_1["default"].GetArrayLen(this._player_set);
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