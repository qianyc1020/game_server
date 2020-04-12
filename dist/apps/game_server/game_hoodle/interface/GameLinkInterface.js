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
var GameFunction_1 = __importDefault(require("./GameFunction"));
var MatchManager_1 = __importDefault(require("../MatchManager"));
var GameSendMsg_1 = __importDefault(require("../GameSendMsg"));
var playerMgr = PlayerManager_1["default"].getInstance();
var roomMgr = RoomManager_1["default"].getInstance();
var matchMgr = MatchManager_1["default"].getInstance();
var GameLinkInterface = /** @class */ (function () {
    function GameLinkInterface() {
    }
    //玩家断线
    GameLinkInterface.do_player_lost_connect = function (utag) {
        var player = playerMgr.get_player(utag);
        if (player) {
            var room = roomMgr.get_room_by_uid(utag);
            if (room) {
                player.set_offline(true);
                //send to room other player user lost connect
                room.broadcast_in_room(GameHoodleProto_1.Cmd.eUserOfflineRes, { seatid: player.get_seat_id() }, player);
                GameFunction_1["default"].broadcast_player_info_in_rooom(room, player);
            }
            var issuccess = playerMgr.delete_player(utag);
            if (issuccess) {
                Log_1["default"].warn(player.get_uname() + " ,numid:" + player.get_numberid() + " is lostconnect,totalPlyaerCount: " + playerMgr.get_player_count());
            }
            var ret = matchMgr.stop_player_match(player.get_uid());
            if (ret) {
                Log_1["default"].info(player.get_uname(), "delete from match");
            }
        }
    };
    //玩家登录逻辑服务
    GameLinkInterface.do_player_login_logic_server = function (session, utag, proto_type) {
        var player = playerMgr.get_player(utag);
        if (player) {
            Log_1["default"].info("player is exist, uid: ", utag);
            player.init_session(session, utag, proto_type, function (status, data) {
                if (status == Response_1["default"].OK) {
                    //如果是重连进来，需要重新获取老玩家的信息
                    var room = roomMgr.get_room_by_uid(utag);
                    if (room) {
                        var oldPlayer = room.get_player(utag);
                        if (oldPlayer) {
                            player.set_player_info(oldPlayer.get_player_info());
                        }
                    }
                    GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eLoginLogicRes, utag, proto_type, { status: Response_1["default"].OK });
                }
                else {
                    GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eLoginLogicRes, utag, proto_type, { status: Response_1["default"].SYSTEM_ERR });
                }
            });
        }
        else {
            Log_1["default"].info("player is not exist , new player uid: ", utag);
            playerMgr.alloc_player(session, utag, proto_type, function (status, data) {
                if (status == Response_1["default"].OK) {
                    //如果是重连进来，需要重新获取老玩家的信息
                    var newPlayer = playerMgr.get_player(utag);
                    var room = roomMgr.get_room_by_uid(utag);
                    if (room) {
                        var oldPlayer = room.get_player(utag);
                        if (oldPlayer) {
                            newPlayer.set_player_info(oldPlayer.get_player_info());
                        }
                    }
                    GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eLoginLogicRes, utag, proto_type, { status: Response_1["default"].OK });
                }
                else {
                    GameSendMsg_1["default"].send(session, GameHoodleProto_1.Cmd.eLoginLogicRes, utag, proto_type, { status: Response_1["default"].SYSTEM_ERR });
                }
            });
        }
    };
    return GameLinkInterface;
}());
exports["default"] = GameLinkInterface;
//# sourceMappingURL=GameLinkInterface.js.map