"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameHoodleProto_1 = require("../../protocol/GameHoodleProto");
var Response_1 = __importDefault(require("../../Response"));
var Log_1 = __importDefault(require("../../../utils/Log"));
var State_1 = require("./State");
var StringUtil_1 = __importDefault(require("../../../utils/StringUtil"));
var GameHoodleLogic = /** @class */ (function () {
    function GameHoodleLogic() {
    }
    //生成初始坐标
    GameHoodleLogic.generate_start_pos = function () {
        // let posx = StringUtil.random_int(-540 , 540);
        // let posy = StringUtil.random_int(-960 , 960);
        var posx = StringUtil_1["default"].random_int(-400, 400);
        var posy = StringUtil_1["default"].random_int(-800, 800);
        return { posx: posx, posy: posy };
    };
    //清除玩家当局数据
    GameHoodleLogic.clear_all_player_cur_data = function (room) {
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
    //设置玩家初始权限
    GameHoodleLogic.set_player_start_power = function (room) {
        var can_play_seatid = StringUtil_1["default"].random_int(1, room.get_player_count());
        var player_set = room.get_all_player();
        var player_array = [];
        for (var key in player_set) {
            player_array.push(player_set[key]);
        }
        var player = player_array[can_play_seatid - 1];
        if (!player) {
            Log_1["default"].error("hcc>>set_player_start_power player is null ,seatid: ", can_play_seatid);
            return false;
        }
        player.set_user_power(State_1.PlayerPower.canPlay);
        Log_1["default"].info("hcc>>set_player_start_power seatid: " + player.get_seat_id(), " ,power: " + player.get_user_power());
        return true;
    };
    //计算玩家权限
    GameHoodleLogic.set_next_player_power = function (room) {
        var player_set = room.get_all_player();
        var next_power_seatid = -1;
        for (var uid in player_set) {
            var player = player_set[uid];
            if (player) {
                var power = player.get_user_power();
                if (power == State_1.PlayerPower.canPlay) {
                    player.set_user_power(State_1.PlayerPower.canNotPlay);
                    next_power_seatid = player.get_seat_id() + 1;
                    if (next_power_seatid > room.get_player_count()) {
                        next_power_seatid = next_power_seatid % room.get_player_count();
                    }
                    Log_1["default"].info("hcc>> cur power seat: ", player.get_seat_id());
                    Log_1["default"].info("hcc>> next power seat: ", next_power_seatid);
                    break;
                }
            }
        }
        if (next_power_seatid == -1) {
            Log_1["default"].error("error: next_power_seatid is -1");
            return;
        }
        for (var uid in player_set) {
            var player = player_set[uid];
            if (player) {
                if (player.get_seat_id() == next_power_seatid) {
                    player.set_user_power(State_1.PlayerPower.canPlay);
                }
                else {
                    player.set_user_power(State_1.PlayerPower.canNotPlay);
                }
            }
        }
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
    GameHoodleLogic.send_player_shooted = function (room, shoot_info) {
        if (!room || !shoot_info) {
            return false;
        }
        var body = {
            status: Response_1["default"].OK,
            srcseatid: Number(shoot_info.srcseatid),
            desseatid: Number(shoot_info.desseatid)
        };
        room.broadcast_in_room(GameHoodleProto_1.Cmd.ePlayerIsShootedRes, body);
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