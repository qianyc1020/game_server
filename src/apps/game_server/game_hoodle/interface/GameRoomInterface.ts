//房间相关处理逻辑，登录，创建，返回房间相关协议处理
import Player from '../Player';
import { Cmd } from "../../../protocol/GameHoodleProto";
import Log from '../../../../utils/Log';
import GameHoodleConfig from "../config/GameHoodleConfig";
import Response from '../../../protocol/Response';
import PlayerManager from '../PlayerManager';
import RoomManager from '../RoomManager';
import { UserState, GameState } from '../config/State';
import Room from '../Room';
import ProtoManager from '../../../../netbus/ProtoManager';
import GameFunction from './GameFunction';

let playerMgr: PlayerManager = PlayerManager.getInstance();
let roomMgr: RoomManager     = RoomManager.getInstance();

class GameRoomInterface {

    static do_player_create_room(utag:number, proto_type:number, raw_cmd:any){
        let player: Player = playerMgr.get_player(utag);
        if (player.get_user_state() == UserState.MatchIng) {
            player.send_cmd(Cmd.eCreateRoomRes, { status: Response.INVALIDI_OPT })
            Log.warn(player.get_uname(), " create room error, player is in matching")
            return;
        }

        if (roomMgr.get_room_by_uid(player.get_uid())) {
            player.send_cmd(Cmd.eCreateRoomRes, { status: Response.INVALIDI_OPT })
            Log.warn(player.get_uname(), "create room error, already create one")
            return;
        }

        let room: Room = roomMgr.alloc_room();
        if (!room) {
            player.send_cmd(Cmd.eCreateRoomRes, { status: Response.SYSTEM_ERR })
            Log.warn(player.get_uname(), "create room error, alloc room error")
            return;
        }

        //是否金币不足
        if (GameHoodleConfig.KW_IS_GOLD_LIMIT) {
            if (player.get_uchip() < GameHoodleConfig.KW_MIN_GOLD_ENTER_ROOM) {
                player.send_cmd(Cmd.eCreateRoomRes, { status: Response.SYSTEM_ERR })
                Log.warn(player.get_uname(), "create room error, gold is not enough")
                return;
            }
        }

        let body = ProtoManager.decode_cmd(proto_type, raw_cmd);
        if (body) {
            room.set_game_rule(body.gamerule)
            Log.info(player.get_uname(), "create room, gamerule: ", body)
        }

        if (!room.add_player(player)) {
            Log.warn("create room error,add host player error")
            player.send_cmd(Cmd.eCreateRoomRes, { status: Response.INVALIDI_OPT })
            roomMgr.delete_room(room.get_room_id())
            return;
        }
        room.set_room_host_uid(player.get_uid())
        player.set_offline(false);
        player.set_ishost(true);
        player.send_cmd(Cmd.eCreateRoomRes, { status: Response.OK })
    }

    static do_player_join_room(utag: number, proto_type: number, raw_cmd: any) {
        let player: Player = playerMgr.get_player(utag);
        if (player.get_user_state() == UserState.MatchIng) {
            Log.warn(player.get_uname(), "join_room error, player is in matching!")
            player.send_cmd(Cmd.eJoinRoomRes, { status: Response.INVALID_PARAMS })
            return;
        }
        let body = ProtoManager.decode_cmd(proto_type, raw_cmd);
        let roomid = body.roomid;
        if (!roomid || roomid == "") {
            Log.warn(player.get_uname(), "join_room error, roomid", roomid, "is invalid")
            player.send_cmd(Cmd.eJoinRoomRes, { status: Response.INVALID_PARAMS })
            return;
        }

        let room: Room = roomMgr.get_room_by_roomid(roomid)
        if (!room) {
            Log.warn(player.get_uname(), "join_room error, room is not exist!")
            player.send_cmd(Cmd.eJoinRoomRes, { status: Response.SYSTEM_ERR })
            return;
        }

        //是否金币不足
        if (GameHoodleConfig.KW_IS_GOLD_LIMIT) {
            if (player.get_uchip() < GameHoodleConfig.KW_MIN_GOLD_ENTER_ROOM) {
                player.send_cmd(Cmd.eJoinRoomRes, { status: Response.SYSTEM_ERR })
                Log.warn(player.get_uname(), "join_room error, gold is not enough")
                return;
            }
        }

        //自己创建了一个房间，不能加入其它人的房间，只能加入自己的房间
        let uroom = roomMgr.get_room_by_uid(utag);
        let is_back_room = false;
        if (uroom) {
            //自己已经创建了一个房间
            if (room.get_room_id() !== uroom.get_room_id()) {
                Log.warn(player.get_uname(), "join_room error, player is create one room!")
                player.send_cmd(Cmd.eJoinRoomRes, { status: Response.INVALIDI_OPT })
                return;
            }
            //掉线返回房间
            if (room.get_room_id() == uroom.get_room_id()) {
                is_back_room = true;
            }
        }

        if (!room.add_player(player, is_back_room)) {
            Log.warn(player.get_uname() + "join_room error")
            player.send_cmd(Cmd.eJoinRoomRes, { status: Response.INVALIDI_OPT })
            return;
        }
        player.set_offline(false);
        player.send_cmd(Cmd.eJoinRoomRes, { status: Response.OK })

        //send uinfo to other player in room
        GameFunction.broadcast_player_info_in_rooom(room, player);
        Log.info(player.get_uname(), "join_room success, roomid: ", room.get_room_id())
    }

