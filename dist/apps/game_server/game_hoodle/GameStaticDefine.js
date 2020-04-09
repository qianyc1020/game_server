"use strict";
exports.__esModule = true;
var GameStaticDefine = /** @class */ (function () {
    function GameStaticDefine() {
    }
    //小球转换类型
    GameStaticDefine.BALL_UPDATE_TYPE = {
        SELL_TYPE: 0,
        COMPOSE_TYPE: 1,
        GIVE_TYPE: 2
    };
    //小球在数据库中保存的字段: "lv_1=1&lv_2=2"
    GameStaticDefine.BALL_SAVE_KEY_STR = "lv_";
    //小球合成所需个数
    GameStaticDefine.BALL_COPOSE_NUM = 2;
    return GameStaticDefine;
}());
exports["default"] = GameStaticDefine;
//# sourceMappingURL=GameStaticDefine.js.map