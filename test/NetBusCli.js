require("../3rd/Extend.js")
var Log = require("../utils/Log.js")
var ws = require("ws");
var ProtoManager = require("../netbus/ProtoManager.js")
var Platform = require("../utils/Platform.js")

var hoststr = Platform.isWin32() ? "ws://127.0.0.1:6081" : "ws://www.hccfun.com:6081";
Log.info(hoststr)

var sock = new ws(hoststr);

sock.on("open", function () {
	Log.info("connect success !!!!");
	var stype = 1;
	var ctype = 1;
	var utag = 0;
	var proto_type = 1;
	var body = "huangshucheng"
	var cmd = ProtoManager.encode_cmd(stype, ctype, utag, proto_type, body) 
	sock.send(cmd);
});

sock.on("error", function(err) {
	Log.info("error: ", err);
});

sock.on("close", function() {
	Log.info("close");
});

sock.on("message", function(data) {
	var proto_type = 1;
	Log.info(ProtoManager.decode_cmd(proto_type,data));
});
