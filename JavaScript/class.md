# 클래스(Class)

**ES6**에 클래스 문법이 추가되었다.

클래스 선언은 **프로토타입 기반 상속**을 사용하여 주어진 이름의 새로운 클래스를 만든다.

클래스도 사실 하나의 "특별한 함수"이며 함수처럼 **선언식**, **표현식**으로 정의할 수 있다. 또한 함수와 마찬가지로 **`new`연산자**를 통한 정의도 가능하다.

클래스의 `constructor()` 메서드는 클래스의 인스턴스 객체를 생성하고 초기화한다.

> **📌선언식**
>
> ```js
> class Workout {
>   constructor(workoutName) {
>     this.workoutName = workoutName;
>   }
> }
> ```

> **📌표현식**
>
> ```js
> let Workout = class {
>   constructor(workoutName) {
>     this.workoutName = workoutName;
>   }
> };
> ```

> **📌new를 통한 정의**
>
> ```js
> class Workout {
>   constructor(workoutName) {
>     this.workoutName = workoutName;
>   }
> }
> const leg = new Workout();
> ```

> **📌클래스에 메서드 추가**
>
> ```js
> class Workout {
>   constructor(workoutName, sets, reps) {
>     this.workoutName = workoutName;
>     this.sets = sets;
>     this.reps = reps;
>   }
>   getInfo() {
>     return (
>       this.workoutName + ": " + this.sets + "SETS, " + this.reps + "REPS"
>     );
>   }
> }
>
> const squat = new Workout("Squat", 3, 5);
> const legPress = new Workout("Leg Press", 4, 10);
>
> console.log(squat.getInfo()); //Squat: 3SETS, 5REPS
> console.log(legPress.getInfo()); //Leg Press: 4SETS, 10REPS
> ```

**📌클래스를 이용한 확장(상속)**

```js
//Super Class
class Workout {
  constructor(workoutName, sets) {
    this.workoutName = workoutName;
    this.sets = sets;
  }
  getInfo() {
    return this.workoutName + ": " + this.sets + "SETS";
  }
}

//Sub Class
class Leg extends Workout {
  constructor(workoutName, sets) {
    super(workoutName, sets);
  }
}

const squat = new Leg("Sqaut", 3);
const legPress = new Leg("Leg Press", 4);

console.log(squat.getInfo()); //Squat: 3SET
console.log(legPress.getInfo()); //Leg Press: 4SET

console.log(squat.constructor.name); //Leg //프로토타입으로 구현한다면 Workout!
console.log(squat instanceof Leg); //true
console.log(squat instanceof Workout); //true
```
