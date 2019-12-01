import Player from './Player';
import ArrayUtil from '../../../utils/ArrayUtil';
var Log =  require("../../../utils/Log")

class PlayerManager {
    private static readonly Instance: PlayerManager = new PlayerManager();

    private _player_set:any = {} //uid-->Player

    private constructor(){

    }

    public static getInstance(){
        return PlayerManager.Instance;
    }

    alloc_player(session:any, uid:number, proto_type:number){
        if(this._player_set[uid]){
            Log.warn("alloc_player: user is exist!!!!");
            return this._player_set[uid];
        }
        let p = new Player(session, uid, proto_type);
        return p;
    }

    get_player(uid:number){
        if(this._player_set[uid]){
            return this._player_set[uid];
        }
        return null;
    }

    delete_player(uid:number){
        if(this._player_set[uid]){
            this._player_set[uid] = null;
            delete this._player_set[uid];
        }else{
            Log.warn("delete_player:", uid, "is not in game server!!!!");
        }
    }

    get_player_count(){
        return ArrayUtil.GetArrayLen(this._player_set);
    }

}

export default PlayerManager;