import NetBus from '../../../netbus/NetBus';
import MySqlAuth from '../../../database/MySqlAuth';
import Response from '../../Response';
import { Stype } from '../../protocol/Stype';

let Log = require("../../../utils/Log")

class Player{
    
    _uid:number         = 0;
    _session:any        = null;
    _proto_type:number  = -1;

    _ugame_info:any     = null;
    _ucenter_info:any   = null;

    _is_off_line:boolean = false;

    constructor(){
    }
    //中心数据，游戏数据
    init_session(session:any, uid:number, proto_type:number, callback?:Function){
        this._session = session;
        this._uid = uid;        
        this._proto_type = proto_type;

        let _this = this;
        MySqlAuth.get_uinfo_by_uid(uid,function (status:number, data:any) {
            Log.info("hcc>>init_session>>data: " , data)
            if(status == Response.OK){
                let sql_info = data[0];
                _this._ucenter_info = sql_info;
                if(callback){
                    callback(Response.OK,sql_info)
                }
            }else{
                if(callback){
                    callback(Response.SYSTEM_ERR)
                }
            }
        })
    }

    get_uid(){
        return this._uid;
    }

    get_numberid(){
        return this._ucenter_info.numberid;
    }

    set_ugame_info(ugame_info:any){
        this._ugame_info = ugame_info;
    }

    set_ucenter_info(ucenter_info:any){
        this._ucenter_info = ucenter_info;
    }

    get_ugame_info(){
        return this._ugame_info;
    }

    get_ucenter_info(){
        return this._ucenter_info;
    }

    set_offline(is_offline:boolean){
        this._is_off_line = is_offline;
    }

    get_offline(){
        return this._is_off_line;
    }

    send_cmd(ctype:number, body:any){
        if(!this._session){
            Log.error("session is null!!")
            return;
        }
        NetBus.send_cmd(this._session, Stype.GameHoodle, ctype, this._uid, this._proto_type, body);
    }

}

export default Player;