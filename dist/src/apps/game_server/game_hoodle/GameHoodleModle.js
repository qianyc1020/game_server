"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ProtoManager_1 = __importDefault(require("../../../netbus/ProtoManager"));
var GameHoodleProto_1 = require("../../protocol/GameHoodleProto");
var GameSendMsg_1 = __importDefault(require("./GameSendMsg"));
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
            case GameHoodleProto_1.Cmd.eUserLostConnectRes:
                this.on_user_lost_connect(session, utag, proto_type, raw_cmd);
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
    GameHoodleModle.prototype.on_user_lost_connect = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        Log.info("game on_user_lost_connect utag:", utag, body);
    };
    GameHoodleModle.prototype.create_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eCreateRoomRes, utag, proto_type, { status: 1 });
    };
    GameHoodleModle.prototype.join_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eJoinRoomRes, utag, proto_type, { status: 1 });
    };
    GameHoodleModle.prototype.exit_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eExitRoomRes, utag, proto_type, { status: 1 });
    };
    GameHoodleModle.prototype.dessolve_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eDessolveRes, utag, proto_type, { status: 1 });
    };
    GameHoodleModle.prototype.get_room_status = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eGetRoomStatusRes, utag, proto_type, { status: 1 });
    };
    GameHoodleModle.prototype.back_room = function (session, utag, proto_type, raw_cmd) {
        var body = this.decode_cmd(proto_type, raw_cmd);
        GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eBackRoomRes, utag, proto_type, { status: 1 });
    };
    GameHoodleModle.Instance = new GameHoodleModle();
    return GameHoodleModle;
}());
exports["default"] = GameHoodleModle;
//# sourceMappingURL=GameHoodleModle.js.map