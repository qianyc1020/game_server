import NetBus from '../../../netbus/NetBus';
import MySqlAuth from '../../../database/MySqlAuth';
import Response from '../../Response';
import { Stype } from '../../protocol/Stype';
import ArrayUtil from '../../../utils/ArrayUtil';
import Log from '../../../utils/Log';
import { UserState } from './State';
import MySqlGame from '../../../database/MySqlGame';

class Player{
    
    _uid:number         = 0;
    _session:any        = null;
    _proto_type:number  = -1;
    _ugame_info:any     = {};
    _ucenter_info:any   = {};


    ///////房间相关
    _is_off_line:boolean = false;
    _is_host:boolean     = false;
    _seat_id:number      = -1;

    //居内数据
    _user_state:any      = UserState.InView; //玩家状态
    _user_pos:any        = {posx:0,posy:0} //玩家位置 
    _user_power:number   = 0; // 玩家权限
    _user_score:number   = 0; //玩家得分
    _user_ball_info:string = ""; //json串，玩家小球信息

    /////////
    constructor(){
        //test
        // this._ugame_info["test_gameinfo"] = "info_test";
        // this._ugame_info["test_gameinfo2"] = "info_test2";
        // this._ugame_info["test_gameinfo3"] = false;
    }

    //中心数据，游戏数据 auth_center->uinfo
    init_session(session:any, uid:number, proto_type:number, callback?:Function){
        this._session = session;
        this._uid = uid;        
        this._proto_type = proto_type;

        let _this = this;
        //用户中心服数据
        MySqlAuth.get_uinfo_by_uid(uid, function(status:number, data:any) {
            if(status == Response.OK)
            {
                let sql_info = data[0];
                _this._ucenter_info = sql_info;
                if(callback){
                    callback(Response.OK, _this.get_player_info());
                }
            }else{
                if(callback){
                    callback(Response.SYSTEM_ERR);
                }
            }
        })
    }

    //获取uid
    get_uid(){
        return this._uid;
    }

    //获取numid
    get_numberid(){
        return this._ucenter_info.numberid;
    }

    //设置游戏局内信息
    set_ugame_info(ugame_info:any){
        this._ugame_info = ugame_info;
    }
    
    //游戏服务信息
    get_ugame_info(){
        return this._ugame_info;
    }
    
    //玩家中心信息
    get_ucenter_info(){
        return this._ucenter_info;
    }
    
    //账号
    get_uname(){
        return this._ucenter_info.uname;
    }

    //金币
    get_uchip(){
        return this._ugame_info.uchip;
    }
    //金币
    set_uchip(uchip:number){
        this._ugame_info.uchip = uchip;
    }

    //小球信息
    get_uball_info(){
        return this._user_ball_info;
    }

    set_uball_info(info:string){
        this._user_ball_info = info;
    }

    //玩家信息汇总
    get_player_info(){
        let info = ArrayUtil.ObjCat(this._ugame_info,this._ucenter_info);
        info.isoffline = this._is_off_line;
        info.ishost = this._is_host;
        info.seatid = this._seat_id;
        info.userstate = this._user_state;
        info.userpos = this._user_pos;
        info.userpower = this._user_power;
        // Log.info("hcc>>get_player_info: " , info)
        return info;
    }

    //重连后拷贝老玩家的信息
    set_player_info(uinfo:any){
        this._is_off_line = uinfo.isoffline;
        this._is_host = uinfo.ishost;
        this._seat_id = uinfo.seatid;
        this._user_state = uinfo.userstate;
        this._user_pos = uinfo.userpos;
        this._user_power = uinfo.userpower;
    }

    //设置是否掉线
    set_offline(is_offline:boolean){
        this._is_off_line = is_offline;
    }

    //获取是否掉线
    get_offline(){
        return this._is_off_line;
    }

    //设置是否房主
    set_ishost(is_host:boolean){
        this._is_host = is_host;
    }

    //获取是否房主
    get_ishost(){
        return this._is_host;
    }

    //设置玩家座位号
    set_seat_id(seatid:number){
        this._seat_id = seatid;
    }

    //获取玩家座位号
    get_seat_id(){
        return this._seat_id;
    }

    //设置玩家状态
    set_user_state(user_state:number){
        this._user_state = user_state;
    }

    //获取玩家状态
    get_user_state(){
        return this._user_state;
    }

    //设置位置
    set_user_pos(pos:any){
        this._user_pos = pos;
    }

    //获取位置
    get_user_pos(){
        return this._user_pos;
    }

    set_user_power(power:number){
        this._user_power = power;
    }

    get_user_power(){
        return this._user_power;
    }

    set_user_score(score:number){
        this._user_score = score;
    }

    get_user_score(){
        return this._user_score;
    }

    //清除玩家在房间内的相关信息
    clear_room_info(){
        this.set_offline(false);
        this.set_ishost(false);
        this.set_seat_id(-1);
        this.set_user_state(UserState.InView);
        this.set_user_power(0);
        this.set_user_score(0);
        this.set_user_pos({posx:0,posy:0});
    }

    //发送消息
    send_cmd(ctype:number, body:any){
        if(!this._session){
            Log.error("send_cmd error, session is null!!")
            return;
        }
        NetBus.send_cmd(this._session, Stype.GameHoodle, ctype, this._uid, this._proto_type, body);
    }

}

export default Player;