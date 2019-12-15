"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var PlayerManager_1 = __importDefault(require("./PlayerManager"));
var RoomManager_1 = __importDefault(require("./RoomManager"));
var GameHoodleProto_1 = require("../../protocol/GameHoodleProto");
var Log_1 = __importDefault(require("../../../utils/Log"));
var ArrayUtil_1 = __importDefault(require("../../../utils/ArrayUtil"));
var Response_1 = __importDefault(require("../../Response"));
var State_1 = require("./State");
var GameHoodleInterface = /** @class */ (function () {
    function GameHoodleInterface() {
    }
    //检测是否非法玩家
    GameHoodleInterface.check_player = function (utag) {
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        if (player) {
            return true;
        }
        else {
            return false;
        }
    };
    //检测是否非法房间
    GameHoodleInterface.check_room = function (utag) {
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
    GameHoodleInterface.check_game_start = function (room) {
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
    //向房间内所有人发送局内玩家信息
    GameHoodleInterface.broadcast_player_info_in_rooom = function (room, not_to_player) {
        if (!room) {
            return;
        }
        var player_set = room.get_all_player();
        var userinfo_array = [];
        try {
            for (var key in player_set) {
                var player = player_set[key];
                if (player) {
                    var userinfo = {
                        numberid: String(player.get_numberid()),
                        userInfoString: JSON.stringify(player.get_player_info())
                    };
                    userinfo_array.push(userinfo);
                }
            }
            room.broadcast_in_room(GameHoodleProto_1.Cmd.eUserInfoRes, { userinfo: userinfo_array }, not_to_player);
        }
        catch (error) {
            Log_1["default"].error(error);
        }
    };
    //向某个玩家发送局内玩家信息
    GameHoodleInterface.send_player_info = function (player) {
        if (!player) {
            return;
        }
        var room = RoomManager_1["default"].getInstance().get_room_by_uid(player.get_uid());
        if (!room) {
            return;
        }
        var player_set = room.get_all_player();
        if (ArrayUtil_1["default"].GetArrayLen(player_set) <= 0) {
            return;
        }
        var userinfo_array = [];
        try {
            for (var key in player_set) {
                var player_1 = player_set[key];
                if (player_1) {
                    var userinfo = {
                        numberid: String(player_1.get_numberid()),
                        userInfoString: JSON.stringify(player_1.get_player_info())
                    };
                    userinfo_array.push(userinfo);
                }
            }
            player.send_cmd(GameHoodleProto_1.Cmd.eUserInfoRes, { userinfo: userinfo_array });
        }
        catch (error) {
            Log_1["default"].error(error);
        }
    };
    //向房间内所有人发送某玩家准备的消息
    GameHoodleInterface.send_player_state = function (room, src_player, not_to_player) {
        var body = {
            status: Response_1["default"].OK,
            seatid: src_player.get_seat_id(),
            userstate: src_player.get_user_state()
        };
        room.broadcast_in_room(GameHoodleProto_1.Cmd.eUserReadyRes, body, not_to_player);
    };
    return GameHoodleInterface;
}());
exports["default"] = GameHoodleInterface;
//# sourceMappingURL=GameHoodleInterface.js.map