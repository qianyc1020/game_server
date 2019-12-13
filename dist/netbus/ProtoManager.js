"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ProtoTools_1 = __importDefault(require("./ProtoTools"));
var ProtoManager = /** @class */ (function () {
    function ProtoManager() {
    }
    //解头: stype, ctype, utag, proto_type, body
    ProtoManager.decode_cmd_header = function (cmd_buf) {
        var cmd = [];
        if (cmd_buf.length < ProtoTools_1["default"].HEADER_SIZE) {
            return null;
        }
        cmd[0] = ProtoTools_1["default"].read_int16(cmd_buf, 0);
        cmd[1] = ProtoTools_1["default"].read_int16(cmd_buf, 2);
        cmd[2] = ProtoTools_1["default"].read_uint32(cmd_buf, 4);
        cmd[3] = ProtoTools_1["default"].read_int16(cmd_buf, 8);
        return cmd;
    };
    //编码
    ProtoManager.encode_cmd = function (stype, ctype, utag, proto_type, body) {
        if (proto_type == ProtoTools_1["default"].ProtoType.PROTO_JSON) {
            return ProtoManager._json_encode(stype, ctype, utag, proto_type, body);
        }
        else {
            return ProtoTools_1["default"].encode_protobuf_cmd(stype, ctype, utag, proto_type, body);
        }
    };
    //解码, 返回: body
    ProtoManager.decode_cmd = function (proto_type, cmd_buf) {
        if (cmd_buf.length < ProtoTools_1["default"].HEADER_SIZE) {
            return null;
        }
        if (proto_type == ProtoTools_1["default"].ProtoType.PROTO_JSON) {
            return ProtoManager._json_decode(cmd_buf);
        }
        else {
            return ProtoTools_1["default"].decode_protobuf_cmd(cmd_buf);
        }
    };
    ProtoManager._json_encode = function (stype, ctype, utag, proto_type, body) {
        var str = "";
        try {
            str = JSON.stringify(body);
        }
        catch (error) {
        }
        return ProtoTools_1["default"].encode_str_cmd(stype, ctype, utag, proto_type, str);
    };
    ProtoManager._json_decode = function (cmd_buf) {
        var str = "";
        try {
            str = JSON.parse(ProtoTools_1["default"].decode_str_cmd(cmd_buf));
        }
        catch (error) {
        }
        return str;
    };
    // 加密 TODO
    ProtoManager.encrypt_cmd = function (str_of_buf) {
        return str_of_buf;
    };
    // 解密 TODO
    ProtoManager.decrypt_cmd = function (str_of_buf) {
        return str_of_buf;
    };
    return ProtoManager;
}());
exports["default"] = ProtoManager;
//# sourceMappingURL=ProtoManager.js.map