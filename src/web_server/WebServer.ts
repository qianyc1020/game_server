//web 服务器，获取服务端接口

import * as fs from 'fs';
import * as path from "path";
import express from "express";
import GameAppConfig from '../apps/config/GameAppConfig';
import * as core from "express-serve-static-core";
import Log from '../utils/Log';

let KW_WWW_ROOT_PATH 		= "www_root";
let KW_WEB_SERVER_PATH 		= "src/web_server"

let app_express: core.Express = express();
/*
let cwdPath = path.join(process.cwd(), "www_root");
fs.exists(cwdPath, function (exists: boolean) {
	if(exists){
		Log.info("path exist: ", cwdPath);
	}else{
		// process.chdir(KW_WEB_SERVER_PATH); //改变工作目录
		// Log.warn(cwdPath, "not exist, change path to: ", path.join(process.cwd(), KW_WWW_ROOT_PATH));
	}
	// start_web_server();	
})
*/

function start_web_server() {
	let cwdPath = path.join(__dirname, KW_WWW_ROOT_PATH);
	if (fs.existsSync(cwdPath)) {
		app_express.use(express.static(cwdPath));
		Log.info("path: ", cwdPath, " is exists, start web server success!");
		Log.info("start web server success, ip:", GameAppConfig.webserver.host, " ,port: ", GameAppConfig.webserver.port);
	} else {
		Log.error("path: " , cwdPath, " is not exists, start web server failed!");
		return;
	}
	
	// 获取客户端连接的服务器信息, 
	// http://127.0.0.1:10001/server_info
	app_express.get("/server_info", function (request, respones) {
		let body = {
			host: GameAppConfig.gateway_config.host,
			tcp_port: GameAppConfig.gateway_config.tcp_port,
			ws_port: GameAppConfig.gateway_config.wbsocket_port,
		};
	
		let str_data:string = JSON.stringify(body);
		respones.send(str_data);
	});
	
	app_express.listen(GameAppConfig.webserver.port);
}

start_web_server();	