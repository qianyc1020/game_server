"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GameAppConfig_1 = __importDefault(require("../apps/GameAppConfig"));
var MySqlGame_1 = __importDefault(require("../database/MySqlGame"));
var Log_1 = __importDefault(require("../utils/Log"));
var Response_1 = __importDefault(require("../apps/Response"));
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
var jsonstr = JSON.stringify(test_table);
var TEST_UBSLL_JSON = querystring_1["default"].encode(test_table);
Log_1["default"].info("TEST_UBSLL_JSON: ", TEST_UBSLL_JSON, "   ,len ", TEST_UBSLL_JSON.length);
/*
MySqlGame.get_ugame_uball_info(TEST_UID,function(status:number, ret:any) {
    Log.info("status: get_ugame_uball_info" , status, ret)
    if(status == Response.OK){
        Log.info("hcc>>get_ugame_uball_info" , ret);
    }
})

console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\")

*/
MySqlGame_1["default"].update_ugame_uball_info(TEST_UID, TEST_UBSLL_JSON, function (status, ret) {
    Log_1["default"].info("status: update_ugame_uball_info", status, ret);
    if (status == Response_1["default"].OK) {
        Log_1["default"].info("hcc>>update_ugame_uball_info", ret);
    }
});
console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
MySqlGame_1["default"].get_ugame_uball_info(TEST_UID, function (status, ret) {
    Log_1["default"].info("status: get_ugame_uball_info", status);
    if (status == Response_1["default"].OK) {
        Log_1["default"].info("hcc>>get_ugame_uball_info", ret);
        var ret_str = ret.uball_info;
        var ret_obj = querystring_1["default"].decode(ret_str);
        Log_1["default"].info("hcc>>ret_obj: ", ret_obj);
    }
});
//# sourceMappingURL=mysql_game_test.js.map