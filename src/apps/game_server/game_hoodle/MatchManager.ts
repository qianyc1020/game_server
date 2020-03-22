import Room from './Room';
import ArrayUtil from '../../../utils/ArrayUtil';
import Player from './Player';
import Log from '../../../utils/Log';
import { UserState, PlayerPower } from './State';
import RoomManager from './RoomManager';
import { Cmd } from '../../protocol/GameHoodleProto';
import Response from '../../Response';

const MATCH_INTERVAL    = 2000; //0.5秒匹配一次
const MATCH_PLAYER_COUNT = 2; //坐满人数
const MATCH_PLAYE_NUM = 3; //局数

//匹配房间规则
let MATCH_GAME_RULE = {
    playerCount : MATCH_PLAYER_COUNT,
    playCount : MATCH_PLAYE_NUM,
}

class MatchManager {
    private static readonly Instance: MatchManager = new MatchManager();

    private _match_list: any = {} //uid->player  inview状态
    private _in_match_list:any = {}  // matching 状态
    private _interval_id: any = null;
    
    private constructor(){
    }

    public static getInstance(){
        return MatchManager.Instance;
    }
    //开始匹配
    start_match(){
        let _this = this;
        this._interval_id = setInterval(function() {
           let pleyer = _this.get_matching_player();
           if(pleyer){
                _this._in_match_list[pleyer.get_uid()] = pleyer;
                pleyer.set_user_state(UserState.MatchIng); 
                _this.send_match_player();//匹配到一个玩家 ，发送到客户端
                //匹配完成
                if(ArrayUtil.GetArrayLen(_this._in_match_list) >= MATCH_PLAYER_COUNT){
                    Log.info("hcc>>match success")
                    //发送到客户端，服务端已经匹配完成
                    _this.on_server_match_success()
                    //从匹配列表删除
                    for(let key in _this._in_match_list){
                        let mplayer:Player = _this._in_match_list[key];
                        if(mplayer){
                            _this.del_player_from_match_list_by_uid(mplayer.get_uid());
                        }
                    }
                    _this._in_match_list = {};
                }
           }
        //    _this.log_match_list()
        },MATCH_INTERVAL);
    }

    //创建房间，进入玩家，发送到发送到客户端
    //in_match_list:匹配成功玩家
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
            userinfo: [],
        }
        room.broadcast_in_room(Cmd.eUserMatchRes,body);
    }

    //匹配成功后，选择先匹配的玩家是房主
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

    //发送已经匹配了的玩家
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

        let isSuccess = ArrayUtil.GetArrayLen(in_match_list) >= MATCH_PLAYER_COUNT;
        let body = {
            status: Response.OK,
            matchsuccess: isSuccess,
            userinfo: userinfo_array,
        }

        for(let key in in_match_list){
            let player:Player = in_match_list[key];
            if(player){
                player.send_cmd(Cmd.eUserMatchRes,body)
            }
        }
    }

    //停止匹配
    stop_match(){
        clearInterval(this._interval_id);
    }

    //获取正在等待列表中，未匹配到的玩家
    get_matching_player(){
        for(let key in this._match_list){
            let p:Player = this._match_list[key];
            if(p.get_user_state() == UserState.InView){
                return p;
            }
        }   
    }

    //添加早匹配列表
    add_player_to_match_list(player:Player){
        if(this._match_list[player.get_uid()]){
            Log.info("hcc>>player uid: " + player.get_uid() + " is already in match")
            return false;
        }
        this._match_list[player.get_uid()] = player;
        player.set_user_state(UserState.InView);
        return true;
    }

    //从匹配列表中删除
    del_player_from_match_list_by_uid(uid:number){
        let player:Player = this._match_list[uid];
        if(player){
            player.set_user_state(UserState.InView);
            delete this._match_list[uid];
            return true;
        }
        return false;
    }

    //计算匹配列表人数
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