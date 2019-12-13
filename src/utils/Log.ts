import * as util from 'util';

// log level
var LEVEL:any = {
    ALL: Infinity,
    INFO: 3,
    WARN: 2,
    ERROR: 1,
    NONE: -Infinity
};

// log color
var COLOR:any = {
    RESET: '\u001b[0m',
    INFO: '\u001b[32m', // green
    WARN: '\u001b[33m', // yellow
    ERROR: '\u001b[31m' // red
}

// global log level
var globalLevel = LEVEL.ALL;

// whether log output should be colored
var coloredOutput = true;

class Log {
    static setLevel(level: number) {
        globalLevel = level;
    }
    
    static setColoredOutput(bool: boolean) {
        coloredOutput = bool;
    }
    
    static info(format: any, ...param: any[]) {
        if (LEVEL.INFO <= globalLevel) {
            Log._log(LEVEL.INFO, util.format(format, ...param));
        }
    }
    
    static warn(format: any, ...param: any[]) {
        if (LEVEL.WARN <= globalLevel) {
            Log._log(LEVEL.WARN, util.format(format, ...param));
        }
    }
    
    static error(format: any, ...param: any[]) {
        if (LEVEL.ERROR <= globalLevel) {
            Log._log(LEVEL.ERROR, util.format(format, ...param));
        }
    }
    
    static newPrepareStackTrace(error:any, structuredStack:any) {
        return structuredStack;
    }
    
    // 获取当前时间(精确到毫秒)
    static get_cur_time() {
        var now = new Date();
        var getFullYear     = now.getFullYear();
        var getMonth        = now.getMonth()+1;
        var getDate         = now.getDate();
        var getHours        = now.getHours();
        var getMinutes      = now.getMinutes();
        var getSeconds      = now.getSeconds();
        var getMilliseconds = now.getMilliseconds();
        var timeStr = getFullYear + "" + getMonth + "" + getDate + " " + getHours + ":" + getMinutes + ":" + getSeconds + ' ' + getMilliseconds
        return timeStr
    }

    private static _log(level:number, message:any) {
        var oldPrepareStackTrace:any = Error.prepareStackTrace;
        Error.prepareStackTrace = Log.newPrepareStackTrace;
        var structuredStack:any = new Error().stack;
        Error.prepareStackTrace = oldPrepareStackTrace;
        var caller:any = structuredStack[2];

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
        var output = util.format('%s%s %s(%d) %s', curTime ,levelString, fileName, lineNumber, message);
        if (!coloredOutput) {
            process.stdout.write(output + '\n');
        } else {
            switch (level) {
                case LEVEL.INFO:
                    process.stdout.write(COLOR.INFO + output + COLOR.RESET + '\n');
                    break;
                case LEVEL.WARN:
                    process.stdout.write(COLOR.WARN + output + COLOR.RESET + '\n');
                    break;
                case LEVEL.ERROR:
                    process.stdout.write(COLOR.ERROR + output + COLOR.RESET + '\n');
                    break;
                default:
                    break;
            }
        }
    }

}

export default Log;

