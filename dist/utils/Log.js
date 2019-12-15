"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var util = __importStar(require("util"));
// log level
var LEVEL = {
    ALL: Infinity,
    INFO: 3,
    WARN: 2,
    ERROR: 1,
    NONE: -Infinity
};
// log color
var COLOR = {
    RESET: '\u001b[0m',
    INFO: '\u001b[32m',
    WARN: '\u001b[33m',
    ERROR: '\u001b[31m' // red
};
// global log level
var globalLevel = LEVEL.ALL;
// whether log output should be colored
var coloredOutput = true;
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.setLevel = function (level) {
        globalLevel = level;
    };
    Log.setColoredOutput = function (bool) {
        coloredOutput = bool;
    };
    Log.info = function (format) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (LEVEL.INFO <= globalLevel) {
            Log._log(LEVEL.INFO, util.format.apply(util, __spreadArrays([format], param)));
        }
    };
    Log.warn = function (format) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (LEVEL.WARN <= globalLevel) {
            Log._log(LEVEL.WARN, util.format.apply(util, __spreadArrays([format], param)));
        }
    };
    Log.error = function (format) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (LEVEL.ERROR <= globalLevel) {
            Log._log(LEVEL.ERROR, util.format.apply(util, __spreadArrays([format], param)));
        }
    };
    Log.newPrepareStackTrace = function (error, structuredStack) {
        return structuredStack;
    };
    // 获取当前时间(精确到毫秒)
    Log.get_cur_time = function () {
        var now = new Date();
        var getFullYear = now.getFullYear();
        var getMonth = now.getMonth() + 1;
        var getDate = now.getDate();
        var getHours = now.getHours();
        var getMinutes = now.getMinutes();
        var getSeconds = now.getSeconds();
        var getMilliseconds = now.getMilliseconds();
        var timeStr = getFullYear + "" + getMonth + "" + getDate + " " + getHours + ":" + getMinutes + ":" + getSeconds + ' ' + getMilliseconds;
        return timeStr;
    };
    Log._log = function (level, message) {
        var oldPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = Log.newPrepareStackTrace;
        var structuredStack = new Error().stack;
        Error.prepareStackTrace = oldPrepareStackTrace;
        var caller = structuredStack[2];
        var lineSep = process.platform == 'win32' ? '\\' : '/';
        var fileNameSplited = caller.getFileName().split(lineSep);
        var fileName = fileNameSplited[fileNameSplited.length - 1];
        var lineNumber = caller.getLineNumber();
        var columnNumber = caller.getColumnNumber();
        var curTime = Log.get_cur_time();
        // var functionName = caller.getFunctionName();
        // console.log("fileName:" , fileName)
        var levelString;
        switch (level) {
            case LEVEL.INFO:
                levelString = '[INFO]';
                break;
            case LEVEL.WARN:
                levelString = '[WARN]';
                break;
            case LEVEL.ERROR:
                levelString = '[ERROR]';
                break;
            default:
                levelString = '[]';
                break;
        }
        var output = util.format('%s%s %s(%d) %s', curTime, levelString, fileName, lineNumber, message);
        if (!coloredOutput) {
            //process.stdout.write(output + '\n');
            console.log(output);
        }
        else {
            switch (level) {
                case LEVEL.INFO:
                    // process.stdout.write(COLOR.INFO + output + COLOR.RESET + '\n');
                    console.log(COLOR.INFO, output, COLOR.RESET);
                    break;
                case LEVEL.WARN:
                    // process.stdout.write(COLOR.WARN + output + COLOR.RESET + '\n');
                    console.log(COLOR.WARN, output, COLOR.RESET);
                    break;
                case LEVEL.ERROR:
                    // process.stdout.write(COLOR.ERROR + output + COLOR.RESET + '\n');
                    console.log(COLOR.ERROR, output, COLOR.RESET);
                    break;
                default:
                    break;
            }
        }
    };
    return Log;
}());
exports["default"] = Log;
//# sourceMappingURL=Log.js.map