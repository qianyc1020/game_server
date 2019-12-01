import ServiceBase from '../../../netbus/ServiceBase';
import GameHoodleModle from './GameHoodleModle';

var Log =  require("../../../utils/Log")

class GameHoodleService extends ServiceBase {
	 service_name:string = "GameHoodleService"; // 服务名称
	 is_transfer:boolean = false; // 是否为转发模块,
	// 收到客户端，或者其他服务发来的数据
	static on_recv_client_player_cmd(session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:any){
		GameHoodleModle.getInstance().recv_cmd_msg(session, stype, ctype, utag, proto_type, raw_cmd);
	}
	
	// 收到连接的其他服务发过来的消息，这里不做处理
	static on_recv_server_player_cmd(session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:any) {
	} 
	
	// 收到客户端断开连接，网关已经发了断开协议（eUserLostConnectRes）过来，这里不用做处理
	static on_player_disconnect(session:any) {
		var uid = session.uid;
		Log.info("game: on_player_disconnect: uid: " , uid)
	}
}

export default GameHoodleService;
