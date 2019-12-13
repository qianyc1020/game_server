import Player from './Player';
import ArrayUtil from '../../../utils/ArrayUtil';
import Log from '../../../utils/Log';

class Room {
    _roomid:string = "";
    _gamerule:string = "";
    _player_set:any = {};
    _host_player_uid:number = -1;

    constructor(roomid:string){
        this._roomid = roomid;
    }

    get_room_id(){
        return this._roomid;
    }

    set_game_rule(gamerule:string){
        this._gamerule = gamerule;
    }

    get_game_rule(){
        return this._gamerule;
    }

    add_player(player:Player){
        this._player_set[player.get_uid()] = player;
        Log.info("add player , playercount: " , this.get_player_count())
    }

    kick_player(uid:number){
        if(this._player_set[uid]){
            delete this._player_set[uid];
            Log.info("room kick player by uid success , playercount: " , this.get_player_count())
            return true;
        }
        return false;
    }

    kick_all_player(){
        let key_set = [];
        for(let key in this._player_set){
            key_set.push(key);
        }
        key_set.forEach(value => {
            if(this._player_set[value]){
                delete this._player_set[value];
            }
        });
        Log.info("room kick all player, playercount: " , this.get_player_count());
    }

    get_all_player(){
        return this._player_set;
    }

    get_player(uid:number){
        return this._player_set[uid];
    }

    is_player_in_room(uid:number){
        if(this._player_set[uid]){
            return true;
        }
        return false;
    }

    get_player_count(){
        return ArrayUtil.GetArrayLen(this._player_set)
    }

    set_room_host_uid(uid:number){
        this._host_player_uid = uid;
    }

    get_room_host_uid(){
        return this._host_player_uid;
    }

    is_room_host(uid:number){
        return this._host_player_uid === uid;
    }

    broadcast_in_room(ctype:number, body:any ,not_to_player?:Player){
        if(!ctype){
            return;
        }
        if(not_to_player){
            for (const key in this._player_set) {
                let player:Player = this._player_set[key];
                if(player){
                    if(player.get_uid() != not_to_player.get_uid()){
                        player.send_cmd(ctype,body)
                    }
                }
            }
        }else{
            for (const key in this._player_set) {
                let player:Player = this._player_set[key];
                if(player){
                    player.send_cmd(ctype,body)
                }
            }
        }
    }

}

export default Room;