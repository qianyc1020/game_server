var NetBus = require("../netbus/NetBus")
var ServiceTest = require("./ServiceTest.js")
var ServiceManager = require("../netbus/ServiceManager.js")

ServiceManager.register_service(1,ServiceTest)

NetBus.start_ws_server("172.16.166.106" , "6081")
