"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ArrayUtil_1 = __importDefault(require("../../../utils/ArrayUtil"));
var Log_1 = __importDefault(require("../../../utils/Log"));
var State_1 = require("./State");
var RoomManager_1 = __importDefault(require("./RoomManager"));
var GameHoodleProto_1 = require("../../protocol/GameHoodleProto");
var Response_1 = __importDefault(require("../../Response"));
var MATCH_INTERVAL = 2000; //0.5秒匹配一次
var MATCH_PLAYER_COUNT = 2; //坐满人数
var MATCH_PLAYE_NUM = 3; //局数
//匹配房间规则
var MATCH_GAME_RULE = {
    playerCount: MATCH_PLAYER_COUNT,
    playCount: MATCH_PLAYE_NUM
};
var MatchManager = /** @class */ (function () {
    function MatchManager() {
        this._match_list = {}; //uid->player  inview状态
        this._in_match_list = {}; // matching 状态
        this._interval_id = null;
    }
    MatchManager.getInstance = function () {
        return MatchManager.Instance;
    };
    //开始匹配
    MatchManager.prototype.start_match = function () {
        var _this = this;
        this._interval_id = setInterval(function () {
            var pleyer = _this.get_matching_player();
            if (pleyer) {
                _this._in_match_list[pleyer.get_uid()] = pleyer;
                pleyer.set_user_state(State_1.UserState.MatchIng);
                _this.send_match_player(); //匹配到一个玩家 ，发送到客户端
                //匹配完成
                if (ArrayUtil_1["default"].GetArrayLen(_this._in_match_list) >= MATCH_PLAYER_COUNT) {
                    Log_1["default"].info("hcc>>match success");
                    //发送到客户端，服务端已经匹配完成
                    _this.on_server_match_success();
                    //从匹配列表删除
                    for (var key in _this._in_match_list) {
                        var mplayer = _this._in_match_list[key];
                        if (mplayer) {
                            _this.del_player_from_match_list_by_uid(mplayer.get_uid());
                        }
                    }
                    _this._in_match_list = {};
                }
            }
            //    _this.log_match_list()
        }, MATCH_INTERVAL);
    };
    //创建房间，进入玩家，发送到发送到客户端
    //in_match_list:匹配成功玩家
    MatchManager.prototype.on_server_match_success = function () {
        var in_match_list = this._match_list;
        var room = RoomManager_1["default"].getInstance().alloc_room();
        room.set_game_rule(JSON.stringify(MATCH_GAME_RULE));
        this.set_room_host(room);
        for (var key in in_match_list) {
            var player = in_match_list[key];
            player.set_offline(false);
            if (!room.add_player(player)) {
                Log_1["default"].warn("on_server_match_success enter room error");
                room.broadcast_in_room(GameHoodleProto_1.Cmd.eUserMatchRes, { status: Response_1["default"].INVALIDI_OPT });
                RoomManager_1["default"].getInstance().delete_room(room.get_room_id());
                return;
            }
        }
        var body = {
            status: Response_1["default"].OK,
            matchsuccess: true,
            userinfo: []
        };
        room.broadcast_in_room(GameHoodleProto_1.Cmd.eUserMatchRes, body);
    };
    //匹配成功后，选择先匹配的玩家是房主
    //in_match_list:匹配成功玩家
    //room房间
    MatchManager.prototype.set_room_host = function (room) {
        var in_match_list = this._match_list;
        if (ArrayUtil_1["default"].GetArrayLen(in_match_list) <= 0) {
            return;
        }
        var index = 0;
        for (var key in in_match_list) {
            index++;
            if (index == 1) {
                var player = in_match_list[key];
                if (player) {
                    player.set_ishost(true);
                    room.set_room_host_uid(player.get_uid());
                }
                break;
            }
        }
    };
    //发送已经匹配了的玩家
    MatchManager.prototype.send_match_player = function () {
        var in_match_list = this._match_list;
        var userinfo_array = [];
        for (var key in in_match_list) {
            var player = in_match_list[key];
            if (player) {
                var userinfo = {
                    numberid: String(player.get_numberid()),
                    userInfoString: JSON.stringify(player.get_player_info())
                };
                userinfo_array.push(userinfo);
            }
        }
        var isSuccess = ArrayUtil_1["default"].GetArrayLen(in_match_list) >= MATCH_PLAYER_COUNT;
        var body = {
            status: Response_1["default"].OK,
            matchsuccess: isSuccess,
            userinfo: userinfo_array
        };
        for (var key in in_match_list) {
            var player = in_match_list[key];
            if (player) {
                player.send_cmd(GameHoodleProto_1.Cmd.eUserMatchRes, body);
            }
        }
    };
    //停止匹配
    MatchManager.prototype.stop_match = function () {
        clearInterval(this._interval_id);
    };
    //获取正在等待列表中，未匹配到的玩家
    MatchManager.prototype.get_matching_player = function () {
        for (var key in this._match_list) {
            var p = this._match_list[key];
            if (p.get_user_state() == State_1.UserState.InView) {
                return p;
            }
        }
    };
    //添加早匹配列表
    MatchManager.prototype.add_player_to_match_list = function (player) {
        if (this._match_list[player.get_uid()]) {
            Log_1["default"].info("hcc>>player uid: " + player.get_uid() + " is already in match");
            return false;
        }
        this._match_list[player.get_uid()] = player;
        player.set_user_state(State_1.UserState.InView);
        return true;
    };
    //从匹配列表中删除
    MatchManager.prototype.del_player_from_match_list_by_uid = function (uid) {
        var player = this._match_list[uid];
        if (player) {
            player.set_user_state(State_1.UserState.InView);
            delete this._match_list[uid];
            return true;
        }
        return false;
    };
    //计算匹配列表人数
    MatchManager.prototype.count_match_list = function () {
        return ArrayUtil_1["default"].GetArrayLen(this._match_list);
    };
    //打印统计列表
    MatchManager.prototype.log_match_list = function () {
        var name_str = "";
        for (var key in this._match_list) {
            var player = this._match_list[key];
            var uname = player.get_uname();
            name_str = name_str + uname + "  ,";
        }
        if (name_str == "") {
            name_str = "none";
        }
        Log_1["default"].info("matchlist_len: " + this.count_match_list() + " ,user:", name_str);
    };
    MatchManager.Instance = new MatchManager();
    return MatchManager;
}());
exports["default"] = MatchManager;
//# sourceMappingURL=MatchManager.js.map