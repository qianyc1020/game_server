var GameConf 	= require("../GameConf.js")
var NetBus 		= require("../../netbus/NetBus.js")
var Stype 		= require("../Stype.js")
var AuthService = require("./AuthService.js");
var ServiceManager = require("../../netbus/ServiceManager.js")
var MySqlAuthCenter = require("../../database/MySqlAuthCenter")
var Log = require("../../utils/Log.js")

var auth_server = GameConf.auth_server;
NetBus.start_tcp_server(auth_server.host, auth_server.port, false);

ServiceManager.register_service(Stype.Auth, AuthService);

//test
// var auth_database = GameConf.auth_database;
// MySqlAuthCenter.connect(auth_database.host,auth_database.port,auth_database.db_name,auth_database.uname,auth_database.upwd)
// MySqlAuthCenter.get_uinfo_by_uname_upwd("test1111","111111",function(errcode,ret){
//     Log.info("mysql: " , errcode , ret)
// })
