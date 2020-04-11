import {Stype,StypeName} from "./protocol/Stype"
import Platform from "../utils/Platform"
import Log from '../utils/Log';

let LOCAL_HOST:string = "127.0.0.1"
let WSS_WEBSOCKET_PORT:number = 6081;
let IS_LOCAL_DEBUG:boolean = true; //是否启用本地ip来测试，启用后只能用当前电脑ip调试服务端程序

if(Platform.isWin32()){
	if(IS_LOCAL_DEBUG){
		LOCAL_HOST = Platform.getLocalIP();//本地电脑ip,pc调试用
	}
	WSS_WEBSOCKET_PORT = 6081;
}else if(Platform.isLinux()){
	LOCAL_HOST = "172.16.166.106";//阿里云外网ip
	WSS_WEBSOCKET_PORT = 6061;
}

Log.info("hcc>>localIP: " , LOCAL_HOST);

// websocket wss://172.16.166.106:6061 阿里云服务内网端口
// 6061 服务端内网端口
// 6081 服务端wss外网端口(nginx.conf外网配置)

class GameAppConfig {
	//网关服
	static gateway_config:any  ={
		host: LOCAL_HOST,
		tcp_port: 6080,
		wbsocket_port: WSS_WEBSOCKET_PORT, 
	}

	//web服务
	static webserver:any = {
		host: LOCAL_HOST,
		port: 10001,
	}

	//系统服务
	static game_system_server:any =  {
		host: LOCAL_HOST,
		port: 6087,
		stypes: [Stype.GameSystem],
	}

	//游戏服务
	static game_server:any =  {
		host: LOCAL_HOST,
		port: 6088,
		stypes: [Stype.GameHoodle],
	}

	//游戏数据库服务
	static game_database:any =  {
		host: LOCAL_HOST,
		port: 3306,
		db_name: "moba_game",
		uname: "root",
		upwd: "123456",
	}

	//用户中心服务
	static auth_server:any =  {
		host: LOCAL_HOST,
		port: 6086,
		stypes: [Stype.Auth],
	}

	//用户中心数据库
	static auth_database:any =  {
		host: LOCAL_HOST,
		port: 3306,
		db_name: "auth_center",
		uname: "root",
		upwd: "123456",
	}

	//用户中心redis
	static auth_redis:any =  {
		host: LOCAL_HOST,
		port: 6379,
		db_index: 0,
	}

	//游戏服务redis
	static game_redis:any =  {
		host: LOCAL_HOST,
		port: 6379,
		db_index: 1,
	}

	//网关连接其他服务
	static gw_connect_servers:any =  {
		[1]: {
			stype: Stype.Auth,
			host: LOCAL_HOST,
			port: 6086,
		},

		[2]: {
			stype: Stype.GameHoodle,
			host: LOCAL_HOST,
			port: 6088,
		},
	}
}

export default GameAppConfig;