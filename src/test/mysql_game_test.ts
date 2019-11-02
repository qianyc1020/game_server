import GameConf from '../apps/GameConf';
import MySqlGame from '../database/MySqlGame';

let Log = require("../utils/Log")

var db = GameConf.game_database;
MySqlGame.connect(db.host, db.port, db.db_name, db.uname, db.upwd)

MySqlGame.get_ugame_info_by_uid(31,function(rescode:any,ret:any){
    Log.info("hcc>>info: " ,rescode , ret)
})