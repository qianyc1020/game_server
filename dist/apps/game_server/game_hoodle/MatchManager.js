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
var MATCH_INTERVAL = 1000; //0.5秒匹配一次
var MATCH_PLAYER_COUNT = 2; //坐满人数
var MATCH_PLAYE_NUM = 5; //局数
//匹配房间规则
var MATCH_GAME_RULE = {
    playerCount: MATCH_PLAYER_COUNT,
    playCount: MATCH_PLAYE_NUM
};
var MatchManager = /** @class */ (function () {
    function MatchManager() {
        this._match_list = {}; // uid->player  匹配列表，还没进入匹配的人， inview状态
        this._in_match_list = {}; // uid->player  匹配到的人数, matching 状态
    }
    MatchManager.getInstance = function () {
        return MatchManager.Instance;
    };
    //开始匹配
    MatchManager.prototype.start_match = function () {
        var _this = this;
        setInterval(function () {
            var player = _this.get_matching_player();
            if (player) {
                var match_count = ArrayUtil_1["default"].GetArrayLen(_this._in_match_list);
                if (match_count < MATCH_PLAYER_COUNT) {
                    var ret = _this.add_player_to_in_match_list(player);
                    if (ret) {
                        var tmp_in_match_list = _this._in_match_list;
                        // let match_count = _this.get_in_match_player_count()
                        var match_count_1 = ArrayUtil_1["default"].GetArrayLen(_this._in_match_list);
                        _this.send_match_player(tmp_in_match_list); //匹配到一个玩家 ，发送到客户端
                        Log_1["default"].info("hcc>>get_in_match_player_count>> ", match_count_1);
                        if (match_count_1 >= MATCH_PLAYER_COUNT) { //匹配完成
                            Log_1["default"].info("hcc>>match success");
                            _this.on_server_match_success(tmp_in_match_list); //发送到客户端，服务端已经匹配完成
                            _this.del_match_success_player_from_math_list(tmp_in_match_list); //从待匹配列表删除
                            _this.del_in_match_player(tmp_in_match_list); //从匹配完成列表中删除
                        }
                    }
                }
            }
            //    _this.log_match_list()
        }, MATCH_INTERVAL);
    };
    //创建房间，进入玩家，发送到发送到客户端
    //in_match_list:匹配成功玩家 Matching
    MatchManager.prototype.on_server_match_success = function (in_match_list) {
        if (!in_match_list) {
            in_match_list = this._in_match_list;
        }
        var room = RoomManager_1["default"].getInstance().alloc_room();
        room.set_game_rule(JSON.stringify(MATCH_GAME_RULE));
        this.set_room_host(room);
        Log_1["default"].info("hcc>>in_match_list len: ", ArrayUtil_1["default"].GetArrayLen(in_match_list));
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
            matchsuccess: true
        };
        room.broadcast_in_room(GameHoodleProto_1.Cmd.eUserMatchRes, body);
    };
    //设置房主: 匹配成功后，选择先匹配的玩家是房主
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
    //发送匹配列表中的玩家
    MatchManager.prototype.send_match_player = function (in_match_list) {
        if (!in_match_list) {
            in_match_list = this._in_match_list;
        }
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
        var body = {
            status: Response_1["default"].OK,
            matchsuccess: false,
            userinfo: userinfo_array
        };
        for (var key in in_match_list) {
            var player = in_match_list[key];
            if (player) {
                player.send_cmd(GameHoodleProto_1.Cmd.eUserMatchRes, body);
            }
        }
    };
    //获取正在等待列表中，未进入匹配的玩家  inview状态
    MatchManager.prototype.get_matching_player = function () {
        for (var key in this._match_list) {
            var p = this._match_list[key];
            if (p.get_user_state() == State_1.UserState.InView) {
                return p;
            }
        }
    };
    //匹配中的列表人数 Matching 
    MatchManager.prototype.get_in_match_player_count = function () {
        var count = 0;
        for (var key in this._in_match_list) {
            var player = this._in_match_list[key];
            if (player && player.get_user_state() == State_1.UserState.MatchIng) {
                count++;
            }
        }
        return count;
    };
    //从待匹配列表中将匹配完成的人删掉
    MatchManager.prototype.del_match_success_player_from_math_list = function (in_match_list) {
        if (!in_match_list) {
            in_match_list = this._in_match_list;
        }
        for (var key in in_match_list) {
            var mplayer = in_match_list[key];
            if (mplayer) {
                this.del_player_from_match_list_by_uid(mplayer.get_uid());
            }
        }
    };
    //删除匹配完成列表的人 Matching状态
    MatchManager.prototype.del_in_match_player = function (in_match_list) {
        if (!in_match_list) {
            in_match_list = this._in_match_list;
        }
        var key_set = [];
        var _this = this;
        for (var key in in_match_list) {
            var player = in_match_list[key];
            if (player) {
                player.set_user_state(State_1.UserState.InView);
                key_set.push(player.get_uid());
            }
        }
        key_set.forEach(function (uid) {
            _this.del_player_from_in_match_list_by_uid(uid);
        });
        this._in_match_list = {};
    };
    //添加到待匹配列表 Inview
    MatchManager.prototype.add_player_to_match_list = function (player) {
        if (this._match_list[player.get_uid()]) {
            Log_1["default"].info("hcc>>player uid: " + player.get_uid() + " is already in match");
            return false;
        }
        this._match_list[player.get_uid()] = player;
        player.set_user_state(State_1.UserState.InView);
        return true;
    };
    //添加到匹配完成列表中 inview-> Matching
    MatchManager.prototype.add_player_to_in_match_list = function (player) {
        if (!player) {
            return false;
        }
        if (player.get_user_state() != State_1.UserState.InView) {
            return false;
        }
        if (this.get_in_match_player_count() >= MATCH_PLAYER_COUNT) {
            return false;
        }
        if (ArrayUtil_1["default"].GetArrayLen(this._in_match_list) >= MATCH_PLAYER_COUNT) {
            return false;
        }
        this._in_match_list[player.get_uid()] = player;
        player.set_user_state(State_1.UserState.MatchIng);
        return true;
    };
    //从待匹配的列表中删除 inview
    MatchManager.prototype.del_player_from_match_list_by_uid = function (uid) {
        var player = this._match_list[uid];
        if (player) {
            player.set_user_state(State_1.UserState.InView);
            this._match_list[uid] = null;
            delete this._match_list[uid];
            return true;
        }
        return false;
    };
    //从匹配中的列表中删除 inview
    MatchManager.prototype.del_player_from_in_match_list_by_uid = function (uid) {
        var player = this._in_match_list[uid];
        if (player) {
            player.set_user_state(State_1.UserState.InView);
            this._in_match_list[uid] = null;
            delete this._in_match_list[uid];
            return true;
        }
        return false;
    };
    //用户取消匹配,从匹配队列和匹配中删掉
    MatchManager.prototype.stop_player_match = function (uid) {
        var ret = this.del_player_from_match_list_by_uid(uid);
        var ret_in = this.del_player_from_in_match_list_by_uid(uid);
        return ret || ret_in;
    };
    //计算匹配列表人数 Matching
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