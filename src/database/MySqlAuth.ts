import MySqlEngine from "./MySqlEngine"
import TimeUtil from '../utils/TimeUtil';
import * as util from "util"
import Response from '../apps/Response';
import Log from '../utils/Log';

let MAX_NUMBER_ID = 1000000;

class MySqlAuth {
	private static mysqlEngine: MySqlEngine = new MySqlEngine();

	static engine(){
		return MySqlAuth.mysqlEngine;
	}

	static connect(host:string, port:number, db_name:string, uname:string, upwd:string) {
		MySqlAuth.engine().connect(host,port,db_name,uname,upwd);
	}

	static query(sql:string, callback:Function){
		MySqlAuth.engine().mysql_query(sql, callback);
	}

	static login_by_uname_upwd(uname:string, upwd:string, callback:Function){
		var sql = "select uname, upwd ,uid from uinfo where uname = \"%s\" and upwd = \"%s\" and is_guest = 0 limit 1";
		var sql_cmd = util.format(sql, uname, upwd);
		// Log.info("sql: " , sql_cmd)
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR, err);
				return;
			}
			callback(Response.OK, sql_ret);
		});
	}

	static login_by_guestkey(guestkey:string, callback:Function){
		var sql = "select guest_key , uid from uinfo where guest_key = \"%s\" limit 1";
		var sql_cmd = util.format(sql, guestkey);
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR, err);
				return;
			}
			callback(Response.OK, sql_ret);
		});
	}
	
	static get_uinfo_by_uname_upwd(uname:string, upwd:string, callback:Function) {
		if(uname && upwd && uname != "" && upwd != ""){
			let sql = "select * from uinfo where uname = \"%s\" and upwd = \"%s\" and is_guest = 0 limit 1";
			let sql_cmd = util.format(sql, uname, upwd);
			MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
				if (err) {
					callback(Response.SYSTEM_ERR, err);
					return;
				}
				callback(Response.OK, sql_ret);
			});
		}
	}

	static get_uinfo_by_uid(uid:number,callback:Function){
		var sql = "select * from uinfo where uid = %d limit 1";
		var sql_cmd = util.format(sql, uid);
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR, err);
				return;
			}
			callback(Response.OK, sql_ret);
		});
	}

	static insert_uname_upwd_user(uname:string , upwdmd5:string ,unick:string, uface:number, usex:number, callback:Function){
		let max_numid = MAX_NUMBER_ID;
		MySqlAuth.get_max_uid(function (status:number, maxuid: number) {
			if(status == Response.OK){
				max_numid = max_numid + maxuid + 1;
				Log.info("max_numid: " , max_numid)
				var sql = "insert into uinfo(`uname`, `upwd` ,`unick`, `uface`, `usex`, `numberid`, `guest_key`)values(\"%s\", \"%s\", \"%s\", %d, %d, %d,0)";
				var sql_cmd = util.format(sql, uname, upwdmd5, unick, uface, usex, max_numid);
				MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
					if (err) {
						callback(Response.SYSTEM_ERR, err);
						return;
					}
					callback(Response.OK,sql_ret);
				});	
			}else{
				callback(Response.SYSTEM_ERR);
			}
		})

	}

	static insert_guest_user(unick:string, uface:number, usex:number, ukey:string, callback:Function) {
		let max_numid = MAX_NUMBER_ID;
		MySqlAuth.get_max_uid(function (status:number, maxuid: number) {
			if(status == Response.OK){
				max_numid = max_numid + maxuid + 1;
				var sql = "insert into uinfo(`guest_key`, `unick`, `uface`, `usex`, `numberid`, `is_guest`)values(\"%s\", \"%s\", %d, %d, %d,1)";
				var sql_cmd = util.format(sql, ukey, unick, uface, usex, max_numid);
				MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
					if (err) {
						callback(Response.SYSTEM_ERR, err);
						return;
					}
					callback(Response.OK,sql_ret);
				});
			}else{
				callback(Response.SYSTEM_ERR);
			}
		})
	}

	static check_uname_exist(uname:string, callback:Function){
		let sql = "select uid from uinfo where binary uname = \"%s\""
		var sql_cmd = util.format(sql, uname);
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR, err);
				return;
			}
			
			if(sql_ret.length <= 0) {
				callback(Response.INVALID_PARAMS);
				return;
			}
			if (sql_ret[0].uid != undefined) {
				callback(Response.OK);
				return;	
			}
			callback(Response.INVALID_PARAMS);
		});
	}

	static get_max_uid(callback:Function){
		let sql = "select uid from uinfo order by uid desc"
		MySqlAuth.query(sql,function (err:any, sql_ret:any, fields_desic:any) {
			if(err){
				return callback(Response.INVALIDI_OPT,err);
			}

			if(sql_ret.length <= 0 ){
				callback(Response.OK , 0)
				return
			}
			callback(Response.OK , sql_ret[0].uid);
		})
	}

	////////////////////////////////////

	static get_guest_uinfo_by_guestkey(guestkey:string, callback:Function) {
		var sql = "select * from uinfo where guest_key = \"%s\" limit 1";
		var sql_cmd = util.format(sql, guestkey);
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR, err);
				return;
			}
			callback(Response.OK, sql_ret);
		});
	}

	static insert_phone_account_user(unick:string, uface:number, usex:number, phone:string, pwd_md5:string, callback:Function) {
		var sql = "insert into uinfo(`uname`, `upwd`, `unick`, `uface`, `usex`, `is_guest`)values(\"%s\", \"%s\", \"%s\", %d, %d, 0)";
		var sql_cmd = util.format(sql, phone, pwd_md5, unick, uface, usex);
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR, err);
				return;
			}
			callback(Response.OK,sql_ret);
		});
	}

	static edit_profile(uid:number, unick:string, usex:number, uface:number, callback:Function) {
		var sql = "update uinfo set unick = \"%s\", usex = %d, uface = %d where uid = %d";
		var sql_cmd = util.format(sql, unick, usex, uid, uface);
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR, err);
				return;
			}
			callback(Response.OK,sql_ret);
		})
	}

	static is_exist_guest(uid:number, callback:Function) {
		var sql = "select is_guest, status from uinfo where uid = %d limit 1";
		var sql_cmd = util.format(sql, uid);
	
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR, err);
				return;
			}
	
			if(sql_ret.length <= 0) {
				callback(Response.INVALID_PARAMS);
				return;
			}
	
			if (sql_ret[0].is_guest === 1 && sql_ret[0].status === 0) {
				callback(Response.OK);
				return;	
			}
			callback(Response.INVALID_PARAMS);
		});
	}
	//TODO 手机号不能作为账号
	static check_phone_code_valid(phone:string, phone_code:number, opt_type:number, callback:Function) {
		var sql = "select id from phone_chat where phone = \"%s\" and opt_type = %d and code = \"%s\" and end_time >= %d limit 1";
		var t = TimeUtil.timestamp();
		var sql_cmd = util.format(sql, phone, opt_type, phone_code, t);
	
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR,err);
				return;
			}
	
			if(sql_ret.length <= 0) { // 找不到，才是验证码不对
				callback(Response.PHONE_CODE_ERR);
				return;
			}
			callback(Response.OK);
			
		});
	}

	static check_phone_unuse(phone_num:string, callback:Function) {
		var sql = "select uid from uinfo where uname = %s limit 1";
		var sql_cmd = util.format(sql, phone_num);
	
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR,err);
				return;
			}
	
			if(sql_ret.length <= 0) {
				callback(Response.OK);
				return;
			}
			callback(Response.PHONE_IS_REG);
		});
	}

	static check_phone_is_reged(phone_num:string, callback:Function) {
		var sql = "select uid from uinfo where uname = %s limit 1";
		var sql_cmd = util.format(sql, phone_num);
	
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR,err);
				return;
			}
			if(sql_ret.length <= 0) {
				callback(Response.PHONE_IS_NOT_REG);
				return;
			}
			callback(Response.OK);
		});
	}

	static _is_phone_indentify_exist(phone:string, opt:number, callback:Function) {
		var sql = "select id from phone_chat where phone = \"%s\" and opt_type = %d";
		var sql_cmd = util.format(sql, phone, opt);
	
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(false);
				return;
			}
	
			if(sql_ret.length <= 0) {
				callback(false);
				return;
			}
			callback(true);
		});
	}

	static _update_phone_indentify_time(code:string, phone:string, opt:number, end_duration:number) {
		var end_time = TimeUtil.timestamp() + end_duration;
		var sql = "update phone_chat set code = \"%s\", end_time=%d, count=count+1 where phone = \"%s\" and opt_type = %d";
		var sql_cmd = util.format(sql, code, end_time, phone, opt);
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
		})
	}
	
	static _insert_phone_indentify(code:string, phone:string, opt:number, end_duration:number) {
		var end_time = TimeUtil.timestamp() + end_duration;
		var sql = "insert into phone_chat(`code`, `phone`, `opt_type`, `end_time`, `count`)values(\"%s\", \"%s\", %d, %d, 1)";
		var sql_cmd = util.format(sql, code, phone, opt, end_time);
	
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
		})
	}	
	
	// callback(Respons.OK)
	static update_phone_indentify(code:string, phone:string, opt:number, end_duration:number, callback:Function) {
		MySqlAuth._is_phone_indentify_exist(phone, opt, function(b_exisit:boolean) {
			if (b_exisit) {
				// 更新时间和操作次数
				MySqlAuth._update_phone_indentify_time(code, phone, opt, end_duration);
			}
			else { // 插入一条记录
				MySqlAuth._insert_phone_indentify(code, phone, opt, end_duration);
			}
			callback(Response.OK);
		});
	}

	static do_upgrade_guest_account(uid:number, uname:string, upwd:string, callback:Function) {
		var sql = "update uinfo set uname = \"%s\", upwd = \"%s\", is_guest = 0 where uid = %d";
		var sql_cmd = util.format(sql, uname, upwd, uid);
		
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR,err);
			}
			else {
				callback(Response.OK);
			}
		})
	}
	
	static reset_account_pwd(uname:string, upwd:string, callback:Function) {
		var sql = "update uinfo set upwd = \"%s\" where uname = \"%s\"";
		var sql_cmd = util.format(sql, upwd, uname);
		MySqlAuth.query(sql_cmd, function(err:any, sql_ret:any, fields_desic:any) {
			if (err) {
				callback(Response.SYSTEM_ERR,err);
			}
			else {
				callback(Response.OK);
			}
		})
	}

}

export default MySqlAuth;