"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log = require("../utils/Log");
Log.info('hccccc tst ts');
Log.warn('hccccc tst ts');
Log.error('hccccc tst ts');
var Platform_1 = __importDefault(require("../utils/Platform"));
// var Platform = require("../utils/Platform")
Log.info(Platform_1.default);
// import CryptoUtil = require("../utils/CryptoUtil")
// Log.info(CryptoUtil)
// var base64_encode = CryptoUtil.base64_encode("huangshucheng")
// Log.info(base64_encode)
// Log.info(CryptoUtil.base64_decode(base64_encode))
// Log.info(CryptoUtil.md5("huangshucheng"))
// Log.info(CryptoUtil.sha1("huangshucheng"))
/*
Log.info(StringUtil)
var str = StringUtil.random_string(5)
var str1 = StringUtil.random_string(5)
var str2 = StringUtil.random_int(1,9)
Log.info(str,str1,str2)
*/
/*
Log.info("timeUtil: " , TimeUtil)
Log.info(TimeUtil.timestamp(),TimeUtil.timestamp2date(TimeUtil.timestamp()),TimeUtil.timestamp_today(),TimeUtil.get_cur_time(),TimeUtil.date2timestamp("2017-06-28 18:00:00"))
Log.info(Platform.isLinux() , Platform.isWin32())

var service_module = {
    [0] : 'hcc',
    [1] : 'fun',
}
for(var stype in service_module) {
    Log.info(stype, service_module[stype])
}
*/
/////////////
// import { Cmd, CmdName } from "../apps/auth_server/AuthProto"
var proto = __importStar(require("../apps/auth_server/AuthProto"));
Log.info(proto);
Log.info("---------------");
// Log.info(Cmd)
Log.info("---------------\n\n");
// Log.info(CmdName)
//# sourceMappingURL=testTypeScript.js.map