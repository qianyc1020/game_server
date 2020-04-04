"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameAppConfig_1 = __importDefault(require("../apps/GameAppConfig"));
var MySqlGame_1 = __importDefault(require("../database/MySqlGame"));
var Log_1 = __importDefault(require("../utils/Log"));
var querystring_1 = __importDefault(require("querystring"));
var db = GameAppConfig_1["default"].game_database;
MySqlGame_1["default"].connect(db.host, db.port, db.db_name, db.uname, db.upwd);
// MySqlGame.get_ugame_info_by_uid(31,function(rescode:any,ret:any){
//     Log.info("hcc>>info: " ,rescode , ret)
// })
var test_table = {
    lv_1: 0,
    lv_2: 1,
    lv_3: 3,
    lv_4: 4,
    lv_5: 155
};
var TEST_UID = 139;
// let str = "";
// for(let index = 1; index <=300; index++){
//     str = str + String(index);
// }
// Log.info("hcc>> str: " , str, str.length);
// let TEST_UBSLL_JSON = JSON.stringify(test_table);
// let jsonstr = JSON.stringify(test_table)
var TEST_UBSLL_JSON = querystring_1["default"].encode(test_table); //obj->string
Log_1["default"].info("encode: ", TEST_UBSLL_JSON, "   ,len ", TEST_UBSLL_JSON.length, " ,type: ", typeof (TEST_UBSLL_JSON));
var stringssss = querystring_1["default"].decode(TEST_UBSLL_JSON); //string->obj
Log_1["default"].info("decode: ", stringssss, " ,type: ", typeof (stringssss));
for (var key in stringssss) {
    var oo = stringssss[key];
    Log_1["default"].info("-------key: ", key, "  ,obj: ", oo);
}
/*
MySqlGame.get_ugame_uball_info(TEST_UID,function(status:number, ret:any) {
    Log.info("status: get_ugame_uball_info" , status, ret)
    if(status == Response.OK){
        Log.info("hcc>>get_ugame_uball_info" , ret);
    }
})

console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\")

*/
// MySqlGame.update_ugame_uball_info(TEST_UID, TEST_UBSLL_JSON ,function(status:number, ret:any) {
//     Log.info("status: update_ugame_uball_info" , status , ret)
//     if(status == Response.OK){
//         Log.info("hcc>>update_ugame_uball_info" , ret);
//     }
// })
console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
// MySqlGame.get_ugame_uball_info(TEST_UID,function(status:number, ret:any) {
//     Log.info("status: get_ugame_uball_info" , status)
//     if(status == Response.OK){
//         Log.info("hcc>>get_ugame_uball_info" , ret);
//         let ret_str = ret.uball_info;
//         let ret_obj = querystring.decode(ret_str);
//         Log.info("hcc>>ret_obj: " , ret_obj);
//     }
// })
//# sourceMappingURL=mysql_game_test.js.map