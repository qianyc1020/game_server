var proto_path = "../proto/GameEcho.proto"
var Log = require("../utils/Log")
var protobuf = require("protobufjs")
var Stype = require("../apps/Stype")

var ProtoMsg = require("../proto/protobufMsg")

Log.info("Stype: " , Stype)

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
Log.error(error)
var msg = msgType.create(body)
var encodeMsg = msgType.encode(msg).finish()
var decodeMsg = msgType.decode(encodeMsg)

Log.info("decode: " , JSON.stringify(decodeMsg))

