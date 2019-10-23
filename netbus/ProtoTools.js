var protobufMsg = require("../proto/protobufMsg.js")
var ProtoCmd 	= require("../apps/ProtoCmd.js")
var Log 		= require("../utils/Log.js")

var STR_LEN_IN_BUF = 2 //用来表示用2字节表示byte_len长度

function read_int8(cmd_buf, offset) {
	return cmd_buf.readInt8(offset);
}

function write_int8(cmd_buf, offset, value) {
	cmd_buf.writeInt8(value, offset);
}

function read_int16(cmd_buf, offset) {
	return cmd_buf.readInt16LE(offset);
}

function write_int16(cmd_buf, offset, value) {
	cmd_buf.writeInt16LE(value, offset);
}

function read_int32(cmd_buf, offset) {
	return cmd_buf.readInt32LE(offset);
}

function write_int32(cmd_buf, offset, value) {
	cmd_buf.writeInt32LE(value, offset);
}

function read_uint32(cmd_buf, offset) {
	return cmd_buf.readUInt32LE(offset);
}

function write_uint32(cmd_buf, offset, value) {
	cmd_buf.writeUInt32LE(value, offset);
}

function read_str(cmd_buf, offset, byte_len) {
	return cmd_buf.toString("utf8", offset, offset + byte_len);
}

// 性能考虑
function write_str(cmd_buf, offset, str) {
	cmd_buf.write(str, offset);
}

function read_float(cmd_buf, offset) {
	return cmd_buf.readFloatLE(offset);
}

function write_float(cmd_buf, offset, value) {
	cmd_buf.writeFloatLE(value, offset);
}

function alloc_buffer(total_len) {
	return Buffer.allocUnsafe(total_len);
}

function write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type) {
	write_int16(cmd_buf, 0, stype);
	write_int16(cmd_buf, 2, ctype);
	write_uint32(cmd_buf, 4, utag);
	write_int16(cmd_buf, 8, proto_type);
	return ProtoTools.header_size;
}

function write_prototype_inbuf(cmd_buf, proto_type) {
	write_int16(cmd_buf, 8, proto_type);
}

function write_utag_inbuf(cmd_buf, utag) {
	write_uint32(cmd_buf, 4, utag);
}

function clear_utag_inbuf(cmd_buf) {
	write_uint32(cmd_buf, 4, 0);	
}

function write_str_inbuf(cmd_buf, offset, str, byte_len) {
	write_int16(cmd_buf, offset, byte_len);
	offset += STR_LEN_IN_BUF; // 写入2个字节字符串长度信息;
	write_str(cmd_buf, offset, str);
	offset += byte_len;
	return offset;
}
// 返回 str, offset
function read_str_inbuf(cmd_buf, offset) {
	var byte_len = read_int16(cmd_buf, offset);
	offset += STR_LEN_IN_BUF;
	var str = read_str(cmd_buf, offset, byte_len);
	offset += byte_len;
	return [str, offset];
}

function write_protobuf_inbuf(cmd_buf,offset,proto_buf){
	var buf = Buffer.from(proto_buf)
	buf.copy(cmd_buf,offset)
}

function read_protobuf_inbuf(cmd_buf,offset){
	return cmd_buf.slice(offset)
}

//编码str命令
function encode_str_cmd(stype, ctype, utag, proto_type, str) {
	var byte_len 	= str.utf8_byte_len();
	var total_len 	= ProtoTools.header_size + STR_LEN_IN_BUF + byte_len; // STR_LEN_IN_BUF 用来表示用2字节表示byte_len长度
	var cmd_buf 	= alloc_buffer(total_len);
	var offset 		= write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
	write_str_inbuf(cmd_buf, offset, str, byte_len);
	return cmd_buf;
}
//解码str命令 ，只解body
function decode_str_cmd(cmd_buf) {
	var ret = read_str_inbuf(cmd_buf, ProtoTools.header_size);
	return ret[0]
}
//编码 protobuf命令
function encode_protobuf_cmd(stype, ctype, utag, proto_type, body){
	var stypeName = ProtoCmd.getProtoName(stype)
	var cmdName   = ProtoCmd.getCmdName(stype,ctype)
	if (!stypeName || !cmdName){
		Log.error("stypeName or cmdName not exist")
		return;
	}

	if (!protobufMsg[stypeName]) {
		Log.error("stypeName not exist")
		return;
	}

	var msgType = protobufMsg[stypeName][cmdName]
	if (!msgType) {
		Log.error("cmdName not exist")
		return;
	}

	var error = msgType.verify(body)
	if(error){
		Log.error(error)
		return;
	}

	try{
		var msg 		= msgType.create(body)
		var emcode_msg 	= msgType.encode(msg).finish()
		var byte_len 	= emcode_msg.byteLength;
		var total_len 	= ProtoTools.header_size + byte_len;
		var cmd_buf 	= alloc_buffer(total_len);
		var offset 		= write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
		write_protobuf_inbuf(cmd_buf,offset,emcode_msg);
		return cmd_buf;
	}catch(e){
		Log.error(e)
	}
}
//解码protobuf命令,返回body
function decode_protobuf_cmd(cmd_buf){
	var stype = read_int16(cmd_buf, 0);
	var ctype = read_int16(cmd_buf, 2);
	// Log.info("decode_protobuf_cmd",stype , ctype , "len:"+ cmd_buf.length , cmd_buf)
	var bodyBuf = read_protobuf_inbuf(cmd_buf,ProtoTools.header_size)
	if(bodyBuf){
		var stypeName = ProtoCmd.getProtoName(stype)
		var cmdName   = ProtoCmd.getCmdName(stype,ctype)
		if (!stypeName || !cmdName){
			Log.error("stypeName or cmdName not exist")
			return;
		}

		if (!protobufMsg[stypeName]) {
			Log.error("stypeName not exist")
			return;
		}

		var msgType = protobufMsg[stypeName][cmdName]
		if (!msgType) {
			Log.error("cmdName not exist")
			return;
		}
		var error = msgType.verify(bodyBuf)
		if(error){
			Log.error(error)
			return;
		}

		var decodeMsg = null;
		try {
			 decodeMsg = msgType.decode(bodyBuf)
		}
		catch(e) {
			Log.error(e)
			return ;
		}
		return decodeMsg;
	}
}

var ProtoTools = {
	header_size: 10, // 2 + 2 + 4 + 2; stype,ctype,utag,proto_type
	// 原操作
	read_int8: read_int8,
	write_int8: write_int8,

	read_int16: read_int16,
	write_int16, write_int16,

	read_int32: read_int32,
	write_int32, write_int32,

	read_float: read_float,
	write_float: write_float,

	read_uint32: read_uint32,
	write_uint32, write_uint32,
	
	alloc_buffer: alloc_buffer,

	// 通用操作
	write_cmd_header_inbuf: write_cmd_header_inbuf,
	write_prototype_inbuf: write_prototype_inbuf,
	write_utag_inbuf: write_utag_inbuf,
	clear_utag_inbuf: clear_utag_inbuf,
	
	read_str_inbuf: read_str_inbuf,

	// 模板编码解码器
	encode_str_cmd: encode_str_cmd,
	decode_str_cmd: decode_str_cmd,
	encode_protobuf_cmd: encode_protobuf_cmd,
	decode_protobuf_cmd: decode_protobuf_cmd,
};

module.exports = ProtoTools;
