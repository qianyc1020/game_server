"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var net = require("net");
var ProtoManager_1 = __importDefault(require("../netbus/ProtoManager"));
var Platform_1 = __importDefault(require("../utils/Platform"));
var TcpPkg_1 = __importDefault(require("../netbus/TcpPkg"));
var Log_1 = __importDefault(require("../utils/Log"));
var local = "127.0.0.1";
var remote = "www.hccfun.com";
var hoststr = Platform_1["default"].isWin32() ? local : remote;
Log_1["default"].info("host:", hoststr);
var proto_type = 1;
var sock = net.connect({
    port: 6080,
    host: local
}, function () {
    console.log('tcp connected to server!');
});
sock.on("connect", function () {
    console.log("tcp connect success");
    // 1, 2, body = "Hello Talk room!!!"
    var stype = 2;
    var ctype = 1;
    var utag = 0;
    var body = {
        name: "huangshucheng tcpsocket",
        age: 27,
        email: "827773271@qq.com"
    };
    var cmd1 = ProtoManager_1["default"].encode_cmd(stype, ctype, utag, proto_type, body);
    var pkg_cmd = TcpPkg_1["default"].package_data(cmd1);
    //粘包处理工具
    //  var cmd_buf = msgCenter.publish(cmd1)
    Log_1["default"].info("data send: ", pkg_cmd);
    setInterval(function () {
        sock.write(pkg_cmd);
    }, 1000);
});
sock.on("error", function (e) {
    Log_1["default"].info("error", e);
});
sock.on("close", function () {
    Log_1["default"].info("close");
});
sock.on("end", function () {
    Log_1["default"].info("end event");
});
sock.on("data", function (cmd_buf) {
    // var cmd = ProtoManager.decode_cmd_header(cmd_buf);
    // var body = ProtoManager.decode_cmd(proto_type, cmd_buf);
    // Log.info("header: " , cmd)
    // Log.info("body: " , body)
    Log_1["default"].info("recv: ", cmd_buf);
});
//# sourceMappingURL=NetBusCliTcp_TcpPkg.js.map