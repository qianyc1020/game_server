"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameHoodleProto_1 = require("../../../protocol/GameHoodleProto");
var Log_1 = __importDefault(require("../../../../utils/Log"));
var GameHoodleConfig_1 = __importDefault(require("../config/GameHoodleConfig"));
var Response_1 = __importDefault(require("../../../protocol/Response"));
var PlayerManager_1 = __importDefault(require("../PlayerManager"));
var RoomManager_1 = __importDefault(require("../RoomManager"));
var State_1 = require("../config/State");
var ProtoManager_1 = __importDefault(require("../../../../netbus/ProtoManager"));
var GameFunction_1 = __importDefault(require("./GameFunction"));
var playerMgr = PlayerManager_1["default"].getInstance();
var roomMgr = RoomManager_1["default"].getInstance();
var GameRoomInterface = /** @class */ (function () {
    function GameRoomInterface() {
    }
    GameRoomInterface.do_player_create_room = function (utag, proto_type, raw_cmd) {
        var player = playerMgr.get_player(utag);
        if (player.get_user_state() == State_1.UserState.MatchIng) {
            player.send_cmd(GameHoodleProto_1.Cmd.eCreateRoomRes, { status: Response_1["default"].INVALIDI_OPT });
            Log_1["default"].warn(player.get_uname(), " create room error, player is in matching");
            return;
        }
        if (roomMgr.get_room_by_uid(player.get_uid())) {
            player.send_cmd(GameHoodleProto_1.Cmd.eCreateRoomRes, { status: Response_1["default"].INVALIDI_OPT });
            Log_1["default"].warn(player.get_uname(), "create room error, already create one");
            return;
        }
        var room = roomMgr.alloc_room();
        if (!room) {
            player.send_cmd(GameHoodleProto_1.Cmd.eCreateRoomRes, { status: Response_1["default"].SYSTEM_ERR });
            Log_1["default"].warn(player.get_uname(), "create room error, alloc room error");
            return;
        }
        //是否金币不足
        if (GameHoodleConfig_1["default"].KW_IS_GOLD_LIMIT) {
            if (player.get_uchip() < GameHoodleConfig_1["default"].KW_MIN_GOLD_ENTER_ROOM) {
                player.send_cmd(GameHoodleProto_1.Cmd.eCreateRoomRes, { status: Response_1["default"].SYSTEM_ERR });
                Log_1["default"].warn(player.get_uname(), "create room error, gold is not enough");
                return;
            }
        }
        var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
        if (body) {
            room.set_game_rule(body.gamerule);
            Log_1["default"].info(player.get_uname(), "create room, gamerule: ", body);
        }
        if (!room.add_player(player)) {
            Log_1["default"].warn("create room error,add host player error");
            player.send_cmd(GameHoodleProto_1.Cmd.eCreateRoomRes, { status: Response_1["default"].INVALIDI_OPT });
            roomMgr.delete_room(room.get_room_id());
            return;
        }
        room.set_room_host_uid(player.get_uid());
        player.set_offline(false);
        player.set_ishost(true);
        player.send_cmd(GameHoodleProto_1.Cmd.eCreateRoomRes, { status: Response_1["default"].OK });
    };
    GameRoomInterface.do_player_join_room = function (utag, proto_type, raw_cmd) {
        var player = playerMgr.get_player(utag);
        if (player.get_user_state() == State_1.UserState.MatchIng) {
            Log_1["default"].warn(player.get_uname(), "join_room error, player is in matching!");
            player.send_cmd(GameHoodleProto_1.Cmd.eJoinRoomRes, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
        var roomid = body.roomid;
        if (!roomid || roomid == "") {
            Log_1["default"].warn(player.get_uname(), "join_room error, roomid", roomid, "is invalid");
            player.send_cmd(GameHoodleProto_1.Cmd.eJoinRoomRes, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        var room = roomMgr.get_room_by_roomid(roomid);
        if (!room) {
            Log_1["default"].warn(player.get_uname(), "join_room error, room is not exist!");
            player.send_cmd(GameHoodleProto_1.Cmd.eJoinRoomRes, { status: Response_1["default"].SYSTEM_ERR });
            return;
        }
        //是否金币不足
        if (GameHoodleConfig_1["default"].KW_IS_GOLD_LIMIT) {
            if (player.get_uchip() < GameHoodleConfig_1["default"].KW_MIN_GOLD_ENTER_ROOM) {
                player.send_cmd(GameHoodleProto_1.Cmd.eJoinRoomRes, { status: Response_1["default"].SYSTEM_ERR });
                Log_1["default"].warn(player.get_uname(), "join_room error, gold is not enough");
                return;
            }
        }
        //自己创建了一个房间，不能加入其它人的房间，只能加入自己的房间
        var uroom = roomMgr.get_room_by_uid(utag);
        var is_back_room = false;
        if (uroom) {
            //自己已经创建了一个房间
            if (room.get_room_id() !== uroom.get_room_id()) {
                Log_1["default"].warn(player.get_uname(), "join_room error, player is create one room!");
                player.send_cmd(GameHoodleProto_1.Cmd.eJoinRoomRes, { status: Response_1["default"].INVALIDI_OPT });
                return;
            }
            //掉线返回房间
            if (room.get_room_id() == uroom.get_room_id()) {
                is_back_room = true;
            }
        }
        if (!room.add_player(player, is_back_room)) {
            Log_1["default"].warn(player.get_uname() + "join_room error");
            player.send_cmd(GameHoodleProto_1.Cmd.eJoinRoomRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        player.set_offline(false);
        player.send_cmd(GameHoodleProto_1.Cmd.eJoinRoomRes, { status: Response_1["default"].OK });
        //send uinfo to other player in room
        GameFunction_1["default"].broadcast_player_info_in_rooom(room, player);
        Log_1["default"].info(player.get_uname(), "join_room success, roomid: ", room.get_room_id());
    };
    GameRoomInterface.do_pleyr_exit_room = function (utag) {
        var player = playerMgr.get_player(utag);
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (!room) {
            Log_1["default"].warn(player.get_uname(), " exit_room error, room is not exist!");
            player.send_cmd(GameHoodleProto_1.Cmd.eExitRoomRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        //start game
        if (room.get_game_state() != State_1.GameState.InView) {
            Log_1["default"].warn(player.get_uname(), " exit_room error, game is start !");
            player.send_cmd(GameHoodleProto_1.Cmd.eExitRoomRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        if (room.is_room_host(player.get_uid())) {
            player.set_offline(true);
        }
        else {
            room.kick_player(player.get_uid());
            player.clear_room_info();
        }
        player.send_cmd(GameHoodleProto_1.Cmd.eExitRoomRes, { status: Response_1["default"].OK });
        GameFunction_1["default"].broadcast_player_info_in_rooom(room);
    };
    GameRoomInterface.do_player_dessolve_room = function (utag) {
        var player = playerMgr.get_player(utag);
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (!room) {
            Log_1["default"].warn(player.get_uname(), " dessolve_room error, room is not exist!");
            player.send_cmd(GameHoodleProto_1.Cmd.eDessolveRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        if (room.is_room_host(player.get_uid()) == false) {
            Log_1["default"].warn(player.get_uname(), "dessolve_room error, player is not host!");
            player.send_cmd(GameHoodleProto_1.Cmd.eDessolveRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        var roomID = room.get_room_id();
        var ret = roomMgr.delete_room(roomID);
        if (ret == false) {
            Log_1["default"].warn(player.get_uname(), "dessolve_room error ,roomid: ", roomID, "is not exist!");
            player.send_cmd(GameHoodleProto_1.Cmd.eDessolveRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        room.broadcast_in_room(GameHoodleProto_1.Cmd.eDessolveRes, { status: Response_1["default"].OK }, player);
        room.kick_all_player();
        player.send_cmd(GameHoodleProto_1.Cmd.eDessolveRes, { status: Response_1["default"].OK });
    };
    GameRoomInterface.do_player_get_room_status = function (utag) {
        var player = playerMgr.get_player(utag);
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (!room) {
            player.send_cmd(GameHoodleProto_1.Cmd.eGetRoomStatusRes, { status: Response_1["default"].SYSTEM_ERR });
            Log_1["default"].info(player.get_uname(), "get_room_status , player is not in room");
            return;
        }
        Log_1["default"].info(player.get_uname(), "get_room_status player is in room! roomid: ", room.get_room_id());
        player.send_cmd(GameHoodleProto_1.Cmd.eGetRoomStatusRes, { status: Response_1["default"].OK });
    };
    GameRoomInterface.do_player_back_room = function (utag) {
        var player = playerMgr.get_player(utag);
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (!room) {
            player.send_cmd(GameHoodleProto_1.Cmd.eBackRoomRes, { status: Response_1["default"].INVALIDI_OPT });
            Log_1["default"].warn(player.get_uname(), "back_room error, player is not in room");
            return;
        }
        Log_1["default"].info(player.get_uname(), "back room success! roomid: ", room.get_room_id());
        player.set_offline(false);
        if (room.is_room_host(player.get_uid())) {
            player.set_ishost(true);
        }
        if (!room.add_player(player, true)) {
            player.send_cmd(GameHoodleProto_1.Cmd.eBackRoomRes, { status: Response_1["default"].INVALIDI_OPT });
            Log_1["default"].warn(player.get_uname(), "back room error!");
            return;
        }
        player.send_cmd(GameHoodleProto_1.Cmd.eBackRoomRes, { status: Response_1["default"].OK });
        GameFunction_1["default"].broadcast_player_info_in_rooom(room, player);
    };
    return GameRoomInterface;
}());
exports["default"] = GameRoomInterface;
//# sourceMappingURL=GameRoomInterface.js.map