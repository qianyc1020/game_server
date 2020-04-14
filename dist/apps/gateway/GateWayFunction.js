"use strict";
exports.__esModule = true;
var AuthProto_1 = require("../protocol/AuthProto");
var Stype_1 = require("../protocol/Stype");
var LOGIN_OR_REGIST_ERQ_CMD = [
    AuthProto_1.Cmd.eUnameLoginReq,
    AuthProto_1.Cmd.eGuestLoginReq,
    AuthProto_1.Cmd.ePhoneRegistReq,
    AuthProto_1.Cmd.eUnameRegistReq,
];
var LOGIN_OR_REGIST_ERS_CMD = [
    AuthProto_1.Cmd.eUnameLoginRes,
    AuthProto_1.Cmd.eGuestLoginRes,
    AuthProto_1.Cmd.eUnameRegistRes,
    AuthProto_1.Cmd.ePhoneRegistRes,
];
var uid_session_map = {}; //保存已经登录过的玩家 uid-> session
var GateWayFunction = /** @class */ (function () {
    function GateWayFunction() {
    }
    //登录请求
    GateWayFunction.is_login_req_cmd = function (stype, ctype) {
        if (stype != Stype_1.Stype.Auth) {
            return false;
        }
        return (LOGIN_OR_REGIST_ERQ_CMD.indexOf(ctype) > -1);
    };
    //登录返回
    GateWayFunction.is_login_res_cmd = function (stype, ctype) {
        if (stype != Stype_1.Stype.Auth) {
            return false;
        }
        return (LOGIN_OR_REGIST_ERS_CMD.indexOf(ctype) > -1);
    };
    //返回登录过的玩家的UID
    GateWayFunction.get_session_by_uid = function (uid) {
        return uid_session_map[uid];
    };
    //保存登录过的玩家的 uid->session
    GateWayFunction.save_session_with_uid = function (uid, session, proto_type) {
        uid_session_map[uid] = session;
        session.proto_type = proto_type;
    };
    //清理session
    GateWayFunction.clear_session_with_uid = function (uid) {
        if (uid_session_map[uid]) {
            uid_session_map[uid] = null;
            delete uid_session_map[uid];
        }
    };
    return GateWayFunction;
}());
exports["default"] = GateWayFunction;
//# sourceMappingURL=GatewayFunction.js.map