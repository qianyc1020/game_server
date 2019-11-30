"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var Platform_1 = __importDefault(require("../utils/Platform"));
var mysql = __importStar(require("mysql"));
var localhost = "127.0.0.1";
if (Platform_1["default"].isWin32()) {
    localhost = "127.0.0.1";
}
else if (Platform_1["default"].isLinux()) {
    localhost = "172.16.166.106";
}
var auth_server = {
    host: localhost,
    port: 3306,
    db_name: "auth_center",
    uname: "root",
    upwd: "123456"
};
var connection = mysql.createConnection({
    host: auth_server.host,
    port: auth_server.port,
    user: auth_server.uname,
    password: auth_server.upwd,
    database: auth_server.db_name
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected success!!! id ' + connection.threadId);
    var sql = "select * from uinfo where uid = 1";
    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
        console.log("hcc>>result: ", results);
    });
});
//# sourceMappingURL=mysql_test.js.map