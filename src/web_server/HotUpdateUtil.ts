import * as fs from 'fs';
import * as path from 'path';
import * as crypto from "crypto";
import Log from '../utils/Log';

let static_hotupdate_path = "./hotupdate";

class HotUpdateUtil {

    private static readonly Instance: HotUpdateUtil = new HotUpdateUtil();

    constructor(){
        this.init();
    }

    public static getInstance() {
        return HotUpdateUtil.Instance;
    }

    init(){
        process.chdir("./www_root"); //工作目录修改为./www_root
    }

    checkDirExist():boolean{
        if (!fs.existsSync(static_hotupdate_path)) {
            return false;
        }
        return true;
    }

    mkdirSync(path:string) {
        try {
            fs.mkdirSync(path);
        } catch (e) {
            if (e.code != 'EEXIST') throw e;
        }
    }

    readDir(dir:any, obj:any) {
        if(!this.checkDirExist()){
            Log.error("hotupdate foled not found:", static_hotupdate_path);
            return;
        }

        let stat:any = fs.statSync(dir);
        if (!stat.isDirectory()) {
            return;
        }

        let subpaths:any = fs.readdirSync(dir), subpath, size, md5, compressed, relative;

        for (let i = 0; i < subpaths.length; ++i) {
            if (subpaths[i][0] === '.') {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory()) {
                this.readDir(subpath, obj);
            }
            else if (stat.isFile()) {
                // Size in Bytes
                size = stat['size'];
                md5 = crypto.createHash('md5').update(fs.readFileSync(subpath)).digest('hex');
                compressed = path.extname(subpath).toLowerCase() === '.zip';
    
                // relative = path.relative(src, subpath);
                relative = subpath;
                relative = relative.replace(/\\/g, '/');
                relative = encodeURI(relative);
    
                let out_dir = dir.replace(/\\/g, '/');
                obj[relative] = {
                    'md5' : md5,
                    'file': relative,
                    'dir': out_dir,
                };
    
                if (compressed) {
                    obj[relative].compressed = true;
                }
            }
        }
    }
}

export default HotUpdateUtil;