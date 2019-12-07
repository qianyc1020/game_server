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
        let player:Player = this._player_set[uid]
        if(player){
            Log.warn("alloc_player: user is exist!!!!");
            player.init_session(session, uid, proto_type);
            return;
        }
        let p:Player = new Player(session, uid, proto_type);
        this._player_set[uid] = p;
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
            Log.warn("delete_player:", uid, "is not in game server!!!!");
        }
    }

    get_player_count(){
        return ArrayUtil.GetArrayLen(this._player_set);
    }

}

export default PlayerManager;