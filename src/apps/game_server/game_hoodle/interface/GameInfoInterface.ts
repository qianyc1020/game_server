//游戏服务信息,商城,兑换,相关协议处理
import Player from '../Player';
import { Cmd } from "../../../protocol/GameHoodleProto";
import Log from '../../../../utils/Log';
import MySqlGame from '../../../../database/MySqlGame';
import GameHoodleConfig from "../config/GameHoodleConfig";
import Response from '../../../protocol/Response';
import ArrayUtil from "../../../../utils/ArrayUtil";
import PlayerManager from '../PlayerManager';
import ProtoManager from '../../../../netbus/ProtoManager';

let playerMgr: PlayerManager = PlayerManager.getInstance();

class GameInfoInterface {

    ////////////////////////////////////////
    ///本地接口
    ////////////////////////////////////////
    //更新玩家弹珠接口, 只更新到玩家缓存，没更新到数据库
    private static user_update_ball_info(player: Player, updatetype: number, level: number, count: number): boolean {
        let compose_count: number   = GameHoodleConfig.BALL_COPOSE_NUM;
        let key_str: string         = GameHoodleConfig.BALL_SAVE_KEY_STR;
        let uball_obj_player: any   = {};
        let is_success: boolean     = false;

        try {
            uball_obj_player = JSON.parse(player.get_uball_info());
        } catch (error) {
            Log.error(error);
            return false;
        }

        // Log.info("hcc>>111," , uball_obj_player);
        let level_key_str = key_str + level;
        if (updatetype == GameHoodleConfig.BALL_UPDATE_TYPE.SELL_TYPE) { //售卖
            let ball_count = uball_obj_player[level_key_str];
            if (ball_count && Number(ball_count) > 0) {
                uball_obj_player[level_key_str] = Number(ball_count) - 1;
                is_success = true;
            }
        } else if (updatetype == GameHoodleConfig.BALL_UPDATE_TYPE.COMPOSE_TYPE) { //合成
            let ball_count = uball_obj_player[level_key_str];
            if (ball_count && Number(ball_count) >= compose_count) {
                uball_obj_player[level_key_str] = String(Number(ball_count) - compose_count);
                level_key_str = key_str + String(level + 1);
                if (uball_obj_player[level_key_str]) {
                    uball_obj_player[level_key_str] = String(Number(uball_obj_player[level_key_str]) + 1);;
                } else {
                    uball_obj_player[level_key_str] = "1";
                }
                is_success = true;
            }
        } else if (updatetype == GameHoodleConfig.BALL_UPDATE_TYPE.ADD_TYPE) { //增加弹珠
            let ball_count = uball_obj_player[level_key_str];
            if (ball_count) {
                uball_obj_player[level_key_str] = String(Number(ball_count) + count);;
            } else {
                uball_obj_player[level_key_str] = String(count);
            }
            is_success = true;
        } else if (updatetype == GameHoodleConfig.BALL_UPDATE_TYPE.REDUCE_TYPE) { //减少弹珠
            let ball_count = uball_obj_player[level_key_str];
            if (ball_count && Number(ball_count) >= count) {
                uball_obj_player[level_key_str] = Number(ball_count) - count;
                is_success = true;
            }
        }

        if (is_success) {
            player.set_uball_info(JSON.stringify(uball_obj_player));
        }
        return is_success;
    }

    ////////////////////////////////////////
    ///对外接口
    ////////////////////////////////////////
    
    //获取有游戏服务信息
    static do_player_get_ugame_info(utag:number){
        let player: Player = playerMgr.get_player(utag);
        MySqlGame.get_ugame_uchip_by_uid(utag, function (status: number, data_game: any) {
            if (status == Response.OK) {
                let data_game_len = ArrayUtil.GetArrayLen(data_game);
                if (data_game_len > 0) {
                    Log.info("hcc>>on_user_get_ugame_info1111>>", data_game[0] , "data_game: " , data_game);
                    let ugameInfo = data_game[0];
                    let ugameInfoStr = JSON.stringify(ugameInfo);
                    let body = {
                        status: Response.OK,
                        userinfostring: ugameInfoStr,
                    }
                    player.set_ugame_info(ugameInfo);
                    player.send_cmd(Cmd.eUserGameInfoRes, body);
                } else {
                    MySqlGame.insert_ugame_user(utag, GameHoodleConfig.KW_BORN_EXP, GameHoodleConfig.KW_BORN_CHIP, function (status_game_ins: number, data_game_ins: any) {
                        Log.info("hcc>>on_user_get_ugame_info2222");
                        if (status_game_ins == Response.OK) {
                            MySqlGame.get_ugame_uchip_by_uid(utag, function (status_game_ins_get: number, data_game_ins_get: any) {
                                if (status_game_ins_get == Response.OK) {
                                    Log.info("hcc>>on_user_get_ugame_info3333>>", data_game_ins_get[0]);
                                    let ugameInfo = data_game_ins_get[0];
                                    let ugameInfoStr = JSON.stringify(ugameInfo);
                                    let body = {
                                        status: Response.OK,
                                        userinfostring: ugameInfoStr,
                                    }
                                    player.set_ugame_info(ugameInfo);
                                    player.send_cmd(Cmd.eUserGameInfoRes, body);
                                } else {
                                    Log.info("hcc>>on_user_get_ugame_info4444>>error");
                                    player.send_cmd(Cmd.eUserGameInfoRes, { status: Response.INVALIDI_OPT });
                                }
                            })
                        } else {
                            Log.info("hcc>>on_user_get_ugame_info5555>>error");
                            player.send_cmd(Cmd.eUserGameInfoRes, { status: Response.INVALIDI_OPT });
                        }
                    })
                }
            } else {
                Log.info("hcc>>on_user_get_ugame_info6666>>error");
                player.send_cmd(Cmd.eUserGameInfoRes, { status: Response.INVALIDI_OPT });
            }
        })
    }

