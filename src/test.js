const http = require('http')
const server = http.createServer()

server.on("request",function(req,res){
	res.writeHeader(200,{
	'Content-type':'text/html;charset=utf8'
	});
	res.end("hcc server is started");
	console.log("hcc req");

})

server.on("close",function(){
	console.log("hcc server is closed");
});

server.listen(6080,function(){
	console.log("hcc server is running at port 6080");
})
