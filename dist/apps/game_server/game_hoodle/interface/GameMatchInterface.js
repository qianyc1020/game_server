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
var MatchManager_1 = __importDefault(require("../MatchManager"));
var GameHoodleConfig_1 = __importDefault(require("../config/GameHoodleConfig"));
var playerMgr = PlayerManager_1["default"].getInstance();
var roomMgr = RoomManager_1["default"].getInstance();
var matchMgr = MatchManager_1["default"].getInstance();
var GameMatchInterface = /** @class */ (function () {
    function GameMatchInterface() {
    }
    GameMatchInterface.do_player_match = function (utag) {
        var player = playerMgr.get_player(utag);
        //如果在房间内，不能匹配
        var room = roomMgr.get_room_by_uid(player.get_uid());
        if (room) {
            Log_1["default"].warn(player.get_uname(), "do_player_match error user is at room!");
            player.send_cmd(GameHoodleProto_1.Cmd.eUserMatchRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        //是否金币不足
        if (GameHoodleConfig_1["default"].KW_IS_GOLD_LIMIT) {
            if (player.get_uchip() < GameHoodleConfig_1["default"].KW_MIN_GOLD_ENTER_ROOM) {
                player.send_cmd(GameHoodleProto_1.Cmd.eUserMatchRes, { status: Response_1["default"].INVALIDI_OPT });
                Log_1["default"].warn(player.get_uname(), "do_player_match error, gold is not enough");
                return;
            }
        }
        //加入匹配等待列表
        var ret = matchMgr.add_player_to_match_list(player);
        if (!ret) {
            Log_1["default"].warn(player.get_uname(), "do_player_match error user is in matching!");
            player.send_cmd(GameHoodleProto_1.Cmd.eUserMatchRes, { status: Response_1["default"].NOT_YOUR_TURN });
            return;
        }
        //发送匹配信息
        var userinfo_array = [];
        var userinfo = {
            numberid: String(player.get_numberid()),
            userinfostring: JSON.stringify(player.get_player_info())
        };
        userinfo_array.push(userinfo);
        var body = {
            status: Response_1["default"].OK,
            matchsuccess: false,
            userinfo: userinfo_array
        };
        player.send_cmd(GameHoodleProto_1.Cmd.eUserMatchRes, body);
        Log_1["default"].info(player.get_uname(), "do_player_match user add matching success!");
    };
    GameMatchInterface.do_player_stop_match = function (utag) {
        var player = playerMgr.get_player(utag);
        var uname = player.get_uname();
        var ret = matchMgr.stop_player_match(player.get_uid());
        if (!ret) {
            Log_1["default"].warn(uname, "odo_player_stop_match failed!");
            player.send_cmd(GameHoodleProto_1.Cmd.eUserStopMatchRes, { status: Response_1["default"].INVALIDI_OPT });
            return;
        }
        player.send_cmd(GameHoodleProto_1.Cmd.eUserStopMatchRes, { status: Response_1["default"].OK });
        matchMgr.send_match_player();
        Log_1["default"].info(uname, "do_player_stop_match success!");
    };
    return GameMatchInterface;
}());
exports["default"] = GameMatchInterface;
//# sourceMappingURL=GameMatchInterface.js.map