"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var Log_1 = __importDefault(require("../utils/Log"));
var table = (_a = {},
    _a["a"] = 111,
    _a["b"] = 0.52,
    _a["n"] = false,
    _a["hhh"] = "eee",
    _a);
Log_1["default"].info("hccccc info", 111111, 222222, [1, 2, 3, 4]);
Log_1["default"].warn("hccccc warn", table);
Log_1["default"].error("hccccc error");
console.log("cccccccccccccccccccccc");
//# sourceMappingURL=test_log4_gf.js.map