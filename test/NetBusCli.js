require("../3rd/Extend.js")
var Log = require("../utils/Log.js")
var ws = require("ws");
var ProtoManager = require("../netbus/ProtoManager.js")

// url ws://127.0.0.1:6080
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws("ws://127.0.0.1:6081");
sock.on("open", function () {
	Log.info("connect success !!!!");
	var stype = 1;
	var ctype = 1;
	var utag = 0;
	var proto_type = 1;
	var body = "huangshucheng"
	var cmd = ProtoManager.encode_cmd(stype, ctype, utag, proto_type, body) 
	sock.send(cmd);
	// sock.send("HelloWorld1");
});

sock.on("error", function(err) {
	Log.info("error: ", err);
});

sock.on("close", function() {
	Log.info("close");
});

sock.on("message", function(data) {
	Log.info(data);
});
