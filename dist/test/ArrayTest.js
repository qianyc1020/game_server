"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Log_1 = __importDefault(require("../utils/Log"));
var array = {};
array[0] = "0000";
array[1] = 123;
array[2] = "4545646";
array[3] = null;
array[100] = 999;
// array.splice(0,1)
console.log(array[0]);
console.log(array.length);
console.log(array);
console.log('------------');
delete array[2];
console.log(array);
var sites = {
    site1: "Runoob",
    site2: "Google"
};
// 访问对象的值
console.log(sites.site1);
console.log(sites.site2);
console.log('------------');
var obj_test = {};
var key = "lv_";
var num = 111;
var key_str = key + String(num);
obj_test[1] = 1;
//  obj_test[key_str] = 3;
if (obj_test[key_str]) {
}
else {
    // obj_test[key_str] = 0;
    // obj_test.key_str = 0
}
Log_1["default"].info(obj_test);
var arraytest = [1, 2, 3, 4, 5];
if (arraytest.indexOf(8) != -1) {
    Log_1["default"].info("have 0000");
}
else {
    Log_1["default"].info("not have 0000");
}
Log_1["default"].info(arraytest.indexOf(0));
Log_1["default"].info(arraytest.indexOf(2));
//# sourceMappingURL=ArrayTest.js.map