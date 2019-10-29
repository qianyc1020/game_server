// const http = require('http')

import * as http from "http"
const server = http.createServer()

var index = 1
server.on("request",function(req,res){
	res.writeHeader(200,{
	'Content-type':'text/html;charset=utf8'
	});
	res.end("hcc server is started at 6080");
	index++;
	console.log("hcc req count: " + index);
})

server.on("close",function(){
	console.log("hcc server is closed");
});

server.listen(6091,function(){
	console.log("hcc http ts server is running at port 6091");
})

console.log("http ts")