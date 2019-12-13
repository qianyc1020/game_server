import MySqlEngine from "./MySqlEngine"
import TimeUtil from '../utils/TimeUtil';
import * as util from "util"
import Response from '../apps/Response';
import Log from '../utils/Log';

class MySqlGame {
	private static mysqlEngine: MySqlEngine = new MySqlEngine();

	static engine(){
		return MySqlGame.mysqlEngine;
	}

	static connect(host:string, port:number, db_name:string, uname:string, upwd:string) {
		MySqlGame.engine().connect(host,port,db_name,uname,upwd);
	}

	static query(sql:string, callback:Function){
		MySqlGame.engine().mysql_query(sql, callback);
    }

    static get_ugame_info_by_uid(uid:number, callback:Function) {
        var sql = "select * from ugame where uid = %d limit 1";
        var sql_cmd = util.format(sql, uid);
        MySqlGame.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
            if (err) {
                callback(Response.SYSTEM_ERR, err);
                return;
            }
            callback(Response.OK, sql_ret);
        });
    }

    static insert_ugame_user(uid:number, uexp:number, uchip:number, callback:Function) {
        var sql = "insert into ugame(`uid`, `uexp`, `uchip`)values(%d, %d, %d)";
        var sql_cmd = util.format(sql, uid, uexp, uchip);
    
        MySqlGame.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
            if (err) {
                callback(Response.SYSTEM_ERR,err);
                return;
            }
            callback(Response.OK);
        });
    }

    // 有增加，也减少
    static add_ugame_uchip(uid:number, uchip:number, is_add:boolean,callback:Function) {
        if (!is_add) { // 扣除
            uchip = -uchip; // 负数
        }
        var sql = "update ugame set uchip = uchip + %d where uid = %d";
        var sql_cmd = util.format(sql, uchip, uid);
        MySqlGame.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
            if (err) {
                callback(Response.SYSTEM_ERR,err);
                return;
            }
            callback(Response.OK)
        })
    }

}

export default MySqlGame;