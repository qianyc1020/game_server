"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var NetBus_1 = __importDefault(require("../../../netbus/NetBus"));
var Player = /** @class */ (function () {
    function Player(session, uid, proto_type) {
        this._uid = 0;
        this._session = null;
        this._proto_type = -1;
        this._ugame_info = null;
        this._ucenter_info = null;
        this._session = session;
        this._uid = uid;
        this._proto_type = proto_type;
    }
    Player.prototype.init_session = function (session, uid, proto_type) {
        this._session = session;
        this._uid = uid;
        this._proto_type = proto_type;
    };
    Player.prototype.set_ugame_info = function (ugame_info) {
        this._ugame_info = ugame_info;
    };
    Player.prototype.set_ucenter_info = function (ucenter_info) {
        this._ucenter_info = ucenter_info;
    };
    Player.prototype.get_ugame_info = function () {
        return this._ugame_info;
    };
    Player.prototype.get_ucenter_info = function () {
        return this._ucenter_info;
    };
    Player.prototype.send_cmd = function (stype, ctype, body) {
        if (!this._session) {
            return;
        }
        NetBus_1["default"].send_cmd(this._session, stype, ctype, this._uid, this._proto_type, body);
    };
    return Player;
}());
exports["default"] = Player;
//# sourceMappingURL=Player.js.map