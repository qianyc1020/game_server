"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var NetBus_1 = __importDefault(require("../../netbus/NetBus"));
var ProtoTools_1 = __importDefault(require("../../netbus/ProtoTools"));
var ProtoCmd_1 = __importDefault(require("../protocol/ProtoCmd"));
var ProtoManager_1 = __importDefault(require("../../netbus/ProtoManager"));
var Response_1 = __importDefault(require("../Response"));
var ServiceBase_1 = __importDefault(require("../../netbus/ServiceBase"));
var Stype_1 = require("../protocol/Stype");
var AuthProto_1 = require("../protocol/AuthProto");
var CommonProto_1 = __importDefault(require("../protocol/CommonProto"));
var Log = require("../../utils/Log");
var LOGIN_ERQ_CMD = [
    AuthProto_1.Cmd.eUnameLoginReq,
    AuthProto_1.Cmd.eGuestLoginReq,
    AuthProto_1.Cmd.ePhoneRegistReq,
    AuthProto_1.Cmd.eUnameRegistReq,
];
var LOGIN_ERS_CMD = [
    AuthProto_1.Cmd.eUnameLoginRes,
    AuthProto_1.Cmd.eGuestLoginRes,
    AuthProto_1.Cmd.eUnameRegistRes,
    AuthProto_1.Cmd.ePhoneRegistRes,
];
var uid_session_map = {}; //保存已经登录过的玩家 uid-> session
var GatewayService = /** @class */ (function (_super) {
    __extends(GatewayService, _super);
    function GatewayService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.service_name = "GatewayService"; // 服务名称
        _this.is_transfer = true; // 是否为转发模块,
        return _this;
    }
    //客户端发到网关，网关转发到服务器
    GatewayService.on_recv_client_player_cmd = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        Log.info("recv_client>>> ", ProtoCmd_1["default"].getProtoName(stype) + ",", ProtoCmd_1["default"].getCmdName(stype, ctype) + " ,body:", ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd));
        var server_session = NetBus_1["default"].get_server_session(stype);
        if (!server_session) {
            return;
        }
        // 打入能够标识client的utag, uid, session.session_key,
        if (GatewayService.is_login_req_cmd(stype, ctype)) { //还没登录
            utag = session.session_key;
        }
        else { //登录过了
            if (session.uid === 0) {
                return;
            }
            utag = session.uid;
        }
        ProtoTools_1["default"].write_utag_inbuf(raw_cmd, utag);
        NetBus_1["default"].send_encoded_cmd(server_session, raw_cmd);
    };
    //服务器发到网关，网关转发到客户端
    GatewayService.on_recv_server_player_cmd = function (session, stype, ctype, utag, proto_type, raw_cmd) {
        // Log.info("on_recv_server_player_cmd:", ProtoCmd.getProtoName(stype)+ ",", ProtoCmd.getCmdName(stype,ctype)+ ",", "utag:" + utag)
        Log.info("recv_server>>> ", ProtoCmd_1["default"].getProtoName(stype) + ",", ProtoCmd_1["default"].getCmdName(stype, ctype) + " ,utag:", utag, " ,body:", ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd));
        var client_session = null;
        if (GatewayService.is_login_res_cmd(stype, ctype)) { // 还没登录,utag == session.session_key
            client_session = NetBus_1["default"].get_client_session(utag);
            if (!client_session) {
                return;
            }
            var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
            if (body.status == Response_1["default"].OK) {
                // 以前你登陆过,发送一个命令给这个客户端，告诉它说以前有人登陆
                var prev_session = GatewayService.get_session_by_uid(body.uid);
                if (prev_session) {
                    NetBus_1["default"].send_cmd(prev_session, stype, AuthProto_1.Cmd.eReloginRes, utag, proto_type);
                    prev_session.uid = 0; // 可能会有隐患，是否通知其它的服务 TODO
                    NetBus_1["default"].session_close(prev_session);
                    // Log.info("on_recv_server_player_cmd: relogin: ", utag);
                }
                if (body.uid) {
                    client_session.uid = body.uid;
                    GatewayService.save_session_with_uid(body.uid, client_session, proto_type);
                    body.uid = 0;
                    raw_cmd = ProtoManager_1["default"].encode_cmd(stype, ctype, utag, proto_type, body);
                }
            }
        }
        else { //已经登录,utag == uid
            client_session = GatewayService.get_session_by_uid(utag);
        }
        // for(let uid in uid_session_map){
        // 	Log.info("client_session map: " , uid)
        // }
        // Log.info("hcc>>clientSessionNum: " , ArrayUtil.GetArrayLen(uid_session_map))
        if (client_session) {
            ProtoTools_1["default"].clear_utag_inbuf(raw_cmd);
            NetBus_1["default"].send_encoded_cmd(client_session, raw_cmd);
            var body = ProtoManager_1["default"].decode_cmd(proto_type, raw_cmd);
            if (ctype == AuthProto_1.Cmd.eLoginOutRes && stype == Stype_1.Stype.Auth) {
                GatewayService.clear_session_with_uid(utag);
            }
        }
    };
    //玩家掉线,网关发消息给其他服务，其他服务接收eUserLostConnectRes协议进行处理就好了
    GatewayService.on_player_disconnect = function (session, stype) {
        Log.info("on_player_disconnect");
        if (stype == Stype_1.Stype.Auth) { // 由Auth服务保存的，那么就由Auth清空
            GatewayService.clear_session_with_uid(session.uid);
        }
        var server_session = NetBus_1["default"].get_server_session(stype);
        if (!server_session) {
            return;
        }
        // 客户端被迫掉线
        var utag = session.uid;
        NetBus_1["default"].send_cmd(server_session, stype, CommonProto_1["default"].eUserLostConnectRes, utag, ProtoTools_1["default"].ProtoType.PROTO_JSON);
    };
    //登录请求
    GatewayService.is_login_req_cmd = function (stype, ctype) {
        if (stype != Stype_1.Stype.Auth) {
            return false;
        }
        for (var index = 0; index <= LOGIN_ERQ_CMD.length; index++) {
            if (ctype == LOGIN_ERQ_CMD[index]) {
                return true;
            }
        }
        return false;
    };
    //登录返回
    GatewayService.is_login_res_cmd = function (stype, ctype) {
        if (stype != Stype_1.Stype.Auth) {
            return false;
        }
        for (var index = 0; index <= LOGIN_ERS_CMD.length; index++) {
            if (ctype == LOGIN_ERS_CMD[index]) {
                return true;
            }
        }
        return false;
    };
    //返回登录过的玩家的UID
    GatewayService.get_session_by_uid = function (uid) {
        return uid_session_map[uid];
    };
    //保存登录过的玩家的 uid->session
    GatewayService.save_session_with_uid = function (uid, session, proto_type) {
        uid_session_map[uid] = session;
        session.proto_type = proto_type;
    };
    //清理session
    GatewayService.clear_session_with_uid = function (uid) {
        uid_session_map[uid] = null;
        delete uid_session_map[uid];
    };
    return GatewayService;
}(ServiceBase_1["default"]));
exports["default"] = GatewayService;
//# sourceMappingURL=GatewayService.js.map