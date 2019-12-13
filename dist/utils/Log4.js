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
var log4js_1 = require("log4js");
var util = __importStar(require("util"));
var logger = log4js_1.getLogger(">");
// logger.level = 'debug';
// logger.level = 'info';
logger.level = 'all';
var Log4 = /** @class */ (function () {
    function Log4() {
    }
    Log4.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var msg = util.format.apply(util, __spreadArrays([message], args));
        logger.info(Log4.get_info(), msg);
    };
    Log4.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var msg = util.format.apply(util, __spreadArrays([message], args));
        logger.error(Log4.get_info(), msg);
    };
    Log4.warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var msg = util.format.apply(util, __spreadArrays([message], args));
        logger.warn(Log4.get_info(), msg);
    };
    Log4.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var msg = util.format.apply(util, __spreadArrays([message], args));
        logger.debug(Log4.get_info(), msg);
    };
    Log4.fatal = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var msg = util.format.apply(util, __spreadArrays([message], args));
        logger.debug(Log4.get_info(), msg);
    };
    Log4.newPrepareStackTrace = function (error, structuredStack) {
        return structuredStack;
    };
    //获取堆栈信息
    Log4.get_info = function () {
        var oldPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = Log4.newPrepareStackTrace;
        var structuredStack = new Error().stack;
        Error.prepareStackTrace = oldPrepareStackTrace;
        var caller = structuredStack[2];
        var lineSep = process.platform == 'win32' ? '\\' : '/';
        var fileNameSplited = caller.getFileName().split(lineSep);
        var fileName = fileNameSplited[fileNameSplited.length - 1];
        var lineNumber = caller.getLineNumber();
        var output = util.format('%s(%d) ', fileName, lineNumber);
        return output;
    };
    return Log4;
}());
exports["default"] = Log4;
//# sourceMappingURL=Log4.js.map