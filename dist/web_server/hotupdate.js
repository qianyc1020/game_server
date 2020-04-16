"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var crypto = __importStar(require("crypto"));
var Log_1 = __importDefault(require("../utils/Log"));
var static_hotupdate_path = "./hotupdate";
var hotUpdate = /** @class */ (function () {
    function hotUpdate() {
    }
    hotUpdate.checkDirExist = function () {
        if (!fs.existsSync(static_hotupdate_path)) {
            Log_1["default"].info("hotupdate foled not found");
            return false;
        }
        return true;
    };
    hotUpdate.readDir = function (dir, obj) {
        if (!hotUpdate.checkDirExist()) {
            return;
        }
        var file_num = 0;
        var stat = fs.statSync(dir);
        if (!stat.isDirectory()) {
            return;
        }
        var subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
        for (var i = 0; i < subpaths.length; ++i) {
            if (subpaths[i][0] === '.') {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory()) {
                hotUpdate.readDir(subpath, obj);
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
                var out_dir = dir.replace(/\\/g, '/');
                obj[relative] = {
                    'md5': md5,
                    'file': relative,
                    'dir': out_dir
                };
                file_num++;
                if (compressed) {
                    obj[relative].compressed = true;
                }
            }
        }
    };
    return hotUpdate;
}());
exports["default"] = hotUpdate;
var obj = {};
process.chdir("./www_root");
Log_1["default"].info("dir: ", process.cwd());
hotUpdate.readDir("hotupdate/res", obj);
hotUpdate.readDir("hotupdate/src", obj);
Log_1["default"].info("hcc>>obj:", obj);
var str = JSON.stringify(obj);
fs.writeFile("./hotupdate/hotupdate.json", str, null, function (error) {
    if (error) {
        Log_1["default"].error("hcc>>error111: ", error);
        return;
    }
    Log_1["default"].info("hcc>>success111");
});
str = "var hotupdate = \n" + str + "\nmodule.exports = hotupdate";
fs.writeFile("./hotupdate/hotupdate.js", str, null, function (error) {
    if (error) {
        Log_1["default"].error("hcc>>error222: ", error);
        return;
    }
    Log_1["default"].info("hcc>>success222");
});
//# sourceMappingURL=HotUpdate.js.map