//web 服务器，获取服务端接口

import * as fs from 'fs';
import * as path from "path";
import express from "express";
import GameAppConfig from '../apps/config/GameAppConfig';
import * as core from "express-serve-static-core";
import Log from '../utils/Log';

let app_express: core.Express = express();

// process.chdir("."); //改变工作目录
// console.log("cwd: " , process.cwd());

let cwdPath = path.join(process.cwd(), "www_root");
// Log.info("hcc>>cwdPath: " , cwdPath);

fs.exists(cwdPath, function (exists: boolean) {
	if(exists){
		Log.info("path exist: ", cwdPath);
	}else{
		Log.error("path not exist: ", cwdPath);
	}
})

if (fs.existsSync("www_root")) {
	let cwdPath = path.join(process.cwd(), "www_root");
	app_express.use(express.static(cwdPath));
	Log.info("start web server success, ip:", GameAppConfig.webserver.host, " ,port: ", GameAppConfig.webserver.port);
} else {
	Log.warn("www_root is not exists, start web server failed!");
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