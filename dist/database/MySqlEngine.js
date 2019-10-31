"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = __importStar(require("mysql"));
var Log = require("../utils/Log");
var MySqlEngine = /** @class */ (function () {
    function MySqlEngine() {
        this._host = "";
        this._port = 0;
        this._db_name = "";
        this._uname = "";
        this._upwd = "";
    }
    MySqlEngine.prototype.connect = function (host, port, db_name, uname, upwd) {
        this._host = host;
        this._port = port;
        this._db_name = db_name;
        this._uname = uname;
        this._upwd = upwd;
        this._conn_pool = mysql.createPool({
            host: host,
            port: port,
            database: db_name,
            user: uname,
            password: upwd,
        });
        this._conn_pool.on('acquire', function (connection) {
            // Log.info('pool111 %d acquired', connection.threadId);
        });
        this._conn_pool.on('connection', function () {
            // Log.info('pool222 create one connection');
        });
        //当一个回掉压入队伍等待连接的时候触发入队事件
        this._conn_pool.on('enqueue', function () {
            // Log.info('pool333 qnqueue');
        });
        this._conn_pool.on('release', function (connection) {
            // Log.info('pool444 Connection %d released', connection.threadId);
        });
    };
    //查询sql，直接使用Pool.query接口，自动帮你release
    MySqlEngine.prototype.mysql_query = function (sql, callback) {
        this._conn_pool.query(sql, function (sql_err, sql_result, fields_desic) {
            if (sql_err) {
                if (callback) {
                    callback(sql_err, null, null);
                }
                return;
            }
            if (callback) {
                callback(null, sql_result, fields_desic);
            }
        });
    };
    //查询sql，需要手动release
    MySqlEngine.prototype.mysql_exec = function (sql, callback) {
        this._conn_pool.getConnection(function (err, conn) {
            if (err) {
                if (callback) {
                    callback(err, null, null);
                }
                return;
            }
            conn.query(sql, function (sql_err, sql_result, fields_desic) {
                conn.release();
                if (sql_err) {
                    if (callback) {
                        callback(sql_err, null, null);
                    }
                    return;
                }
                if (callback) {
                    callback(null, sql_result, fields_desic);
                }
            });
        });
    };
    MySqlEngine.prototype.get_mysql_info = function () {
        var info = {
            host: this._host,
            port: this._port,
            db_name: this._db_name,
            uname: this._uname,
            upwd: this._upwd,
        };
        return info;
    };
    return MySqlEngine;
}());
exports.default = MySqlEngine;
//# sourceMappingURL=MySqlEngine.js.map