class TimeUtil{
    // 返回当前的时间戳，单位是秒
    static timestamp() {
        var date = new Date();
        var time = Date.parse(date.toString()); // 1970到现在过去的毫秒数
        time = time / 1000;
        return time;
    }

    // 时间戳是秒，Date是毫秒
    static timestamp2date(time) {
        var date = new Date();
        date.setTime(time * 1000);
        return [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
    }

    // "2017-06-28 18:00:00"
    static date2timestamp(strtime)  {
        var date = new Date(strtime.replace(/-/g, '/'));
        var time = Date.parse(date.toString());
        return (time / 1000);
    }

    // 今天00:00:00的时间戳
    static timestamp_today() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var time = Date.parse(date.toString()); // 1970到现在过去的毫秒数
        time = time / 1000;
        return time;
    }
    //
    static timestamp_yesterday() {
        var time = TimeUtil.timestamp_today();
        return (time - 24 * 60 * 60)
    }

    // 获取当前时间(精确到毫秒)
    static get_cur_time() {
        var now = new Date();
        // 获取当前完整年份
        var getFullYear = now.getFullYear();
        // 获取当前月份
        var getMonth = now.getMonth()+1;
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
        var timeStr = getFullYear + "" + getMonth + "" + getDate + " " + getHours + ":" + getMinutes + ":" + getSeconds + ' ' + getMilliseconds
        return timeStr
    }
}

export default TimeUtil;
// module.exports = TimeUtil;