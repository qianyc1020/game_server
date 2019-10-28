import  Stype from "./Stype"
import Broadcast from "./gateway/BroadcastProto"
import TalkRoom from "./talk_room/TalkProto"
import Auth from "./auth_server/AuthProto"
import GameSystem from "./system_server/SystemProto"
import GameProto from "./game_server/GameProto"

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
	static getProtoName(stype: number){
		if(ProtoCmd.StypeProtos[stype]){
			return ProtoCmd.StypeProtos[stype].nameSpace	
		}
	}
	//字段名称
	static getCmdName(stype:number, ctype:number){
		if(ProtoCmd.StypeProtos[stype]){
			return ProtoCmd.StypeProtos[stype][ctype]
		}
	}
}

export default ProtoCmd;

