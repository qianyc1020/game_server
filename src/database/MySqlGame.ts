import MySqlEngine from "./MySqlEngine"
import TimeUtil from '../utils/TimeUtil';
import * as util from "util"
import Response from '../apps/Response';
import Log from '../utils/Log';
import querystring from "querystring"

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

    //查找所有字段（一般不建议用这个接口，效率较低）
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
    
    //查找玩家金币
    static get_ugame_uchip_by_uid(uid:number, callback:Function){
        var sql = "select uchip from ugame where uid = %d limit 1";
        var sql_cmd = util.format(sql, uid);
        MySqlGame.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
            if (err) {
                callback(Response.SYSTEM_ERR, err);
                return;
            }
            callback(Response.OK, sql_ret);
        });
    }

    //创建玩家游戏信息
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

    // 玩家金币修改
    // 有增加,也减少
    static add_ugame_uchip(uid:number, uchip:number, is_add:boolean,callback?:Function) {
        if (!is_add) { // 扣除
            uchip = Math.abs(uchip) * (-1); // 负数
        }
        var sql = "update ugame set uchip = uchip + %d where uid = %d";
        var sql_cmd = util.format(sql, uchip, uid);
        MySqlGame.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
            if (err) {
                if(callback){
                    callback(Response.SYSTEM_ERR,err);
                }
                return;
            }
            if(callback){
                callback(Response.OK)
            }
        })
    }

    //获得玩家小球信息 querystring 数据对象。外层调用querystring.decode()去解码
    //querystring 转成obj对象
    static get_ugame_uball_info(uid:number,callback:Function){
        var sql = "select uball_info from ugame where uid = %d limit 1";
        var sql_cmd = util.format(sql, uid);
        MySqlGame.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
            if (err) {
                callback(Response.SYSTEM_ERR, err);
                return;
            }
            callback(Response.OK, sql_ret);
        });
    }

    //设置玩家小球信息
    //uball_obj: 小球集合对象：uball_obj = {lv_1:1,lv_2:2,lv_3:0}
    //querystring.encode() 转成 "lv_1=0&lv_2=1&lv_3=3&lv_4=4&lv_5=155"
    static update_ugame_uball_info(uid:number, uball_obj:any, callback:Function){
        let uball_qstring = "";
        try {
            uball_qstring = querystring.encode(uball_obj);
        } catch (error) {
            Log.error(error);
        }
        
        if(uball_qstring == ""){
            Log.warn("update_ugame_uball_info quertstring error");
            return;
        }

        var sql = "update ugame set uball_info = \"%s\" where uid = %d";
		var sql_cmd = util.format(sql, uball_qstring ,uid);
        // Log.info("update_ugame_uball_info: sql: " , sql_cmd);
		MySqlGame.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR, err);
				return;
			}
			callback(Response.OK,sql_ret);
		})
    }

}

export default MySqlGame;