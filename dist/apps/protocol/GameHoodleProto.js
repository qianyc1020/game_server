"use strict";
var _a;
exports.__esModule = true;
exports.protoName = "GameHoodleProto";
var Cmd;
(function (Cmd) {
    Cmd[Cmd["INVALED"] = 0] = "INVALED";
    Cmd[Cmd["eCreateRoomReq"] = 1] = "eCreateRoomReq";
    Cmd[Cmd["eCreateRoomRes"] = 2] = "eCreateRoomRes";
    Cmd[Cmd["eJoinRoomReq"] = 3] = "eJoinRoomReq";
    Cmd[Cmd["eJoinRoomRes"] = 4] = "eJoinRoomRes";
    Cmd[Cmd["eExitRoomReq"] = 5] = "eExitRoomReq";
    Cmd[Cmd["eExitRoomRes"] = 6] = "eExitRoomRes";
    Cmd[Cmd["eDessolveReq"] = 7] = "eDessolveReq";
    Cmd[Cmd["eDessolveRes"] = 8] = "eDessolveRes";
    Cmd[Cmd["eGetRoomStatusReq"] = 9] = "eGetRoomStatusReq";
    Cmd[Cmd["eGetRoomStatusRes"] = 10] = "eGetRoomStatusRes";
    Cmd[Cmd["eBackRoomReq"] = 11] = "eBackRoomReq";
    Cmd[Cmd["eBackRoomRes"] = 12] = "eBackRoomRes";
    ///////////////////////////////////
    //游戏相关协议
    ///////////////////////////////////
    Cmd[Cmd["eCheckLinkGameReq"] = 13] = "eCheckLinkGameReq";
    Cmd[Cmd["eCheckLinkGameRes"] = 14] = "eCheckLinkGameRes";
    Cmd[Cmd["eUserInfoRes"] = 15] = "eUserInfoRes";
    Cmd[Cmd["eRoomInfoRes"] = 16] = "eRoomInfoRes";
    Cmd[Cmd["eRoomIdRes"] = 17] = "eRoomIdRes";
    Cmd[Cmd["ePlayCountRes"] = 18] = "ePlayCountRes";
    Cmd[Cmd["eUserReadyReq"] = 19] = "eUserReadyReq";
    Cmd[Cmd["eUserReadyRes"] = 20] = "eUserReadyRes";
    Cmd[Cmd["eGameStartRes"] = 21] = "eGameStartRes";
    Cmd[Cmd["eGameResultRes"] = 22] = "eGameResultRes";
    Cmd[Cmd["eLoginLogicReq"] = 23] = "eLoginLogicReq";
    Cmd[Cmd["eLoginLogicRes"] = 24] = "eLoginLogicRes";
})(Cmd = exports.Cmd || (exports.Cmd = {}));
exports.CmdName = (_a = {},
    _a[0] = "INVALED",
    _a[1] = "CreateRoomReq",
    _a[2] = "CreateRoomRes",
    _a[3] = "JoinRoomReq",
    _a[4] = "JoinRoomRes",
    _a[5] = "ExitRoomReq",
    _a[6] = "ExitRoomRes",
    _a[7] = "DessolveReq",
    _a[8] = "DessolveRes",
    _a[9] = "GetRoomStatusReq",
    _a[10] = "GetRoomStatusRes",
    _a[11] = "BackRoomReq",
    _a[12] = "BackRoomRes",
    ///////////////////////////////////
    //游戏相关协议
    ///////////////////////////////////
    _a[13] = "CheckLinkGameReq",
    _a[14] = "CheckLinkGameRes",
    _a[15] = "UserInfoRes",
    _a[16] = "RoomInfoRes",
    _a[17] = "RoomIdRes",
    _a[18] = "PlayCountRes",
    _a[19] = "UserReadyReq",
    _a[20] = "UserReadyRes",
    _a[21] = "GameStartRes",
    _a[22] = "GameResultRes",
    _a[23] = "LoginLogicReq",
    _a[24] = "LoginLogicRes",
    _a);
//# sourceMappingURL=GameHoodleProto.js.map