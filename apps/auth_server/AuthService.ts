import ProtoCmd from "../ProtoCmd"
import AuthProto from "./AuthProto"
import ProtoManater from "../../netbus/ProtoManager"
import NetBus from "../../netbus/NetBus"

var Log = require("../../utils/Log")

class AuthService {
	static service_name: "AuthService"; // 服务名称
	static is_transfer: false; // 是否为转发模块,
	
	// 收到客户端发来的数据
	static on_recv_client_player_cmd(session:any, stype:number, ctype:number, utag:number, proto_type:number,raw_cmd:any){
		Log.info("on_recv_player_cmd:", ProtoCmd.getProtoName(stype) + ",", ProtoCmd.getCmdName(stype,ctype)+ ",", "utag:" + utag)
		var resbody = {status:1}
		// NetBus.send_encoded_cmd(session,raw_cmd)
		NetBus.send_cmd(session,stype,1,utag,proto_type,resbody)
		
		//自己服务自己解码
		var decode_buf = ProtoManater.decode_cmd(proto_type,raw_cmd)
		Log.info("decode_cmd: " , decode_buf)
	}
	
	// 收到连接的服务发过来的数据;
	static on_recv_server_player_cmd (session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:any) {
		Log.info('on_recv_server_player_cmd',stype, ctype)
	} 
	
	// 收到客户端断开连接;
	static on_player_disconnect(session:any, stype:number) {
		Log.info("on_player_disconnect uid: "+ session.uid , " ,stype: "+ stype)
	}
}

export default AuthService;
