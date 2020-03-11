import PlayerManager from "./PlayerManager";
import Player from './Player';
import RoomManager from "./RoomManager";
import Room from "./Room";
import { Cmd } from "../../protocol/GameHoodleProto";
import Log from "../../../utils/Log";
import ArrayUtil from "../../../utils/ArrayUtil";
import Response from '../../Response';
import { UserState } from './State';

class GameHoodleInterface {

    //检测是否非法玩家
    static check_player(utag:number){
        let player = PlayerManager.getInstance().get_player(utag);
        if(player){
            return true;
        }else{
            return false;
        }
    }

    //检测是否非法房间
    static check_room(utag:number){
        let player:Player = PlayerManager.getInstance().get_player(utag);
        if(!player){
            return false;
        }

        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid())
        if(!room){
            return false;
        }
        return true;
    }

    //检测游戏开始
    static check_game_start(room:Room):boolean{
        let player_set = room.get_all_player();
        let ready_player_count = 0;
        for(let uid in player_set){
            let player:Player = player_set[uid];
            if(player){
                let isready = player.get_user_state() ==  UserState.Ready;
                if(isready == true){
                    ready_player_count++;
                }
            }
        }
        Log.info("check_game_start: readycount: ",ready_player_count);
        if(ready_player_count == room.get_conf_player_count()){
            return true;
        }
        return false;
    }

    //设置房间内所有玩家状态
    static set_all_player_state(room: Room ,user_state: number){
        let player_set = room.get_all_player();
        for(let uid in player_set){
            let player:Player = player_set[uid];
            if(player){
                player.set_user_state(user_state);
            }
        }
    }

    //向房间内所有人发送局内玩家信息
    static broadcast_player_info_in_rooom(room: Room, not_to_player?: Player){
        if(!room){
            return;
        }
        let player_set = room.get_all_player();
        let userinfo_array = [];
        try {
            for(let key in player_set){
                let player:Player = player_set[key];
                if (player){
                    let userinfo = {
                        numberid: String(player.get_numberid()),
                        userInfoString: JSON.stringify(player.get_player_info()),
                    }
                    userinfo_array.push(userinfo);
                }
            }
            room.broadcast_in_room(Cmd.eUserInfoRes,{userinfo: userinfo_array}, not_to_player)
        } catch (error) {
            Log.error(error);
        }
    }

    //向某个玩家发送局内玩家信息
    static send_player_info(player:Player){
        if(!player){
            return;
        }
        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid());
        if(!room){
            return;
        }

        let player_set = room.get_all_player();
        if(ArrayUtil.GetArrayLen(player_set) <= 0){
            return;
        }

        let userinfo_array = [];
        try {
            for(let key in player_set){
                let player = player_set[key];
                if (player){
                    let userinfo = {
                        numberid: String(player.get_numberid()),
                        userInfoString: JSON.stringify(player.get_player_info()),
                    }
                    userinfo_array.push(userinfo);
                }
            }
            player.send_cmd(Cmd.eUserInfoRes,{userinfo: userinfo_array});
        } catch (error) {
            Log.error(error);
        }
    }

    //向房间内所有人发送某玩家准备的消息
    static send_player_state(room:Room, src_player:Player, not_to_player?:Player){
        let body = {
            status: Response.OK,
            seatid: src_player.get_seat_id(),
            userstate: src_player.get_user_state(),
        }
        room.broadcast_in_room(Cmd.eUserReadyRes, body, not_to_player);
    }
}

export default GameHoodleInterface;