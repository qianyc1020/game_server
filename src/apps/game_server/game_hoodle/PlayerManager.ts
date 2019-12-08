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

    alloc_player(session:any, uid:number, proto_type:number, callback?:Function){
        let player:Player = this._player_set[uid]
        if(player){
            Log.warn("alloc_player>> user: ", uid, " is exist!!!!");
            player.init_session(session, uid, proto_type,callback);
            return;
        }
        let p:Player = new Player();
        this._player_set[uid] = p;
        p.init_session(session, uid, proto_type, callback);
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
            Log.info("delete player uid: " , uid ," success, playercount: " , this.get_player_count())
        }else{
            Log.warn("delete_player error:", uid, "is not in game server!!!!");
        }
    }

    get_player_count(){
        return ArrayUtil.GetArrayLen(this._player_set);
    }

}

export default PlayerManager;