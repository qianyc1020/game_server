const http = require('http')
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

server.listen(6090,function(){
	console.log("hcc http js server is running at port 6090");
})

console.log("http js start")