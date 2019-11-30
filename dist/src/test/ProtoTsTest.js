"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var protobuf = __importStar(require("protobufjs")); // respectively "./node_modules/protobufjs"
protobuf.load("./proto/protobufMsg.proto", function (err, root) {
    if (err) {
        console.log("err:", err);
        return;
    }
    console.log("root: ", root);
    // const AwesomeMessage = root.lookupType("AuthProto.LoginReq");
    // const AwesomeMessage = root.lookupType("AuthProto.LoginReq.accc");
    // const AwesomeMessage = root.lookup("AuthProto.LoginReq.accc");
    var AwesomeMessage = root.lookup("AuthProto.LoginReq");
    console.log("lookup: ", AwesomeMessage);
    var body = {
        name: "huangshucheng tcpsocket",
        age: 27,
        email: "827773271@qq.com"
    };
    var message = AwesomeMessage.create(body);
    console.log("message = " + JSON.stringify(message));
    var buffer = AwesomeMessage.encode(message).finish();
    console.log("buffer = " + Array.prototype.toString.call(buffer));
    var decoded = AwesomeMessage.decode(buffer);
    console.log("decoded = " + JSON.stringify(decoded));
});
//# sourceMappingURL=ProtoTsTest.js.map