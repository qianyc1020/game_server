"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var StringUtil_1 = __importDefault(require("../utils/StringUtil"));
var room_set = {
    0: "000000",
    1: "111111"
};
var index = 0;
function generate_roomid() {
    // let roomid = StringUtil.random_int_str(6);
    if (index <= 1) {
        roomid = room_set[index];
    }
    else {
        roomid = StringUtil_1["default"].random_int_str(6);
    }
    if (!indexof(roomid)) {
        index++;
        return roomid;
    }
    else {
        index++;
        return generate_roomid();
    }
}
function indexof(id) {
    for (var key in room_set) {
        if (room_set[key] == id) {
            return true;
        }
    }
    return false;
}
var roomid = generate_roomid();
console.log("roomid: ", roomid);
//# sourceMappingURL=test_gen_room.js.map