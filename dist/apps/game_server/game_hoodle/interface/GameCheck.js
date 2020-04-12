"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Log_1 = __importDefault(require("../../../../utils/Log"));
var PlayerManager_1 = __importDefault(require("../PlayerManager"));
var RoomManager_1 = __importDefault(require("../RoomManager"));
var State_1 = require("../config/State");
var GameCheck = /** @class */ (function () {
    function GameCheck() {
    }
    //检测是否非法玩家
    GameCheck.check_player = function (utag) {
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        if (player) {
            return true;
        }
        else {
            return false;
        }
    };
    //检测是否非法房间
    GameCheck.check_room = function (utag) {
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        if (!player) {
            return false;
        }
        var room = RoomManager_1["default"].getInstance().get_room_by_uid(player.get_uid());
        if (!room) {
            return false;
        }
        return true;
    };
    //检测游戏开始
    GameCheck.check_game_start = function (room) {
        var player_set = room.get_all_player();
        var ready_player_count = 0;
        for (var uid in player_set) {
            var player = player_set[uid];
            if (player) {
                var isready = player.get_user_state() == State_1.UserState.Ready;
                if (isready == true) {
                    ready_player_count++;
                }
            }
        }
        Log_1["default"].info("check_game_start: readycount: ", ready_player_count);
        if (ready_player_count == room.get_conf_player_count()) {
            return true;
        }
        return false;
    };
    return GameCheck;
}());
exports["default"] = GameCheck;
//# sourceMappingURL=GameCheck.js.map