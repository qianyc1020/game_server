class GameStaticDefine {
    
    //小球转换类型
    static BALL_UPDATE_TYPE = {
        SELL_TYPE:      0,  //卖了
        COMPOSE_TYPE:   1,  //合成,三个一合成
        GIVE_TYPE:      2,  //赠送
    }

    //小球在数据库中保存的字段: "lv_1=1&lv_2=2"
    static BALL_SAVE_KEY_STR = "lv_";

    //小球合成所需个数
    static BALL_COPOSE_NUM = 3;
}

export default GameStaticDefine;