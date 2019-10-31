import ProtoTools from "./ProtoTools"
var Log = require("../utils/Log")

class ProtoManager {
    //解头: stype, ctype, utag, proto_type, body
    static decode_cmd_header(cmd_buf:Buffer) {
        var cmd = [];

        if (cmd_buf.length < ProtoTools.HEADER_SIZE) {
            return null;
        }
        cmd[0] = ProtoTools.read_int16(cmd_buf, 0);
        cmd[1] = ProtoTools.read_int16(cmd_buf, 2);
        cmd[2] = ProtoTools.read_uint32(cmd_buf, 4);
        cmd[3] = ProtoTools.read_int16(cmd_buf, 8);
        return cmd;
    }

    //编码
    static encode_cmd(stype:number, ctype:number, utag:number, proto_type:number, body:any) {
        if (proto_type == ProtoTools.ProtoType.PROTO_JSON) {
            return ProtoTools.encode_str_cmd(stype, ctype, utag, proto_type, JSON.stringify(body));
        }
        else {
            return ProtoTools.encode_protobuf_cmd(stype, ctype, utag, proto_type, body);
        }
    }

    //解码, 返回: body
    static decode_cmd(proto_type:number, cmd_buf:Buffer) {
        if (cmd_buf.length < ProtoTools.HEADER_SIZE) {
            return null;
        }

        if (proto_type == ProtoTools.ProtoType.PROTO_JSON) {
            return ProtoManager._json_decode(cmd_buf);
        }else{
            return ProtoTools.decode_protobuf_cmd(cmd_buf);
        }
    }

    //解包：返回body
    static _json_decode(cmd_buf:any) {
        let body = ProtoTools.decode_str_cmd(cmd_buf);
        try {
            body = JSON.parse(body);
        }
        catch(e) {
            return null;
        }
        return body;
    }

    // 加密 TODO
    static encrypt_cmd(str_of_buf:any) {
        return str_of_buf;
    }

    // 解密 TODO
    static decrypt_cmd(str_of_buf:any) {
        return str_of_buf;
    }

}

export default ProtoManager;