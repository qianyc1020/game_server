import RoomManager from '../apps/game_server/game_hoodle/RoomManager';
import Room from '../apps/game_server/game_hoodle/Room';
import StringUtil from '../utils/StringUtil';

let room_set:any = {
    0:"000000",
    1:"111111",
}

let index = 0;
function generate_roomid():any {
    // let roomid = StringUtil.random_int_str(6);
    if(index <= 1 ){
        roomid = room_set[index];
    }else{
        roomid = StringUtil.random_int_str(6);
    }
    
    if(!indexof(roomid)){
        index++;
        return roomid;
    }else{
        index++;
        return generate_roomid();
    }
}

function indexof(id:string) {
    for(let key in room_set){
        if (room_set[key] == id){
            return true;
        }
    }
    return false;
}

let roomid = generate_roomid()

console.log("roomid: ",roomid)