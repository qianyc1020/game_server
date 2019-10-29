import  Stype from "./Stype"
import * as Broadcast from "./gateway/BroadcastProto"
import * as TalkRoom from "./talk_room/TalkProto"
import * as Auth from "./auth_server/AuthProto"
import * as GameSystem from "./system_server/SystemProto"
import * as GameProto from "./game_server/GameProto"

class ProtoCmd {
	//服务器下标->协议脚本
	  static StypeProtos = {
		[Stype.Broadcast] : Broadcast,
		[Stype.TalkRoom] : TalkRoom,
		[Stype.Auth] : Auth,
		[Stype.GameSystem] : GameSystem,
		[Stype.Game] : GameProto,
	}
	
	//命名空间
	static getProtoName(stype: number):string{
		if(ProtoCmd.StypeProtos[stype]){
			return ProtoCmd.StypeProtos[stype].protoName
		}
	}
	//字段名称
	static getCmdName(stype:number, ctype:number):string{
		if(ProtoCmd.StypeProtos[stype]){
			return ProtoCmd.StypeProtos[stype].CmdName[ctype]
		}
	}
}

export default ProtoCmd;

