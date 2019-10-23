var MySqlEngine = require("./MySqlEngine.js")
var util        = require("util")
var Log         = require("../utils/Log.js")
var Respones    = require("../apps/Response.js")

var conn_pool       = null;
var connect_info    = {}

function connect(host, port, db_name, uname, upwd) {
    conn_pool = MySqlEngine.connect(host, port, db_name, uname, upwd)
    connect_info.host       = host;
    connect_info.port       = port;
    connect_info.db_name    = db_name;
    connect_info.uname      = uname;
    connect_info.upwd       = upwd;
}

function get_connect_pool(){
    if(conn_pool == null || conn_pool._closed){
        conn_pool = connect(connect_info.host,connect_info.port,connect_info.db_name,connect_info.uname,connect_info.upwd)
        Log.info("hcc>>conn_pool is null or closed")
    }
    return conn_pool;
}

function mysql_exec(sql, callback){
    MySqlEngine.mysql_exec(get_connect_pool(), sql, callback)
}

function get_uinfo_by_uname_upwd(uname, upwd, callback) {
	var sql = "select uid, unick, usex, uface, uvip, status from uinfo where uname = \"%s\" and upwd = \"%s\" and is_guest = 0 limit 1";
	var sql_cmd = util.format(sql, uname, upwd);
	Log.info("sql: " , sql_cmd);

	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic) {
        Log.info("mysql back: " , err , sql_ret,fields_desic)
		if (err) {
			callback(Respones.SYSTEM_ERR, null);
			return;
		}
		callback(Respones.OK, sql_ret);
	});
}

module.exports = {
    connect : connect,
    get_uinfo_by_uname_upwd:get_uinfo_by_uname_upwd,
}