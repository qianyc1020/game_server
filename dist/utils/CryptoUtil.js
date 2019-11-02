"use strict";
exports.__esModule = true;
var crypto = require("crypto"); //导入其他库
var CryptoUtil = /** @class */ (function () {
    function CryptoUtil() {
    }
    CryptoUtil.base64_encode = function (content) {
        var buf = Buffer.from(content);
        var base64 = buf.toString("base64");
        return base64;
    };
    ;
    CryptoUtil.base64_decode = function (content) {
        var buf = Buffer.from(content, "base64");
        return buf;
    };
    CryptoUtil.md5 = function (data) {
        var md5 = crypto.createHash("md5");
        md5.update(data);
        return md5.digest('hex');
    };
    CryptoUtil.sha1 = function (data) {
        var sha1 = crypto.createHash("sha1");
        sha1.update(data);
        return sha1.digest('hex');
    };
    return CryptoUtil;
}());
exports["default"] = CryptoUtil;
//# sourceMappingURL=CryptoUtil.js.map