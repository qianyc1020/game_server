"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ProtoManager_1 = __importDefault(require("../../../netbus/ProtoManager"));
var GameHoodleProto_1 = require("../../protocol/GameHoodleProto");
var GameSendMsg_1 = __importDefault(require("./GameSendMsg"));
var CommonProto_1 = __importDefault(require("../../protocol/CommonProto"));
var PlayerManager_1 = __importDefault(require("./PlayerManager"));
var RoomManager_1 = __importDefault(require("./RoomManager"));
var Response_1 = __importDefault(require("../../Response"));
var ArrayUtil_1 = __importDefault(require("../../../utils/ArrayUtil"));
var Log = require("../../../utils/Log");
var GameHoodleModle = /** @class */ (function () {
    function GameHoodleModle() {
    }
    GameHoodleModle.getInstance = function () {
        return GameHoodleModle.Instance;
    };
    GameHoodleModle.prototype.decode_cmd = function (proto_type, raw_cmd) {
        return ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
    };
    GameHoodleModle.prototype.recv_cmd_msg = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        Log.info("recv_cmd_msg: ", stype, ctype, utag, proto_type, this.decode_cmd(proto_type, raw_cmd));
        switch (ctype) {
            case CommonProto_1["default"].eUserLostConnectRes:
                this.on_user_lost_connect(session, utag, proto_type, raw_cmd);
                break;
            case GameHoodleProto_1.Cmd.eLoginLogicReq:
                this.login_logic(session, utag, proto_type, raw_cmd);
                break;
            case GameHoodleProto_1.Cmd.eCreateRoomReq:
                this.create_room(session, utag, proto_type, raw_cmd);
                break;
            case GameHoodleProto_1.Cmd.eJoinRoomReq:
                this.join_room(session, utag, proto_type, raw_cmd);
                break;
            case GameHoodleProto_1.Cmd.eExitRoomReq:
                this.exit_room(session, utag, proto_type, raw_cmd);
                break;
            case GameHoodleProto_1.Cmd.eDessolveReq:
                this.dessolve_room(session, utag, proto_type, raw_cmd);
                break;
            case GameHoodleProto_1.Cmd.eGetRoomStatusReq:
                this.get_room_status(session, utag, proto_type, raw_cmd);
                break;
            case GameHoodleProto_1.Cmd.eBackRoomReq:
                this.back_room(session, utag, proto_type, raw_cmd);
                break;
            case GameHoodleProto_1.Cmd.eCheckLinkGameReq:
                this.check_link_game(session, utag, proto_type, raw_cmd);
                break;
            default:
                break;
        }
    };
    //玩家离开逻辑服务
    GameHoodleModle.prototype.on_user_lost_connect = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.warn("game on_user_lost_connect utag:", utag, body);
        if (!this.check_player(utag)) {
            return;
        }
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        if (player) {
            player.set_offline(true);
            var room = RoomManager_1["default"].getInstance().get_room_by_uid(utag);
            if (room) {
                //send to room other player user lost connect
                // room.broadcast_in_room()
            }
        }
        PlayerManager_1["default"].getInstance().delete_player(utag);
    };
    //登录逻辑服务
    GameHoodleModle.prototype.login_logic = function (session, utag, proto_type, raw_cmd) {
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        if (player) {
            Log.info("player is exist, uid: ", utag);
            player.init_session(session, utag, proto_type, function (status, data) {
                if (status == Response_1["default"].OK) {
                    GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eLoginLogicRes, utag, proto_type, { status: Response_1["default"].OK });
                }
                else {
                    GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eLoginLogicRes, utag, proto_type, { status: Response_1["default"].SYSTEM_ERR });
                }
            });
        }
        else {
            Log.info("player is not exist , new player uid: ", utag);
            PlayerManager_1["default"].getInstance().alloc_player(session, utag, proto_type, function (status, data) {
                if (status == Response_1["default"].OK) {
                    GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eLoginLogicRes, utag, proto_type, { status: Response_1["default"].OK });
                }
                else {
                    GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eLoginLogicRes, utag, proto_type, { status: Response_1["default"].SYSTEM_ERR });
                }
            });
        }
    };
    ///////////////////////////////////////
    //检测是否非法玩家
    GameHoodleModle.prototype.check_player = function (utag) {
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        if (player) {
            return true;
        }
        else {
            return false;
        }
    };
    //检测是否非法房间
    GameHoodleModle.prototype.check_room = function (utag) {
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
    //向房间内所有人发送局内玩家信息
    GameHoodleModle.prototype.broadcast_player_info_in_rooom = function (room, not_to_player) {
        if (!room) {
            return;
        }
        var player_set = room.get_all_player();
        Log.info("broadcast_player_info_in_rooom000");
        var userinfo_array = [];
        try {
            for (var key in player_set) {
                var player = player_set[key];
                Log.info("broadcast_player_info_in_rooom111: ", player.get_uid());
                if (player) {
                    Log.info("broadcast_player_info_in_rooom222: ", player.get_uid());
                    var userinfo = {
                        numberid: String(player.get_numberid()),
                        userInfoString: JSON.stringify(player.get_ucenter_info())
                    };
                    userinfo_array.push(userinfo);
                    Log.info("broadcast_player_info_in_rooom333: len: ", userinfo_array.length);
                }
            }
            room.broadcast_in_room(GameHoodleProto_1.Cmd.eUserInfoRes, { userinfo: userinfo_array }, not_to_player);
        }
        catch (error) {
            Log.error(error);
        }
    };
    //向某个玩家发送局内玩家信息
    GameHoodleModle.prototype.send_player_info = function (player) {
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
                        userInfoString: JSON.stringify(player_1.get_ucenter_info())
                    };
                    userinfo_array.push(userinfo);
                }
            }
            player.send_cmd(GameHoodleProto_1.Cmd.eUserInfoRes, { userinfo: userinfo_array });
        }
        catch (error) {
            Log.error(error);
        }
    };
    ///////////////////////////////////////
    //创建房间
    GameHoodleModle.prototype.create_room = function (session, utag, proto_type, raw_cmd) {
        if (!this.check_player(utag)) {
            Log.warn("create_room player is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eCreateRoomRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        var rmanager = RoomManager_1["default"].getInstance();
        if (rmanager.get_room_by_uid(player.get_uid())) {
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eCreateRoomRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            Log.warn("create room error, already create one");
            return;
        }
        var room = RoomManager_1["default"].getInstance().alloc_room();
        if (!room) {
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eCreateRoomRes, utag, proto_type, { status: Response_1["default"].SYSTEM_ERR });
            return;
        }
        room.add_player(player);
        room.set_room_host_uid(player.get_uid());
        player.set_offline(false);
        var body = this.decode_cmd(proto_type, raw_cmd);
        if (body) {
            room.set_room_info(body.roominfo);
            Log.info("create room, roominfo: ", body);
        }
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eCreateRoomRes, utag, proto_type, { status: Response_1["default"].OK });
    };
    //加入房间
    GameHoodleModle.prototype.join_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        if (!this.check_player(utag)) {
            Log.warn("join_room error, player is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eJoinRoomRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        var roomid = body.roomid;
        if (!roomid || roomid == "") {
            Log.warn("join_room error, roomid", roomid, "is invalid");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eJoinRoomRes, utag, proto_type, { status: Response_1["default"].INVALID_PARAMS });
            return;
        }
        var room = RoomManager_1["default"].getInstance().get_room_by_roomid(roomid);
        if (!room) {
            Log.warn("join_room error, room is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eJoinRoomRes, utag, proto_type, { status: Response_1["default"].SYSTEM_ERR });
            return;
        }
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        room.add_player(player);
        player.set_offline(false);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eJoinRoomRes, utag, proto_type, { status: Response_1["default"].OK });
        //send uinfo to other player in room
        this.broadcast_player_info_in_rooom(room, player);
        Log.warn("join_room success, roomid: ", room.get_room_id());
    };
    //离开房间
    GameHoodleModle.prototype.exit_room = function (session, utag, proto_type, raw_cmd) {
        if (!this.check_player(utag)) {
            Log.warn("exit_room player is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eExitRoomRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        var rmanager = RoomManager_1["default"].getInstance();
        var room = rmanager.get_room_by_uid(player.get_uid());
        if (!room) {
            Log.warn("exit_room error, room is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eExitRoomRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        // TODO start game
        if (room.is_room_host(player.get_uid())) {
            player.set_offline(true);
        }
        else {
            room.kick_player(player.get_uid());
        }
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eExitRoomRes, utag, proto_type, { status: Response_1["default"].OK });
        this.broadcast_player_info_in_rooom(room);
    };
    //解散房间
    GameHoodleModle.prototype.dessolve_room = function (session, utag, proto_type, raw_cmd) {
        if (!this.check_player(utag)) {
            Log.warn("dessolve_room error, player is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eDessolveRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        var rmanager = RoomManager_1["default"].getInstance();
        var room = rmanager.get_room_by_uid(player.get_uid());
        if (!room) {
            Log.warn("dessolve_room error, room is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eDessolveRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        if (room.is_room_host(player.get_uid()) == false) {
            Log.warn("dessolve_room error, player is not host!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eDessolveRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        var roomID = room.get_room_id();
        var ret = rmanager.delete_room(roomID);
        if (ret == false) {
            Log.warn("dessolve_room error ,roomid: ", roomID, "is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eDessolveRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        room.broadcast_in_room(GameHoodleProto_1.Cmd.eDessolveRes, { status: Response_1["default"].OK }, player);
        room.kick_all_player();
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eDessolveRes, utag, proto_type, { status: Response_1["default"].OK });
    };
    //获取是否创建过房间
    GameHoodleModle.prototype.get_room_status = function (session, utag, proto_type, raw_cmd) {
        if (!this.check_player(utag)) {
            Log.warn("get_room_status player is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eGetRoomStatusRes, utag, proto_type, { status: Response_1["default"].SYSTEM_ERR });
            return;
        }
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        var room = RoomManager_1["default"].getInstance().get_room_by_uid(player.get_uid());
        if (!room) {
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eGetRoomStatusRes, utag, proto_type, { status: Response_1["default"].SYSTEM_ERR });
            Log.warn("get_room_status , player is not in room");
            return;
        }
        Log.info("get_room_status player is in room! roomid: ", room.get_room_id());
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eGetRoomStatusRes, utag, proto_type, { status: Response_1["default"].OK });
    };
    //返回房间
    GameHoodleModle.prototype.back_room = function (session, utag, proto_type, raw_cmd) {
        if (!this.check_player(utag)) {
            Log.warn("back_room player is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eBackRoomRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        var rmanager = RoomManager_1["default"].getInstance();
        var room = rmanager.get_room_by_uid(player.get_uid());
        if (!room) {
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eBackRoomRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            Log.warn("back_room error, player is not in room");
            return;
        }
        Log.info("back room success! roomid: ", room.get_room_id());
        player.set_offline(false);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eBackRoomRes, utag, proto_type, { status: Response_1["default"].OK });
        this.broadcast_player_info_in_rooom(room, player);
    };
    //进游戏房间后，发送房间信息
    GameHoodleModle.prototype.check_link_game = function (session, utag, proto_type, raw_cmd) {
        if (!this.check_player(utag)) {
            Log.warn("check_link_game player is not exist!");
            GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eCheckLinkGameRes, utag, proto_type, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        if (!this.check_room(utag)) {
            Log.warn("check_link_game room is not exist!");
            return;
        }
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        var room = RoomManager_1["default"].getInstance().get_room_by_uid(player.get_uid());
        if (room) {
            this.send_player_info(player);
            player.send_cmd(GameHoodleProto_1.Cmd.ePlayCountRes, { playcount: "0", totalplaycount: "0" });
            player.send_cmd(GameHoodleProto_1.Cmd.eCheckLinkGameRes, { status: Response_1["default"].OK });
            player.send_cmd(GameHoodleProto_1.Cmd.eRoomIdRes, { roomid: room.get_room_id() });
            // player.send_cmd(Cmd.eRoomInfoRes,{roominfo: room.get_room_info()}) //TODO error, 这条以后的协议，发送不出去？
        }
    };
    GameHoodleModle.Instance = new GameHoodleModle();
    return GameHoodleModle;
}());
exports["default"] = GameHoodleModle;
//# sourceMappingURL=GameHoodleModle.js.map