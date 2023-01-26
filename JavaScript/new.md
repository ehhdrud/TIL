# `new` 연산자

유사한 객체를 다중으로 만들 때 주로 사용된다.

`new`를 사용하는 생성자 함수의 첫 글자는 대문자로 정의한다.

ES6에서 Class 개념의 등장으로 대체가 가능해졌다. [class.md 참고!](#class)

```js
function Workout(classification, sets, reps) {
  this.classification = classification;
  this.sets = sets;
  this.reps = reps;
}

let squat = new Workout("Leg", 3, 8);
let benchPress = new Workout("Chest", 3, 10);
let deadLift = new Workout("Back", 3, 5);

console.log(squat); // Workout { classification: 'Leg', sets: 3, reps: 8 }
console.log(benchPress); // Workout { classification: 'Chest', sets: 3, reps: 10 }
console.log(deadLift); // Workout { classification: 'Back', sets: 3, reps: 5 }
```

> **📌`new.target`**
>
> 객체 내부적으로 new가 없으면 undefiend 출력한다. 이를 활용해 자동으로 new를 추가하는 코드를 작성할 수 있다.
>
> ```js
> function User(name) {
>   //자동으로 new를 추가하는 코드!
>   if (!new.target) {
>     return new User(name);
>   }
>   this.name = name;
> }
>
> let newOn = new User("seodongkyeong");
> console.log(newOn); //User { name: 'seodongkyeong' }
>
> let newOff = User("seodongkyeong");
> console.log(newOff); //User { name: 'seodongkyeong' }
> //new가 없어도 동일하게 동작한다.
> ```
