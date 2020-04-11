"use strict";
var _a;
exports.__esModule = true;
exports.protoName = "GameHoodleProto";
var Cmd;
(function (Cmd) {
    ///////////////////////////////////
    //房间相关协议
    ///////////////////////////////////
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
    Cmd[Cmd["eGameRuleRes"] = 16] = "eGameRuleRes";
    Cmd[Cmd["eRoomIdRes"] = 17] = "eRoomIdRes";
    Cmd[Cmd["ePlayCountRes"] = 18] = "ePlayCountRes";
    Cmd[Cmd["eUserReadyReq"] = 19] = "eUserReadyReq";
    Cmd[Cmd["eUserReadyRes"] = 20] = "eUserReadyRes";
    Cmd[Cmd["eGameStartRes"] = 21] = "eGameStartRes";
    Cmd[Cmd["eGameEndRes"] = 22] = "eGameEndRes";
    Cmd[Cmd["eLoginLogicReq"] = 23] = "eLoginLogicReq";
    Cmd[Cmd["eLoginLogicRes"] = 24] = "eLoginLogicRes";
    Cmd[Cmd["eUserOfflineRes"] = 25] = "eUserOfflineRes";
    ///////////////////////////////////
    //游戏具体玩法相关
    ///////////////////////////////////
    Cmd[Cmd["ePlayerFirstBallPosRes"] = 26] = "ePlayerFirstBallPosRes";
    Cmd[Cmd["ePlayerPowerRes"] = 27] = "ePlayerPowerRes";
    Cmd[Cmd["ePlayerShootReq"] = 28] = "ePlayerShootReq";
    Cmd[Cmd["ePlayerShootRes"] = 29] = "ePlayerShootRes";
    Cmd[Cmd["ePlayerBallPosReq"] = 30] = "ePlayerBallPosReq";
    Cmd[Cmd["ePlayerBallPosRes"] = 31] = "ePlayerBallPosRes";
    Cmd[Cmd["ePlayerIsShootedReq"] = 32] = "ePlayerIsShootedReq";
    Cmd[Cmd["ePlayerIsShootedRes"] = 33] = "ePlayerIsShootedRes";
    Cmd[Cmd["eGameResultRes"] = 34] = "eGameResultRes";
    Cmd[Cmd["eTotalGameResultRes"] = 35] = "eTotalGameResultRes";
    Cmd[Cmd["ePlayerScoreRes"] = 36] = "ePlayerScoreRes";
    Cmd[Cmd["eUserMatchReq"] = 37] = "eUserMatchReq";
    Cmd[Cmd["eUserMatchRes"] = 38] = "eUserMatchRes";
    Cmd[Cmd["eUserStopMatchReq"] = 39] = "eUserStopMatchReq";
    Cmd[Cmd["eUserStopMatchRes"] = 40] = "eUserStopMatchRes";
    Cmd[Cmd["eUserGameInfoReq"] = 41] = "eUserGameInfoReq";
    Cmd[Cmd["eUserGameInfoRes"] = 42] = "eUserGameInfoRes";
    Cmd[Cmd["eUserBallInfoReq"] = 43] = "eUserBallInfoReq";
    Cmd[Cmd["eUserBallInfoRes"] = 44] = "eUserBallInfoRes";
    Cmd[Cmd["eUpdateUserBallReq"] = 45] = "eUpdateUserBallReq";
    Cmd[Cmd["eUpdateUserBallRes"] = 46] = "eUpdateUserBallRes";
    Cmd[Cmd["eStoreListReq"] = 47] = "eStoreListReq";
    Cmd[Cmd["eStoreListRes"] = 48] = "eStoreListRes";
    Cmd[Cmd["eBuyThingsReq"] = 49] = "eBuyThingsReq";
    Cmd[Cmd["eBuyThingsRes"] = 50] = "eBuyThingsRes";
})(Cmd = exports.Cmd || (exports.Cmd = {}));
exports.CmdName = (_a = {},
    ///////////////////////////////////
    //房间相关协议
    ///////////////////////////////////
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
    //游戏通用协议
    ///////////////////////////////////
    _a[13] = "CheckLinkGameReq",
    _a[14] = "CheckLinkGameRes",
    _a[15] = "UserInfoRes",
    _a[16] = "GameRuleRes",
    _a[17] = "RoomIdRes",
    _a[18] = "PlayCountRes",
    _a[19] = "UserReadyReq",
    _a[20] = "UserReadyRes",
    _a[21] = "GameStartRes",
    _a[22] = "GameEndRes",
    _a[23] = "LoginLogicReq",
    _a[24] = "LoginLogicRes",
    _a[25] = "UserOfflineRes",
    ///////////////////////////////////
    //游戏具体玩法相关
    ///////////////////////////////////
    _a[26] = "PlayerFirstBallPosRes",
    _a[27] = "PlayerPowerRes",
    _a[28] = "PlayerShootReq",
    _a[29] = "PlayerShootRes",
    _a[30] = "PlayerBallPosReq",
    _a[31] = "PlayerBallPosRes",
    _a[32] = "PlayerIsShootedReq",
    _a[33] = "PlayerIsShootedRes",
    _a[34] = "GameResultRes",
    _a[35] = "TotalGameResultRes",
    _a[36] = "PlayerScoreRes",
    _a[37] = "UserMatchReq",
    _a[38] = "UserMatchRes",
    _a[39] = "UserStopMatchReq",
    _a[40] = "UserStopMatchRes",
    _a[41] = "UserGameInfoReq",
    _a[42] = "UserGameInfoRes",
    _a[43] = "UserBallInfoReq",
    _a[44] = "UserBallInfoRes",
    _a[45] = "UpdateUserBallReq",
    _a[46] = "UpdateUserBallRes",
    _a[47] = "StoreListReq",
    _a[48] = "StoreListRes",
    _a[49] = "BuyThingsReq",
    _a[50] = "BuyThingsRes",
    _a);
//# sourceMappingURL=GameHoodleProto.js.map