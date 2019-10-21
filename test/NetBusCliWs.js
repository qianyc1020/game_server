require("../3rd/Extend.js")
var Log = require("../utils/Log.js")
var ws = require("ws");
var ProtoManager = require("../netbus/ProtoManager.js")
var Platform = require("../utils/Platform.js")

var local = "ws://127.0.0.1:6081"
var remote = "ws://www.hccfun.com:6081"
var hoststr = Platform.isWin32() ? local : remote
Log.info(hoststr)

var sock = new ws(remote);

sock.on("open", function () {
	Log.info("connect success !!!!");
	var stype = 1;
	var ctype = 1;
	var utag = 0;
	var proto_type = 1;
	var body = "huangshucheng"
	var cmd = ProtoManager.encode_cmd(stype, ctype, utag, proto_type, body) 
	// sock.send(cmd);	
	setInterval(function(){
		sock.send(cmd);	
	},100)
});

sock.on("error", function(err) {
	Log.info("error: ", err);
});

sock.on("close", function() {
	Log.info("close");
});

sock.on("message", function(data) {
	var proto_type = 1;
	Log.info("receive:", ProtoManager.decode_cmd(proto_type,data));
});

Log.info("1111")