import HotUpdateUtil from './HotUpdateUtil';
import * as fs from 'fs';
import Log from '../utils/Log';

let hotUpdateMgr = HotUpdateUtil.getInstance();

function hotUpdateStart() {
    let obj:any = {};
    Log.info("dir: ", process.cwd());
    hotUpdateMgr.readDir("hotupdate/", obj);
    // hotUpdateMgr.readDir("hotupdate/src", obj);
    Log.info(obj);

    let str = JSON.stringify(obj);
    fs.writeFile("./hotupdate/manifest.json", str, null, function (error: any) {
        if (error) {
            Log.info("hcc>>generate manifest.json failed: ", error);
            return;
        }
        Log.info("hcc>>generate manifest.json success");
    });

    str = "var manifest = \n" + str + "\nmodule.exports = manifest";
    fs.writeFile("./hotupdate/manifest.js", str, null, function (error: any) {
        if (error) {
            Log.info("hcc>>generate manifest.js failed: " , error);
            return;
        }
        Log.info("hcc>>generate manifest.js success");
    });

}

hotUpdateStart();