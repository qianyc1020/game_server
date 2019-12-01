import NetBus from '../../../netbus/NetBus';

class Player{
    
    _uid:number         = 0;
    _session:any        = null;
    _proto_type:number  = -1;

    _ugame_info:any     = null;
    _ucenter_info:any   = null;

    constructor(session:any, uid:number, proto_type:number){
        this._session = session;
        this._uid = uid;
        this._proto_type = proto_type;
    }

    init_session(session:any, uid:number, proto_type:number){
        this._session = session;
        this._uid = uid;        
        this._proto_type = proto_type;
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

    send_cmd(stype: number, ctype:number, body:any){
        if(!this._session){
            return;
        }
        NetBus.send_cmd(this._session, stype, ctype, this._uid, this._proto_type, body);
    }

}

export default Player;