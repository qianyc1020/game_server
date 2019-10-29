import ProtoCmd from "../apps/ProtoCmd"
import StringUtil from "../utils/StringUtil"
import * as protobufMsg from "../protobuf/protobufMsg"
var Log 		= require("../utils/Log")

class ProtoTools  {
    static  STR_LEN_IN_BUF: number = 2 //用来表示用2字节表示byte_len长度
    static  HEADER_SIZE: number = 10; //header size
    static ProtoType = {
        PROTO_JSON: 1,
        PROTO_BUF: 2,
    };

    static read_int8(cmd_buf, offset) {
        return cmd_buf.readInt8(offset);
    }
    
    static write_int8(cmd_buf, offset, value) {
        cmd_buf.writeInt8(value, offset);
    }
    
    static read_int16(cmd_buf, offset) {
        return cmd_buf.readInt16LE(offset);
    }
    
    static write_int16(cmd_buf, offset, value) {
        cmd_buf.writeInt16LE(value, offset);
    }
    
    static read_int32(cmd_buf, offset) {
        return cmd_buf.readInt32LE(offset);
    }
    
    static write_int32(cmd_buf, offset, value) {
        cmd_buf.writeInt32LE(value, offset);
    }
    
    static read_uint32(cmd_buf, offset) {
        return cmd_buf.readUInt32LE(offset);
    }
    
    static write_uint32(cmd_buf, offset, value) {
        cmd_buf.writeUInt32LE(value, offset);
    }
    
    static read_str(cmd_buf, offset, byte_len) {
        return cmd_buf.toString("utf8", offset, offset + byte_len);
    }
    
    // 性能考虑
    static write_str(cmd_buf, offset, str) {
        cmd_buf.write(str, offset);
    }
    
    static read_float(cmd_buf, offset) {
        return cmd_buf.readFloatLE(offset);
    }
    
    static write_float(cmd_buf, offset, value) {
        cmd_buf.writeFloatLE(value, offset);
    }
    
    static alloc_buffer(total_len) {
        return Buffer.allocUnsafe(total_len);
    }
    
    static write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type) {
        ProtoTools.write_int16(cmd_buf, 0, stype);
        ProtoTools.write_int16(cmd_buf, 2, ctype);
        ProtoTools.write_uint32(cmd_buf, 4, utag);
        ProtoTools.write_int16(cmd_buf, 8, proto_type);
        return ProtoTools.HEADER_SIZE;
    }
    
    static write_prototype_inbuf(cmd_buf, proto_type) {
        ProtoTools.write_int16(cmd_buf, 8, proto_type);
    }
    
    static write_utag_inbuf(cmd_buf, utag) {
        ProtoTools.write_uint32(cmd_buf, 4, utag);
    }
    
    static clear_utag_inbuf(cmd_buf) {
        ProtoTools.write_uint32(cmd_buf, 4, 0);	
    }
    
    static write_str_inbuf(cmd_buf, offset, str, byte_len) {
        ProtoTools.write_int16(cmd_buf, offset, byte_len);
        offset += ProtoTools.STR_LEN_IN_BUF; // 写入2个字节字符串长度信息;
        ProtoTools.write_str(cmd_buf, offset, str);
        offset += byte_len;
        return offset;
    }
    // 返回 str, offset
    static read_str_inbuf(cmd_buf, offset) {
        var byte_len = ProtoTools.read_int16(cmd_buf, offset);
        offset += ProtoTools.STR_LEN_IN_BUF;
        var str = ProtoTools.read_str(cmd_buf, offset, byte_len);
        offset += byte_len;
        return [str, offset];
    }
    
    static write_protobuf_inbuf(cmd_buf,offset,proto_buf){
        var buf = Buffer.from(proto_buf)
        buf.copy(cmd_buf,offset)
    }
    
    static read_protobuf_inbuf(cmd_buf,offset){
        return cmd_buf.slice(offset)
    }
    
    //编码str命令
    static encode_str_cmd(stype, ctype, utag, proto_type, str) {
        var byte_len 	= StringUtil.utf8_byte_len(str);
        Log.info("hcc>>encode_str_cmd: len: " , byte_len)
        var total_len 	= ProtoTools.HEADER_SIZE + ProtoTools.STR_LEN_IN_BUF + byte_len; // STR_LEN_IN_BUF 用来表示用2字节表示byte_len长度
        var cmd_buf 	= ProtoTools.alloc_buffer(total_len);
        var offset 		= ProtoTools.write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
        ProtoTools.write_str_inbuf(cmd_buf, offset, str, byte_len);
        return cmd_buf;
    }
    //解码str命令 ，只解body
    static decode_str_cmd(cmd_buf) {
        var ret = ProtoTools.read_str_inbuf(cmd_buf, ProtoTools.HEADER_SIZE);
        return ret[0]
    }
    //编码 protobuf命令
    static encode_protobuf_cmd(stype, ctype, utag, proto_type, body){
        var stypeName = ProtoCmd.getProtoName(stype)
        var cmdName   = ProtoCmd.getCmdName(stype,ctype)
        Log.info("protoinfo: ", stypeName , cmdName ,stype ,ctype)
        if (!stypeName || !cmdName){
            Log.error("encode stypeName or cmdName not exist")
            return;
        }
    
        if (!protobufMsg[stypeName]) {
            Log.error("encode stypeName not exist")
            return;
        }
    
        var msgType = protobufMsg[stypeName][cmdName]
        if (!msgType) {
            Log.error("encode cmdName not exist")
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
            var total_len 	= ProtoTools.HEADER_SIZE + byte_len;
            var cmd_buf 	= ProtoTools.alloc_buffer(total_len);
            var offset 		= ProtoTools.write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
            ProtoTools.write_protobuf_inbuf(cmd_buf,offset,emcode_msg);
            return cmd_buf;
        }catch(e){
            Log.error(e)
        }
    }
    //解码protobuf命令,返回body
    static decode_protobuf_cmd(cmd_buf){
        var stype = ProtoTools.read_int16(cmd_buf, 0);
        var ctype = ProtoTools.read_int16(cmd_buf, 2);
        // Log.info("decode_protobuf_cmd",stype , ctype , "len:"+ cmd_buf.length , cmd_buf)
        var bodyBuf = ProtoTools.read_protobuf_inbuf(cmd_buf,ProtoTools.HEADER_SIZE)
        if(bodyBuf){
            var stypeName = ProtoCmd.getProtoName(stype)
            var cmdName   = ProtoCmd.getCmdName(stype,ctype)
            if (!stypeName || !cmdName){
                Log.error("decode stypeName or cmdName not exist")
                return;
            }
    
            if (!protobufMsg[stypeName]) {
                Log.error("decode stypeName not exist")
                return;
            }
    
            var msgType = protobufMsg[stypeName][cmdName]
            if (!msgType) {
                Log.error("decode cmdName not exist")
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
}

export default ProtoTools;

