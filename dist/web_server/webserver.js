"use strict";
//web 服务器，获取服务端接口
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var express_1 = __importDefault(require("express"));
var GameAppConfig_1 = __importDefault(require("../apps/config/GameAppConfig"));
var Log_1 = __importDefault(require("../utils/Log"));
var KW_WWW_ROOT_PATH = "www_root";
var KW_WEB_SERVER_PATH = "src/web_server";
var app_express = express_1["default"]();
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
    var cwdPath = path.join(__dirname, KW_WWW_ROOT_PATH);
    if (fs.existsSync(cwdPath)) {
        app_express.use(express_1["default"].static(cwdPath));
        Log_1["default"].info("path: ", cwdPath, " is exists, start web server success!");
        Log_1["default"].info("start web server success, ip:", GameAppConfig_1["default"].webserver.host, " ,port: ", GameAppConfig_1["default"].webserver.port);
    }
    else {
        Log_1["default"].error("path: ", cwdPath, " is not exists, start web server failed!");
        return;
    }
    // 获取客户端连接的服务器信息, 
    // http://127.0.0.1:10001/server_info
    app_express.get("/server_info", function (request, respones) {
        var body = {
            host: GameAppConfig_1["default"].gateway_config.host,
            tcp_port: GameAppConfig_1["default"].gateway_config.tcp_port,
            ws_port: GameAppConfig_1["default"].gateway_config.wbsocket_port
        };
        var str_data = JSON.stringify(body);
        respones.send(str_data);
    });
    app_express.listen(GameAppConfig_1["default"].webserver.port);
}
start_web_server();
//# sourceMappingURL=WebServer.js.map