"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var MySqlAuth_1 = __importDefault(require("../database/MySqlAuth"));
var GameAppConfig_1 = __importDefault(require("../apps/config/GameAppConfig"));
var Log_1 = __importDefault(require("../utils/Log"));
var db = GameAppConfig_1["default"].auth_database;
MySqlAuth_1["default"].connect(db.host, db.port, db.db_name, db.uname, db.upwd);
// setInterval(function(){
MySqlAuth_1["default"].get_uinfo_by_uname_upwd("hccfun", "111111", function (err, ret) {
    if (err) {
        Log_1["default"].error("hcc>>err: ", err);
        return;
    }
    Log_1["default"].info("hcc>>info: ", ret);
});
// },2000)
// MySqlAuth.get_guest_uinfo_by_ukey("2",function(err:any,ret:any){
//     if(err){
//         Log.error("hcc>>err: " , err)
//         return;
//     }
//     Log.info("hcc>>info: " ,ret)
// })
// MySqlAuth.insert_guest_user("test2222",3,1,"testkey123456",function(err:any, ret:any){
//     if(err){
//         Log.error("hcc>>err: " , err)
//         return;
//     }
//     Log.info("hcc>>info: " ,ret)
// })
// MySqlAuth.insert_phone_account_user("test3333",1,1,"13065525252","123456789123456789123456",function(err:any, ret:any){
//     if(err){
//         Log.error(err)
//         return
//     }
//     Log.info("success ret: ",ret)
// })
//# sourceMappingURL=mysql_auth_test.js.map