require("../3rd/Extend.js")
var Log = require("../utils/Log.js")
var ws = require("ws");
var net = require("net");
var ProtoManager = require("../netbus/ProtoManager.js")
var Platform = require("../utils/Platform.js")
var TcpPkg = require("../netbus/TcpPkg");
var ProtoType = require("../netbus/ProtoType.js")
var netpkg = require("./netpkg.js")
var StickPackage 	 = require("stickPackage")
var recvMsgCenter = new StickPackage.msgCenter({bigEndian:false})

var local = "127.0.0.1"
var remote = "www.hccfun.com"
var hoststr = Platform.isWin32() ? local : remote
Log.info("host:" , hoststr)

var proto_type = ProtoType.PROTO_BUF;

var sock = net.connect({
	port: 6080,
	host: local,
}, function() {
	console.log('tcp connected to server!');
});

sock.on("connect",function() {
	var msgCenter = new StickPackage.msgCenter({bigEndian:false})
	console.log("tcp connect success");
	// 1, 2, body = "Hello Talk room!!!"
	var stype = 2;
	var ctype = 0;
	var utag = 0;
	var body = {
		name: "huangshucheng",
		age: 27,
		email : "827773271@qq.com",
	}
	var cmd1 = ProtoManager.encode_cmd(stype, ctype, utag, proto_type, body) 
	//粘包处理工具
 	var cmd_buf = msgCenter.publish(cmd1)
 	setInterval(function(){
		sock.write(cmd_buf);
 	},1000)
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
	recvMsgCenter.putData(data)
});
//处理粘包
recvMsgCenter.onMsgRecv(function(cmd_buf){
	Log.info("onMsgRecv receive:", cmd_buf);
	var cmd = ProtoManager.decode_cmd_header(cmd_buf);
	var body = ProtoManager.decode_cmd(proto_type, cmd_buf);
	Log.info("header: " , cmd)
	Log.info("body: " , body)

})