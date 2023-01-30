# 프로토타입(Prototype)

자바스크립트는 클래스 기반 언어가 아닌 프로토타입 기반 언어이다. 프로토타입을 통해 클래스가 없는 언어에서 상속을 구현한다. ES6에서 자바스크립트에도 클래스가 추가됐지만 여전히 프로토타입 언어임은 변함이 없고 클래스도 마찬가지로 프로토타입을 통해 상속을 구현한다.

프로토타입이란 "유전자"라는 뜻으로, 모든 객체에는 `[Prototype]`이라는 프로토타입 객체가 존재한다. 이 프로토타입 객체는 어떤 객체가 생성될 때 자바스크립트 내부에서 자동으로 생성되는 놈으로, 그냥 1+1 이라고 생각하면 된다. 이 프로토타입 객체에는 자체적으로 프로퍼티, 메서드 등이 정의되어 있기 때문에 우리가 정의한 적도 없는 프로퍼티나 메서드를 사용할 수 있는 것이고, 프로토타입 체인을 통한 상속으로 인해 상위 객체의 프로퍼티나 메서드도 사용할 수 있는 것이다.

클래스가 도입되고 그 편의성으로 인해 프로토타입 문법은 잘 사용되진 않지만, 그 개념은 자바스크립트의 동작 이해를 위한 필수 지식이다.

> **📌프로토타입❓**
>
> > **👇`constructor.name`을 통한 프로토타입 확인**
> >
> > ```js
> > function Workout(workoutName, sets) {
> >   this.workoutName = workoutName;
> >   this.sets = sets;
> > }
> >
> > const squat = new Workout("Squat", 3);
> > const legPress = new Workout("Leg Press", 4);
> >
> > console.log(squat); //Workout { workoutName: 'Squat', sets: 3 }
> > console.log(legPress); //Workout { workoutName: 'Leg Press', sets: 4 }
> >
> > console.log(squat.constructor.name); //Workout
> > console.log(legPress.constructor.name); //Workout
> > ```
>
> > **👇`instanceof`를 이용한 프로토타입 확인**
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

모든 함수는 객체이고 객체는 프로토타입을 가지고 있다. 객체가 가진 프로토타입은 프로토타입 객체를 가리키는데, 이 프로토타입 객체는 `constructor`와 `__proto__`라는 프로퍼티를 가진다. 여기서 `constructor`는 함수 객체를 가리킨다. 즉 함수 객체와 프로토타입 객체는 서로를 바라보고 있는 관계에 있다.

`new` 연산자와 함수 객체를 통해 객체를 만들고, 프로토타입 객체에 `constructor`와 `__proto__` 외에 함수를 추가했다고 가정하자. 생성된 객체 역시 `constructor`와 `__proto__`를 가질 것이고 `__proto__`는 생성자 함수가 바라보고 있는 프로토타입 객체를 바라본다. 만들어진 객체에서 프로토타입 객체에 추가한 함수를 호출한다면, 우선 만들어진 객체 내부를 확인하고, 거기에 없다면 `__proto__`를 타고 프로토타입 객체에 있는 함수를 호출할 것이다. 이러한 방식으로 객체와 프로토타입들이 체이닝되고 상속이 가능해진다. 여기서 자식은 부모로부터 상속을 받는 동시에 본인만의 새로운 기능을 추가할 수 있기 때문에 상속 대신 확장이라고 표현하기도 한다.

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

> **📌`Object.create` 사용 방법**
>
> ```js
> const workout = {
>   sayMotivation() {
>     return "No matter what happens, two more";
>   },
> };
> console.log(workout.sayMotivation()); //No matter what happens, two more
>
> const leg = Object.create(workout);
> console.log(leg.sayMotivation()); //No matter what happens, two more
> ```

> **📌*자식으로서 확장된 생성자 함수*로 만든 객체로 확장**
>
> ```js
> //부모 생성자 함수 정의
> function Workout(workoutName, sets) {
>   this.workoutName = workoutName;
>   this.sets = sets;
> }
>
> //부모의 프로토타입 객체에 함수 추가
> Workout.prototype.getInfo = function () {
>   return this.workoutName + ": " + this.sets + "SETS";
> };
>
> //자식으로 확장
> function Leg(name, sound) {
>   Workout.call(this, name, sound);
>   //Workout 생성자 함수의 기능을 재활용하기 위한 line.
>   //call을 사용해, this가 "Leg 생성자 함수로 찍어낸 객체"를 가리키게 한다.
>   //즉 Workout의 this가 뒤에 생성될 squat, legPress 객체를 가리킨다.
> }
>
> //자식에서 부모의 프로토타입 객체에 추가된 함수를 사용하기 위한 프로토타입 체이닝
> //즉 Workout.prototype의 객체 및 속성을 Leg.prototype도 가지게 하기 위함!
> Leg.prototype = Object.create(Workout.prototype);
>
> //new와 자식으로서 확장된 생성자 함수 이용한 객체 생성
> const squat = new Leg("Squat", 3);
> const legPress = new Leg("Leg Press", 4);
>
> //동작하는지 확인!
> console.log(squat.getInfo()); //Squat: 3SET
> console.log(legPress.getInfo()); //Leg Press: 4SET
>
> console.log(squat.constructor.name); //Workout //클래스로 구현한다면 Leg!
> console.log(squat instanceof Leg); //true
> console.log(squat instanceof Workout); //true
> ```

## 3. 그 외 메서드

### 3.1. `Object.getPrototypeOf([obj])`

객체의 프로토타입을 반환한다.

### 3.2. `Object.setPrototypeOf([obj]], [프로토타입으로사용할객체또는null])`

객체의 프로토타입을 다른 객체로 설정하거나 null로 설정한다.

> **📌`Object.getPrototypeOf`와 `Object.setPrototypeOf` 사용 방법**
>
> ```js
> let training = {
>  hypertrophy = true;
>  strength = false;
> };
>
> let leg = Object.create(training);
> alert(leg.hypertrophy); //true
>
> alert(Object.getPrototypeOf(leg) === training); //true
>
> alert(Object.setPrototypeOf(leg, {})); //leg의 프로토타입을 {}으로 바꾼다.
> ```
