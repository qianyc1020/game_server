import Platform from "../utils/Platform";

import * as mysql from "mysql"

var localhost = "127.0.0.1"

if(Platform.isWin32()){
	localhost = "127.0.0.1"
}else if(Platform.isLinux()){
	localhost = "172.16.166.106"
}

let auth_server = {
    host: localhost,
    port: 3306,
    db_name: "auth_center",
    uname: "root",
    upwd: "123456",
}

var connection = mysql.createConnection({
  host     : auth_server.host,
  port     : auth_server.port,
  user     : auth_server.uname,
  password : auth_server.upwd,
  database : auth_server.db_name,
});

connection.connect(function(err:any) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected success!!! id ' + connection.threadId);
  
  let sql = "select * from uinfo where uid = 1"
  connection.query(sql, function (error:any, results:any, fields:any) {
      if (error){
          console.log(error);
          return;
      }
      console.log("hcc>>result: ",results)
  });

});