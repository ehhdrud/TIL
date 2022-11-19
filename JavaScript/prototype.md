# 프로토타입(Prototype)

자바스크립트는 클래스 기반 언어가 아닌 프로토타입 기반 언어이다. ES6에서 추가된 클래스는 문법적인 양념일 뿐, 여전히 프로토타입 언어이다.

하지만 클래스가 도입되고 그 편의성으로 인해 프로토타입 문법은 잘 사용되진 않지만 프로토타입의 이해를 위해 알아두는 것이 좋다.

- `Object.getPrototypeOf`, `Object.setPrototypeOf`: 프로토타입을 확인하거나 조작하고 싶을 때 사용한다.
- `constructor` 속성: 어떤 생성자 객체를 통해 생겨난 인스턴스인지를 알려주는 역할을 한다.

```js
//constructor 예제
function Me(lastName, age) {
  this.lastName = lastName;
  this.age = age;
}

const dongkyeong = new Me("Seo", 28);
const hyangja = new Me("Kim", 55);

console.log(dongkyeong); //Me { lastName: 'Seo', age: 28 }
console.log(hyangja); //Me { lastName: 'Kim', age: 55 }

console.log(dongkyeong.constructor.name); //Me
console.log(hyangja.constructor.name); //Me
```

```js
//constructor.name, instanceof를 통한 프로토타입 확인 방법
const obj = {};
const arr = [];
const func = function () {};
const str = "str";

console.log(obj.constructor.name); //Object
console.log(arr.constructor.name); //Array
console.log(func.constructor.name); //Function
console.log(str.constructor.name); //String
//사실은 이러한 값들이 프로토타입을 통해서 생성된 것들이라는 것을 유추할 수 있다.

console.log(obj instanceof Object); //true
console.log(arr instanceof Array); //true
console.log(func instanceof Function); //true
console.log(str instanceof String); //false //래퍼(Wrapper)로 만들지 않아서 false! //new String("str") 방식으로 만들면 true가 출력된다.
```

## 1. 프로토타입 체인(연결)

**[ex1]** array는 Array 프로토타입이면서 동시에 Object 프로토타입이다. 즉 array → Array → Object로 체이닝된다.  
**[ex2]** `B = Object.create(A)`와 같은 방식을 통해 A와 B를 체이닝할 수 있다.

```js
const animal = {
  sayName() {
    return "ANIMAL";
  },
};
console.log(animal.sayName()); //ANIMAL

const dog = Object.create(animal);
console.log(dog.sayName()); //ANIMAL
```

## 2. 프로토타입 확장(상속)

```js
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
