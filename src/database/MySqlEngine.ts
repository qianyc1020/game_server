import * as mysql from "mysql"
var Log = require("../utils/Log")

class MySqlEngine {
    private _conn_pool:any = null;
    private _host: string = "";
    private _port: number = 0;
    private _db_name: string = "";
    private _uname: string = "";
    private _upwd: string = "";

    constructor(){
    }

    connect(host:string, port:number, db_name:string, uname:string, upwd:string) {
        this._host      = host;
        this._port      = port;
        this._db_name   = db_name;
        this._uname     = uname;
        this._upwd      = upwd;

        this._conn_pool = mysql.createPool({
            host: host, // 数据库服务器的IP地址
            port: port, // my.cnf指定了端口，默认的mysql的端口是3306,
            database: db_name, // 要连接的数据库
            user: uname,
            password: upwd,
        });

        this._conn_pool.on('acquire', function (connection:mysql.PoolConnection) {
            // Log.info('pool111 %d acquired', connection.threadId);
          });

        this._conn_pool.on('connection',function(){
            // Log.info('pool222 create one connection');
        });

        //当一个回掉压入队伍等待连接的时候触发入队事件
        this._conn_pool.on('enqueue',function(){
            // Log.info('pool333 qnqueue');
        });

        this._conn_pool.on('release', function (connection:mysql.PoolConnection) {
            // Log.info('pool444 Connection %d released', connection.threadId);
        });
    }
    //查询sql，直接使用Pool.query接口，自动帮你release
    mysql_query(sql:string, callback:any){
        this._conn_pool.query(sql, function (sql_err:mysql.MysqlError, sql_result:any, fields_desic:any) {
            if (sql_err) {
                if(callback) {
                    callback(sql_err, null, null);
                }
                return;
            }
            if (callback) {
                callback(null, sql_result, fields_desic);
            }
        });
    }

    //查询sql，需要手动release
    mysql_exec(sql:string, callback:any) {
        this._conn_pool.getConnection(function(err:mysql.MysqlError, conn:any) {
            if (err) {
                if(callback) {
                    callback(err, null, null);
                }
                return;
            }
    
            conn.query(sql, function(sql_err:mysql.MysqlError, sql_result:any, fields_desic:any) {
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
    }

    get_mysql_info(){
        var info:any = {
            host      : this._host,
            port      : this._port,
            db_name   : this._db_name,
            uname     : this._uname,
            upwd      : this._upwd,
        }
        return info;
    }

}

export default MySqlEngine;