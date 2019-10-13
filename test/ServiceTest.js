var Log = require("../utils/Log.js")

var service = {
	name: "talk room", // 服务名称
	is_transfer: false, // 是否为转发模块
	// 每个服务收到数据的时候调用
	on_recv_player_cmd: function(session, stype, ctype, utag, proto_type, body ,raw_cmd) {
		Log.info(stype, ctype, utag, proto_type, body);	
		session.send_cmd(stype,ctype,utag,proto_type,body)
	},
	// 每个服务连接丢失后调用,被动丢失连接
	on_player_disconnect: function(stype, session) {
		Log.warn("lost connet with gateway:", stype);
	},
};

module.exports = service;
