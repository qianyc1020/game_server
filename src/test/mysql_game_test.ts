import GameAppConfig from '../apps/GameAppConfig';
import MySqlGame from '../database/MySqlGame';
import Log from '../utils/Log';
import Response from '../apps/Response';
import querystring from "querystring"


var db = GameAppConfig.game_database;
MySqlGame.connect(db.host, db.port, db.db_name, db.uname, db.upwd)

// MySqlGame.get_ugame_info_by_uid(31,function(rescode:any,ret:any){
//     Log.info("hcc>>info: " ,rescode , ret)
// })

let test_table = {
    lv_1:0,
    lv_2:1,
    lv_3:3,
    lv_4:4,
    lv_5:155,
}

let TEST_UID= 139;
// let str = "";
// for(let index = 1; index <=300; index++){
//     str = str + String(index);
// }

// Log.info("hcc>> str: " , str, str.length);


// let TEST_UBSLL_JSON = JSON.stringify(test_table);
let jsonstr = JSON.stringify(test_table)
let TEST_UBSLL_JSON = querystring.encode(test_table);
Log.info("TEST_UBSLL_JSON: " , TEST_UBSLL_JSON , "   ,len " , TEST_UBSLL_JSON.length);
/*
MySqlGame.get_ugame_uball_info(TEST_UID,function(status:number, ret:any) {
    Log.info("status: get_ugame_uball_info" , status, ret)
    if(status == Response.OK){
        Log.info("hcc>>get_ugame_uball_info" , ret);
    }
})

console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\")

*/

MySqlGame.update_ugame_uball_info(TEST_UID, TEST_UBSLL_JSON ,function(status:number, ret:any) {
    Log.info("status: update_ugame_uball_info" , status , ret)
    if(status == Response.OK){
        Log.info("hcc>>update_ugame_uball_info" , ret);
    }
})

console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\")

MySqlGame.get_ugame_uball_info(TEST_UID,function(status:number, ret:any) {
    Log.info("status: get_ugame_uball_info" , status)
    if(status == Response.OK){
        Log.info("hcc>>get_ugame_uball_info" , ret);
        let ret_str = ret.uball_info;
        let ret_obj = querystring.decode(ret_str);
        Log.info("hcc>>ret_obj: " , ret_obj);
    }
})