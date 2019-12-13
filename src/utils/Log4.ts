import { configure, getLogger } from 'log4js';
import * as util from 'util';

const logger = getLogger(">");
// logger.level = 'debug';
// logger.level = 'info';
logger.level = 'all';

class Log4 {

    static info(message: any, ...args: any[]){
        let msg = util.format(message, ...args);
        logger.info(Log4.get_info() , msg);
    }

    static error(message: any, ...args: any[]){
        let msg = util.format(message, ...args);
        logger.error(Log4.get_info(), msg);
    }

    static warn(message: any, ...args: any[]){
        let msg = util.format(message, ...args);
        logger.warn(Log4.get_info(), msg);
    }

    static debug(message: any, ...args: any[]){
        let msg = util.format(message, ...args);
        logger.debug(Log4.get_info(), msg);
    }

    static fatal(message: any, ...args: any[]){
        let msg = util.format(message, ...args);
        logger.debug(Log4.get_info(), msg);
    }

    static newPrepareStackTrace(error:any, structuredStack:any) {
        return structuredStack;
    }

    //获取堆栈信息
    static get_info() {
        var oldPrepareStackTrace:any = Error.prepareStackTrace;
        Error.prepareStackTrace = Log4.newPrepareStackTrace;
        var structuredStack:any = new Error().stack;
        Error.prepareStackTrace = oldPrepareStackTrace;
        var caller:any = structuredStack[2];

        var lineSep = process.platform == 'win32' ? '\\' : '/';
        var fileNameSplited = caller.getFileName().split(lineSep);
        var fileName = fileNameSplited[fileNameSplited.length - 1];
        var lineNumber = caller.getLineNumber();
        var output:string = util.format('%s(%d) ' , fileName, lineNumber);
        return output
    }

}

export default Log4;