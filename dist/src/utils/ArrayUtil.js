"use strict";
exports.__esModule = true;
var ArrayUtil = /** @class */ (function () {
    function ArrayUtil() {
    }
    ArrayUtil.ArrayRemove = function (array, obj) {
        var idx = array.indexOf(obj);
        if (idx > -1) {
            array.splice(idx, 1);
            return true;
        }
        return false;
    };
    ArrayUtil.GetArrayLen = function (array) {
        var count = 0;
        for (var key in array) {
            count++;
        }
        return count;
    };
    return ArrayUtil;
}());
exports["default"] = ArrayUtil;
//# sourceMappingURL=ArrayUtil.js.map