//游戏过程，进房间数据推送，玩家准备协议处理
import Player from '../Player';
import { Cmd } from "../../../protocol/GameHoodleProto";
import Log from '../../../../utils/Log';
import Response from '../../../protocol/Response';
import PlayerManager from '../PlayerManager';
import RoomManager from '../RoomManager';
import { GameState, UserState } from '../config/State';
import GameFunction from './GameFunction';
import GameCheck from './GameCheck';

let playerMgr: PlayerManager = PlayerManager.getInstance();
let roomMgr: RoomManager     = RoomManager.getInstance();

class GameProcessInterface {

    //玩家进入房间收到，服务主动推送相关局内数据
    static do_check_link_game(utag:number){

        let player: Player = playerMgr.get_player(utag);
        if (!GameCheck.check_room(utag)) {
            Log.warn(player.get_uname(), "check_link_game room is not exist!")
            return;
        }

        let room = roomMgr.get_room_by_uid(player.get_uid())
        if (room) {
            player.send_cmd(Cmd.eCheckLinkGameRes, { status: Response.OK })
            player.send_cmd(Cmd.eRoomIdRes, { roomid: room.get_room_id() })
            player.send_cmd(Cmd.eGameRuleRes, { gamerule: room.get_game_rule() })
            player.send_cmd(Cmd.ePlayCountRes, { playcount: String(room.get_play_count()), totalplaycount: String(room.get_conf_play_count()) })
            GameFunction.send_player_info(player);
            //处理断线重连,只发送给重连玩家
            //玩家位置，局数，玩家权限，玩家得分
            if (room.get_game_state() == GameState.Gameing) {
                player.send_cmd(Cmd.eGameStartRes, { status: Response.OK })
                GameFunction.send_player_ball_pos(room, undefined, player);
                GameFunction.send_player_power(room, undefined, player);
                GameFunction.send_player_score(room, undefined, player);
            }
        }
    }
    
    //玩家准备
    static do_player_ready(utag:number){
        let player: Player = playerMgr.get_player(utag);
        if (!GameCheck.check_room(utag)) {
            Log.warn(player.get_uname(), "on_user_ready room is not exist!")
            player.send_cmd(Cmd.eUserReadyRes, { status: Response.INVALIDI_OPT })
            return;
        }

        let userstate = player.get_user_state()
        if (userstate == UserState.Ready || userstate == UserState.Playing) {
            Log.warn(player.get_uname(), "on_user_ready user is already ready or is playing!")
            player.send_cmd(Cmd.eUserReadyRes, { status: Response.INVALIDI_OPT })
            return;
        }

        let room = roomMgr.get_room_by_uid(player.get_uid());
        if (room) {
            //已经在游戏中了
            if (room.get_game_state() == GameState.Gameing) {
                player.send_cmd(Cmd.eUserReadyRes, { status: Response.INVALIDI_OPT })
                Log.warn("on_user_ready error ,game is playing!")
                return;
            }

            //已经大结算了
            if (room.get_play_count() == room.get_conf_play_count()) {
                player.send_cmd(Cmd.eUserReadyRes, { status: Response.INVALIDI_OPT })
                Log.warn("on_user_ready error ,game is over!")
                return;
            }
            //有玩家准备了，发送状态
            player.set_user_state(UserState.Ready);
            GameFunction.send_player_state(room, player)

            //游戏开始了
            let is_game_start = GameCheck.check_game_start(room);
            if (is_game_start) {
                GameFunction.set_all_player_state(room, UserState.Playing);
                GameFunction.broadcast_player_info_in_rooom(room); //刷新局内玩家信息：Playing

                //设置游戏状态为游戏中
                room.set_game_state(GameState.Gameing);
                //发送游戏开始
                room.broadcast_in_room(Cmd.eGameStartRes, { status: Response.OK })
                //游戏逻辑发送
                GameFunction.send_player_first_pos(room);
                //设置初始权限
                GameFunction.set_player_start_power(room);
                //玩家权限发送
                GameFunction.send_player_power(room);
                //发送分数
                GameFunction.send_player_score(room);
                //局数自加
                room.set_play_count(room.get_play_count() + 1);
                //发送局数
                GameFunction.send_play_count(room);
            }
        }
    }
}

export default GameProcessInterface;