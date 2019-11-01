import * as Broadcast from "./gateway/BroadcastProto"
import * as TalkRoom from "./talk_room/TalkProto"
import * as Auth from "./auth_server/AuthProto"
import * as GameSystem from "./system_server/SystemProto"
import * as GameProto from "./game_server/GameProto"
import { Stype,StypeName } from './Stype';

class ProtoCmd {
	//服务器下标->协议脚本
	  static StypeProtos:any = {
		[Stype.Broadcast] : Broadcast,
		[Stype.TalkRoom] : TalkRoom,
		[Stype.Auth] : Auth,
		[Stype.GameSystem] : GameSystem,
		[Stype.Game] : GameProto,
	}
	
	//命名空间
	static getProtoName(stype: number):any{
		if(ProtoCmd.StypeProtos[stype]){
			return ProtoCmd.StypeProtos[stype].protoName
		}
		return null;
	}
	//字段名称
	static getCmdName(stype:number, ctype:number):any{
		if(ProtoCmd.StypeProtos[stype]){
			return ProtoCmd.StypeProtos[stype].CmdName[ctype]
		}
		return null;
	}
	//
	static getCmd(stype:number, ctype:number){
		let protoName = ProtoCmd.getProtoName(stype);
		if(protoName){
			let cmdName = ProtoCmd.getCmdName(stype,ctype)
			if (cmdName){
				return protoName + "." + cmdName;
			}
		}
		return null;
	}
}

export default ProtoCmd;

