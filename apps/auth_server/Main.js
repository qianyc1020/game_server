var GameConf 	= require("../GameConf.js")
var NetBus 		= require("../../netbus/NetBus.js")
var Stype 		= require("../Stype.js")
var AuthService = require("./AuthService.js");
var ServiceManager = require("../../netbus/ServiceManager.js")

var auth_server = GameConf.auth_server;
NetBus.start_tcp_server(auth_server.host, auth_server.port, false);

ServiceManager.register_service(Stype.Auth, AuthService);
