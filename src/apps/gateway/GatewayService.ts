import NetBus from '../../netbus/NetBus';
import ProtoTools from "../../netbus/ProtoTools"
import ProtoCmd from "../protocol/ProtoCmd"
import ProtoManager from "../../netbus/ProtoManager"
import Respones from "../Response"
import ServiceBase from "../../netbus/ServiceBase"
import { Stype, StypeName } from '../protocol/Stype';
import { Cmd } from '../protocol/AuthProto';

let Log = require("../../utils/Log")

let LOGIN_ERQ_CMD = [
	Cmd.eUnameLoginReq, 
	Cmd.eGuestLoginReq,
	Cmd.ePhoneRegistReq,
	Cmd.eUnameRegistReq,
]

let LOGIN_ERS_CMD = [
	Cmd.eUnameLoginRes, 
	Cmd.eGuestLoginRes,
	Cmd.eUnameRegistRes,
	Cmd.ePhoneRegistRes,
]

let uid_session_map:any = {}; //保存已经登录过的玩家 uid-> session

class GatewayService extends ServiceBase {
	service_name: string = "GatewayService"; // 服务名称
	is_transfer: boolean = true; 		// 是否为转发模块,
	
	//客户端发到网关，网关转发到服务器
	static on_recv_client_player_cmd(session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:any){
		Log.info("on_recv_client_player_cmd:", ProtoCmd.getProtoName(stype)+ ",", ProtoCmd.getCmdName(stype,ctype)+ ",", "utag:" + utag)
		let server_session = NetBus.get_server_session(stype);
		if (!server_session) {
			return;
		}
		// 打入能够标识client的utag, uid, session.session_key,
		if(GatewayService.is_login_req_cmd(stype, ctype)) { //还没登录
			utag = session.session_key;	
		}
		else { //登录过了
			if(session.uid === 0) {
				return;
			}
			utag = session.uid;
		}
	
		ProtoTools.write_utag_inbuf(raw_cmd, utag);
		NetBus.send_encoded_cmd(server_session,raw_cmd);
	}
	//服务器发到网关，网关转发到客户端
	static on_recv_server_player_cmd (session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:any) {
		Log.info("on_recv_server_player_cmd:", ProtoCmd.getProtoName(stype)+ ",", ProtoCmd.getCmdName(stype,ctype)+ ",", "utag:" + utag)
		let client_session = null;
		if (GatewayService.is_login_res_cmd(stype, ctype)) { // 还没登录,utag == session.session_key
			client_session = NetBus.get_client_session(utag);
			if (!client_session) {
				return;
			}
			let body = ProtoManager.decode_cmd(proto_type, raw_cmd);
			// Log.info("on_recv_server_player_cmd,body: " , body)
			if (body.status == Respones.OK) {
				// 以前你登陆过,发送一个命令给这个客户端，告诉它说以前有人登陆
				let prev_session = GatewayService.get_session_by_uid(body.uid);
				if (prev_session) {
					NetBus.send_cmd(prev_session, stype, Cmd.eReloginRes, utag, proto_type);
					prev_session.uid = 0; // 可能会有隐患，是否通知其它的服务 TODO
					NetBus.session_close(prev_session);
					Log.info("on_recv_server_player_cmd: relogin: ", utag);
				}

				if(body.uid){
					client_session.uid = body.uid;
					GatewayService.save_session_with_uid(body.uid, client_session, proto_type);
					body.uid = 0;
					raw_cmd = ProtoManager.encode_cmd(stype, ctype, utag, proto_type, body);
				}
			} 
		}else{ //已经登录,utag == uid
			client_session = GatewayService.get_session_by_uid(utag);
		}
	
		if (client_session){
			ProtoTools.clear_utag_inbuf(raw_cmd);
			NetBus.send_encoded_cmd(client_session,raw_cmd);
			if(ctype == Cmd.eLoginOutRes){
				GatewayService.clear_session_with_uid(utag);
			}
		}
	}
	//玩家掉线,网关发消息给其他服务，其他服务接收eUserLostConnectRes协议进行处理就好了
	static on_player_disconnect(session:any, stype:number) {
		Log.info("on_player_disconnect")
		if (stype == Stype.Auth) { // 由Auth服务保存的，那么就由Auth清空
				GatewayService.clear_session_with_uid(session.uid);
			}
	
		let server_session = NetBus.get_server_session(stype);
		if (!server_session) {
			return;
		}

		// 客户端被迫掉线
		let utag = session.uid;
		let proto = ProtoCmd.getStypeProto(stype)
		// Log("hcc>> proto: ", proto)
		if (proto){
			let cmd_tmp = proto.Cmd
			// Log("hcc>> cmd_tmp: ", cmd_tmp)
			if(cmd_tmp){
				NetBus.send_cmd(server_session, stype, cmd_tmp.eUserLostConnectRes, utag, session.proto_type)
			}
		}
	}
	//登录请求
	static is_login_req_cmd(stype:number, ctype:number){
		if(stype != Stype.Auth){
			return false;
		}

		for(let index = 0; index <= LOGIN_ERQ_CMD.length; index++){
			if(ctype == LOGIN_ERQ_CMD[index]){
				return true;
			}
		}
		return false;
	}
	//登录返回
	static is_login_res_cmd(stype:number, ctype:number){
		if(stype != Stype.Auth){
			return false;
		}

		for(let index = 0; index <= LOGIN_ERS_CMD.length; index++){
			if(ctype == LOGIN_ERS_CMD[index]){
				return true;
			}
		}
		return false;	
	}

	//返回登录过的玩家的UID
	static get_session_by_uid(uid:number) {
		return uid_session_map[uid];
	}
	//保存登录过的玩家的 uid->session
	static save_session_with_uid(uid:number, session:any, proto_type:number) {
		uid_session_map[uid] = session;
		session.proto_type = proto_type;
	}
	//清理session
	static clear_session_with_uid(uid:number) {
		uid_session_map[uid] = null;
		delete uid_session_map[uid];
	}
}

export default GatewayService;
