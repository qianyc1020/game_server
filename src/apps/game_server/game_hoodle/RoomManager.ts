import Room from './Room';
import ArrayUtil from '../../../utils/ArrayUtil';
import StringUtil from '../../../utils/StringUtil';
import Log from '../../../utils/Log';

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
        Log.info("creat room success roomid: " , roomid , " ,roomCount: " , this.get_room_count())
        return room;
    }

    //用roomid获取房间
    get_room_by_roomid(roomid:string){
        if(this._room_set[roomid]){
            return this._room_set[roomid];
        }
        return null;
    }

    delete_room(roomid:string){
        if(this._room_set[roomid]){
            delete this._room_set[roomid];
            Log.info("delete_room:", roomid, "success, roomCount: " , this.get_room_count());
            return true;
        }else{
            Log.warn("delete_room:", roomid, "is not in game server!!!!");
            return false;
        }
    }

    get_room_count(){
        return ArrayUtil.GetArrayLen(this._room_set);
    }

    //uid 获取room, 用来判断玩家是否在房间里，或者已经创建了一个房间
    get_room_by_uid(uid:number){
        for (const key in this._room_set) {
            let room:Room = this._room_set[key] 
            if(room.is_player_in_room(uid)){
                return room;
            }
        }
        return null;
    }
}

export default RoomManager;