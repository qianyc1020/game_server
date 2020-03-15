import Player from './Player';
import ArrayUtil from '../../../utils/ArrayUtil';
import Log from '../../../utils/Log';
import { UserState ,GameState } from './State';

class Room {
    _roomid:string      = "";
    _gamerule:string    = "";
    _gamerule_obj:any   = {};
    _player_set:any     = {}; //uid->player
    _host_player_uid:number = -1;

    ///////
    _game_state:number = GameState.InView; //游戏状态
    _play_count:number   = -1; //总的配置局数
    _player_count:number = -1; //总的配置玩家数量
    _cur_play_count:number = 0; //当前局数

    constructor(roomid:string){
        this._roomid = roomid;
    }

    get_room_id(){
        return this._roomid;
    }

    set_game_rule(gamerule:string){
        this._gamerule = gamerule;
        let gameruleObj:any = {};
        try {
            gameruleObj = JSON.parse(gamerule);
        } catch (error) {
            Log.error(error);
            return;
        }
        this._gamerule_obj = gameruleObj;
        this._player_count = gameruleObj.playerCount;
        this._play_count = gameruleObj.playCount;
    }

    get_game_rule(){
        return this._gamerule;
    }
    //玩家加入房间
    //is_back: 是否本来就在房间里面，只是返回
    add_player(player:Player, is_back?:boolean):boolean{
        if(is_back == null || is_back == false || is_back == undefined || !is_back){
            //不是返回房间
            if(this._player_count <= 0 || this._player_count == null || this._player_count == undefined){
                Log.warn("add_player error, playercount is not exist!!")
                return false;
            }
            if(this.get_player_count() >= this._player_count){
                Log.warn("add_player error, playercount is full")
                return false;
            }
            let seatid = this.born_seatid();

            if(seatid == -1){
                Log.warn("add_player error,seatid is invalid")
                return false;
            }
            player.set_seat_id(seatid);
        }

        this._player_set[player.get_uid()] = player;
        Log.info("add player , playercount: " , this.get_player_count())
        return true;
    }

    //生成一个seatid
    born_seatid():number{
        let exist_seatid = [];
        let all_seatid   = [];
        for(let uid in this._player_set){
            let player:Player = this._player_set[uid];
            let seatid = player.get_seat_id();
            if(seatid != -1){
                exist_seatid.push(seatid);
            }
        }

        for(let seatid = 1 ; seatid <= this._player_count; seatid++){
            all_seatid[seatid] = seatid;
        }

       for(let i = 0; i <= exist_seatid.length; i++){
            let seatid = exist_seatid[i];
            for(let j = 1; j <= this._player_count; j++ ){
                if(seatid == all_seatid[j]){
                    all_seatid.splice(j,1);
                }
            }
       }
       if(all_seatid.length > 0){
            for(let i = 1; i <= all_seatid.length; i++){
                let seatid = all_seatid[i];
                if(seatid && seatid != -1){
                    return seatid;
                }
            }
       }
       return -1;
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
                this._player_set[value].clear_room_info();
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

    get_player_by_seatid(seatid:number){
        for(let key in this._player_set){
            let player:Player = this._player_set[key];
            if(player){
                if(player.get_seat_id() == seatid){
                    return player;
                }
            }
        }
    }

    is_player_in_room(uid:number){
        if(this._player_set[uid]){
            return true;
        }
        return false;
    }
    //当前房间内人数
    get_player_count(){
        return ArrayUtil.GetArrayLen(this._player_set)
    }

    //房间配置的最多人数
    get_conf_player_count(){
        return this._player_count;
    }

    //配置的最多局数
    get_conf_play_count(){
        return this._play_count;
    }

    //当前局数
    set_play_count(count:number){
        this._cur_play_count = count;
    }

    //当前局数
    get_play_count():number{
        return this._cur_play_count;
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

    set_game_state(game_state:number){
        this._game_state = game_state;
    }

    get_game_state(){
        return this._game_state;
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