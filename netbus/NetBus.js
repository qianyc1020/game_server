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
//开启tcpserver
function start_tcp_server(ip, port, is_encrypt) {
	Log.info("start tcp server ..", ip, port);
	var server = net.createServer(function(client_session) { 
		on_session_enter(client_session, false, is_encrypt);
		tcp_add_client_session_event(client_session);
	});
	// 监听发生错误的时候调用
	server.on("error", function() {
		Log.error("tcp server listen error");
	});

	server.on("close", function() {
		Log.error("tcp server listen close");
	});

	server.listen({
		host: ip,
		port: port,
		exclusive: true,
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

//websocket 客户端session事件
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

//tcp 客户端session事件
function tcp_add_client_session_event(session) {
	session.on("close", function() {
		on_session_exit(session);
		session.end();
	});

	session.on("error", function(err) {
		on_session_exit(session);
		session.end();
	});

	session.on("data", function(data) {
		if (!Buffer.isBuffer(data)) {
			session_close(session);
			return;
		}
		var last_pkg = handle_package_data(session.last_pkg, data,function(cmd_buf){
			on_session_recv_cmd(session, cmd_buf);
		})
		session.last_pkg = last_pkg;
		Log.info("last_pkg: " + last_pkg)
	});

}

//接收客户端数据
function on_session_recv_cmd(session, str_or_buf) {
	if(!ServiceManager.on_recv_client_cmd(session, str_or_buf)) {
		session_close(session);
	}
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
	Log.info("send_cmd: " , cmd)
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

//粘包处理
function handle_package_data(last_package, recv_data, cmd_callback){
	if(!recv_data){
		return null;
	}
	
	var last_pkg = last_package;
	var data 	 = recv_data;
	Log.info("hcc>>last_pkg , data111: " , last_pkg , data)
	if (last_pkg != null) { // 上一次剩余没有处理完的半包;
		last_pkg = Buffer.concat([last_pkg, data], last_pkg.length + data.length);
	}
	else {
		last_pkg = data
	}
	
	Log.info("hcc>>last_pkg , data222: " , last_pkg , data)
	
	var offset = 0;
	var pkg_len = TcpPkg.read_pkg_size(last_pkg, offset);
	if (pkg_len < 0) {
		return null;
	}

	Log.info("hcc>>offset: " + offset)
	var HEAD_LEN = 2; // 2个长度信息
	while(offset + pkg_len <= last_pkg.length) { // 判断是否有完整的包;
		// 根据长度信息来读取数据
		var cmd_buf = null; 
		// 收到了一个完整的数据包
		cmd_buf = Buffer.allocUnsafe(pkg_len - HEAD_LEN); 
		last_pkg.copy(cmd_buf, 0, offset + HEAD_LEN, offset + pkg_len);	
		if (cmd_callback){
			cmd_callback(cmd_buf)
		}

		offset += pkg_len;
		if (offset >= last_pkg.length) { // 正好包处理完了
			break;
		}

		pkg_len = TcpPkg.read_pkg_size(last_pkg, offset);
		Log.info("hcc>>offset1: " , offset)
		if (pkg_len < 0) {
			break;
		}
	}

	// 能处理的数据包已经处理完成了,保存 0.几个包的数据
	if (offset >= last_pkg.length) {
		last_pkg = null;
	}
	else { // offset, length这段数据拷贝到新的Buffer里面
		var buf = Buffer.allocUnsafe(last_pkg.length - offset);
		last_pkg.copy(buf, 0, offset, last_pkg.length);
		last_pkg = buf;
	}
	return last_pkg
}

var NetBus = {
	start_ws_server: start_ws_server,
	start_tcp_server: start_tcp_server,
	session_close: session_close,
}

module.exports = NetBus;