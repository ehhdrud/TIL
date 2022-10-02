# 클래스(Class)

클래스 선언은 프로토타입 기반 상속을 사용하여 주어진 이름의 새로운 클래스를 만든다.

클래스도 사실 하나의 "특별한 함수"이며 함수처럼 선언식, 표현식이라는 2가지 방식으로 정의할 수 있다. 또한 함수와 마찬가지로 `new`연산자를 통한 정의도 가능하다.

클래스에서 `constructor`메서드는 클래스의 인스턴스 객체를 생성하고 초기화한다.

```javascript
//선언식
class Person {
  constructor(name) {
    this.name = name;
  }
}

//표현식
let Animal = class {
  constructor(name) {
    this.name = name;
  }
};

//new를 통한 정의
class Dinosaur {
  constructor(name) {
    this.name = name;
  }
}
const dino = new Dinosaur();
```

```javascript
//메서드 추가
class Person {
  constructor(name, age, location) {
    this.name = name;
    this.age = age;
    this.location = location;
  }
  getInfo() {
    return (
      this.location + "에 거주하는 " + this.age + "살 " + this.name + "입니다."
    );
  }
}

const person1 = new Person("서동경", 28, "YongSan");
const person2 = new Person("곽대철", 31, "NorthKorea");

console.log(person1.getInfo()); //YongSan에 거주하는 28살 서동경입니다.
console.log(person2.getInfo()); //NorthKorea에 거주하는 31살 곽대철입니다.
```

## 클래스 확장(extends, 상속)

```javascript
//Super Class(부모)
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  getInfo() {
    return this.name + "가 " + this.sound + "소리를 낸다.";
  }
}

//Sub Class(자식)로 확장
class Pet extends Animal {
  constructor(name, sound) {
    super(name, sound);
  }
}

const dog = new Pet("개", "멍멍");
const cat = new Pet("고양이", "야옹");

console.log(dog.getInfo()); //개가 멍멍소리를 낸다.
console.log(cat.getInfo()); //고양이가 야옹소리를 낸다.

console.log(dog.constructor.name); //Pet //프로토타입 체이닝과 다르게 Pet에서 파생.

console.log(dog instanceof Pet); //true
console.log(dog instanceof Animal); //true
```
