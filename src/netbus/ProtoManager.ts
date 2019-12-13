import ProtoTools from "./ProtoTools"
import CryptoUtil from '../utils/CryptoUtil';

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
    static encode_cmd(stype:number, ctype:number, utag:number, proto_type:number, body?:any) {
        if (proto_type == ProtoTools.ProtoType.PROTO_JSON) {
            return ProtoManager._json_encode(stype, ctype, utag, proto_type, body)
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

    private static _json_encode(stype:number, ctype:number, utag:number, proto_type:number,body?:any ) {
        let str = "";
        try {
            str = JSON.stringify(body);
        } catch (error) {
        }
        return ProtoTools.encode_str_cmd(stype, ctype, utag,proto_type,str);
    }
    
    private static _json_decode(cmd_buf:Buffer){
        let str = "";
        try {
            str = JSON.parse(ProtoTools.decode_str_cmd(cmd_buf));
        } catch (error) {
        }
        return str;
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