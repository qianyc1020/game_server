import Room from "../Room";
import Player from "../Player";
import { Cmd } from "../../../protocol/GameHoodleProto";
import Log from '../../../../utils/Log';
import {PlayerPower} from '../config/State';
import StringUtil from '../../../../utils/StringUtil';
import MySqlGame from '../../../../database/MySqlGame';
import GameHoodleConfig from "../config/GameHoodleConfig";
import Response from '../../../protocol/Response';

////////////////////////
//游戏逻辑相关接口
////////////////////////

class GameHoodleLogicInterface {

    static _startx_left_array   = [-480,-400,-300,-200,-100];
    static _startx_right_array  = [480,400,300,200,100];
    static _starty_up_array     = [900,700,500,300,100];
    static _starty_down_array   = [-900,-700,-500,-300,-100];

    constructor(){
    }
   
    ////////////////////////////////////////
    ///对外接口 start
    ////////////////////////////////////////
    //生成初始坐标(为了不让小球开局位置在一块)
    public static generate_start_pos(pos_index:number):any{
        // let posx = StringUtil.random_int(-540 , 540);
        // let posy = StringUtil.random_int(-960 , 960);
        let posx_random:number = 0;
        let posy_random:number = 0;
        if(pos_index %2 == 0){
            let array_len = GameHoodleLogicInterface._startx_left_array.length;
            posx_random = GameHoodleLogicInterface._startx_left_array[StringUtil.random_int(0,array_len-1)];
            
            array_len = GameHoodleLogicInterface._starty_up_array.length;
            posy_random = GameHoodleLogicInterface._starty_up_array[StringUtil.random_int(0,array_len-1)];
        }else{
            let array_len = GameHoodleLogicInterface._startx_right_array.length;
            posx_random = GameHoodleLogicInterface._startx_right_array[StringUtil.random_int(0,array_len-1)];

            array_len = GameHoodleLogicInterface._starty_down_array.length;
            posy_random = GameHoodleLogicInterface._starty_down_array[StringUtil.random_int(0,array_len-1)];
        }

        let startx_pos = posx_random < 0 ? posx_random : 0;
        let endx_pos = posx_random > 0 ? posx_random : 0;

        let starty_pos = posy_random < 0 ? posy_random : 0;
        let endy_pos = posy_random > 0 ? posy_random : 0;

        let posx = StringUtil.random_int(startx_pos, endx_pos);
        let posy = StringUtil.random_int(starty_pos , endy_pos);
        return {posx: posx, posy: posy};
    }

    //清除玩家当局数据
    public static clear_all_player_cur_data(room: Room){
        let player_set = room.get_all_player();
        for(let uid in player_set){
            let player:Player = player_set[uid];
            if(player){
                player.set_user_power(PlayerPower.canNotPlay);
                player.set_user_pos({posx:0,posy:0})
            }
        }
    }

    //设置玩家初始权限
    public static set_player_start_power(room: Room):boolean{
        let can_play_seatid = StringUtil.random_int(1,room.get_player_count());
        let player_set = room.get_all_player();
        let player_array = [];
        for(let key in player_set){
            player_array.push(player_set[key]);
        }
        let player = player_array[can_play_seatid - 1];
        if(!player){
            Log.error("hcc>>set_player_start_power player is null ,seatid: " , can_play_seatid);
            return false;
        }
        player.set_user_power(PlayerPower.canPlay);
        Log.info("hcc>>set_player_start_power seatid: " + player.get_seat_id() , " ,power: " + player.get_user_power());
        return true;
    }

    //计算玩家权限
    public static set_next_player_power(room: Room){
        let player_set = room.get_all_player();
        let next_power_seatid = -1;
        for(let uid in player_set){
            let player:Player = player_set[uid];
            if(player){
              let power = player.get_user_power();
              if(power == PlayerPower.canPlay){
                 player.set_user_power(PlayerPower.canNotPlay);
                 next_power_seatid = player.get_seat_id() + 1;
                 if(next_power_seatid > room.get_player_count()){
                    next_power_seatid = next_power_seatid % room.get_player_count();
                 }
                 Log.info("hcc>> cur power seat: " , player.get_seat_id());
                 Log.info("hcc>> next power seat: " , next_power_seatid);
                 break;
              }
            }
        }
        
        if(next_power_seatid == -1){
            Log.error("error: next_power_seatid is -1");
            return;
        }

        for(let uid in player_set){
            let player:Player = player_set[uid];
            if(player){
                if(player.get_seat_id() == next_power_seatid){
                    player.set_user_power(PlayerPower.canPlay);
                }else{
                    player.set_user_power(PlayerPower.canNotPlay);
                }
            }
        }
    }

