# 프로토타입(Prototype)

자바스크립트는 클래스 기반 언어가 아닌 **프로토타입 기반 언어**이다. ES6에서 추가된 클래스는 문법적인 양념일 뿐, 여전히 프로토타입 언어이다.

프로토타입이란 "원형(유전자)"이라는 뜻으로, 함수 객체에는 프로토타입이라는 특수한 형태의 객체 프로퍼티가 존재한다. 이러한 프로토타입 프로퍼티를 통해 생성자 함수는 인스턴스에게 프로토타입 객체에 있는 데이터, 메서드를 **상속**한다. 즉 클래스가 없는 언어에서 상속을 구현하려는 목적이 있다.

하지만 클래스가 도입되고 그 편의성으로 인해 프로토타입 문법은 잘 사용되진 않지만, 프로토타입은 자바스크립트의 기반이기 때문에 자바스크립트의 이해를 위해 알아두는 것이 좋다.

`Object.getPrototypeOf`를 통해 프로토타입을 확인할 수 있고, `Object.setPrototypeOf`를 통해 프로토타입을 조작할 수도 있다.

> **📌프로토타입❓**
>
> > **👇`constructor.name`을 통한 프로토타입 확인**
> >
> > ```js
> > function Me(lastName, age) {
> >   this.lastName = lastName;
> >   this.age = age;
> > }
> >
> > const dongkyeong = new Me("Seo", 28);
> > const hyangja = new Me("Kim", 55);
> >
> > console.log(dongkyeong); //Me { lastName: 'Seo', age: 28 }
> > console.log(hyangja); //Me { lastName: 'Kim', age: 55 }
> >
> > console.log(dongkyeong.constructor.name); //Me
> > console.log(hyangja.constructor.name); //Me
> > ```
>
> > **👇`instanceof를 이용한 프로토타입 확인`**
> >
> > ```js
> > const obj = {};
> > const arr = [];
> > const func = function () {};
> > const str = "str";
> >
> > console.log(obj.constructor.name); //Object
> > console.log(arr.constructor.name); //Array
> > console.log(func.constructor.name); //Function
> > console.log(str.constructor.name); //String
> > //사실은 이러한 값들이 프로토타입을 통해서 생성된 것들이라는 것을 유추할 수 있다.
> >
> > console.log(obj instanceof Object); //true
> > console.log(arr instanceof Array); //true
> > console.log(func instanceof Function); //true
> > console.log(str instanceof String); //false //래퍼(Wrapper)로 만들지 않아서 false! //new String("str") 방식으로 만들면 true가 출력된다.
> > ```

## 1. 프로토타입 체인과 상속(확장)

모든 함수는 객체이고 객체는 프로토타입을 가지고 있다. 객체가 가진 프로토타입은 프로토타입 객체를 가르키는데, 이 프로토타입 객체는 `constructor`와 `__proto__`(프로토타입 링크)를 가진다. 여기서 constructor는 함수 객체를 가르킨다. 즉 함수 객체와 프로토타입 객체는 서로를 바라보고 있는 관계에 있다.

`new`와 함수 객체(생성자 함수)를 통해 객체를 만들고, 프로토타입 객체에 `constructor`와 `__proto__` 외에 함수를 추가했다고 가정하자. 생성된 객체 역시 `constructor`와 `__proto__`를 가질 것이고 `__proto__`는 생성자 함수가 바라보고 있는 프로토타입 객체를 바라본다. 만들어진 객체에서 프로토타입 객체에 추가한 함수를 호출한다면, 우선 만들어진 객체 내부를 확인하고, 거기에 없다면 `__proto__`를 타고 프로토타입 객체에 있는 함수를 호출할 것이다. 이러한 방식으로 객체와 프로토타입들이 **체이닝**되고 **상속**이 가능해진다. 여기서 자식은 부모로부터 상속을 받는 동시에 본인만의 새로운 기능을 추가할 수 있기 때문에 상속 대신 **확장**이라고 표현하기도 한다.

> **📌*생성자 함수*로 만든 객체로 확장**
>
> ```js
> //생성자 함수 정의
> function Workout(workoutName, sets) {
>   this.workoutName = workoutName;
>   this.sets = sets;
> }
>
> //프로토타입 객체에 함수 추가
> Workout.prototype.classification = function () {
>   console.log(`${this.workoutName}'s classification: Leg`);
> };
>
> //new와 생성자 함수를 이용한 객체 생성
> const squat = new Workout("Squat", 4);
> const legExtension = new Workout("Leg Press", 4);
>
> //생성된 객체가 프로토타입 객체의 함수를 상속받았는지 확인!
> squat.classification(); //Squat's classification: Leg
> legExtension.classification(); //Leg Extension's classification: Leg
> ```

## 2. `Object.create`

지정된 프로토타입 객체 및 속성을 갖는 새 객체를 만들어 명시적인 체이닝이 가능하다.

**📌기본 동작 매커니즘**

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

**📌*자식으로서 확장된 생성자 함수*로 만든 객체로 확장**

```js
//부모 생성자 함수 정의
function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
}

//부모의 프로토타입 객체에 함수 추가
Animal.prototype.getInfo = function () {
  return this.name + "가 " + this.sound + "소리를 낸다.";
};

//자식으로 확장
function Pet(name, sound) {
  Animal.call(this, name, sound);
  //Animal 생성자 함수의 기능을 재활용하기 위한 line.
  //call을 사용해, this가 "Pet 생성자 함수로 찍어낸 객체"를 가리키게 한다.
  //즉 Animal의 this가 뒤에 생성될 dog, cat 객체를 가르킨다.
}

//자식에서 부모의 프로토타입 객체에 추가된 함수를 사용하기 위한 프로토타입 체이닝
//즉 Animal.prototype의 객체 및 속성을 Pet.prototype도 가지게 하기 위함!
Pet.prototype = Object.create(Animal.prototype);

//new와 자식으로서 확장된 생성자 함수 이용한 객체 생성
const dog = new Pet("개", "멍멍");
const cat = new Pet("고양이", "야옹");

//동작하는지 확인!
console.log(dog.getInfo()); //개가 멍멍소리를 낸다.
console.log(cat.getInfo()); //고양이가 야옹소리를 낸다.
```
