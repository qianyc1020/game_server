import Room from './Room';
import ArrayUtil from '../../../utils/ArrayUtil';
import Player from './Player';
import Log from '../../../utils/Log';
import { UserState, PlayerPower } from './State';
import RoomManager from './RoomManager';
import { Cmd } from '../../protocol/GameHoodleProto';
import Response from '../../Response';

const MATCH_INTERVAL        = 1000;     //0.5秒匹配一次
const MATCH_PLAYER_COUNT    = 2;        //坐满人数
const MATCH_PLAYE_NUM       = 3;        //局数

//匹配房间规则
let MATCH_GAME_RULE = {
    playerCount : MATCH_PLAYER_COUNT,
    playCount : MATCH_PLAYE_NUM,
}

class MatchManager {
    private static readonly Instance: MatchManager = new MatchManager();

    private _match_list: any    = {}        // uid->player  匹配列表，还没进入匹配的人， inview状态
    private _in_match_list: any = {}        // uid->player  匹配到的人数, matching 状态
    
    private constructor(){
    }

    public static getInstance(){
        return MatchManager.Instance;
    }

    //开始匹配
    start_match(){
        let _this = this;
        setInterval(function() {
           let player = _this.get_matching_player();
           if(player){
                let ret = _this.add_player_to_in_match_list(player);
                if(!ret){
                    Log.warn("hcc>>start_match failed");
                    return;
                }
                _this.send_match_player();//匹配到一个玩家 ，发送到客户端
                if(_this.get_in_match_player_count() >= MATCH_PLAYER_COUNT){ //匹配完成
                    Log.info("hcc>>match success")
                    _this.on_server_match_success();//发送到客户端，服务端已经匹配完成
                    _this.del_match_success_player_from_math_list();//从待匹配列表删除
                    _this.del_in_match_player(); //从匹配完成列表中删除
                }
           }
        //    _this.log_match_list()
        },MATCH_INTERVAL);
    }

    //创建房间，进入玩家，发送到发送到客户端
    //in_match_list:匹配成功玩家 Matching
    on_server_match_success(){
        let in_match_list = this._match_list;
        let room:Room = RoomManager.getInstance().alloc_room();
        room.set_game_rule(JSON.stringify(MATCH_GAME_RULE));
        this.set_room_host(room);
        for(let key in in_match_list){
            let player = in_match_list[key];
            player.set_offline(false);
            if(!room.add_player(player)){
                Log.warn("on_server_match_success enter room error")
                room.broadcast_in_room(Cmd.eUserMatchRes,{status:Response.INVALIDI_OPT});
                RoomManager.getInstance().delete_room(room.get_room_id())
                return;
            }
        }
        let body = {
            status: Response.OK,
            matchsuccess: true,
        }
        room.broadcast_in_room(Cmd.eUserMatchRes,body);
    }

    //设置房主: 匹配成功后，选择先匹配的玩家是房主
    //in_match_list:匹配成功玩家
    //room房间
    set_room_host(room:Room){
        let in_match_list = this._match_list;
        if(ArrayUtil.GetArrayLen(in_match_list) <= 0){
            return;
        }
        let index = 0;
        for(let key in in_match_list){
            index++;
            if(index == 1){
                let player:Player = in_match_list[key];
                if(player){
                    player.set_ishost(true);
                    room.set_room_host_uid(player.get_uid())
                }
                break;
            }
        }
    }

    //发送匹配列表中的玩家
    send_match_player(){
        let in_match_list = this._match_list;
        let userinfo_array = [];
        for(let key in in_match_list){
            let player:Player = in_match_list[key];
            if(player){
                let userinfo = {
                    numberid: String(player.get_numberid()),
                    userInfoString: JSON.stringify(player.get_player_info()),
                }
                userinfo_array.push(userinfo);
            }
        }

        let body = {
            status: Response.OK,
            matchsuccess: false,
            userinfo: userinfo_array,
        }

        for(let key in in_match_list){
            let player:Player = in_match_list[key];
            if(player){
                player.send_cmd(Cmd.eUserMatchRes,body)
            }
        }
    }

    //获取正在等待列表中，未进入匹配的玩家  inview状态
    get_matching_player(){
        for(let key in this._match_list){
            let p:Player = this._match_list[key];
            if(p.get_user_state() == UserState.InView){
                return p;
            }
        }   
    }

    //匹配中的列表人数 Matching 
    get_in_match_player_count():number{
        let count:number = 0;
        for(let key in this._in_match_list){
            let player:Player = this._in_match_list[key];
            if(player && player.get_user_state() == UserState.MatchIng){
                count++;
            }
        }
        return count;
    }

    //从待匹配列表中将匹配完成的人删掉
    del_match_success_player_from_math_list(){
        for(let key in this._in_match_list){
            let mplayer:Player = this._in_match_list[key];
            if(mplayer){
                this.del_player_from_match_list_by_uid(mplayer.get_uid());
            }
        }
    }

    //删除匹配完成列表的人 Matching状态
    del_in_match_player(){
        let key_set = [];
        let _this = this;
        for(let key in this._in_match_list){
            let player:Player = this._in_match_list[key];
            if(player){
                player.set_user_state(UserState.InView);
                key_set.push(player.get_uid())
            }
        }
        key_set.forEach(uid => {
            _this.del_player_from_in_match_list_by_uid(uid);
        });
        this._in_match_list = {}
    }

    //添加到待匹配列表 Inview
    add_player_to_match_list(player:Player){
        if(this._match_list[player.get_uid()]){
            Log.info("hcc>>player uid: " + player.get_uid() + " is already in match")
            return false;
        }
        this._match_list[player.get_uid()] = player;
        player.set_user_state(UserState.InView);
        return true;
    }

    //添加到匹配完成列表中 inview-> Matching
    add_player_to_in_match_list(player:Player){
        if(!player){
            return false;
        }

        if(player.get_user_state() != UserState.InView){
            return false;
        }

        if(this.get_in_match_player_count() >= MATCH_PLAYER_COUNT){
            return false;
        }

        player.set_user_state(UserState.MatchIng);
        this._in_match_list[player.get_uid()] = player;
        return true;
    }

    //从待匹配的列表中删除 inview
    del_player_from_match_list_by_uid(uid:number){
        let player:Player = this._match_list[uid];
        if(player){
            player.set_user_state(UserState.InView);
            this._match_list[uid] = null;
            delete this._match_list[uid];
            return true;
        }
        return false;
    }
    
    //从匹配中的列表中删除 inview
    del_player_from_in_match_list_by_uid(uid:number){
        let player:Player = this._in_match_list[uid];
        if(player){
            player.set_user_state(UserState.InView);
            this._in_match_list[uid] = null;
            delete this._in_match_list[uid];
            return true;
        }
        return false;
    }

    //用户取消匹配
    on_user_stop_match(uid:number):boolean{
        let ret = this.del_player_from_match_list_by_uid(uid);
        let ret_in = this.del_player_from_in_match_list_by_uid(uid);
        return ret || ret_in;
    }

    //计算匹配列表人数 Matching
    count_match_list(){
        return ArrayUtil.GetArrayLen(this._match_list)
    }

    //打印统计列表
    log_match_list(){
        let name_str = ""
        for(let key in this._match_list){
            let player:Player = this._match_list[key];
            let uname = player.get_uname();
            name_str = name_str + uname + "  ,"
        }
        if(name_str == ""){
            name_str = "none"
        }
        Log.info( "matchlist_len: " + this.count_match_list() + " ,user:" , name_str);
    }

}

export default MatchManager;