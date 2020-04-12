"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameHoodleProto_1 = require("../../../protocol/GameHoodleProto");
var Log_1 = __importDefault(require("../../../../utils/Log"));
var Response_1 = __importDefault(require("../../../protocol/Response"));
var PlayerManager_1 = __importDefault(require("../PlayerManager"));
var RoomManager_1 = __importDefault(require("../RoomManager"));
var State_1 = require("../config/State");
var GameFunction_1 = __importDefault(require("./GameFunction"));
var GameCheck_1 = __importDefault(require("./GameCheck"));
var playerMgr = PlayerManager_1["default"].getInstance();
var roomMgr = RoomManager_1["default"].getInstance();
var GameProcessInterface = /** @class */ (function () {
    function GameProcessInterface() {
    }
    //玩家进入房间收到，服务主动推送相关局内数据
    GameProcessInterface.do_check_link_game = function (utag) {
        var player = playerMgr.get_player(utag);
        if (!GameCheck_1["default"].check_room(utag)) {
            Log_1["default"].warn(player.get_uname(), "check_link_game room is not exist!");
            return;
        }
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (room) {
            player.send_cmd(GameHoodleProto_1.Cmd.eCheckLinkGameRes, { status: Response_1["default"].OK });
            player.send_cmd(GameHoodleProto_1.Cmd.eRoomIdRes, { roomid: room.get_room_id() });
            player.send_cmd(GameHoodleProto_1.Cmd.eGameRuleRes, { gamerule: room.get_game_rule() });
            player.send_cmd(GameHoodleProto_1.Cmd.ePlayCountRes, { playcount: String(room.get_play_count()), totalplaycount: String(room.get_conf_play_count()) });
            GameFunction_1["default"].send_player_info(player);
            //处理断线重连,只发送给重连玩家
            //玩家位置，局数，玩家权限，玩家得分
            if (room.get_game_state() == State_1.GameState.Gameing) {
                player.send_cmd(GameHoodleProto_1.Cmd.eGameStartRes, { status: Response_1["default"].OK });
                GameFunction_1["default"].send_player_ball_pos(room, undefined, player);
                GameFunction_1["default"].send_player_power(room, undefined, player);
                GameFunction_1["default"].send_player_score(room, undefined, player);
            }
        }
    };
    //玩家准备
    GameProcessInterface.do_player_ready = function (utag) {
        var player = playerMgr.get_player(utag);
        if (!GameCheck_1["default"].check_room(utag)) {
            Log_1["default"].warn(player.get_uname(), "on_user_ready room is not exist!");
            player.send_cmd(GameHoodleProto_1.Cmd.eUserReadyRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        var userstate = player.get_user_state();
        if (userstate == State_1.UserState.Ready || userstate == State_1.UserState.Playing) {
            Log_1["default"].warn(player.get_uname(), "on_user_ready user is already ready or is playing!");
            player.send_cmd(GameHoodleProto_1.Cmd.eUserReadyRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (room) {
            //已经在游戏中了
            if (room.get_game_state() == State_1.GameState.Gameing) {
                player.send_cmd(GameHoodleProto_1.Cmd.eUserReadyRes, { status: Response_1["default"].INVALIDI_OPT });
                Log_1["default"].warn("on_user_ready error ,game is playing!");
                return;
            }
            //已经大结算了
            if (room.get_play_count() == room.get_conf_play_count()) {
                player.send_cmd(GameHoodleProto_1.Cmd.eUserReadyRes, { status: Response_1["default"].INVALIDI_OPT });
                Log_1["default"].warn("on_user_ready error ,game is over!");
                return;
            }
            //有玩家准备了，发送状态
            player.set_user_state(State_1.UserState.Ready);
            GameFunction_1["default"].send_player_state(room, player);
            //游戏开始了
            var is_game_start = GameCheck_1["default"].check_game_start(room);
            if (is_game_start) {
                GameFunction_1["default"].set_all_player_state(room, State_1.UserState.Playing);
                GameFunction_1["default"].broadcast_player_info_in_rooom(room); //刷新局内玩家信息：Playing
                //设置游戏状态为游戏中
                room.set_game_state(State_1.GameState.Gameing);
                //发送游戏开始
                room.broadcast_in_room(GameHoodleProto_1.Cmd.eGameStartRes, { status: Response_1["default"].OK });
                //游戏逻辑发送
                GameFunction_1["default"].send_player_first_pos(room);
                //设置初始权限
                GameFunction_1["default"].set_player_start_power(room);
                //玩家权限发送
                GameFunction_1["default"].send_player_power(room);
                //发送分数
                GameFunction_1["default"].send_player_score(room);
                //局数自加
                room.set_play_count(room.get_play_count() + 1);
                //发送局数
                GameFunction_1["default"].send_play_count(room);
            }
        }
    };
    return GameProcessInterface;
}());
exports["default"] = GameProcessInterface;
//# sourceMappingURL=GameProcessInterface.js.map