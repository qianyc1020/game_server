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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var Stype_1 = __importDefault(require("./Stype"));
var Broadcast = __importStar(require("./gateway/BroadcastProto"));
var TalkRoom = __importStar(require("./talk_room/TalkProto"));
var Auth = __importStar(require("./auth_server/AuthProto"));
var GameSystem = __importStar(require("./system_server/SystemProto"));
var GameProto = __importStar(require("./game_server/GameProto"));
var ProtoCmd = /** @class */ (function () {
    function ProtoCmd() {
    }
    //命名空间
    ProtoCmd.getProtoName = function (stype) {
        if (ProtoCmd.StypeProtos[stype]) {
            return ProtoCmd.StypeProtos[stype].protoName;
        }
        return "";
    };
    //字段名称
    ProtoCmd.getCmdName = function (stype, ctype) {
        if (ProtoCmd.StypeProtos[stype]) {
            return ProtoCmd.StypeProtos[stype].CmdName[ctype];
        }
        return "";
    };
    //服务器下标->协议脚本
    ProtoCmd.StypeProtos = (_a = {},
        _a[Stype_1.default.Broadcast] = Broadcast,
        _a[Stype_1.default.TalkRoom] = TalkRoom,
        _a[Stype_1.default.Auth] = Auth,
        _a[Stype_1.default.GameSystem] = GameSystem,
        _a[Stype_1.default.Game] = GameProto,
        _a);
    return ProtoCmd;
}());
exports.default = ProtoCmd;
//# sourceMappingURL=ProtoCmd.js.map