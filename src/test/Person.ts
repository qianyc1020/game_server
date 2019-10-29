// 定义类
class Person {
    // 成员变量
    name: string;
    age: number;

    // 构造函数
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // 成员方法
    say(): void {
        console.log('姓名：' + this.name + '，年龄：' + this.age);
    }
}

// 实例化
let person = new Person('temptation', 18);
person.say();