"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Room_1 = __importDefault(require("./Room"));
var ArrayUtil_1 = __importDefault(require("../../../utils/ArrayUtil"));
var StringUtil_1 = __importDefault(require("../../../utils/StringUtil"));
var Log_1 = __importDefault(require("../../../utils/Log"));
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
            Log_1["default"].warn("alloc_room: room is exist!!!!");
            return this._room_set[roomid];
        }
        var room = new Room_1["default"](roomid);
        this._room_set[roomid] = room;
        Log_1["default"].info("creat room success roomid: ", roomid, " ,roomCount: ", this.get_room_count());
        return room;
    };
    //用roomid获取房间
    RoomManager.prototype.get_room_by_roomid = function (roomid) {
        if (this._room_set[roomid]) {
            return this._room_set[roomid];
        }
        return null;
    };
    RoomManager.prototype.delete_room = function (roomid) {
        if (this._room_set[roomid]) {
            delete this._room_set[roomid];
            Log_1["default"].info("delete_room:", roomid, "success, roomCount: ", this.get_room_count());
            return true;
        }
        else {
            Log_1["default"].warn("delete_room:", roomid, "is not in game server!!!!");
            return false;
        }
    };
    RoomManager.prototype.get_room_count = function () {
        return ArrayUtil_1["default"].GetArrayLen(this._room_set);
    };
    //uid 获取room, 用来判断玩家是否在房间里，或者已经创建了一个房间
    RoomManager.prototype.get_room_by_uid = function (uid) {
        for (var key in this._room_set) {
            var room = this._room_set[key];
            if (room.is_player_in_room(uid)) {
                return room;
            }
        }
        return null;
    };
    RoomManager.Instance = new RoomManager();
    return RoomManager;
}());
exports["default"] = RoomManager;
//# sourceMappingURL=RoomManager.js.map