//登录，断线协议处理
import Player from '../Player';
import { Cmd } from "../../../protocol/GameHoodleProto";
import Log from '../../../../utils/Log';
import Response from '../../../protocol/Response';
import PlayerManager from '../PlayerManager';
import RoomManager from '../RoomManager';
import GameFunction from './GameFunction';
import MatchManager from '../MatchManager';
import GameSendMsg from '../GameSendMsg';

let playerMgr: PlayerManager    = PlayerManager.getInstance();
let roomMgr: RoomManager        = RoomManager.getInstance();
let matchMgr: MatchManager      = MatchManager.getInstance();

class GameLinkInterface {

    //玩家断线
    static do_player_lost_connect(utag:number){
        let player: Player = playerMgr.get_player(utag);
        if (player) {
            let room = roomMgr.get_room_by_uid(utag);
            if (room) {
                player.set_offline(true)
                //send to room other player user lost connect
                room.broadcast_in_room(Cmd.eUserOfflineRes, { seatid: player.get_seat_id() }, player);
                GameFunction.broadcast_player_info_in_rooom(room, player);
            }
            let issuccess = playerMgr.delete_player(utag);
            if(issuccess){
                Log.warn(player.get_uname() + " ,numid:" + player.get_numberid() + " is lostconnect,totalPlyaerCount: " + playerMgr.get_player_count());
            }
            let ret = matchMgr.stop_player_match(player.get_uid());
            if (ret) {
                Log.info(player.get_uname(), "delete from match")
            }
        }
    }

    //玩家登录逻辑服务
    static do_player_login_logic_server(session: any, utag: number, proto_type: number){
        let player: Player = playerMgr.get_player(utag)
        if (player) {
            Log.info("player is exist, uid: ", utag)
            player.init_session(session, utag, proto_type, function (status: number, data: any) {
                if (status == Response.OK) {
                    //如果是重连进来，需要重新获取老玩家的信息
                    let room = roomMgr.get_room_by_uid(utag);
                    if (room) {
                        let oldPlayer: Player = room.get_player(utag);
                        if (oldPlayer) {
                            player.set_player_info(oldPlayer.get_player_info())
                        }
                    }
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, { status: Response.OK })
                } else {
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, { status: Response.SYSTEM_ERR })
                }
            })
        } else {
            Log.info("player is not exist , new player uid: ", utag)
            playerMgr.alloc_player(session, utag, proto_type, function (status: number, data: any) {
                if (status == Response.OK) {
                    //如果是重连进来，需要重新获取老玩家的信息
                    let newPlayer: Player = playerMgr.get_player(utag);
                    let room = roomMgr.get_room_by_uid(utag);
                    if (room) {
                        let oldPlayer: Player = room.get_player(utag);
                        if (oldPlayer) {
                            newPlayer.set_player_info(oldPlayer.get_player_info())
                        }
                    }
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, { status: Response.OK })
                } else {
                    GameSendMsg.send(session, Cmd.eLoginLogicRes, utag, proto_type, { status: Response.SYSTEM_ERR })
                }
            })
        }
    }
}

export default GameLinkInterface;
