"use strict";
exports.__esModule = true;
var TimeUtil = /** @class */ (function () {
    function TimeUtil() {
    }
    // 返回当前的时间戳，单位是秒
    TimeUtil.timestamp = function () {
        var date = new Date();
        var time = Date.parse(date.toString()); // 1970到现在过去的毫秒数
        time = time / 1000;
        return time;
    };
    // 时间戳是秒，Date是毫秒
    TimeUtil.timestamp2date = function (time) {
        var date = new Date();
        date.setTime(time * 1000);
        return [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
    };
    // "2017-06-28 18:00:00"
    TimeUtil.date2timestamp = function (strtime) {
        var date = new Date(strtime.replace(/-/g, '/'));
        var time = Date.parse(date.toString());
        return (time / 1000);
    };
    // 今天00:00:00的时间戳
    TimeUtil.timestamp_today = function () {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var time = Date.parse(date.toString()); // 1970到现在过去的毫秒数
        time = time / 1000;
        return time;
    };
    //
    TimeUtil.timestamp_yesterday = function () {
        var time = TimeUtil.timestamp_today();
        return (time - 24 * 60 * 60);
    };
    // 获取当前时间(精确到毫秒)
    TimeUtil.get_cur_time = function () {
        var now = new Date();
        // 获取当前完整年份
        var getFullYear = now.getFullYear();
        // 获取当前月份
        var getMonth = now.getMonth() + 1;
        // 获取当前日
        var getDate = now.getDate();
        // 获取到当前小时
        var getHours = now.getHours();
        // 获取到当前分钟
        var getMinutes = now.getMinutes();
        // 获取到当前秒
        var getSeconds = now.getSeconds();
        // 获取到当前毫秒：
        var getMilliseconds = now.getMilliseconds();
        var timeStr = getFullYear + "" + getMonth + "" + getDate + " " + getHours + ":" + getMinutes + ":" + getSeconds + ' ' + getMilliseconds;
        return timeStr;
    };
    return TimeUtil;
}());
exports["default"] = TimeUtil;
// module.exports = TimeUtil;
//# sourceMappingURL=TimeUtil.js.map