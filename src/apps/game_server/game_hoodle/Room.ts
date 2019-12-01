class Room {
    _roomid:string = "";
    _room_info:string = "";

    constructor(roomid:string){
        this._roomid = roomid;
    }

    get_room_id(){
        return this._roomid;
    }

    get_room_info(){
        return this._room_info;
    }

}

export default Room;