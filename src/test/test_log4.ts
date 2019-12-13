import { configure, getLogger } from 'log4js';
import Log4 from '../utils/Log4';

// configure('./filename');
const logger = getLogger("[test_log4.ts]");
// logger.level = 'debug';
// logger.level = 'info';
// logger.level = 'all';
logger.debug("debug>> Some debug messages hcccc111");


// Log4.get_info();
// Log4.getCallerFileNameAndLine()

// configure({
// 	appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
// 	categories: { default: { appenders: ['cheese'], level: 'error' , enableCallStack: true } }
// });

/*
  dateFile，根据时间保存文件位置，文件自动创建
 */
// configure({
// 	appenders:[{
// 	  type: 'dateFile',
// 	  //文件名为= filename + pattern, 设置为alwaysIncludePattern：true
// 	  filename: '234',
// 	  pattern: '-yyyy-MM-dd.log',
// 	  //包含模型
// 	  alwaysIncludePattern: true,
// 	}]
//   })

// logger.debug("debug>> Some debug messages hcccc");
// // logger.trace('trace>> cheese testing');
// logger.debug('debug>> cheese.');
// logger.info('info>> Cheese is Comté.');
// logger.warn('warn>> Cheese is quite smelly.');
// logger.error('error>> Cheese is too ripe!');
// logger.fatal('fatal>> Cheese was breeding ground for listeria.');
// Log4.info("log4.infoooooo")

// function newPrepareStackTrace(error:any, structuredStack:any) {
//     return structuredStack;
// }

// function newPrepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]) {
//     return structuredStack;
// }

// function newPrepareStackTrace(err:any, stackTraces:any) {
//     return structuredStack;
// }

// var oldPrepareStackTrace = Error.prepareStackTrace;
// Error.prepareStackTrace = newPrepareStackTrace
// var structuredStack:any = new Error().stack;
// Error.prepareStackTrace = oldPrepareStackTrace;
// var caller = structuredStack[2];

// var lineSep = process.platform == 'win32' ? '\\' : '/';
// var fileNameSplited = caller.getFileName().split(lineSep);
// var fileName = fileNameSplited[fileNameSplited.length - 1];
// var lineNumber = caller.getLineNumber();

// console.info("filename: " , fileName , " ,lineNumber: " , lineNumber)

console.info("1111111")

Log4.info("huangshucheng", 1,2,3)
Log4.error("huangshucheng", 1,2,3, "error",null , undefined ,"ddd")