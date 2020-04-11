class GameHoodleConfig {

    static KW_BORN_EXP: number              = 0;		//出生经验
    static KW_BORN_CHIP: number             = 1500; 	//出生金币
    static KW_BORN_USER_BALL: string        = "lv_1=3&lv_2=3&lv_3=3&lv_4=3&lv_5=3&lv_6=2&lv_7=2&lv_8=2&lv_9=2"; 		//出生小球个数
    static KW_WIN_RATE: number              = 100; 		//输赢分数* 金币数
    static KW_MIN_GOLD_ENTER_ROOM: number   = 300;      //最少进入房间金币
    static KW_IS_GOLD_LIMIT: boolean        = false; 	//是否金币不足，禁止加入房间

    //小球转换类型
    static BALL_UPDATE_TYPE = {
        SELL_TYPE:      0,  //卖了
        COMPOSE_TYPE:   1,  //合成,三个一合成
        GIVE_TYPE:      2,  //赠送
    }

    //小球在数据库中保存的字段: "lv_1=1&lv_2=2"
    static BALL_SAVE_KEY_STR                = "lv_";

    //小球合成所需个数
    static BALL_COPOSE_NUM                  = 3;

    //房间匹配轮询次数
    static MATCH_INTERVAL                   = 1000;     //1秒匹配一次
    //匹配房间规则
    static MATCH_GAME_RULE                  = { playerCount: 2, playCount: 3 }       //坐满人数，局数

}

export default GameHoodleConfig;