# 프로토타입(Prototype)

> 자바스크립트는 클래스 기반 언어와는 다르게 프로토타입 기반 언어.  
> ECMAScript2015(ES6)에서 추가된 클래스는 문법적인 양념일 뿐, 여전히 프로토타입 언어.

- `constructor`

```javascript
//constructor.name 예제
function Me(lname, age) {
  this.lname = lname;
  this.age = age;
}

const seo = new Me("Seo", 90);
const jang = new Me("Jang", 10);

console.log(seo); //Me { lname: 'Seo', age: 90 }
console.log(jang); //Me { lname: 'Jang', age: 10 }

console.log(seo.constructor.name); //Me
console.log(jang.constructor.name); //Me
```

```javascript
//constructor.name, instanceof를 통한 프로토타입 확인
const obj = {};
const arr = [];
const func = function () {};
const str = "str";

console.log(obj.constructor.name); //Object
console.log(arr.constructor.name); //Array
console.log(func.constructor.name); //Function
console.log(str.constructor.name); //String
//사실은 이러한 값들이 프로토타입을 통해서 생성된 것들이라는 것을 유추할 수 있음

console.log(obj instanceof Object); //true
console.log(arr instanceof Array); //true
console.log(func instanceof Function); //true
console.log(str instanceof String); //false //래퍼(Wrapper)로 만들지 않아서 false //`new String("str")`방식으로 만들면 true
```

- `_proto_`,`Object.getPrototypeOf`, `Object.setPrototypeOf`

> 프로토타입을 확인하거나 조작하고 싶을 때 사용.  
> `_proto_`는 비표준이며 브라우저 및 자바스크립트 엔진에서 추천되지 않으므로, 표준 문법인`Object.getPrototypeOf`, `Object.setPrototypeOf`를 사용할 것이 권장됨.

## 1. 프로토타입 체인(chaining, 연결)

> **(ex1)**array는 Array 프로토타입이면서 동시에 Object 프로토타입이다. 즉 array > Array > Object로 체이닝.  
> **(ex2)**`[B] = Object.create([A])`와 같은 방식을 통해 A와 B를 체이닝.

```javascript
const animal = {
  sayName() {
    return "ANIMAL";
  },
};
console.log(animal.sayName()); //ANIMAL

const dog = Object.create(animal);
console.log(dog.sayName()); //ANIMAL
```

## 2. 프로토타입 확장(extends, 상속)

> ES6부터는 클래스의 개념이 들어왔기 때문에 클래스를 통한 확장이 권장됨.

```javascript
//Super Class(부모)
function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
}

Animal.prototype.getInfo = function () {
  return this.name + "가 " + this.sound + "소리를 낸다.";
};

//Sub Class(자식)로 확장
function Pet(name, sound) {
  Animal.call(this, name, sound);
}

//프로토타입 체이닝
Pet.prototype = Object.create(Animal.prototype);

const dog = new Pet("개", "멍멍");
const cat = new Pet("고양이", "야옹");

console.log(dog.getInfo()); //개가 멍멍소리를 낸다.
console.log(cat.getInfo()); //고양이가 야옹소리를 낸다.

console.log(dog.constructor.name); //Animal
Pet.prototype.constructor = Pet; //생성자 이름 조작
console.log(dog.constructor.name); //Pet

console.log(dog instanceof Pet); //true
console.log(dog instanceof Animal); //true
```
