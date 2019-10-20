//服务器下标->协议脚本
var StypeProtos = {
	[0] : require("./gateway/BroadcastProto.js"),
	[1] : require("./talk_room/TalkProto.js"),
	[2] : require("./auth_server/AuthProto.js"),
	[3] : require("./system_server/SystemProto.js"),
	[4] : require("./game_server/GameProto.js"),
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