    static do_player_exit_room(utag: number) {
        let player: Player = playerMgr.get_player(utag);
        let room = roomMgr.get_room_by_uid(player.get_uid())
        if (!room) {
            Log.warn(player.get_uname()," exit_room error, room is not exist!")
            player.send_cmd(Cmd.eExitRoomRes, { status: Response.INVALIDI_OPT })
            return;
        }

        //start game
        if (room.get_game_state() != GameState.InView) {
            Log.warn(player.get_uname()," exit_room error, game is start !");
            player.send_cmd(Cmd.eExitRoomRes, { status: Response.INVALIDI_OPT })
            return;
        }

        if (room.is_room_host(player.get_uid())) {
            player.set_offline(true);
        } else {
            room.kick_player(player.get_uid())
            player.clear_room_info();
        }
        player.send_cmd(Cmd.eExitRoomRes, { status: Response.OK })
        GameFunction.broadcast_player_info_in_rooom(room);
    }

    static do_player_dessolve_room(utag: number) {
        let player: Player = playerMgr.get_player(utag);
        let room = roomMgr.get_room_by_uid(player.get_uid())
        if (!room) {
            Log.warn(player.get_uname()," dessolve_room error, room is not exist!")
            player.send_cmd(Cmd.eDessolveRes, { status: Response.INVALIDI_OPT })
            return;
        }

        if (room.is_room_host(player.get_uid()) == false) {
            Log.warn(player.get_uname(),"dessolve_room error, player is not host!")
            player.send_cmd(Cmd.eDessolveRes, { status: Response.INVALIDI_OPT })
            return;
        }

        let roomID = room.get_room_id();
        let ret = roomMgr.delete_room(roomID);
        if (ret == false) {
            Log.warn(player.get_uname(),"dessolve_room error ,roomid: ", roomID, "is not exist!")
            player.send_cmd(Cmd.eDessolveRes, { status: Response.INVALIDI_OPT })
            return;
        }

        room.broadcast_in_room(Cmd.eDessolveRes, { status: Response.OK }, player);
        room.kick_all_player();
        player.send_cmd(Cmd.eDessolveRes, { status: Response.OK })
    }

    static do_player_get_room_status(utag: number) {
        let player: Player = playerMgr.get_player(utag);
        let room = roomMgr.get_room_by_uid(player.get_uid())
        if (!room) {
            player.send_cmd(Cmd.eGetRoomStatusRes, { status: Response.SYSTEM_ERR })
            Log.info(player.get_uname(), "get_room_status , player is not in room")
            return;
        }
        Log.info(player.get_uname(), "get_room_status player is in room! roomid: ", room.get_room_id())
        player.send_cmd(Cmd.eGetRoomStatusRes, { status: Response.OK })
    }

    static do_player_back_room( utag: number) {
        let player: Player = playerMgr.get_player(utag);
        let room = roomMgr.get_room_by_uid(player.get_uid())
        if (!room) {
            player.send_cmd(Cmd.eBackRoomRes, { status: Response.INVALIDI_OPT })
            Log.warn(player.get_uname(), "back_room error, player is not in room")
            return;
        }

        Log.info(player.get_uname(), "back room success! roomid: ", room.get_room_id())
        player.set_offline(false);
        if (room.is_room_host(player.get_uid())) {
            player.set_ishost(true)
        }

        if (!room.add_player(player, true)) {
            player.send_cmd(Cmd.eBackRoomRes, { status: Response.INVALIDI_OPT })
            Log.warn(player.get_uname(), "back room error!")
            return;
        }
        player.send_cmd(Cmd.eBackRoomRes, { status: Response.OK })
        GameFunction.broadcast_player_info_in_rooom(room, player)
    }
}

export default GameRoomInterface;