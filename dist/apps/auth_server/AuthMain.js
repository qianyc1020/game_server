"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameConf_1 = __importDefault(require("../GameConf"));
var NetBus_1 = __importDefault(require("../../netbus/NetBus"));
var AuthService_1 = __importDefault(require("./AuthService"));
var ServiceManager_1 = __importDefault(require("../../netbus/ServiceManager"));
var MySqlAuth_1 = __importDefault(require("../../database/MySqlAuth"));
var Stype_1 = require("../protocol/Stype");
var Log = require("../../utils/Log");
var auth_server = GameConf_1["default"].auth_server;
NetBus_1["default"].start_tcp_server(auth_server.host, auth_server.port, false);
ServiceManager_1["default"].register_service(Stype_1.Stype.Auth, AuthService_1["default"]);
//test database
var db_auth = GameConf_1["default"].auth_database;
MySqlAuth_1["default"].connect(db_auth.host, db_auth.port, db_auth.db_name, db_auth.uname, db_auth.upwd);
//# sourceMappingURL=AuthMain.js.map