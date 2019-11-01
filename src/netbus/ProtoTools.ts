import ProtoCmd from "../apps/ProtoCmd"
import StringUtil from "../utils/StringUtil"
import * as protobufMsg from "../protobuf/protobufMsg"
import * as protobuf from "protobufjs";
var Log 		= require("../utils/Log")

let proto_path: string  = "protobufMsg.proto"
let protoRoot: any      = null;

//load protobuf file
protobuf.load(proto_path, function(err:any, root:any) {
    if (err){
        Log.error(err)
        return
    }
    protoRoot = root;
    Log.info("load protofile success: " + proto_path);
})

class ProtoTools  {
    static  STR_LEN_IN_BUF: number = 2;    // 用来表示用2字节表示byte_len长度
    static  HEADER_SIZE: number    = 10;   // header size
    static  protobufRoot: any      = null;
    static  ProtoType:any = {
        PROTO_JSON: 1,
        PROTO_BUF: 2,
    };

    static init(){
    }

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
        offset += ProtoTools.STR_LEN_IN_BUF; // 写入2个字节字符串长度信息;
        ProtoTools.write_str(cmd_buf, offset, str);
        offset += byte_len;
        return offset;
    }
    // 返回 str, offset
    static read_str_inbuf(cmd_buf:Buffer, offset:number) {
        var byte_len = ProtoTools.read_int16(cmd_buf, offset);
        offset += ProtoTools.STR_LEN_IN_BUF;
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
    static encode_str_cmd(stype:number, ctype:number, utag:number, proto_type:number, str:string) {
        var byte_len 	= StringUtil.utf8_byte_len(str);
        Log.info("hcc>>encode_str_cmd: len: " , byte_len)
        var total_len 	= ProtoTools.HEADER_SIZE + ProtoTools.STR_LEN_IN_BUF + byte_len; // STR_LEN_IN_BUF 用来表示用2字节表示byte_len长度
        var cmd_buf 	= ProtoTools.alloc_buffer(total_len);
        var offset 		= ProtoTools.write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
        ProtoTools.write_str_inbuf(cmd_buf, offset, str, byte_len);
        return cmd_buf;
    }
    //解码str命令 ，只解body
    static decode_str_cmd(cmd_buf:Buffer):string {
        return ProtoTools.read_str_inbuf(cmd_buf, ProtoTools.HEADER_SIZE);
    }

    static encode_protobuf_cmd(stype:number, ctype:number, utag:number, proto_type:number, body:any){
        if(!protoRoot){
            Log.error("encode protoRoot is null")
            return;
        }
        let protoCmd = ProtoCmd.getCmd(stype,ctype);
        if(!protoCmd){
            Log.error("encode stypeName or cmdName not exist")
            return;
        }

        let messageType = protoRoot.lookup(protoCmd);
        if (!messageType){
            Log.error("encode protobuf message " + protoCmd + " is null")
            return;
        }
        let error = messageType.verify(body)
        if (error){
            Log.error("encode protobuf body is error")
            return;
        }
        let message = messageType.create(body);
        if (message){
            try {
                let emcode_msg 	= messageType.encode(message).finish()
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
        if(!protoRoot){
            Log.error("decode protoRoot is null")
            return;
        }

        let stype = ProtoTools.read_int16(cmd_buf, 0);
        let ctype = ProtoTools.read_int16(cmd_buf, 2);
        let protoCmd = ProtoCmd.getCmd(stype,ctype);
        if(!protoCmd){
            Log.error("decode stypeName or cmdName not exist")
            return;
        }
        let bodyBuf = ProtoTools.read_protobuf_inbuf(cmd_buf,ProtoTools.HEADER_SIZE)
        if(bodyBuf){
            let messageType = protoRoot.lookup(protoCmd);
            if (!messageType){
                Log.error("decode protobuf message " + protoCmd + " is null")
                return;
            }

            let error = messageType.verify(bodyBuf)
            if(error){
                Log.error("decode protobuf " , error)
                return;
            }
    
            let decodeMsg = null;
            try {
                decodeMsg = messageType.decode(bodyBuf)
            }
            catch(e) {
                Log.error("decode protobuf " ,e)
                return ;
            }
            return decodeMsg;
        }
    }

/*
    //编码 protobuf命令
    static encode_protobuf_cmd(stype:number, ctype:number, utag:number, proto_type:number, body:any){
        var stypeName = ProtoCmd.getProtoName(stype)
        var cmdName   = ProtoCmd.getCmdName(stype,ctype)
        Log.info("protoinfo: ", stypeName , cmdName ,stype ,ctype)
        if (!stypeName || !cmdName){
            Log.error("encode stypeName or cmdName not exist")
            return;
        }
        //TODO
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
*/
    //解码protobuf命令,返回body
    /*
    static decode_protobuf_cmd(cmd_buf:Buffer){
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
    */

}

export default ProtoTools;

