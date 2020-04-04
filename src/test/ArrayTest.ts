import Log from '../utils/Log';
var array:any = {};


array[0] = "0000"
array[1] = 123
array[2] = "4545646"
array[3] = null
array[100] = 999



// array.splice(0,1)
console.log(array[0])
console.log(array.length)
console.log(array)

console.log('------------')
delete array[2]
console.log(array)


var sites = { 
    site1:"Runoob", 
    site2:"Google" 
 }; 
 // 访问对象的值
 console.log(sites.site1) 
 console.log(sites.site2)

 console.log('------------')

 let obj_test:any = {}
 let key = "lv_"
 let num = 111;
 let key_str:string = key + String(num);

 obj_test[1] = 1;
//  obj_test[key_str] = 3;
 
 if(obj_test[key_str]){

 }else{
    // obj_test[key_str] = 0;
    // obj_test.key_str = 0
 }

 Log.info(obj_test);