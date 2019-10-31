"use strict";
// 定义类
var Person = /** @class */ (function () {
    // 构造函数
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    // 成员方法
    Person.prototype.say = function () {
        console.log('姓名：' + this.name + '，年龄：' + this.age);
    };
    return Person;
}());
// 实例化
var person = new Person('temptation', 18);
person.say();
console.log('cccccccccccccccc');
//# sourceMappingURL=Person.js.map