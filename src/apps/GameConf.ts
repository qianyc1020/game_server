import {Stype,StypeName} from "./protocol/Stype"
import Platform from "../utils/Platform"

var localhost = "127.0.0.1"
var wss_port = 6081;

if(Platform.isWin32()){
	localhost = "127.0.0.1"
	wss_port = 6081;
}else if(Platform.isLinux()){
	localhost = "172.16.166.106"
	wss_port = 6061;
}

// websocket wss://172.16.166.106:6061 阿里云服务内网端口
// 6061 服务端内网端口
// 6081 服务端wss外网端口(nginx.conf外网配置)

class GameConf {

	static KW_BORN_EXP:number 		= 0;		//出生经验
	static KW_BORN_CHIP:number 		= 1500; 	//出生金币
	static KW_WIN_RATE:number 		= 100; 		//输赢分数* 金币数
	static KW_MIN_GOLD_ENTER_ROOM:number = 300; //最少进入房间金币
	static KW_IS_GOLD_LIMIT:boolean = false; 	//是否金币不足，禁止加入房间
	
	//网关服
	static gateway_config:any  ={
		host: localhost,
		tcp_port: 6080,
		wbsocket_port: wss_port, 
	}

	//web服务
	static webserver:any = {
		host: localhost,
		port: 10001,
	}

	//系统服务
	static game_system_server:any =  {
		host: localhost,
		port: 6087,
		stypes: [Stype.GameSystem],
	}

	//游戏服务
	static game_server:any =  {
		host: localhost,
		port: 6088,
		stypes: [Stype.GameHoodle],
	}

	//游戏数据库服务
	static game_database:any =  {
		host: localhost,
		port: 3306,
		db_name: "moba_game",
		uname: "root",
		upwd: "123456",
	}

	//用户中心服务
	static auth_server:any =  {
		host: localhost,
		port: 6086,
		stypes: [Stype.Auth],
	}

	//用户中心数据库
	static auth_database:any =  {
		host: localhost,
		port: 3306,
		db_name: "auth_center",
		uname: "root",
		upwd: "123456",
	}

	//用户中心redis
	static auth_redis:any =  {
		host: localhost,
		port: 6379,
		db_index: 0,
	}

	//游戏服务redis
	static game_redis:any =  {
		host: localhost,
		port: 6379,
		db_index: 1,
	}

	//网关连接其他服务
	static gw_connect_servers:any =  {
		[1]: {
			stype: Stype.Auth,
			host: localhost,
			port: 6086,
		},

		[2]: {
			stype: Stype.GameHoodle,
			host: localhost,
			port: 6088,
		},
	}
}

export default GameConf;