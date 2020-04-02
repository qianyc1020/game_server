"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var os_1 = __importDefault(require("os"));
var Platform = /** @class */ (function () {
    function Platform() {
    }
    Platform.isWin32 = function () {
        return os_1["default"].platform() == "win32";
    };
    Platform.isLinux = function () {
        return os_1["default"].platform() == "linux";
    };
    Platform.getLocalIP = function () {
        var interfaces = os_1["default"].networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
        return "";
    };
    return Platform;
}());
exports["default"] = Platform;
//////////
// export default Platform;
// 这么写， import Platform from "../utils/Platform" 不带default
// 这么写， var Platform = require("../utils/Platform") 带default
///////////
// export default class Platform{}
//这么写  import Platform from "../utils/Platform" 不带default
// 这么写， var Platform = require("../utils/Platform") 带default
//# sourceMappingURL=Platform.js.map