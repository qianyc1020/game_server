/*
	服务器启动文件
	注意： vscode调试服务器: 先用compile_src.bat编译成js,再找到服务器的xxxxMain.ts文件打开，f5调试，看到日志后才算成功。
*/

import GameConf from '../../GameConf';
import NetBus from '../../../netbus/NetBus';
import ServiceManager from '../../../netbus/ServiceManager';
import { Stype } from '../../protocol/Stype';
import MySqlGame from '../../../database/MySqlGame';
import GameHoodleService from './GameHoodleService';
import MySqlAuth from '../../../database/MySqlAuth';
import ArrayUtil from '../../../utils/ArrayUtil';
import MatchManager from './MatchManager';
import Log from '../../../utils/Log';

let game_server = GameConf.game_server;
NetBus.start_tcp_server(game_server.host, game_server.port, false);

ServiceManager.register_service(Stype.GameHoodle, GameHoodleService);

// var db_game = GameConf.game_database;
// MySqlGame.connect(db_game.host, db_game.port, db_game.db_name, db_game.uname, db_game.upwd)

var db_auth = GameConf.auth_database;
MySqlAuth.connect(db_auth.host, db_auth.port, db_auth.db_name, db_auth.uname, db_auth.upwd)

//匹配场
MatchManager.getInstance().start_match()

//test
/*
let obj1 = {
    ["h"] :1,
    ["c"] :2,
    ["v"] :"333",
    ["000000"] :"@",
    333333: 44444,
    ["boj"]:{
        [1]:1,
        [3]:2222,
        [6]:3333,
    },
}

let obj2 = {
    ["0"] :7,
    ["3"] :8,
    ["6"] :9,
    ["a"] :"empty",
}

let obj = ArrayUtil.ObjCat(obj1, obj2)
console.log("hcc>>>obj: " , obj)
*/
/*
let array = [];
array.push(1)
array.push(3)
array.push(5)
array.push(6)
array.forEach(value => {
    Log.info("hcc>> value: " , value)
})
*/