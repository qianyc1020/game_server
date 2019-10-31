"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var Platform = /** @class */ (function () {
    function Platform() {
    }
    Platform.isWin32 = function () {
        return os.platform() == "win32";
    };
    Platform.isLinux = function () {
        return os.platform() == "linux";
    };
    return Platform;
}());
exports.default = Platform;
//////////
// export default Platform;
// 这么写， import Platform from "../utils/Platform" 不带default
// 这么写， var Platform = require("../utils/Platform") 带default
///////////
// export default class Platform{}
//这么写  import Platform from "../utils/Platform" 不带default
// 这么写， var Platform = require("../utils/Platform") 带default
//# sourceMappingURL=Platform.js.map