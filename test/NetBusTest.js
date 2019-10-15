var NetBus 				= require("../netbus/NetBus")
var ServiceTest 		= require("./ServiceTest.js")
var ServiceManager 		= require("../netbus/ServiceManager.js")
var GameConf 			= require("../apps/GameConf.js")

ServiceManager.register_service(1,ServiceTest)

NetBus.start_ws_server(GameConf.gateway_config.host , "6081")
NetBus.start_tcp_server(GameConf.gateway_config.host , "6080")
