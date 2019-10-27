var Log = require("../utils/Log")
var ws = require("ws");

import ProtoManager from "../netbus/ProtoManager"
import Platform from "../utils/Platform"

var local = "ws://127.0.0.1:6081"
var remote = "ws://www.hccfun.com:6081"
var hoststr = Platform.isWin32() ? local : remote
Log.info(hoststr)

var sock = new ws(local);

var proto_type = 2;
sock.on("open", function () {
	Log.info("connect success !!!!");
	var stype = 2;
	var ctype = 0;
	var utag = 0;
	var body = {
		name: "huangshucheng websocket",
		age: 27,
		email : "827773271@qq.com",
	}
	var cmd = ProtoManager.encode_cmd(stype, ctype, utag, proto_type, body) 
	setInterval(function(){
		sock.send(cmd);	
	},1000)
});

sock.on("error", function(err) {
	Log.info("error: ", err);
});

sock.on("close", function() {
	Log.info("close");
});

sock.on("message", function(data) {
	Log.info("receive:", ProtoManager.decode_cmd(proto_type,data));
});