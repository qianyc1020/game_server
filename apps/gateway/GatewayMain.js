var GameConf 	= require("../GameConf.js")
var NetBus 		= require("../../netbus/NetBus.js")
var Stype 		= require("../Stype.js")
var GatewayService = require("./GatewayService.js")
var ServiceManager = require("../../netbus/ServiceManager.js")

var host 	= GameConf.gateway_config.host;
var posts 	= GameConf.gateway_config.ports;

NetBus.start_tcp_server(host,posts[0],false)
NetBus.start_ws_server(host,posts[1],false)

// 链接其他服务器
var game_server = GameConf.gw_connect_servers;
for(var key in game_server) {
	NetBus.connect_tcp_server(game_server[key].stype, game_server[key].host, game_server[key].port, false);
	ServiceManager.register_service(game_server[key].stype, GatewayService);
}