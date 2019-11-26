import {Stype,StypeName} from "./protocol/Stype"
import Platform from "../utils/Platform"

var localhost = "127.0.0.1"
var wss_port = 6081;

if(Platform.isWin32()){
	localhost = "127.0.0.1"
	wss_port = 6081;
}else if(Platform.isLinux()){
	localhost = "172.16.166.106"
	wss_port = 6061;
}

// websocket wss://172.16.166.106:6061 阿里云服务内网端口
// 6061 服务端内网端口
// 6081 服务端wss外网端口(nginx.conf外网配置)

var GameConf: any = {
	gateway_config: {
		host: localhost,
		tcp_port: 6080,
		wbsocket_port: wss_port, 
	},

	webserver: {
		host: localhost,
		port: 10001,
	},

	game_system_server: {
		host: localhost,
		port: 6087,
		stypes: [Stype.GameSystem],
	},

	game_server: {
		host: localhost,
		port: 6088,
		stypes: [Stype.GameHoodle],
	},

	game_database: {
		host: localhost,
		port: 3306,
		db_name: "moba_game",
		uname: "root",
		upwd: "123456",
	},

	auth_server: {
		host: localhost,
		port: 6086,
		stypes: [Stype.Auth],
	},

	auth_database: {
		host: localhost,
		port: 3306,
		db_name: "auth_center",
		uname: "root",
		upwd: "123456",
	},

	auth_redis: {
		host: localhost,
		port: 6379,
		db_index: 0,
	},

	game_redis: {
		host: localhost,
		port: 6379,
		db_index: 1,
	},

	// 代码来生成
	gw_connect_servers: {
		[1]: {
			stype: Stype.Auth,
			host: localhost,
			port: 6086,
		},

		[2]: {
			stype: Stype.GameHoodle,
			host: localhost,
			port: 6088,
		},
	},
};

export default GameConf;