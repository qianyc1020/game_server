import MySqlEngine from "./MySqlEngine"
import Respones from "../apps/Response"
import * as util from "util"
var Log         = require("../utils/Log")

class MySqlAuth {
	private static mysqlEngine: MySqlEngine = new MySqlEngine();

	constructor(){

	}

	static get_engine(){
		if (!MySqlAuth.mysqlEngine){
			MySqlAuth.mysqlEngine = new MySqlEngine();
		}
		return MySqlAuth.mysqlEngine;
	}

	static connect(host:string, port:number, db_name:string, uname:string, upwd:string) {
		MySqlAuth.get_engine().connect(host,port,db_name,uname,upwd);
	}

	static mysql_query(sql:string, callback:any){
		MySqlAuth.get_engine().mysql_query(sql, callback);
	}

	static get_uinfo_by_uname_upwd(uname:string, upwd:string, callback:any) {
		var sql = "select uid, unick, usex, uface, uvip, status from uinfo where uname = \"%s\" and upwd = \"%s\" and is_guest = 0 limit 1";
		var sql_cmd = util.format(sql, uname, upwd);
		MySqlAuth.mysql_query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Respones.SYSTEM_ERR, null);
				return;
			}
			callback(Respones.OK, sql_ret);
		});
	}

}

export default MySqlAuth;