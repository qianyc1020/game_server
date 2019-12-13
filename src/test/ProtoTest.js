var proto_path = "../proto/GameEcho.proto"
var protobuf = require("protobufjs")
var Stype = require("../apps/Stype")
var ProtoMsg = require("../proto/protobufMsg")

var Stype = {
    [0] : "GameTalkRoom",
    [1] : "GameEacho",
}

var CmdName = {
    [1] : "EchoReq",
}

var body = {
    name:"hcc",
    age: 27,
    email:"827773271@qq.com",
}

// var msgType =  ProtoMsg["GameEacho"]["EchoReq"]
var msgType =  ProtoMsg[Stype[1]][CmdName[1]]
var error = msgType.verify(body)
console.error(error)
var msg = msgType.create(body)
var encodeMsg = msgType.encode(msg).finish()
var decodeMsg = msgType.decode(encodeMsg)

console.info("decode: " , JSON.stringify(decodeMsg))

