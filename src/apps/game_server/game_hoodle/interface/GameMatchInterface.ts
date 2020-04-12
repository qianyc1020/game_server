//匹配协议处理
import Player from '../Player';
import { Cmd } from "../../../protocol/GameHoodleProto";
import Log from '../../../../utils/Log';
import Response from '../../../protocol/Response';
import PlayerManager from '../PlayerManager';
import RoomManager from '../RoomManager';
import MatchManager from '../MatchManager';
import GameHoodleConfig from '../config/GameHoodleConfig';

let playerMgr: PlayerManager = PlayerManager.getInstance();
let roomMgr: RoomManager     = RoomManager.getInstance();
let matchMgr: MatchManager   = MatchManager.getInstance();

class GameMatchInterface {

    static do_player_match(utag:number){
        let player: Player = playerMgr.get_player(utag);
        //如果在房间内，不能匹配
        let room = roomMgr.get_room_by_uid(player.get_uid())
        if (room) {
            Log.warn(player.get_uname(), "do_player_match error user is at room!")
            player.send_cmd(Cmd.eUserMatchRes, { status: Response.INVALIDI_OPT });
            return;
        }

        //是否金币不足
        if (GameHoodleConfig.KW_IS_GOLD_LIMIT) {
            if (player.get_uchip() < GameHoodleConfig.KW_MIN_GOLD_ENTER_ROOM) {
                player.send_cmd(Cmd.eUserMatchRes, { status: Response.INVALIDI_OPT })
                Log.warn(player.get_uname(), "do_player_match error, gold is not enough")
                return;
            }
        }

        //加入匹配等待列表
        let ret = matchMgr.add_player_to_match_list(player);
        if (!ret) {
            Log.warn(player.get_uname(), "do_player_match error user is in matching!")
            player.send_cmd(Cmd.eUserMatchRes, { status: Response.NOT_YOUR_TURN });
            return;
        }

        //发送匹配信息
        let userinfo_array = [];
        let userinfo = {
            numberid: String(player.get_numberid()),
            userinfostring: JSON.stringify(player.get_player_info()),
        }
        userinfo_array.push(userinfo);
        let body = {
            status: Response.OK,
            matchsuccess: false,
            userinfo: userinfo_array,
        }
        player.send_cmd(Cmd.eUserMatchRes, body)
        Log.info(player.get_uname(), "do_player_match user add matching success!")
    }

    static do_player_stop_match(utag:number){
        let player: Player = playerMgr.get_player(utag);
        let uname = player.get_uname();
        let ret = matchMgr.stop_player_match(player.get_uid());
        if (!ret) {
            Log.warn(uname, "odo_player_stop_match failed!")
            player.send_cmd(Cmd.eUserStopMatchRes, { status: Response.INVALIDI_OPT });
            return;
        }
        player.send_cmd(Cmd.eUserStopMatchRes, { status: Response.OK });
        matchMgr.send_match_player();
        Log.info(uname, "do_player_stop_match success!")
    }

}

export default GameMatchInterface;