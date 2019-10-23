var Log = require("../../utils/Log.js")
var ProtoCmd = require("../ProtoCmd.js")
var AuthProto = require("./AuthProto.js")

var AuthService = {
	name: "AuthService", // 服务名称
	is_transfer: false, // 是否为转发模块,

	// 收到客户端发来的数据
	on_recv_player_cmd: function(session, stype, ctype, utag, proto_type, body, raw_cmd) {
		Log.info("on_recv_player_cmd:", ProtoCmd.getProtoName(stype) + ",", ProtoCmd.getCmdName(stype,ctype)+ ",", "utag:" + utag+ "," , body)
		var resbody = {status:1}
		session.send_cmd(stype,1,utag,proto_type,resbody)
	},

	// 收到连接的服务发过来的数据;
	on_recv_server_return: function (session, stype, ctype, utag, proto_type, body, raw_cmd) {
	}, 

	// 收到客户端断开连接;
	on_player_disconnect: function(stype, session) {
		Log.info("on_player_disconnect")
	},
};

module.exports = AuthService;
