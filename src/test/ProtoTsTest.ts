import * as protobuf from "protobufjs"; // respectively "./node_modules/protobufjs"

protobuf.load("./proto/protobufMsg.proto", function(err:any, root:any) {
    if (err){
        console.log("err:" , err)
        return
    }

    console.log("root: " , root)
    // const AwesomeMessage = root.lookupType("AuthProto.LoginReq");
    // const AwesomeMessage = root.lookupType("AuthProto.LoginReq.accc");
    // const AwesomeMessage = root.lookup("AuthProto.LoginReq.accc");
    const AwesomeMessage = root.lookup("AuthProto.LoginReq");
    console.log("lookup: " , AwesomeMessage)
    var body = {
		name: "huangshucheng tcpsocket",
		age: 27,
		email : "827773271@qq.com",
	}
    let message = AwesomeMessage.create(body);
    console.log(`message = ${JSON.stringify(message)}`);
    let buffer = AwesomeMessage.encode(message).finish();
    console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);
    let decoded = AwesomeMessage.decode(buffer);
    console.log(`decoded = ${JSON.stringify(decoded)}`);
});