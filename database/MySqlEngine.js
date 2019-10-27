var mysql = require("mysql")
// import mysql from "mysql"

var MySqlEngine = {
	connect : connect,
	mysql_exec : mysql_exec,
}

function connect(host, port, db_name, uname, upwd) {
	return mysql.createPool({
		host: host, // 数据库服务器的IP地址
		port: port, // my.cnf指定了端口，默认的mysql的端口是3306,
		database: db_name, // 要连接的数据库
		user: uname,
		password: upwd,
	});
}

function mysql_exec(conn_pool,sql, callback) {
	conn_pool.getConnection(function(err, conn) {
		if (err) {
			if(callback) {
				callback(err, null, null);
			}
			return;
		}

		conn.query(sql, function(sql_err, sql_result, fields_desic) {
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

module.exports = MySqlEngine;