//检测接口
import Player from '../Player';
import Log from '../../../../utils/Log';
import PlayerManager from '../PlayerManager';
import RoomManager from '../RoomManager';
import Room from '../Room';
import { UserState } from '../config/State';

class GameCheck {
    
    //检测是否非法玩家
    static check_player(utag: number) {
        let player = PlayerManager.getInstance().get_player(utag);
        if (player) {
            return true;
        } else {
            return false;
        }
    }

    //检测是否非法房间
    static check_room(utag: number) {
        let player: Player = PlayerManager.getInstance().get_player(utag);
        if (!player) {
            return false;
        }

        let room = RoomManager.getInstance().get_room_by_uid(player.get_uid())
        if (!room) {
            return false;
        }
        return true;
    }

    //检测游戏开始
    static check_game_start(room: Room): boolean {
        let player_set = room.get_all_player();
        let ready_player_count = 0;
        for (let uid in player_set) {
            let player: Player = player_set[uid];
            if (player) {
                let isready = player.get_user_state() == UserState.Ready;
                if (isready == true) {
                    ready_player_count++;
                }
            }
        }
        Log.info("check_game_start: readycount: ", ready_player_count);
        if (ready_player_count == room.get_conf_player_count()) {
            return true;
        }
        return false;
    }
}

export default GameCheck;