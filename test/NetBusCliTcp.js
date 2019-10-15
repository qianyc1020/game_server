require("../3rd/Extend.js")
var Log = require("../utils/Log.js")
var ws = require("ws");
var net = require("net");
var ProtoManager = require("../netbus/ProtoManager.js")
var Platform = require("../utils/Platform.js")
var TcpPkg = require("../netbus/TcpPkg");
var ProtoType = require("../netbus/ProtoType.js")

var local = "127.0.0.1"
var remote = "www.hccfun.com"
var hoststr = Platform.isWin32() ? local : remote
Log.info("host:" , hoststr)

var sock = net.connect({
	port: 6080,
	host: local,
}, function() {
	console.log('tcp connected to server!');
});

sock.on("connect",function() {
	console.log("tcp connect success");
	// 1, 2, body = "Hello Talk room!!!"
	var stype = 1;
	var ctype = 1;
	var utag = 0;
	var proto_type = ProtoType.PROTO_JSON;
	var body = "test-tcp-client-hcc"
	var cmd = ProtoManager.encode_cmd(stype, ctype, utag, proto_type, body) 
	var cmd_buf = TcpPkg.package_data(cmd);
	sock.write(cmd_buf);
});

sock.on("error", function(e) {
	Log.info("error", e);
});


sock.on("close", function() {
	Log.info("close");
});


sock.on("end", function() {
	Log.info("end event");
});

sock.on("data", function(data) {
	var proto_type = 1;
	Log.info("tcp receive:", data); //TODO 粘包
});