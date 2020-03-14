import Room from "./Room";
import Player from "./Player";
import { Cmd } from "../../protocol/GameHoodleProto";
import Response from '../../Response';
import Log from '../../../utils/Log';
import { UserState , GameState ,PlayerPower} from './State';
import StringUtil from '../../../utils/StringUtil';

class GameHoodleLogic {
    constructor(){
     
    }

    //生成初始坐标
    public static generate_start_pos():any{
        // let posx = StringUtil.random_int(-540 , 540);
        // let posy = StringUtil.random_int(-960 , 960);
        let posx = StringUtil.random_int(-400 , 400);
        let posy = StringUtil.random_int(-800 , 800);
        return {posx: posx, posy: posy};
    }

    //清除玩家当局数据
    public static clear_all_player_cur_data(room: Room){
        let player_set = room.get_all_player();
        for(let uid in player_set){
            let player:Player = player_set[uid];
            if(player){
                player.set_user_score(0);
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

    ////////////////////////////////////////
    ///发送消息
    ////////////////////////////////////////

    //发送玩家出生位置
    public static send_player_first_pos(room: Room):boolean{
        if(!room){
            return false;
        }
        let player_set = room.get_all_player();
        let player_pos_array = [];
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let pos = GameHoodleLogic.generate_start_pos();
                Log.info("hcc>>send_player_first_pos: ", pos);
                player.set_user_pos(pos);
                let player_pos = {
                    seatid : Number(player.get_seat_id()),
                    posx : String(pos.posx),
                    posy : String(pos.posy),
                }
                player_pos_array.push(player_pos);
            }
        }
        Log.info("hcc>>send_player_first_pos array: ", player_pos_array);
        room.broadcast_in_room(Cmd.ePlayerFirstBallPosRes,{positions: player_pos_array});
        return true;
    }

    //发送玩家权限
    public static send_player_power(room: Room):boolean{
        if(!room){
            return false;
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
        room.broadcast_in_room(Cmd.ePlayerPowerRes,{status: Response.OK, powers: player_power_array});
        return true;
    }

    //发送玩家射击 ,服务只做转发
    public static send_player_shoot(room:Room, shoot_info:any, player:Player):boolean{
        if(!room || !shoot_info || !player){
            return false;
        }
        let body = {
            status: Response.OK,
            seatid: Number(shoot_info.seatid),
            posx: String(shoot_info.posx),
            posy: String(shoot_info.posy),
        }
        room.broadcast_in_room(Cmd.ePlayerShootRes, body, player)
        return true;
    }

    //发送玩家位置，球停下后
    public static send_player_ball_pos(room:Room){
        if(!room){
            return false;
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
        room.broadcast_in_room(Cmd.ePlayerBallPosRes, {status: Response.OK, positions: player_pos_array});
        return true;
    }

    //发送玩家射中 ，只做转发
    public static send_player_shooted(room:Room, shoot_info:any):boolean{
        if(!room || !shoot_info){
            return false;
        }
        let body = {
            status: Response.OK,
            srcseatid: Number(shoot_info.srcseatid),
            desseatid: Number(shoot_info.desseatid),
        }
        room.broadcast_in_room(Cmd.ePlayerIsShootedRes, body);
        return true;
    }

    //小结算 todo
    public static send_game_result(room:Room):boolean{
        if(!room){
            return false;
        }
       
        let player_set = room.get_all_player();
        let player_score_array = [];
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let one_score = {
                    seatid: Number(player.get_seat_id()),
                    score: 0, //TODO
                }
                player_score_array.push(one_score);
            }
        }
        room.broadcast_in_room(Cmd.eGameResultRes, player_score_array);
        return true;
    }

    //大结算
    public static send_game_total_result(room:Room):boolean{
        if(!room){
            return false;
        }
       
        let player_set = room.get_all_player();
        let player_score_array = [];
        for(let key in player_set){
            let player:Player = player_set[key];
            if (player){
                let one_score = {
                    seatid: Number(player.get_seat_id()),
                    score: Number(player.get_user_score()),
                }
                player_score_array.push(one_score);
            }
        }
        room.broadcast_in_room(Cmd.eTotalGameResultRes, player_score_array);
        return true;
    }
}

export default GameHoodleLogic;