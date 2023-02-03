# this

this란 특정 객체에 접근할 수 있는 "예약어"이다.

```js
let user = {
  name: "user",
};

let admin = {
  name: "admin",
};

//함수 내부 this값은 런타임에 결정된다.
function hello_func() {
  console.log("hello " + this.name);
}

user.func = hello_func;
admin.func = hello_func;

user.func(); //hello user
admin.func(); //hello admin
```

## 1. 바인딩(Binding)

this가 특정 공간을 가리키는 것을 "바인딩"이라고 한다.

### 1.1. 암시적 바인딩

기본적으로 아래 규칙에 따라 암시적으로 동작한다. 하지만 여러가지 환경적 요소가 암시적 바인딩에 관여하므로 예측하기 매우 어렵다.

#### 1.1.1. 함수에서의 this

기본적으로 전역 객체에 바인딩된다.

`obj.func`처럼 호출한 객체가 있다면 그 위치(`obj`)에 바인딩된다.

```js
const func = function () {
  console.log(this);
};

func(); // window
```

#### 1.1.2. 메서드에서의 this

**호출한 객체**를 가리킨다. 객체가 depth가 있다면 해당 함수를 직접적으로 포함하고 있는 객체와 바인딩된다.

```js
const obj = {
  func: function () {
    console.log(this);
  },
};

obj.func(); // Object
```

#### 1.1.3. 생성자 함수에서의 this

```js
function Workout(name) {
  this.name = name;
}

const squat = new Workout("Squat");
console.log(squat); // // Workout { name: 'Squat' } // 즉 this는 instance인 squat를 가르킴!
```

### 1.2. 명시적 바인딩

암시적 바인딩이 예측이 어렵게 동작할 때를 대비해, this의 객체를 명시적으로 지정해 줄 수 있다.

#### 1.2.1. `call`

this에 바인딩될 객체를 명시적으로 지정하고, 함수의 매개변수를 입력받는 메서드이다

첫 번째 인자로 **this가 가리킬 객체**, 두 번째 인자부터는 **함수의 매개변수**를 입력한다.

```js
const workout = {
  name: "Squat",
  todayWorkout: function () {
    return `오늘의 운동: ${this.name} / `;
  },
};

function getInfo(kg, sets, reps) {
  return this.todayWorkout() + `${kg}KG ${sets}SETS ${reps}REPS`;
}

const strengthTraining = getInfo.call(workout, 140, 3, 5);
console.log(strengthTraining);
// 첫 번째 매개변수에는 "this가 가리킬 객체"
// 두 번째 매개변수부터 "함수의 매개변수"를 입력 !
// 오늘의 운동: Squat / 140KG 3SETS 5REPS
```

#### 1.2.2. `apply`

this에 바인딩될 객체를 명시적으로 지정하고, 함수의 매개변수를 배열 형태로 입력받는 메서드이다.

첫 번째 인자로 **this가 가리킬 객체**, 두 번째 인자에는 **배열인 함수의 매개변수**를 입력한다.

```js
const workout = {
  name: "Squat",
  todayWorkout: function () {
    return "오늘의 운동: " + this.name + " / ";
  },
};

function getInfo(kg, sets, reps) {
  return `오늘의 운동: ${this.name} / `;
}

const hypertrophyTraining = getInfo.apply(workout, [100, 3, 12]);
console.log(hypertrophyTraining);
// 첫 번째 매개변수에는 "this가 가리킬 객체"
// 두 번째 매개변수에는 "함수의 매개변수를 배열로" 입력 !
// 오늘의 운동: Squat / 100KG 3SETS 12REPS
```

#### 1.2.3. `bind`

'지정한 객체로 바인딩된 함수'를 리턴하는 메서드이다. 함수를 실행하지는 않기 때문에 명시적으로 함수를 호출해야 한다.

첫 번째 인자로 **this가 가리킬 객체**를 입력한다. 함수의 매개변수는 리턴받은 함수를 호출할 때 입력한다.

```js
const workout = {
  name: "Squat",
  todayWorkout: function () {
    return `오늘의 운동: ${this.name} / `;
  },
};

function getInfo(kg, sets, reps) {
  return this.todayWorkout() + `${kg}KG ${sets}SETS ${reps}REPS`;
}

const endurance = getInfo.bind(workout);
const enduranceTraining = endurance(80, 3, 20);
console.log(enduranceTraining);
// 매개변수로 "this가 가리킬 객체"를 입력하고
// 함수의 매개변수는 리턴받은 함수를 호출할 때 입력 !
// 오늘의 운동: Squat / 80KG 3SETS 20REPS
```

## 2. 특수한 상황의 this

### 2.1. 콜백함수 안에서의 this

#### 2.1.1. 문제점

콜백함수가 일반함수이므로 전역 객체를 참조한다.

```js
const fn = {
  title: "Hello World!",
  tags: [1, 2, 3],
  showTags() {
    this.tags.forEach(function (tag) {
      console.log(tag);
      console.log(this); // window
    });
  },
};
fn.showTags();
/**
 * output:
 * 1
 * window 객체 출력
 * 2
 * window 객체 출력
 * 3
 * window 객체 출력
 */
```

#### 2.1.2. 해결 방법

콜백함수 다음 인자로 참조할 객체를 전달해준다.

```js
const fn = {
  title: "Hello World!",
  tags: [1, 2, 3],
  showTags() {
    this.tags.forEach(function (tag) {
      console.log(tag);
      console.log(this); // fn
    }, this); // 여기는 일반 함수 바깥! 👉 fn 객체를 참조할 수 있다.
  },
};
fn.showTags();
/**
 * output:
 * 1
 * fn 객체 출력
 * 2
 * fn 객체 출력
 * 3
 * fn 객체 출력
 */
```

### 2.2. 화살표 함수에서의 this

일반 함수와 화살표 함수의 가장 큰 차이점은 this의 동작 방식이다.

화살표 함수에서의 this는 언제나 **상위 스코프의 this**이다. 이를 **Lexical this**라고 한다. 즉, **일반 함수**는 함수를 **호출**할 때 바인딩할 객체가 동적으로 정해진다면, **화살표 함수**는 함수를 **선언**할 때 바인딩할 객체가 정적으로 정해진다.

화살표 함수의 this는 `call`, `apply`, `bind`를 통해 변경할 수 없다.

> **📌Lexical Scope(Static Scope)**
>
> 함수가 어디서 *호출*되었는지가 아니라 어디서 *선언*되었는지에 따라 상위 스코프가 결정

```js
const fn = {
  title: "Hello World!",
  tags: [1, 2, 3],
  showTags() {
    this.tags.forEach((tag) => {
      console.log(tag);
      console.log(this); //fn //화살표 함수가 선언된 위치의 상위 스코프(showTags())의 this는 fn을 가리킨다.
    });
  },
};
fn.showTags();
/**
 * output:
 * 1
 * fn 객체 출력
 * 2
 * fn 객체 출력
 * 3
 * fn 객체 출력
 */
```
