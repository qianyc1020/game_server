"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Log_1 = __importDefault(require("../../../../utils/Log"));
var PlayerManager_1 = __importDefault(require("../PlayerManager"));
var RoomManager_1 = __importDefault(require("../RoomManager"));
var State_1 = require("../config/State");
var ProtoManager_1 = __importDefault(require("../../../../netbus/ProtoManager"));
var GameFunction_1 = __importDefault(require("./GameFunction"));
var GameCheck_1 = __importDefault(require("./GameCheck"));
var playerMgr = PlayerManager_1["default"].getInstance();
var roomMgr = RoomManager_1["default"].getInstance();
var GameLogicInterface = /** @class */ (function () {
    function GameLogicInterface() {
    }
    GameLogicInterface.do_player_shoot = function (utag, proto_type, raw_cmd) {
        var player = playerMgr.get_player(utag);
        if (!GameCheck_1["default"].check_room(utag)) {
            Log_1["default"].warn(player.get_uname(), "on_player_shoot room is not exist!");
            return;
        }
        var userstate = player.get_user_state();
        if (userstate != State_1.UserState.Playing) {
            Log_1["default"].warn(player.get_uname(), "on_player_shoot user is not in playing state!");
            return;
        }
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (room) {
            if (room.get_game_state() != State_1.GameState.Gameing) {
                Log_1["default"].warn(player.get_uname(), "on_player_shoot room is not in playing state!");
                return;
            }
            //发送玩家射击信息
            var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
            GameFunction_1["default"].send_player_shoot(room, body, player);
            //设置下一个玩家射击权限
            GameFunction_1["default"].set_next_player_power(room);
            //发送权限
            GameFunction_1["default"].send_player_power(room);
        }
    };
    GameLogicInterface.do_player_ball_pos = function (utag, proto_type, raw_cmd) {
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        if (!GameCheck_1["default"].check_room(utag)) {
            Log_1["default"].warn(player.get_uname(), "on_player_ball_pos room is not exist!");
            return;
        }
        var userstate = player.get_user_state();
        if (userstate != State_1.UserState.Playing) {
            Log_1["default"].warn(player.get_uname(), "on_player_ball_pos user is not in playing state!");
            return;
        }
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (room) {
            if (room.get_game_state() != State_1.GameState.Gameing) {
                Log_1["default"].warn(player.get_uname(), "on_player_ball_pos room is not in playing state!");
                return;
            }
            var player_set = room.get_all_player();
            //保存玩家位置信息
            var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
            // Log.info("hcc>>on_player_ball_pos ", body);
            for (var key in body.positions) {
                var posinfo = body.positions[key];
                var seatid = posinfo.seatid;
                var posx = posinfo.posx;
                var posy = posinfo.posy;
                for (var k in player_set) {
                    var p = player_set[k];
                    if (p && p.get_seat_id() == seatid) {
                        var pos_info = { posx: posx, posy: posy };
                        p.set_user_pos(pos_info);
                        break;
                    }
                }
            }
            GameFunction_1["default"].send_player_ball_pos(room);
        }
    };
    GameLogicInterface.do_player_is_shooted = function (utag, proto_type, raw_cmd) {
        var player = playerMgr.get_player(utag);
        if (!GameCheck_1["default"].check_room(utag)) {
            Log_1["default"].warn(player.get_uname(), "on_player_is_shooted room is not exist!");
            return;
        }
        var userstate = player.get_user_state();
        if (userstate != State_1.UserState.Playing) {
            Log_1["default"].warn(player.get_uname(), "on_player_is_shooted user is not in playing state!");
            return;
        }
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (room) {
            if (room.get_game_state() != State_1.GameState.Gameing) {
                Log_1["default"].warn(player.get_uname(), "on_player_is_shooted room is not in playing state!");
                return;
            }
            //先转发射中消息
            var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
            GameFunction_1["default"].send_player_is_shooted(room, body);
            //分数计算
            var src_player = room.get_player_by_seatid(body.srcseatid);
            var des_player = room.get_player_by_seatid(body.desseatid);
            if (src_player && des_player) {
                src_player.set_user_score(src_player.get_user_score() + 1);
                des_player.set_user_score(des_player.get_user_score() - 1);
                Log_1["default"].info("hcc>>playerScore: src_player:", src_player.get_uname(), "+1", " des_player:", des_player.get_uname(), "-1");
            }
            //发送分数
            GameFunction_1["default"].send_player_score(room);
            //设置游戏状态为结算状态
            room.set_game_state(State_1.GameState.CheckOut);
            //发送玩家状态
            GameFunction_1["default"].set_all_player_state(room, State_1.UserState.InView);
            GameFunction_1["default"].broadcast_player_info_in_rooom(room);
            //清除上一局数据
            GameFunction_1["default"].clear_all_player_cur_data(room);
            //发送权限
            GameFunction_1["default"].send_player_power(room);
            //发送结算
            GameFunction_1["default"].send_game_result(room);
            //大结算: 踢出所有玩家，房间解散
            if (room.get_play_count() == room.get_conf_play_count()) {
                GameFunction_1["default"].cal_player_chip_and_write(room); //计算金币
                GameFunction_1["default"].send_game_total_result(room);
                room.kick_all_player();
                roomMgr.delete_room(room.get_room_id());
            }
        }
    };
    return GameLogicInterface;
}());
exports["default"] = GameLogicInterface;
//# sourceMappingURL=GameLogicInterface.js.map