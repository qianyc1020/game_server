"use strict";
exports.__esModule = true;
var Room = /** @class */ (function () {
    function Room(roomid) {
        this._roomid = "";
        this._room_info = "";
        this._roomid = roomid;
    }
    Room.prototype.get_room_id = function () {
        return this._roomid;
    };
    Room.prototype.get_room_info = function () {
        return this._room_info;
    };
    return Room;
}());
exports["default"] = Room;
//# sourceMappingURL=Room.js.map