"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameHoodleProto_1 = require("../../protocol/GameHoodleProto");
var Response_1 = __importDefault(require("../../Response"));
var Log_1 = __importDefault(require("../../../utils/Log"));
var State_1 = require("./State");
var GameHoodleLogic = /** @class */ (function () {
    function GameHoodleLogic() {
    }
    GameHoodleLogic.generate_start_pos = function () {
        var posx = Math.random() * 100;
        var posy = Math.random() * 250;
        return { posx: posx, posy: posy };
    };
    //清除玩家当局数据
    GameHoodleLogic.clear_all_player_data = function (room) {
        var player_set = room.get_all_player();
        for (var uid in player_set) {
            var player = player_set[uid];
            if (player) {
                player.set_user_score(0);
                player.set_user_power(State_1.PlayerPower.canNotPlay);
                player.set_user_pos({ posx: 0, posy: 0 });
            }
        }
    };
    //计算玩家权限 //TODO
    GameHoodleLogic.cal_player_power = function () {
    };
    ////////////////////////////////////////
    ///发送消息
    ////////////////////////////////////////
    //发送玩家出生位置
    GameHoodleLogic.send_player_first_pos = function (room) {
        if (!room) {
            return false;
        }
        var player_set = room.get_all_player();
        var player_pos_array = [];
        for (var key in player_set) {
            var player = player_set[key];
            if (player) {
                var pos = GameHoodleLogic.generate_start_pos();
                Log_1["default"].info("hcc>>send_player_first_pos: ", pos);
                player.set_user_pos(pos);
                var player_pos = {
                    seatid: Number(player.get_seat_id()),
                    posx: String(pos.posx),
                    posy: String(pos.posy)
                };
                player_pos_array.push(player_pos);
            }
        }
        Log_1["default"].info("hcc>>send_player_first_pos array: ", player_pos_array);
        room.broadcast_in_room(GameHoodleProto_1.Cmd.ePlayerFirstBallPosRes, { positions: player_pos_array });
        return true;
    };
    //发送玩家权限
    GameHoodleLogic.send_player_power = function (room) {
        if (!room) {
            return false;
        }
        var player_set = room.get_all_player();
        var player_power_array = [];
        for (var key in player_set) {
            var player = player_set[key];
            if (player) {
                var player_pos = {
                    seatid: Number(player.get_seat_id()),
                    power: Number(player.get_user_power())
                };
                player_power_array.push(player_pos);
            }
        }
        room.broadcast_in_room(GameHoodleProto_1.Cmd.ePlayerPowerRes, { status: Response_1["default"].OK, powers: player_power_array });
        return true;
    };
    //发送玩家射击 ,服务只做转发
    GameHoodleLogic.send_player_shoot = function (room, shoot_info, player) {
        if (!room || !shoot_info || !player) {
            return false;
        }
        var body = {
            status: Response_1["default"].OK,
            seatid: Number(shoot_info.seatid),
            posx: String(shoot_info.posx),
            posy: String(shoot_info.posy)
        };
        room.broadcast_in_room(GameHoodleProto_1.Cmd.ePlayerShootRes, body, player);
        return true;
    };
    //发送玩家位置，球停下后
    GameHoodleLogic.send_player_ball_pos = function (room) {
        if (!room) {
            return false;
        }
        var player_set = room.get_all_player();
        var player_pos_array = [];
        for (var key in player_set) {
            var player = player_set[key];
            if (player) {
                var player_pos = {
                    seatid: Number(player.get_seat_id()),
                    posx: String(player.get_user_pos().posx),
                    posy: String(player.get_user_pos().posy)
                };
                player_pos_array.push(player_pos);
            }
        }
        room.broadcast_in_room(GameHoodleProto_1.Cmd.ePlayerBallPosRes, { status: Response_1["default"].OK, positions: player_pos_array });
        return true;
    };
    //发送玩家射中 ，只做转发
    GameHoodleLogic.send_player_shooted = function (room, shoot_info, player) {
        if (!room || !shoot_info || !player) {
            return false;
        }
        var body = {
            status: Response_1["default"].OK,
            srcseatid: Number(shoot_info.srcseatid),
            desseatid: Number(shoot_info.desseatid)
        };
        room.broadcast_in_room(GameHoodleProto_1.Cmd.ePlayerIsShootedRes, body, player);
        return true;
    };
    //小结算 todo
    GameHoodleLogic.send_game_result = function (room) {
        if (!room) {
            return false;
        }
        var player_set = room.get_all_player();
        var player_score_array = [];
        for (var key in player_set) {
            var player = player_set[key];
            if (player) {
                var one_score = {
                    seatid: Number(player.get_seat_id()),
                    score: 0
                };
                player_score_array.push(one_score);
            }
        }
        room.broadcast_in_room(GameHoodleProto_1.Cmd.eGameResultRes, player_score_array);
        return true;
    };
    //大结算
    GameHoodleLogic.send_game_total_result = function (room) {
        if (!room) {
            return false;
        }
        var player_set = room.get_all_player();
        var player_score_array = [];
        for (var key in player_set) {
            var player = player_set[key];
            if (player) {
                var one_score = {
                    seatid: Number(player.get_seat_id()),
                    score: Number(player.get_user_score())
                };
                player_score_array.push(one_score);
            }
        }
        room.broadcast_in_room(GameHoodleProto_1.Cmd.eTotalGameResultRes, player_score_array);
        return true;
    };
    return GameHoodleLogic;
}());
exports["default"] = GameHoodleLogic;
//# sourceMappingURL=GameHoodleLogic.js.map