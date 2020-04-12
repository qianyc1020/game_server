"use strict";
exports.__esModule = true;
var GameHoodleConfig = /** @class */ (function () {
    function GameHoodleConfig() {
    }
    GameHoodleConfig.KW_PROP_ID_BALL = 10001; //弹珠道具ID
    GameHoodleConfig.KW_BORN_EXP = 0; //出生经验
    GameHoodleConfig.KW_BORN_CHIP = 10000; //出生金币
    GameHoodleConfig.KW_BORN_USER_BALL = "lv_1=3&lv_2=3&lv_3=3&lv_4=3&lv_5=3&lv_6=2&lv_7=2&lv_8=2&lv_9=2"; //出生小球个数
    GameHoodleConfig.KW_WIN_RATE = 100; //输赢分数* 金币数
    GameHoodleConfig.KW_MIN_GOLD_ENTER_ROOM = 300; //最少进入房间金币
    GameHoodleConfig.KW_IS_GOLD_LIMIT = false; //是否金币不足，禁止加入房间
    //商城配置
    GameHoodleConfig.KW_STORE_LIST_CONFIG = [
        {
            propsvrindex: 10001,
            propid: GameHoodleConfig.KW_PROP_ID_BALL,
            propcount: 1,
            propprice: 10,
            propinfo: JSON.stringify({ level: 1 })
        },
        {
            propsvrindex: 10002,
            propid: GameHoodleConfig.KW_PROP_ID_BALL,
            propcount: 1,
            propprice: 20,
            propinfo: JSON.stringify({ level: 2 })
        },
        {
            propsvrindex: 10003,
            propid: GameHoodleConfig.KW_PROP_ID_BALL,
            propcount: 1,
            propprice: 30,
            propinfo: JSON.stringify({ level: 3 })
        },
        {
            propsvrindex: 10004,
            propid: GameHoodleConfig.KW_PROP_ID_BALL,
            propcount: 1,
            propprice: 2000,
            propinfo: JSON.stringify({ level: 4 })
        },
        {
            propsvrindex: 10005,
            propid: GameHoodleConfig.KW_PROP_ID_BALL,
            propcount: 1,
            propprice: 3000,
            propinfo: JSON.stringify({ level: 5 })
        },
        {
            propsvrindex: 10006,
            propid: GameHoodleConfig.KW_PROP_ID_BALL,
            propcount: 1,
            propprice: 5000,
            propinfo: JSON.stringify({ level: 6 })
        },
    ];
    //小球转换类型
    GameHoodleConfig.BALL_UPDATE_TYPE = {
        SELL_TYPE: 0,
        COMPOSE_TYPE: 1,
        GIVE_TYPE: 2,
        ADD_TYPE: 3,
        REDUCE_TYPE: 4
    };
    //小球在数据库中保存的字段: "lv_1=1&lv_2=2"
    GameHoodleConfig.BALL_SAVE_KEY_STR = "lv_";
    //小球合成所需个数
    GameHoodleConfig.BALL_COPOSE_NUM = 3;
    //房间匹配轮询次数
    GameHoodleConfig.MATCH_INTERVAL = 1000; //1秒匹配一次
    //匹配房间规则
    GameHoodleConfig.MATCH_GAME_RULE = { playerCount: 2, playCount: 3 }; //坐满人数，局数
    return GameHoodleConfig;
}());
exports["default"] = GameHoodleConfig;
//# sourceMappingURL=GameHoodleConfig.js.map