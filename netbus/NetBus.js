require("../3rd/Extend")
var Log 	= require("../utils/Log")
var ws 		= require("ws");
var net 	= require("net");
var TcpPkg 	= require("./TcpPkg")

var ProtoManager	 = require("./ProtoManager")
var ServiceManager 	 = require("./ServiceManager")

var global_session_list = {};
var global_seesion_key 	= 1;

//开启webserver
function start_ws_server(ip, port, is_encrypt) {
	Log.info("start ws server ..", ip, port);
	var server = new ws.Server({
		host: ip,
		port: port,
	});

	server.on("connection", function(client_session){
		on_session_enter(client_session, true, is_encrypt);
		ws_add_client_session_event(client_session);
	});

	server.on("error", function(err){
		Log.error("ws server listen error!!");
	});

	server.on("close", function(err){
		Log.error("ws server listen close!!");
	});
}

// 有客户端的session接入进来
function on_session_enter(session, is_ws, is_encrypt) {
	if (is_ws) {
		Log.info("websocket session enter", session._socket.remoteAddress, session._socket.remotePort);
	}
	else {
		Log.info("tcpsocket session enter", session.remoteAddress, session.remotePort);	
	}
	
	session.uid 			= 0; 					// 用户的UID
	session.last_pkg 		= null; 				// 表示我们存储的上一次没有处理完的TCP包;
	session.is_connected 	= true; 				// 是否连接成功
	session.is_ws 			= is_ws; 				// 是否websocket
	session.is_encrypt 		= is_encrypt; 			// 是否数据加密

	// 扩展session方法
	session.send_encoded_cmd 	= session_send_encoded_cmd;
	session.send_cmd 			= session_send_cmd;

	// 加入到serssion 列表
	global_session_list[global_seesion_key] = session;
	session.session_key = global_seesion_key;
	global_seesion_key ++;
}

// 如果是json协议 str_or_buf json字符串;
// 如果是protobuf协议 str_or_buf Buffer对象;
function on_session_recv_cmd(session, str_or_buf) {
	if(!ServiceManager.on_recv_client_cmd(session, str_or_buf)) {
		session_close(session);
	}
}

//客户端session事件
function ws_add_client_session_event(session) {
	session.on("close", function() {
		on_session_exit(session);
		session.close();
	});

	session.on("error", function(err) {
		on_session_exit(session);
		session.close();
	});

	session.on("message", function(data) {
		if (!Buffer.isBuffer(data)) {
			session_close(session);
			return;
		}
		on_session_recv_cmd(session, data);
	});
}

// session退出
function on_session_exit(session) {
	session.is_connected = false;
	ServiceManager.on_client_lost_connect(session);
	session.last_pkg = null; 
	if (global_session_list[session.session_key]) {
		global_session_list[session.session_key] = null;
		delete global_session_list[session.session_key];
		session.session_key = null;
	}
}

// 关闭session
function session_close(session) {
	if (!session.is_ws) {
		session.end();
		return;
	}
	else {
		session.close();
	}
}
//发送数据包
function session_send_cmd(stype, ctype, utag, proto_type, body) {
	if (!this.is_connected) {
		return;
	}
	
	var cmd = null;
	cmd = ProtoManager.encode_cmd(stype, ctype, utag, proto_type, body);
	if (cmd) {
		this.send_encoded_cmd(cmd);
	}
}

function session_send_encoded_cmd(cmd) {
	if (!this.is_connected) {
		return;
	}

	if(this.is_encrypt) {
		cmd = ProtoManager.encrypt_cmd(cmd);	
	}
	
	if (!this.is_ws) {
		var data = TcpPkg.package_data(cmd);
		this.write(data);
		return;
	}
	else {
		this.send(cmd);
	}
}

function on_recv_cmd_server_return(session, str_or_buf) {
	if(!ServiceManager.on_recv_server_return(session, str_or_buf)) {
		session_close(session);
	}
}

var NetBus = {
	start_ws_server: start_ws_server,
}

module.exports = NetBus;