var Log 		= require("../../utils/Log.js")
var NetBus 		= require("../../netbus/NetBus.js")
var ProtoTools 	= require("../../netbus/ProtoTools.js")
var Stype 		= require("../Stype.js")

var uid_session_map = {}; //保存已经登录过的玩家 uid-> session

var GatewayService = {
	name: "GatewayService", // 服务名称
	is_transfer: true, 		// 是否为转发模块,

	// 收到客户端发来的数据
	on_recv_player_cmd: function(session, stype, ctype, utag, proto_type, body, raw_cmd) {
		on_recv_player_cmd(session, stype, ctype, utag, proto_type, body, raw_cmd)	
	},

	// 收到连接的服务发过来的数据;
	on_recv_server_return: function(session, stype, ctype, utag, proto_type, body, raw_cmd) {
		on_recv_server_return(session, stype, ctype, utag, proto_type, body, raw_cmd)
	}, 

	// 收到客户端断开连接;
	on_player_disconnect: function(stype, session) {
		on_player_disconnect(stype,session)
	},
};

//客户端转发到服务器
function on_recv_player_cmd(session, stype, ctype, utag, proto_type, body, raw_cmd){
	Log.info("on_recv_player_cmd:", stype, ctype, utag, proto_type, body, raw_cmd)
	var server_session = NetBus.get_server_session(stype);
	if (!server_session) {
		return;
	}
	// 打入能够标识client的utag, uid, session.session_key,
	if(is_befor_login_cmd(stype, ctype)) { //还没登录
		utag = session.session_key;	
	}
	else { //登录过了
		if(session.uid === 0) {
			return;
		}
		utag = session.uid;
	}

	ProtoTools.write_utag_inbuf(raw_cmd, utag);
	server_session.send_encoded_cmd(raw_cmd);
}
//服务器转发到客户端
function on_recv_server_return(session, stype, ctype, utag, proto_type, body, raw_cmd){
	Log.info("on_recv_server_return:", stype, ctype, utag, proto_type, body, raw_cmd)
	var client_session = null;
	if (is_befor_login_cmd()) { // 还没登录,utag == session.session_key
		client_session = NetBus.get_client_session(utag);
		if (!client_session) {
			return;
		}
		if (is_login_cmd(stype, ctype)) {
			var body = ProtoManager.decode_cmd(proto_type, raw_cmd);
			if (body.status == Respones.OK) {
				// 以前你登陆过,发送一个命令给这个客户端，告诉它说以前有人登陆
				var prev_session = get_session_by_uid(body.uid);
				if (prev_session) {
					// prev_session.send_cmd(stype, Cmd.Auth.RELOGIN, null, 0, prev_session.proto_type); // TODO
					prev_session.uid = 0; // 可能会有隐患，是否通知其它的服务 TODO
					NetBus.session_close(prev_session);
				}
				client_session.uid = body.uid;
				save_session_with_uid(body.uid, client_session, proto_type);
				body.uid = 0;
				raw_cmd = ProtoManager.encode_cmd(stype, ctype, utag, proto_type, body);
			} 
		}
	}else{ //已经登录,utag == uid
		client_session = get_session_by_uid(utag);
		if (!client_session) {
			return;
		}
	}

	if (client_session){
		ProtoTools.clear_utag_inbuf(raw_cmd);
		client_session.send_encoded_cmd(raw_cmd);
	}
}
//玩家掉线
function on_player_disconnect(stype, session) {
	Log.info("on_player_disconnect")
	if (stype == Stype.Auth) { // 由Auth服务保存的，那么我们就由Auth清空
			clear_session_with_uid(uid);
		}

	var server_session = netbus.get_server_session(stype);
	if (!server_session) {
		return;
	}
	
	// 客户端被迫掉线
	// var utag = uid;
	// server_session.send_cmd(stype, Cmd.USER_DISCONNECT, null, utag, proto_man.PROTO_JSON);
}
//还没登录
function is_befor_login_cmd(stype, ctype){
	return true; // TODO
}

function is_login_cmd(){
	return false; // TODO
}

//返回登录过的玩家的UID
function get_session_by_uid(uid) {
	return uid_session_map[uid];
}
//保存登录过的玩家的 uid->session
function save_session_with_uid(uid, session, proto_type) {
	uid_session_map[uid] = session;
	session.proto_type = proto_type;
}
//清理session
function clear_session_with_uid(uid) {
	uid_session_map[uid] = null;
	delete uid_session_map[uid];
}

module.exports = GatewayService;
