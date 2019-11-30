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
    return ArrayUtil;
}());
exports["default"] = ArrayUtil;
//# sourceMappingURL=ArrayUtil.js.map