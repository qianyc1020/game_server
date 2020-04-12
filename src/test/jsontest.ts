import Log from "../utils/Log";

let json_str: string = "{propid:1111}";
let json_obj = {propid: 111};
// let json_str: string = "{propid=1111}";
// let json_str: string = "hhhhh:111"

// let res= JSON.stringify(json_obj);
let resObj = JSON.parse("protid:111");

// Log.info(typeof(res) , res)
Log.info(typeof(resObj) , resObj);
