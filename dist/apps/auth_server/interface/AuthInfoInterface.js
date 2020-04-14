"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var MySqlAuth_1 = __importDefault(require("../../../database/MySqlAuth"));
var Response_1 = __importDefault(require("../../protocol/Response"));
var AuthSendMsg_1 = __importDefault(require("../AuthSendMsg"));
var AuthProto_1 = require("../../protocol/AuthProto");
var AuthInfoInterface = /** @class */ (function () {
    function AuthInfoInterface() {
    }
    AuthInfoInterface.do_get_user_center_info_req = function (session, utag, proto_type, raw_cmd) {
        MySqlAuth_1["default"].get_uinfo_by_uid(utag, function (status, data) {
            if (status == Response_1["default"].OK) {
                var sql_info = data[0];
                var resbody = {
                    status: 1,
                    usercenterinfostring: JSON.stringify(sql_info)
                };
                // Log.info("get_user_center_info:", resbody)
                AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGetUserCenterInfoRes, utag, proto_type, resbody);
            }
            else {
                AuthSendMsg_1["default"].send(session, AuthProto_1.Cmd.eGetUserCenterInfoRes, utag, proto_type, { status: Response_1["default"].ILLEGAL_ACCOUNT });
            }
        });
    };
    return AuthInfoInterface;
}());
exports["default"] = AuthInfoInterface;
//# sourceMappingURL=AuthInfoInterface.js.map