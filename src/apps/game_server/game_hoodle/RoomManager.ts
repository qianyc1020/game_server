import Room from './Room';
import ArrayUtil from '../../../utils/ArrayUtil';
import StringUtil from '../../../utils/StringUtil';

var Log =  require("../../../utils/Log")

class RoomManager {
    private static readonly Instance: RoomManager = new RoomManager();

    private _room_set:any = {} //roomid-->room

    private constructor(){

    }

    public static getInstance(){
        return RoomManager.Instance;
    }

    generate_roomid():string{
        let roomid = StringUtil.random_int_str(6);
        if(!this._room_set[roomid]){
            return roomid;
        }else{
            return this.generate_roomid();
        }
    }

    alloc_room(){
        let roomid = this.generate_roomid();
        if(this._room_set[roomid]){
            Log.warn("alloc_room: room is exist!!!!");
            return this._room_set[roomid];
        }
        let room = new Room(roomid);
        this._room_set[roomid] = room;
        Log.info("creat room success ,roomCount: " , this.get_room_count())
        return room;
    }

    get_room(roomid:string){
        if(this._room_set[roomid]){
            return this._room_set[roomid];
        }
        return null;
    }

    // is_player_already_in_room(){

    // }

    delete_room(roomid:string){
        if(this._room_set[roomid]){
            this._room_set[roomid] = null;
            delete this._room_set[roomid];
        }else{
            Log.warn("delete_room:", roomid, "is not in game server!!!!");
        }
    }

    get_room_count(){
        return ArrayUtil.GetArrayLen(this._room_set);
    }

}

export default RoomManager;