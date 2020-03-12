import Room from "./Room";
import Player from "./Player";
import { Cmd } from "../../protocol/GameHoodleProto";
import Response from '../../Response';
import Log from '../../../utils/Log';
import { UserState , GameState ,PlayerPower} from './State';

class GameHoodleLogic {
    constructor(){
     
    }

    public static generate_start_pos():any{
        let posx = Math.random() * 100;
        let posy = Math.random() * 250;
        return {posx: posx, posy: posy};
    }

    //清除玩家当局数据
    public static clear_all_player_data(room: Room){
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

    //计算玩家权限 //TODO
    public static cal_player_power(){

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
    public static send_player_shooted(room:Room, shoot_info:any, player:Player):boolean{
        if(!room || !shoot_info || !player){
            return false;
        }
        let body = {
            status: Response.OK,
            srcseatid: Number(shoot_info.srcseatid),
            desseatid: Number(shoot_info.desseatid),
        }
        room.broadcast_in_room(Cmd.ePlayerIsShootedRes, body, player);
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