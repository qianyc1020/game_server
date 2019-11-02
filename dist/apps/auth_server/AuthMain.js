"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameConf_1 = __importDefault(require("../GameConf"));
var NetBus_1 = __importDefault(require("../../netbus/NetBus"));
var Stype_1 = require("../Stype");
var AuthService_1 = __importDefault(require("./AuthService"));
var ServiceManager_1 = __importDefault(require("../../netbus/ServiceManager"));
var MySqlAuth_1 = __importDefault(require("../../database/MySqlAuth"));
var Log = require("../../utils/Log");
var auth_server = GameConf_1["default"].auth_server;
NetBus_1["default"].start_tcp_server(auth_server.host, auth_server.port, false);
ServiceManager_1["default"].register_service(Stype_1.Stype.Auth, AuthService_1["default"]);
//test database
var auth_database = GameConf_1["default"].auth_database;
MySqlAuth_1["default"].connect(auth_database.host, auth_database.port, auth_database.db_name, auth_database.uname, auth_database.upwd);
// setInterval(function(){
//     MySqlAuth.get_uinfo_by_uname_upwd("xiaoyan","111111",function(err:any,ret:any){
//         if(err){
//             Log.error("hcc>>err: " , err)
//             return;
//         }
//         Log.info("hcc>>info: " ,ret)
//     })
// },2000)
//# sourceMappingURL=AuthMain.js.map