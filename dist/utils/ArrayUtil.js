"use strict";
exports.__esModule = true;
var ArrayUtil = /** @class */ (function () {
    function ArrayUtil() {
    }
    //删除数组[]内元素，不适用对象{}
    ArrayUtil.ArrayRemove = function (array, obj) {
        if (Array.isArray(array)) {
            var idx = array.indexOf(obj);
            if (idx > -1) {
                array.splice(idx, 1);
                return true;
            }
        }
        return false;
    };
    //获取对象{},或者数组[],的长度
    ArrayUtil.GetArrayLen = function (array) {
        var count = 0;
        for (var key in array) {
            count++;
        }
        return count;
    };
    //合并两个{}对象
    ArrayUtil.ObjCat = function (obj1, obj2) {
        var outObj = ArrayUtil.ObjClone(obj1);
        for (var key in obj2) {
            outObj[key] = obj2[key];
        }
        return outObj;
    };
    // js 对象 clone 方法
    ArrayUtil.ObjClone = function (obj) {
        var copy = {};
        for (var attr in obj) {
            copy[attr] = typeof (obj[attr]) === 'object' ? this.ObjClone(obj[attr]) : obj[attr];
        }
        return copy;
    };
    return ArrayUtil;
}());
exports["default"] = ArrayUtil;
//# sourceMappingURL=ArrayUtil.js.map