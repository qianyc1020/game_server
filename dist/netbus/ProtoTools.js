"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ProtoCmd_1 = __importDefault(require("../apps/protocol/ProtoCmd"));
var StringUtil_1 = __importDefault(require("../utils/StringUtil"));
var Log = require("../utils/Log");
var protobufMsg = require("../apps/protocol/protobufMsg");
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
        ProtoTools.write_str(cmd_buf, offset, str);
        offset += byte_len;
        return offset;
    };
    // 返回 str, offset
    ProtoTools.read_str_inbuf = function (cmd_buf, offset) {
        var byte_len = ProtoTools.read_int16(cmd_buf, offset);
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
        if (!str) {
            str = "";
        }
        var byte_len = StringUtil_1["default"].utf8_byte_len(str);
        // Log.info("hcc>>encode_str_cmd: len: " , byte_len)
        var total_len = ProtoTools.HEADER_SIZE + byte_len;
        var cmd_buf = ProtoTools.alloc_buffer(total_len);
        var offset = ProtoTools.write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
        if (str != "") {
            ProtoTools.write_str_inbuf(cmd_buf, offset, str, byte_len);
        }
        return cmd_buf;
    };
    //解码str命令 ，只解body
    ProtoTools.decode_str_cmd = function (cmd_buf) {
        return ProtoTools.read_str_inbuf(cmd_buf, ProtoTools.HEADER_SIZE);
    };
    //编码 protobuf命令
    ProtoTools.encode_protobuf_cmd = function (stype, ctype, utag, proto_type, body) {
        var stypeName = ProtoCmd_1["default"].getProtoName(stype);
        var cmdName = ProtoCmd_1["default"].getCmdName(stype, ctype);
        // Log.info("encode_protobuf_cmd: ", stypeName , cmdName ,stype ,ctype)
        if (!stypeName || !cmdName) {
            Log.error("encode stypeName or cmdName not exist");
            return;
        }
        if (!protobufMsg[stypeName]) {
            Log.error("encode stypeName", stypeName, " not exist");
            return;
        }
        var msgType = protobufMsg[stypeName][cmdName];
        if (!msgType) {
            Log.error("encode cmdName", cmdName, "not exist");
            return;
        }
        if (!body) {
            body = {};
        }
        var error = msgType.verify(body);
        if (error) {
            Log.error(error);
            return;
        }
        var message = msgType.create(body);
        if (message) {
            try {
                var emcode_msg = msgType.encode(message).finish();
                var total_len = ProtoTools.HEADER_SIZE + emcode_msg.byteLength;
                var cmd_buf = ProtoTools.alloc_buffer(total_len);
                var offset = ProtoTools.write_cmd_header_inbuf(cmd_buf, stype, ctype, utag, proto_type);
                ProtoTools.write_protobuf_inbuf(cmd_buf, offset, emcode_msg);
                return cmd_buf;
            }
            catch (error) {
                Log.error(error);
            }
        }
    };
    //解码protobuf命令,返回body
    ProtoTools.decode_protobuf_cmd = function (cmd_buf) {
        var stype = ProtoTools.read_int16(cmd_buf, 0);
        var ctype = ProtoTools.read_int16(cmd_buf, 2);
        var bodyBuf = ProtoTools.read_protobuf_inbuf(cmd_buf, ProtoTools.HEADER_SIZE);
        if (bodyBuf) {
            var stypeName = ProtoCmd_1["default"].getProtoName(stype);
            var cmdName = ProtoCmd_1["default"].getCmdName(stype, ctype);
            // Log.info("decode_protobuf_cmd: ", stypeName , cmdName ,stype ,ctype)
            if (!stypeName || !cmdName) {
                Log.error("decode stypeName or cmdName not exist");
                return;
            }
            if (!protobufMsg[stypeName]) {
                Log.error("decode stypeName", stypeName, " not exist");
                return;
            }
            var msgType = protobufMsg[stypeName][cmdName];
            if (!msgType) {
                Log.error("decode cmdName", cmdName, " not exist");
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
    ProtoTools.HEADER_SIZE = 10; // header size
    ProtoTools.ProtoType = {
        PROTO_JSON: 1,
        PROTO_BUF: 2
    };
    return ProtoTools;
}());
exports["default"] = ProtoTools;
//# sourceMappingURL=ProtoTools.js.map