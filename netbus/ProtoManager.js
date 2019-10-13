/* 规定:
(1)服务号 命令号 不能为0
(2)服务号与命令号大小不能超过2个字节的整数;
(3) buf协议里面2个字节来存放服务号(0开始的2个字节)，命令号(1开始的2个字节);
(4) 加密,解密, 
(5) 服务号命令号二进制中都用小尾存储
(6) 所有的文本，都使用utf8
*/

var Log 		= require("../utils/Log")
var ProtoTools 	= require("./ProtoTools")
var ProtoType 	= require("./ProtoType")

var ProtoManager = {
	encode_cmd: encode_cmd,
	decode_cmd: decode_cmd,

	encrypt_cmd: encrypt_cmd,
	decrypt_cmd: decrypt_cmd,

	decode_cmd_header: decode_cmd_header,
};

//编码
function encode_cmd(stype, ctype, utag, proto_type, body) {
	var buf = null;
	
	if (proto_type == ProtoType.PROTO_JSON) {
		buf = _json_encode(stype, ctype, body);
	}
	else { // protobuf协议
		//TODO
	}
	ProtoTools.write_utag_inbuf(buf, utag);
	ProtoTools.write_prototype_inbuf(buf, proto_type);
	return buf;
}

// 参数1: 协议类型
// 参数2: 接手到的数据命令
// 返回: {0: stype, 1, ctype, 2: body}
function decode_cmd(proto_type, cmd_buf) {
	if (cmd_buf.length < ProtoTools.header_size) {
		return null;
	}

	if (proto_type == ProtoType.PROTO_JSON) {
		return _json_decode(cmd_buf);
	}else{
		//protobuf TODO
	}

	return null;
}

function _json_encode(stype, ctype, body) {
	var cmd = {};
	cmd[0] = body; //??
	var str = JSON.stringify(cmd);
	Log.info(str)
	var cmd_buf = ProtoTools.encode_str_cmd(stype, ctype, str);
	return cmd_buf;
}

function _json_decode(cmd_buf) {
	var cmd = ProtoTools.decode_str_cmd(cmd_buf);
	var cmd_json = cmd[2];
	try {
		var body_set = JSON.parse(cmd_json);
		cmd[2] = body_set[0];
	}
	catch(e) {
		return null;
	}
	
	if (!cmd || 
		typeof(cmd[0])=="undefined" ||
		typeof(cmd[1])=="undefined" ||
		typeof(cmd[2])=="undefined") {
		return null;
	}

	return cmd;
} 
//stype, ctype, utag, proto_type, body
function decode_cmd_header(cmd_buf) {
	var cmd = {};

	if (cmd_buf.length < ProtoTools.header_size) {
		return null;
	}
	cmd[0] = ProtoTools.read_int16(cmd_buf, 0);
	cmd[1] = ProtoTools.read_int16(cmd_buf, 2);
	cmd[2] = ProtoTools.read_uint32(cmd_buf, 4);
	cmd[3] = ProtoTools.read_int16(cmd_buf, 8);

	return cmd;
}

// 加密 TODO
function encrypt_cmd(str_of_buf) {
	return str_of_buf;
}

// 解密 TODO
function decrypt_cmd(str_of_buf) {
	return str_of_buf;
}

module.exports = ProtoManager;