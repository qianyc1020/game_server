"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameHoodleProto_1 = require("../../../protocol/GameHoodleProto");
var Log_1 = __importDefault(require("../../../../utils/Log"));
var MySqlGame_1 = __importDefault(require("../../../../database/MySqlGame"));
var GameHoodleConfig_1 = __importDefault(require("../config/GameHoodleConfig"));
var Response_1 = __importDefault(require("../../../protocol/Response"));
var ArrayUtil_1 = __importDefault(require("../../../../utils/ArrayUtil"));
var GameInfoInterface = /** @class */ (function () {
    function GameInfoInterface() {
    }
    ////////////////////////////////////////
    ///本地接口
    ////////////////////////////////////////
    //更新玩家弹珠接口, 只更新到玩家缓存，没更新到数据库
    GameInfoInterface.user_update_ball_info = function (player, updatetype, level, count) {
        var compose_count = GameHoodleConfig_1["default"].BALL_COPOSE_NUM;
        var key_str = GameHoodleConfig_1["default"].BALL_SAVE_KEY_STR;
        var uball_obj_player = {};
        var is_success = false;
        try {
            uball_obj_player = JSON.parse(player.get_uball_info());
        }
        catch (error) {
            Log_1["default"].error(error);
            return false;
        }
        // Log.info("hcc>>111," , uball_obj_player);
        var level_key_str = key_str + level;
        if (updatetype == GameHoodleConfig_1["default"].BALL_UPDATE_TYPE.SELL_TYPE) { //售卖
            var ball_count = uball_obj_player[level_key_str];
            if (ball_count && Number(ball_count) > 0) {
                uball_obj_player[level_key_str] = Number(ball_count) - 1;
                is_success = true;
            }
        }
        else if (updatetype == GameHoodleConfig_1["default"].BALL_UPDATE_TYPE.COMPOSE_TYPE) { //合成
            var ball_count = uball_obj_player[level_key_str];
            if (ball_count && Number(ball_count) >= compose_count) {
                uball_obj_player[level_key_str] = String(Number(ball_count) - compose_count);
                level_key_str = key_str + String(level + 1);
                if (uball_obj_player[level_key_str]) {
                    uball_obj_player[level_key_str] = String(Number(uball_obj_player[level_key_str]) + 1);
                    ;
                }
                else {
                    uball_obj_player[level_key_str] = "1";
                }
                is_success = true;
            }
        }
        else if (updatetype == GameHoodleConfig_1["default"].BALL_UPDATE_TYPE.ADD_TYPE) { //增加弹珠
            var ball_count = uball_obj_player[level_key_str];
            if (ball_count) {
                uball_obj_player[level_key_str] = String(Number(ball_count) + count);
                ;
            }
            else {
                uball_obj_player[level_key_str] = String(count);
            }
            is_success = true;
        }
        else if (updatetype == GameHoodleConfig_1["default"].BALL_UPDATE_TYPE.REDUCE_TYPE) { //减少弹珠
            var ball_count = uball_obj_player[level_key_str];
            if (ball_count && Number(ball_count) >= count) {
                uball_obj_player[level_key_str] = Number(ball_count) - count;
                is_success = true;
            }
        }
        if (is_success) {
            player.set_uball_info(JSON.stringify(uball_obj_player));
        }
        return is_success;
    };
    ////////////////////////////////////////
    ///对外接口
    ////////////////////////////////////////
    //获取有游戏服务信息
    GameInfoInterface.do_user_get_ugame_info = function (player) {
        var utag = player.get_uid();
        MySqlGame_1["default"].get_ugame_uchip_by_uid(utag, function (status, data_game) {
            if (status == Response_1["default"].OK) {
                var data_game_len = ArrayUtil_1["default"].GetArrayLen(data_game);
                if (data_game_len > 0) {
                    Log_1["default"].info("hcc>>on_user_get_ugame_info1111>>", data_game[0], "data_game: ", data_game);
                    var ugameInfo = data_game[0];
                    var ugameInfoStr = JSON.stringify(ugameInfo);
                    var body = {
                        status: Response_1["default"].OK,
                        userinfostring: ugameInfoStr
                    };
                    player.set_ugame_info(ugameInfo);
                    player.send_cmd(GameHoodleProto_1.Cmd.eUserGameInfoRes, body);
                }
                else {
                    MySqlGame_1["default"].insert_ugame_user(utag, GameHoodleConfig_1["default"].KW_BORN_EXP, GameHoodleConfig_1["default"].KW_BORN_CHIP, function (status_game_ins, data_game_ins) {
                        Log_1["default"].info("hcc>>on_user_get_ugame_info2222");
                        if (status_game_ins == Response_1["default"].OK) {
                            MySqlGame_1["default"].get_ugame_uchip_by_uid(utag, function (status_game_ins_get, data_game_ins_get) {
                                if (status_game_ins_get == Response_1["default"].OK) {
                                    Log_1["default"].info("hcc>>on_user_get_ugame_info3333>>", data_game_ins_get[0]);
                                    var ugameInfo = data_game_ins_get[0];
                                    var ugameInfoStr = JSON.stringify(ugameInfo);
                                    var body = {
                                        status: Response_1["default"].OK,
                                        userinfostring: ugameInfoStr
                                    };
                                    player.set_ugame_info(ugameInfo);
                                    player.send_cmd(GameHoodleProto_1.Cmd.eUserGameInfoRes, body);
                                }
                                else {
                                    Log_1["default"].info("hcc>>on_user_get_ugame_info4444>>error");
                                    player.send_cmd(GameHoodleProto_1.Cmd.eUserGameInfoRes, { status: Response_1["default"].INVALIDI_OPT });
                                }
                            });
                        }
                        else {
                            Log_1["default"].info("hcc>>on_user_get_ugame_info5555>>error");
                            player.send_cmd(GameHoodleProto_1.Cmd.eUserGameInfoRes, { status: Response_1["default"].INVALIDI_OPT });
                        }
                    });
                }
            }
            else {
                Log_1["default"].info("hcc>>on_user_get_ugame_info6666>>error");
                player.send_cmd(GameHoodleProto_1.Cmd.eUserGameInfoRes, { status: Response_1["default"].INVALIDI_OPT });
            }
        });
    };
    //获取弹珠信息
    GameInfoInterface.do_user_get_ball_info = function (player) {
        MySqlGame_1["default"].get_ugame_uball_info(player.get_uid(), function (status, ret) {
            if (status == Response_1["default"].OK) {
                var uball_json = ret;
                var body = {
                    status: Response_1["default"].OK,
                    userballinfostring: uball_json
                };
                Log_1["default"].info("hcc>>on_ser_ball_info: ", uball_json);
                player.send_cmd(GameHoodleProto_1.Cmd.eUserBallInfoRes, body);
                player.set_uball_info(uball_json);
            }
            else {
                player.send_cmd(GameHoodleProto_1.Cmd.eUserBallInfoRes, { status: Response_1["default"].INVALIDI_OPT });
            }
        });
    };
    //兑换，卖出，等更新弹珠
    GameInfoInterface.do_user_update_ball_info = function (player, data_body) {
        var up_type = data_body.updatetype;
        var level = data_body.level;
        var count = data_body.count;
        if (up_type == GameHoodleConfig_1["default"].BALL_UPDATE_TYPE.SELL_TYPE) { //卖出TODO, 需要定义价格表
        }
        else if (up_type == GameHoodleConfig_1["default"].BALL_UPDATE_TYPE.COMPOSE_TYPE) { //合成
            var is_success = GameInfoInterface.user_update_ball_info(player, up_type, level, count);
            if (is_success) {
                var tmp_ball_json_1 = player.get_uball_info();
                var body_ball_1 = {
                    status: Response_1["default"].OK,
                    userballinfostring: tmp_ball_json_1
                };
                MySqlGame_1["default"].update_ugame_uball_info(player.get_uid(), tmp_ball_json_1, function (status, ret) {
                    if (status == Response_1["default"].OK) {
                        player.send_cmd(GameHoodleProto_1.Cmd.eUpdateUserBallRes, body_ball_1);
                        player.set_uball_info(tmp_ball_json_1);
                    }
                    else {
                        player.send_cmd(GameHoodleProto_1.Cmd.eUpdateUserBallRes, { status: Response_1["default"].INVALIDI_OPT });
                    }
                });
            }
            else {
                player.send_cmd(GameHoodleProto_1.Cmd.eUpdateUserBallRes, { status: Response_1["default"].INVALIDI_OPT });
            }
        }
    };
    //玩家购买
    GameInfoInterface.do_user_buy_things_req = function (player, data_body) {
        if (data_body) {
            var propsvrindex = data_body.propsvrindex;
            var _loop_1 = function (key) {
                var shopInfo = GameHoodleConfig_1["default"].KW_STORE_LIST_CONFIG[key];
                if (shopInfo.propsvrindex == propsvrindex) {
                    var propprice_1 = shopInfo.propprice;
                    var propcount_1 = shopInfo.propcount;
                    var propinfo_1 = JSON.parse(shopInfo.propinfo);
                    if (Number(player.get_uchip()) >= propprice_1) {
                        MySqlGame_1["default"].add_ugame_uchip(player.get_uid(), propprice_1 * (-1), function (status, ret) {
                            if (status == Response_1["default"].OK) {
                                //减去金币
                                player.set_uchip(player.get_uchip() - propprice_1);
                                Log_1["default"].info("hcc>>write_player_chip success", player.get_uname());
                                //加上道具
                                var is_success = GameInfoInterface.user_update_ball_info(player, GameHoodleConfig_1["default"].BALL_UPDATE_TYPE.ADD_TYPE, propinfo_1.level, propcount_1);
                                if (is_success) {
                                    MySqlGame_1["default"].update_ugame_uball_info(player.get_uid(), player.get_uball_info(), function (status, ret) {
                                        if (status == Response_1["default"].OK) {
                                            Log_1["default"].info("hcc>>write_player_ball success", player.get_uname());
                                            var res_body = {
                                                status: Response_1["default"].OK,
                                                propsvrindex: shopInfo.propsvrindex,
                                                propid: shopInfo.propid,
                                                propcount: shopInfo.propcount,
                                                propprice: shopInfo.propprice,
                                                propinfo: shopInfo.propinfo
                                            };
                                            player.send_cmd(GameHoodleProto_1.Cmd.eBuyThingsRes, res_body);
                                        }
                                        else {
                                            player.send_cmd(GameHoodleProto_1.Cmd.eBuyThingsRes, { status: Response_1["default"].INVALIDI_OPT });
                                        }
                                    });
                                }
                                else {
                                    player.send_cmd(GameHoodleProto_1.Cmd.eBuyThingsRes, { status: Response_1["default"].INVALIDI_OPT });
                                }
                            }
                            else {
                                player.send_cmd(GameHoodleProto_1.Cmd.eBuyThingsRes, { status: Response_1["default"].INVALIDI_OPT });
                            }
                        });
                    }
                    else {
                        //金币不够
                        player.send_cmd(GameHoodleProto_1.Cmd.eBuyThingsRes, { status: Response_1["default"].INVALIDI_OPT });
                    }
                    return "break";
                }
            };
            for (var key in GameHoodleConfig_1["default"].KW_STORE_LIST_CONFIG) {
                var state_1 = _loop_1(key);
                if (state_1 === "break")
                    break;
            }
        }
    };
    return GameInfoInterface;
}());
exports["default"] = GameInfoInterface;
//# sourceMappingURL=GameInfoInterface.js.map