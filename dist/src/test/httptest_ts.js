"use strict";
// const http = require('http')
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var http = __importStar(require("http"));
var server = http.createServer();
var index = 1;
server.on("request", function (req, res) {
    res.writeHeader(200, {
        'Content-type': 'text/html;charset=utf8'
    });
    res.end("hcc server is started at 6080");
    index++;
    console.log("hcc req count: " + index);
});
server.on("close", function () {
    console.log("hcc server is closed");
});
server.listen(6091, function () {
    console.log("hcc http ts server is running at port 6091");
});
console.log("http ts");
//# sourceMappingURL=httptest_ts.js.map