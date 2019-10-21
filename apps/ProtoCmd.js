var Log 	= require("../utils/Log.js")
var Stype 	= require("./Stype")

//服务器下标->协议脚本
var StypeProtos = {
	[Stype.Broadcast] : require("./gateway/BroadcastProto.js"),
	[Stype.TalkRoom] : require("./talk_room/TalkProto.js"),
	[Stype.Auth] : require("./auth_server/AuthProto.js"),
	[Stype.GameSystem] : require("./system_server/SystemProto.js"),
	[Stype.Game] : require("./game_server/GameProto.js"),
}

//命名空间
function getProtoName(stype){
	if(StypeProtos[stype]){
		return StypeProtos[stype].nameSpace	
	}
}
//字段名称
function getCmdName(stype, ctype){
	if(StypeProtos[stype]){
		return StypeProtos[stype][ctype]
	}
}

var ProtoCmd = {
	getProtoName: getProtoName,
	getCmdName: getCmdName,
}

module.exports = ProtoCmd;

