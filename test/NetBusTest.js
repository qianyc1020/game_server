var NetBus = require("../netbus/NetBus")
var ServiceTest = require("./ServiceTest.js")
var ServiceManager = require("../netbus/ServiceManager.js")

ServiceManager.register_service(1,ServiceTest)

NetBus.start_ws_server("127.0.0.1" , "6081")

//tststst