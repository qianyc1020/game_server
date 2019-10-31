"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log = require("../utils/Log");
var ws = require("ws");
var ProtoManager_1 = __importDefault(require("../netbus/ProtoManager"));
var Platform_1 = __importDefault(require("../utils/Platform"));
var local = "ws://127.0.0.1:6081";
var remote = "ws://www.hccfun.com:6081";
var hoststr = Platform_1.default.isWin32() ? local : remote;
Log.info(hoststr);
var sock = new ws(local);
var proto_type = 2;
sock.on("open", function () {
    Log.info("connect success !!!!");
    var stype = 2;
    var ctype = 1;
    var utag = 0;
    var body = {
        name: "huangshucheng websocket",
        age: 27,
        email: "827773271@qq.com",
    };
    var cmd = ProtoManager_1.default.encode_cmd(stype, ctype, utag, proto_type, body);
    setInterval(function () {
        sock.send(cmd);
    }, 1000);
});
sock.on("error", function (err) {
    Log.info("error: ", err);
});
sock.on("close", function () {
    Log.info("close");
});
sock.on("message", function (data) {
    Log.info("receive:", ProtoManager_1.default.decode_cmd(proto_type, data));
});
//# sourceMappingURL=NetBusCliWs.js.map