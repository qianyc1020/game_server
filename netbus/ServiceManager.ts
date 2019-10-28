import ProtoManager from "./ProtoManager"
var Log = require("../utils/Log");

class ServiceManager {
    static service_modules = {};    

    static register_service(stype, service) {
        if (ServiceManager.service_modules[stype]) {
            Log.warn(ServiceManager.service_modules[stype].name + " service is registed !!!!");
        }
    
        ServiceManager.service_modules[stype] = service;
        Log.info(ServiceManager.service_modules[stype].name + " service registed success !!!!");
    }
    
    static on_recv_server_cmd(session, cmd_buf) {
        if (session.is_encrypt) {
            cmd_buf = ProtoManager.decrypt_cmd(cmd_buf);	
        }
        var cmd = ProtoManager.decode_cmd_header(cmd_buf);
        if (!cmd) {
            return false;
        }
        var stype 		= cmd[0]; 
        var ctype 		= cmd[1];
        var utag 		= cmd[2];
        var proto_type 	= cmd[3];
    
        if (!ServiceManager.service_modules[stype]) {
            Log.error("ServiceManager.service_modules not exist")
            return false;
        }
        
        if (stype == null || ctype == null || utag == null || proto_type == null ) {
            Log.error("cmd error")
            return false;
        }
    
        ServiceManager.service_modules[stype].on_recv_server_player_cmd(session, stype, ctype, utag, proto_type, cmd_buf);
        return true;
    }
    
    static on_recv_client_cmd(session, cmd_buf) {
        // 根据收到的数据解码命令
        if (!cmd_buf){
            return false;
        }
        if (session.is_encrypt) {
            cmd_buf = ProtoManager.decrypt_cmd(cmd_buf);	
        }
        var cmd = ProtoManager.decode_cmd_header(cmd_buf);
        if (!cmd) {
            return false;
        }
        var stype 		= cmd[0];
        var ctype 		= cmd[1];
        var utag 		= cmd[2];
        var proto_type 	= cmd[3];
    
        if (!ServiceManager.service_modules[stype]) {
            Log.error("ServiceManager.service_modules not exist")
            return false;
        }
    
        if (stype == null || ctype == null || utag == null || proto_type == null ) {
            Log.error("cmd error")
            return false;
        }
    
        ServiceManager.service_modules[stype].on_recv_client_player_cmd(session, stype, ctype, utag, proto_type, cmd_buf);
        Log.info("on_recv_client_cmd>> " , stype, ctype, utag, proto_type)
        return true;
    }
    
    // 玩家掉线
    static on_client_lost_connect(session) {
        var uid = session.uid;
        Log.info("on_client_lost_connect: uid " + uid)
        if (uid === 0) {
            return;
        }
        // 遍历所有的服务模块通知在这个服务上的这个玩家掉线了
        for(var stype in ServiceManager.service_modules) {
            ServiceManager.service_modules[stype].on_player_disconnect(session, stype);
        }
    }
}

export default ServiceManager;