    //计算玩家金币，设置到player，写入数据库
    //考虑不够减的情况
    public static write_player_chip(room:Room){
        if(!room){
            return;
        }
        let player_set = room.get_all_player();
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let score = player.get_user_score();
                let gold_win = score * GameHoodleConfig.KW_WIN_RATE;
                if(gold_win != 0){
                    let player_cur_chip = player.get_uchip();
                    if(gold_win < 0){
                        if(Math.abs(gold_win) > Math.abs(player_cur_chip)){
                            gold_win = (-1)*player_cur_chip;
                        }
                    }
                    Log.info(player.get_uname(),"hcc>>write_player_chip: score: " , score, " ,gold_win: " , gold_win, " ,cur_chip: " , player.get_uchip()," ,after add: " , (player.get_uchip() + gold_win));
                    player.set_uchip(player.get_uchip() + gold_win);
                    MySqlGame.add_ugame_uchip(player.get_uid(),gold_win,function(status:number, ret:any) {
                        if(status == Response.OK){
                            Log.info("hcc>>write_player_chip success", player.get_uname())
                        }
                    });
                }
            }
        }
    }

    ////////////////////////////////////////
    ///对外接口 end
    ////////////////////////////////////////

    ////////////////////////////////////////
    ///发送消息
    ////////////////////////////////////////

    //发送玩家出生位置
    public static send_player_first_pos(room: Room, not_player?: Player, only_player?: Player){
        if(!room){
            return;
        }
        let player_set = room.get_all_player();
        let player_pos_array = [];
        let pos_index = 0;
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let pos = GameHoodleLogicInterface.generate_start_pos(pos_index);
                Log.info("hcc>>send_player_first_pos: ", pos);
                player.set_user_pos(pos);
                let player_pos = {
                    seatid : Number(player.get_seat_id()),
                    posx : String(pos.posx),
                    posy : String(pos.posy),
                }
                player_pos_array.push(player_pos);
                pos_index++;
            }
        }
        Log.info("hcc>>send_player_first_pos array: ", player_pos_array);
        if(only_player){
            only_player.send_cmd(Cmd.ePlayerFirstBallPosRes,{positions: player_pos_array});
        }else{
            room.broadcast_in_room(Cmd.ePlayerFirstBallPosRes,{positions: player_pos_array},not_player);
        }
    }

    //发送玩家权限
    public static send_player_power(room: Room, not_player?: Player, only_player?: Player){
        if(!room){
            return;
        }
        let player_set = room.get_all_player();
        let player_power_array = [];
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let player_pos = {
                    seatid : Number(player.get_seat_id()),
                    power: Number(player.get_user_power()),
                }
                player_power_array.push(player_pos);
            }
        }

        if(only_player){
            only_player.send_cmd(Cmd.ePlayerPowerRes,{status: Response.OK, powers: player_power_array});
        }
        else{
            room.broadcast_in_room(Cmd.ePlayerPowerRes,{status: Response.OK, powers: player_power_array},not_player);
        }
    }

    //发送玩家射击 ,服务只做转发
    public static send_player_shoot(room:Room, shoot_info:any, not_player:Player){
        if(!room || !shoot_info || !not_player){
            return;
        }
        let body = {
            status: Response.OK,
            seatid: Number(shoot_info.seatid),
            posx: String(shoot_info.posx),
            posy: String(shoot_info.posy),
            shootpower:Number(shoot_info.shootpower),
        }
        room.broadcast_in_room(Cmd.ePlayerShootRes, body, not_player)
    }

    //发送玩家位置，球停下后
    public static send_player_ball_pos(room:Room, not_player?: Player, only_player?: Player){
        if(!room){
            return;
        }
        let player_set = room.get_all_player();
        let player_pos_array = [];
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let player_pos = {
                    seatid : Number(player.get_seat_id()),
                    posx: String(player.get_user_pos().posx),
                    posy: String(player.get_user_pos().posy),
                }
                player_pos_array.push(player_pos);
            }
        }
        if(only_player){
            only_player.send_cmd(Cmd.ePlayerBallPosRes, {status: Response.OK, positions: player_pos_array});
        }else{
            room.broadcast_in_room(Cmd.ePlayerBallPosRes, {status: Response.OK, positions: player_pos_array},not_player);
        }
    }

    //发送玩家射中 ，只做转发
    public static send_player_is_shooted(room:Room, shoot_info:any){
        if(!room || !shoot_info){
            return;
        }
        let body = {
            status: Response.OK,
            srcseatid: Number(shoot_info.srcseatid),
            desseatid: Number(shoot_info.desseatid),
        }
        room.broadcast_in_room(Cmd.ePlayerIsShootedRes, body);
    }

    //小结算
    public static send_game_result(room:Room){
        if(!room){
            return;
        }
       
        let player_set = room.get_all_player();
        let player_score_array = [];
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let one_score = {
                    seatid: Number(player.get_seat_id()),
                    score:  String(player.get_user_score()),
                }
                player_score_array.push(one_score);
            }
        }
        room.broadcast_in_room(Cmd.eGameResultRes, {scores:player_score_array});
    }

    //大结算
    public static send_game_total_result(room:Room){
        if(!room){
            return;
        }
       
        let player_set = room.get_all_player();
        let player_score_array = [];
        let player_golds_array = [];
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let one_score = {
                    seatid: Number(player.get_seat_id()),
                    score: String(player.get_user_score()),
                }
                //金币不够情况
                let score = player.get_user_score();
                let gold_win = score * GameHoodleConfig.KW_WIN_RATE;
                let one_gold = {
                    seatid: Number(player.get_seat_id()),
                    gold:String(gold_win),
                }
                player_score_array.push(one_score);
                player_golds_array.push(one_gold);
            }
        }
        let body = {
            scores:player_score_array,
            golds:player_golds_array,
        }
        room.broadcast_in_room(Cmd.eTotalGameResultRes, body);
    }

    //玩家得分
    public static send_player_score(room: Room, not_player?: Player, only_player?: Player){
        if(!room){
            return;
        }

        let player_set = room.get_all_player();
        let player_score_array = [];
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let one_score = {
                    seatid: Number(player.get_seat_id()),
                    score: String(player.get_user_score()),
                }
                player_score_array.push(one_score);
            }
        }
        
        if(only_player){
            only_player.send_cmd(Cmd.ePlayerScoreRes, {scores:player_score_array});
        }else{
            room.broadcast_in_room(Cmd.ePlayerScoreRes, {scores:player_score_array},not_player);
        }
    }

    ////////////////////////////////////////
    ///发送消息 end
    ////////////////////////////////////////
}

export default GameHoodleLogicInterface;