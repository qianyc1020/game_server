var Stype 	 = require("./Stype.js");
var Log 	 = require("../utils/Log.js")
var Platform = require("../utils/Platform.js")

var localhost = "127.0.0.1"

if(Platform.isWin32()){
	localhost = "127.0.0.1"
}else if(Platform.isLinux()){
	localhost = "172.16.166.106"
}

var GameConf = {
	gateway_config: {
		host: localhost,
		ports: [6080,6081], //tcp , ws
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

	// game_server: {
	// 	host: localhost,
	// 	port: 6088,
	// 	stypes: [Stype.Game5Chess],
	// },

	game_database: {
		host: localhost,
		port: 3306,
		db_name: "game_database",

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
		1: {
			stype: Stype.Auth,
			host: localhost,
			port: 6086,
		},

		// 2: {
		// 	stype: Stype.GameSystem,
		// 	host: localhost,
		// 	port: 6087,
		// },
	},
};

module.exports = GameConf;