import GameConf from "../GameConf"
import NetBus from "../../netbus/NetBus"
import {Stype,StypeName} from "../Stype"
import AuthService from "./AuthService"
import ServiceManager from "../../netbus/ServiceManager"
import MySqlAuth from "../../database/MySqlAuth"

var Log = require("../../utils/Log")

var auth_server = GameConf.auth_server;
NetBus.start_tcp_server(auth_server.host, auth_server.port, false);

ServiceManager.register_service(Stype.Auth, AuthService);

//test database
var db_auth = GameConf.auth_database;
MySqlAuth.connect(db_auth.host, db_auth.port, db_auth.db_name, db_auth.uname, db_auth.upwd)