    //获取弹珠信息
    static do_player_get_ball_info(utag:number) {
        let player:Player = playerMgr.get_player(utag);
        MySqlGame.get_ugame_uball_info(player.get_uid(), function (status: number, ret: any) {
            if (status == Response.OK) {
                let uball_json = ret;
                let body = {
                    status: Response.OK,
                    userballinfostring: uball_json,
                }
                Log.info("hcc>>on_ser_ball_info: ", uball_json);
                player.send_cmd(Cmd.eUserBallInfoRes, body);
                player.set_uball_info(uball_json);
            } else {
                player.send_cmd(Cmd.eUserBallInfoRes, { status: Response.INVALIDI_OPT });
            }
        })
    }

    //兑换，卖出，等更新弹珠
    static do_player_update_ball_info(utag: number, proto_type: number, raw_cmd: any){
        let player: Player = playerMgr.get_player(utag);
        let data_body:any = ProtoManager.decode_cmd(proto_type, raw_cmd);
        let up_type: number = data_body.updatetype;
        let level: number   = data_body.level;
        let count: number   = data_body.count;
        if (up_type == GameHoodleConfig.BALL_UPDATE_TYPE.SELL_TYPE){//卖出TODO, 需要定义价格表,暂时还不做
            
        } else if (up_type == GameHoodleConfig.BALL_UPDATE_TYPE.COMPOSE_TYPE){ //合成
            let is_success: boolean = GameInfoInterface.user_update_ball_info(player, up_type, level, count);
            if (is_success) {
                let tmp_ball_json = player.get_uball_info();
                let body_ball = {
                    status: Response.OK,
                    userballinfostring: tmp_ball_json,
                }
                MySqlGame.update_ugame_uball_info(player.get_uid(), tmp_ball_json, function (status: number, ret: any) {
                    if (status == Response.OK) {
                        player.send_cmd(Cmd.eUpdateUserBallRes, body_ball);
                        player.set_uball_info(tmp_ball_json);
                    } else {
                        player.send_cmd(Cmd.eUpdateUserBallRes, { status: Response.INVALIDI_OPT });
                    }
                })
            } else {
                player.send_cmd(Cmd.eUpdateUserBallRes, { status: Response.INVALIDI_OPT });
            }
        }
    }

    //获取商城列表
    static do_player_store_list(utag:number){
        let player: Player = playerMgr.get_player(utag);
        let res_body = {
            status: Response.OK,
            storeprops: GameHoodleConfig.KW_STORE_LIST_CONFIG,
        }
        player.send_cmd(Cmd.eStoreListRes, res_body);
    }

    //玩家购买
    static do_player_buy_things(utag:number, proto_type:number, raw_cmd:any){
        let player: Player = playerMgr.get_player(utag);
        let req_body = ProtoManager.decode_cmd(proto_type, raw_cmd);
        if (req_body) {
            let propsvrindex = req_body.propsvrindex;
            for (let key in GameHoodleConfig.KW_STORE_LIST_CONFIG) {
                let shopInfo = GameHoodleConfig.KW_STORE_LIST_CONFIG[key];
                if (shopInfo.propsvrindex == propsvrindex) {
                    let propprice   = shopInfo.propprice;
                    let propcount   = shopInfo.propcount;
                    let propinfo    = JSON.parse(shopInfo.propinfo);
                    if (Number(player.get_uchip()) >= propprice) {
                        
                        MySqlGame.add_ugame_uchip(player.get_uid(), propprice * (-1), function (status: number, ret: any) {
                            if (status == Response.OK) {
                                //减去金币
                                player.set_uchip(player.get_uchip() - propprice);
                                Log.info("hcc>>write_player_chip success", player.get_uname());
                                //加上道具
                                let is_success: boolean = GameInfoInterface.user_update_ball_info(player, GameHoodleConfig.BALL_UPDATE_TYPE.ADD_TYPE, propinfo.level, propcount);
                                if (is_success) {
                                    MySqlGame.update_ugame_uball_info(player.get_uid(), player.get_uball_info(), function (status: number, ret: any) {
                                        if (status == Response.OK) {
                                            Log.info("hcc>>write_player_ball success", player.get_uname());
                                            let res_body = {
                                                status: Response.OK,
                                                propsvrindex: shopInfo.propsvrindex,
                                                propid: shopInfo.propid,
                                                propcount: shopInfo.propcount,
                                                propprice: shopInfo.propprice,
                                                propinfo: shopInfo.propinfo,
                                            }
                                            player.send_cmd(Cmd.eBuyThingsRes,res_body);
                                        }else{
                                            player.send_cmd(Cmd.eBuyThingsRes, { status: Response.INVALIDI_OPT });
                                        }
                                    })
                                }else{
                                    player.send_cmd(Cmd.eBuyThingsRes, { status: Response.INVALIDI_OPT });
                                }
                            }else{
                                player.send_cmd(Cmd.eBuyThingsRes, { status: Response.INVALIDI_OPT });
                            }
                        });
                    } else {
                        //金币不够
                        player.send_cmd(Cmd.eBuyThingsRes, {status: Response.INVALIDI_OPT});
                    }
                    break;
                }
            }
        }
    }
}

export default GameInfoInterface;