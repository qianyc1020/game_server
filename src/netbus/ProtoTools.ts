import ProtoCmd from "../apps/protocol/ProtoCmd"
import StringUtil from "../utils/StringUtil"

var Log 	    = require("../utils/Log")
// import protobufMsg from "../apps/protocol/protobufMsg"
var protobufMsg = require("../apps/protocol/protobufMsg")

class ProtoTools  {
    static  HEADER_SIZE: number    = 10;   // header size
    static  ProtoType:any = {
        PROTO_JSON: 1,
        PROTO_BUF: 2,
    };

    static read_int8(cmd_buf:Buffer, offset:number) {
        return cmd_buf.readInt8(offset);
    }
    
    static write_int8(cmd_buf:Buffer, offset:number, value:number) {
        cmd_buf.writeInt8(value, offset);
    }
    
    static read_int16(cmd_buf:Buffer, offset:number) {
        return cmd_buf.readInt16LE(offset);
    }
    
    static write_int16(cmd_buf:Buffer, offset:number, value:number) {
        cmd_buf.writeInt16LE(value, offset);
    }
    
    static read_int32(cmd_buf:Buffer, offset:number) {
        return cmd_buf.readInt32LE(offset);
    }
    
    static write_int32(cmd_buf:Buffer, offset:number, value:number) {
        cmd_buf.writeInt32LE(value, offset);
    }
    
    static read_uint32(cmd_buf:Buffer, offset:number) {
        return cmd_buf.readUInt32LE(offset);
    }
    
    static write_uint32(cmd_buf:Buffer, offset:number, value:number) {
        cmd_buf.writeUInt32LE(value, offset);
    }
    
    static read_str(cmd_buf:Buffer, offset:number, byte_len:number) {
        return cmd_buf.toString("utf8", offset, offset + byte_len);
    }
    
    // 性能考虑
    static write_str(cmd_buf:Buffer, offset:number, str:string) {
        cmd_buf.write(str, offset);
    }
    
    static read_float(cmd_buf:Buffer, offset:number) {
        return cmd_buf.readFloatLE(offset);
    }
    
    static write_float(cmd_buf:Buffer, offset:number, value:number) {
        cmd_buf.writeFloatLE(value, offset);
    }
    
    static alloc_buffer(total_len:number):Buffer {
        return Buffer.allocUnsafe(total_len);
    }
    
    static write_cmd_header_inbuf(cmd_buf:Buffer, stype:number, ctype:number, utag:number, proto_type:number) {
        ProtoTools.write_int16(cmd_buf, 0, stype);
        ProtoTools.write_int16(cmd_buf, 2, ctype);
        ProtoTools.write_uint32(cmd_buf, 4, utag);
        ProtoTools.write_int16(cmd_buf, 8, proto_type);
        return ProtoTools.HEADER_SIZE;
    }
    
    static write_prototype_inbuf(cmd_buf:Buffer, proto_type:number) {
        ProtoTools.write_int16(cmd_buf, 8, proto_type);
    }
    
    static write_utag_inbuf(cmd_buf:Buffer, utag:number) {
        ProtoTools.write_uint32(cmd_buf, 4, utag);
    }
    
    static clear_utag_inbuf(cmd_buf:Buffer) {
        ProtoTools.write_uint32(cmd_buf, 4, 0);	
    }
    
    static write_str_inbuf(cmd_buf:Buffer, offset:number, str:string, byte_len:number) {
        ProtoTools.write_int16(cmd_buf, offset, byte_len);
        ProtoTools.write_str(cmd_buf, offset, str);
        offset += byte_len;
        return offset;
    }
    // 返回 str, offset
    static read_str_inbuf(cmd_buf:Buffer, offset:number) {
        var byte_len = ProtoTools.read_int16(cmd_buf, offset);
        var str = ProtoTools.read_str(cmd_buf, offset, byte_len);
        offset += byte_len;
        return str;
    }
    
    static write_protobuf_inbuf(cmd_buf:Buffer,offset:number,proto_buf:Uint8Array){
        var buf = Buffer.from(proto_buf)
        buf.copy(cmd_buf,offset)
    }
    
    static read_protobuf_inbuf(cmd_buf:Buffer,offset:number){
        return cmd_buf.slice(offset)
    }
    
    //编码str命令
    static encode_str_cmd(stype:number, ctype:number, utag:number, proto_type:number, str?:string) {
        if(!str){str = ""}
        var byte_len 	= StringUtil.utf8_byte_len(str);
        // Log.info("hcc>>encode_str_cmd: len: " , byte_len)
        var total_len 	= ProtoTools.HEADER_SIZE + byte_len;
        var cmd_buf 	= ProtoTools.alloc_buffer(total_len);
        var offset 		= ProtoTools.write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
        ProtoTools.write_str_inbuf(cmd_buf, offset, str, byte_len);
        return cmd_buf;
    }
    //解码str命令 ，只解body
    static decode_str_cmd(cmd_buf:Buffer):string {
        return ProtoTools.read_str_inbuf(cmd_buf, ProtoTools.HEADER_SIZE);
    }
  
    //编码 protobuf命令
    static encode_protobuf_cmd(stype:number, ctype:number, utag:number, proto_type:number, body?:any){
        let stypeName = ProtoCmd.getProtoName(stype)
        let cmdName   = ProtoCmd.getCmdName(stype,ctype)
        Log.info("protoinfo: ", stypeName , cmdName ,stype ,ctype)
        if (!stypeName || !cmdName){
            Log.error("encode stypeName or cmdName not exist")
            return;
        }

        if (!protobufMsg[stypeName]) {
            Log.error("encode stypeName not exist")
            return;
        }
    
        let msgType = protobufMsg[stypeName][cmdName]
        if (!msgType) {
            Log.error("encode cmdName not exist")
            return;
        }

        if(!body){
            body = {}
        }

        let error = msgType.verify(body)
        if(error){
            Log.error(error)
            return;
        }

        let message = msgType.create(body)
        if(message){
            try {
                let emcode_msg 	= msgType.encode(message).finish()
                let total_len 	= ProtoTools.HEADER_SIZE + emcode_msg.byteLength;
                let cmd_buf 	= ProtoTools.alloc_buffer(total_len);
                let offset 		= ProtoTools.write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
                ProtoTools.write_protobuf_inbuf(cmd_buf,offset,emcode_msg);
                return cmd_buf;
            } catch (error) {
                Log.error(error)                
            }
        }
    }

    //解码protobuf命令,返回body
    static decode_protobuf_cmd(cmd_buf:Buffer){
        let stype = ProtoTools.read_int16(cmd_buf, 0);
        let ctype = ProtoTools.read_int16(cmd_buf, 2);
        let bodyBuf = ProtoTools.read_protobuf_inbuf(cmd_buf,ProtoTools.HEADER_SIZE)
        if(bodyBuf){
            let stypeName = ProtoCmd.getProtoName(stype)
            let cmdName   = ProtoCmd.getCmdName(stype,ctype)
            if (!stypeName || !cmdName){
                Log.error("decode stypeName or cmdName not exist")
                return;
            }
    
            if (!protobufMsg[stypeName]) {
                Log.error("decode stypeName not exist")
                return;
            }
    
            let msgType = protobufMsg[stypeName][cmdName]
            if (!msgType) {
                Log.error("decode cmdName not exist")
                return;
            }
            let decodeMsg = null;
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

