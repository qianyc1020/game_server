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
            default:
                break;
        }
    };
    //玩家离开逻辑服务
    GameHoodleModle.prototype.on_user_lost_connect = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("game on_user_lost_connect utag:", utag, body);
        PlayerManager_1["default"].getInstance().delete_player(utag);
    };
    //登录逻辑服务
    GameHoodleModle.prototype.login_logic = function (session, utag, proto_type, raw_cmd) {
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        if (player) {
            Log.info("player is exist, uid: ", utag);
            player.init_session(session, utag, proto_type);
        }
        else {
            Log.info("player is not exist , new player uid: ", utag);
            PlayerManager_1["default"].getInstance().alloc_player(session, utag, proto_type);
        }
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eLoginLogicRes, utag, proto_type, { status: 1 });
    };
    GameHoodleModle.prototype.check_player = function (utag) {
        var player = PlayerManager_1["default"].getInstance().get_player(utag);
        if (player) {
            return true;
        }
        else {
            return false;
        }
    };
    //创建房间
    GameHoodleModle.prototype.create_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        if (!this.check_player(utag)) {
            Log.info("create_room player is not exist!");
            return;
        }
        var room = RoomManager_1["default"].getInstance().alloc_room();
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eCreateRoomRes, utag, proto_type, { status: 1 });
    };
    //加入房间
    GameHoodleModle.prototype.join_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eJoinRoomRes, utag, proto_type, { status: 1 });
    };
    //离开房间
    GameHoodleModle.prototype.exit_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eExitRoomRes, utag, proto_type, { status: 1 });
    };
    //解散房间
    GameHoodleModle.prototype.dessolve_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eDessolveRes, utag, proto_type, { status: 1 });
    };
    //获取是否创建过房间
    GameHoodleModle.prototype.get_room_status = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eGetRoomStatusRes, utag, proto_type, { status: 1 });
    };
    //返回房间
    GameHoodleModle.prototype.back_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eBackRoomRes, utag, proto_type, { status: 1 });
    };
    GameHoodleModle.Instance = new GameHoodleModle();
    return GameHoodleModle;
}());
exports["default"] = GameHoodleModle;
//# sourceMappingURL=GameHoodleModle.js.map