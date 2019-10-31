"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProtoCmd_1 = __importDefault(require("../apps/ProtoCmd"));
var StringUtil_1 = __importDefault(require("../utils/StringUtil"));
var protobufMsg = __importStar(require("../protobuf/protobufMsg"));
var Log = require("../utils/Log");
var ProtoTools = /** @class */ (function () {
    function ProtoTools() {
    }
    ProtoTools.read_int8 = function (cmd_buf, offset) {
        return cmd_buf.readInt8(offset);
    };
    ProtoTools.write_int8 = function (cmd_buf, offset, value) {
        cmd_buf.writeInt8(value, offset);
    };
    ProtoTools.read_int16 = function (cmd_buf, offset) {
        return cmd_buf.readInt16LE(offset);
    };
    ProtoTools.write_int16 = function (cmd_buf, offset, value) {
        cmd_buf.writeInt16LE(value, offset);
    };
    ProtoTools.read_int32 = function (cmd_buf, offset) {
        return cmd_buf.readInt32LE(offset);
    };
    ProtoTools.write_int32 = function (cmd_buf, offset, value) {
        cmd_buf.writeInt32LE(value, offset);
    };
    ProtoTools.read_uint32 = function (cmd_buf, offset) {
        return cmd_buf.readUInt32LE(offset);
    };
    ProtoTools.write_uint32 = function (cmd_buf, offset, value) {
        cmd_buf.writeUInt32LE(value, offset);
    };
    ProtoTools.read_str = function (cmd_buf, offset, byte_len) {
        return cmd_buf.toString("utf8", offset, offset + byte_len);
    };
    // 性能考虑
    ProtoTools.write_str = function (cmd_buf, offset, str) {
        cmd_buf.write(str, offset);
    };
    ProtoTools.read_float = function (cmd_buf, offset) {
        return cmd_buf.readFloatLE(offset);
    };
    ProtoTools.write_float = function (cmd_buf, offset, value) {
        cmd_buf.writeFloatLE(value, offset);
    };
    ProtoTools.alloc_buffer = function (total_len) {
        return Buffer.allocUnsafe(total_len);
    };
    ProtoTools.write_cmd_header_inbuf = function (cmd_buf, stype, ctype, utag, proto_type) {
        ProtoTools.write_int16(cmd_buf, 0, stype);
        ProtoTools.write_int16(cmd_buf, 2, ctype);
        ProtoTools.write_uint32(cmd_buf, 4, utag);
        ProtoTools.write_int16(cmd_buf, 8, proto_type);
        return ProtoTools.HEADER_SIZE;
    };
    ProtoTools.write_prototype_inbuf = function (cmd_buf, proto_type) {
        ProtoTools.write_int16(cmd_buf, 8, proto_type);
    };
    ProtoTools.write_utag_inbuf = function (cmd_buf, utag) {
        ProtoTools.write_uint32(cmd_buf, 4, utag);
    };
    ProtoTools.clear_utag_inbuf = function (cmd_buf) {
        ProtoTools.write_uint32(cmd_buf, 4, 0);
    };
    ProtoTools.write_str_inbuf = function (cmd_buf, offset, str, byte_len) {
        ProtoTools.write_int16(cmd_buf, offset, byte_len);
        offset += ProtoTools.STR_LEN_IN_BUF; // 写入2个字节字符串长度信息;
        ProtoTools.write_str(cmd_buf, offset, str);
        offset += byte_len;
        return offset;
    };
    // 返回 str, offset
    ProtoTools.read_str_inbuf = function (cmd_buf, offset) {
        var byte_len = ProtoTools.read_int16(cmd_buf, offset);
        offset += ProtoTools.STR_LEN_IN_BUF;
        var str = ProtoTools.read_str(cmd_buf, offset, byte_len);
        offset += byte_len;
        return str;
    };
    ProtoTools.write_protobuf_inbuf = function (cmd_buf, offset, proto_buf) {
        var buf = Buffer.from(proto_buf);
        buf.copy(cmd_buf, offset);
    };
    ProtoTools.read_protobuf_inbuf = function (cmd_buf, offset) {
        return cmd_buf.slice(offset);
    };
    //编码str命令
    ProtoTools.encode_str_cmd = function (stype, ctype, utag, proto_type, str) {
        var byte_len = StringUtil_1.default.utf8_byte_len(str);
        Log.info("hcc>>encode_str_cmd: len: ", byte_len);
        var total_len = ProtoTools.HEADER_SIZE + ProtoTools.STR_LEN_IN_BUF + byte_len; // STR_LEN_IN_BUF 用来表示用2字节表示byte_len长度
        var cmd_buf = ProtoTools.alloc_buffer(total_len);
        var offset = ProtoTools.write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
        ProtoTools.write_str_inbuf(cmd_buf, offset, str, byte_len);
        return cmd_buf;
    };
    //解码str命令 ，只解body
    ProtoTools.decode_str_cmd = function (cmd_buf) {
        return ProtoTools.read_str_inbuf(cmd_buf, ProtoTools.HEADER_SIZE);
    };
    //编码 protobuf命令
    ProtoTools.encode_protobuf_cmd = function (stype, ctype, utag, proto_type, body) {
        var stypeName = ProtoCmd_1.default.getProtoName(stype);
        var cmdName = ProtoCmd_1.default.getCmdName(stype, ctype);
        Log.info("protoinfo: ", stypeName, cmdName, stype, ctype);
        if (!stypeName || !cmdName) {
            Log.error("encode stypeName or cmdName not exist");
            return;
        }
        //test TODO
        // protobufMsg.AuthProto.Cmd
        // protobufMsg.AuthProto.LoginReq
        // protobufMsg.AuthProto.LoginRes
        if (!protobufMsg[stypeName]) {
            Log.error("encode stypeName not exist");
            return;
        }
        var msgType = protobufMsg[stypeName][cmdName];
        if (!msgType) {
            Log.error("encode cmdName not exist");
            return;
        }
        var error = msgType.verify(body);
        if (error) {
            Log.error(error);
            return;
        }
        try {
            var msg = msgType.create(body);
            var emcode_msg = msgType.encode(msg).finish();
            var byte_len = emcode_msg.byteLength;
            var total_len = ProtoTools.HEADER_SIZE + byte_len;
            var cmd_buf = ProtoTools.alloc_buffer(total_len);
            var offset = ProtoTools.write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
            ProtoTools.write_protobuf_inbuf(cmd_buf, offset, emcode_msg);
            return cmd_buf;
        }
        catch (e) {
            Log.error(e);
        }
    };
    //解码protobuf命令,返回body
    ProtoTools.decode_protobuf_cmd = function (cmd_buf) {
        var stype = ProtoTools.read_int16(cmd_buf, 0);
        var ctype = ProtoTools.read_int16(cmd_buf, 2);
        // Log.info("decode_protobuf_cmd",stype , ctype , "len:"+ cmd_buf.length , cmd_buf)
        var bodyBuf = ProtoTools.read_protobuf_inbuf(cmd_buf, ProtoTools.HEADER_SIZE);
        if (bodyBuf) {
            var stypeName = ProtoCmd_1.default.getProtoName(stype);
            var cmdName = ProtoCmd_1.default.getCmdName(stype, ctype);
            if (!stypeName || !cmdName) {
                Log.error("decode stypeName or cmdName not exist");
                return;
            }
            if (!protobufMsg[stypeName]) {
                Log.error("decode stypeName not exist");
                return;
            }
            var msgType = protobufMsg[stypeName][cmdName];
            if (!msgType) {
                Log.error("decode cmdName not exist");
                return;
            }
            var error = msgType.verify(bodyBuf);
            if (error) {
                Log.error(error);
                return;
            }
            var decodeMsg = null;
            try {
                decodeMsg = msgType.decode(bodyBuf);
            }
            catch (e) {
                Log.error(e);
                return;
            }
            return decodeMsg;
        }
    };
    ProtoTools.STR_LEN_IN_BUF = 2; //用来表示用2字节表示byte_len长度
    ProtoTools.HEADER_SIZE = 10; //header size
    ProtoTools.ProtoType = {
        PROTO_JSON: 1,
        PROTO_BUF: 2,
    };
    return ProtoTools;
}());
exports.default = ProtoTools;
//# sourceMappingURL=ProtoTools.js.map