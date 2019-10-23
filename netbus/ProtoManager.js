var Log 		= require("../utils/Log.js")
var ProtoTools 	= require("./ProtoTools.js")
var ProtoType 	= require("./ProtoType.js")

//解头: stype, ctype, utag, proto_type, body
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

//编码
function encode_cmd(stype, ctype, utag, proto_type, body) {
	var buf = null;
	if (proto_type == ProtoType.PROTO_JSON) {
		return _json_encode(stype, ctype, utag, proto_type, body);
	}
	else {
		return _protobuf_encode(stype, ctype, utag, proto_type, body);
	}
}

//解码, 返回: body
function decode_cmd(proto_type, cmd_buf) {
	if (cmd_buf.length < ProtoTools.header_size) {
		return null;
	}

	if (proto_type == ProtoType.PROTO_JSON) {
		return _json_decode(cmd_buf);
	}else{
		return _protobuf_decode(cmd_buf);
	}
}

function _json_encode(stype, ctype, utag, proto_type, body) {
	return ProtoTools.encode_str_cmd(stype, ctype, utag, proto_type, JSON.stringify(body));
}
//解包：返回body
function _json_decode(cmd_buf) {
	var body = ProtoTools.decode_str_cmd(cmd_buf);
	try {
		body = JSON.parse(body);
	}
	catch(e) {
		return null;
	}
	return body;
}

function _protobuf_encode(stype, ctype, utag, proto_type, body){
	return ProtoTools.encode_protobuf_cmd(stype, ctype, utag, proto_type, body);
}

function _protobuf_decode(cmd_buf){
	// Log.info("_protobuf_decode:" , cmd_buf)
	return ProtoTools.decode_protobuf_cmd(cmd_buf);
}

// 加密 TODO
function encrypt_cmd(str_of_buf) {
	return str_of_buf;
}

// 解密 TODO
function decrypt_cmd(str_of_buf) {
	return str_of_buf;
}

var ProtoManager = {
	encode_cmd: encode_cmd,
	decode_cmd: decode_cmd,

	encrypt_cmd: encrypt_cmd,
	decrypt_cmd: decrypt_cmd,

	decode_cmd_header: decode_cmd_header,
};

module.exports = ProtoManager;