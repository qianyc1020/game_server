"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Room_1 = __importDefault(require("./Room"));
var ArrayUtil_1 = __importDefault(require("../../../utils/ArrayUtil"));
var StringUtil_1 = __importDefault(require("../../../utils/StringUtil"));
var Log = require("../../../utils/Log");
var RoomManager = /** @class */ (function () {
    function RoomManager() {
        this._room_set = {}; //roomid-->room
    }
    RoomManager.getInstance = function () {
        return RoomManager.Instance;
    };
    RoomManager.prototype.generate_roomid = function () {
        var roomid = StringUtil_1["default"].random_int_str(6);
        if (!this._room_set[roomid]) {
            return roomid;
        }
        else {
            return this.generate_roomid();
        }
    };
    RoomManager.prototype.alloc_room = function () {
        var roomid = this.generate_roomid();
        if (this._room_set[roomid]) {
            Log.warn("alloc_room: room is exist!!!!");
            return this._room_set[roomid];
        }
        var room = new Room_1["default"](roomid);
        this._room_set[roomid] = room;
        Log.info("creat room success ,roomCount: ", this.get_room_count());
        return room;
    };
    RoomManager.prototype.get_room = function (roomid) {
        if (this._room_set[roomid]) {
            return this._room_set[roomid];
        }
        return null;
    };
    // is_player_already_in_room(){
    // }
    RoomManager.prototype.delete_room = function (roomid) {
        if (this._room_set[roomid]) {
            this._room_set[roomid] = null;
            delete this._room_set[roomid];
        }
        else {
            Log.warn("delete_room:", roomid, "is not in game server!!!!");
        }
    };
    RoomManager.prototype.get_room_count = function () {
        return ArrayUtil_1["default"].GetArrayLen(this._room_set);
    };
    RoomManager.Instance = new RoomManager();
    return RoomManager;
}());
exports["default"] = RoomManager;
//# sourceMappingURL=RoomManager.js.map