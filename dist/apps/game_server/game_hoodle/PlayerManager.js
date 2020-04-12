"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Player_1 = __importDefault(require("./Player"));
var ArrayUtil_1 = __importDefault(require("../../../utils/ArrayUtil"));
var Log_1 = __importDefault(require("../../../utils/Log"));
var PlayerManager = /** @class */ (function () {
    function PlayerManager() {
        this._player_set = {}; //uid-->Player
    }
    PlayerManager.getInstance = function () {
        return PlayerManager.Instance;
    };
    PlayerManager.prototype.alloc_player = function (session, uid, proto_type, callback) {
        var player = this._player_set[uid];
        if (player) {
            Log_1["default"].warn("alloc_player>> user: ", uid, " is exist!!!!");
            player.init_session(session, uid, proto_type, callback);
            return;
        }
        var p = new Player_1["default"]();
        this._player_set[uid] = p;
        p.init_session(session, uid, proto_type, callback);
    };
    PlayerManager.prototype.get_player = function (uid) {
        if (this._player_set[uid]) {
            return this._player_set[uid];
        }
        return null;
    };
    PlayerManager.prototype.delete_player = function (uid) {
        if (this._player_set[uid]) {
            this._player_set[uid] = null;
            delete this._player_set[uid];
            // Log.info("delete player uid: " , uid ," success, playercount: " , this.get_player_count())
            return true;
        }
        // Log.warn("delete_player error:", uid, "is not in game server!!!!");
        return false;
    };
    PlayerManager.prototype.get_player_count = function () {
        return ArrayUtil_1["default"].GetArrayLen(this._player_set);
    };
    PlayerManager.Instance = new PlayerManager();
    return PlayerManager;
}());
exports["default"] = PlayerManager;
//# sourceMappingURL=PlayerManager.js.map