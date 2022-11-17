# 클로저(closure)

클로저 함수는 특정 데이터를 스코프 안에 가둔 채로 계속 사용할 수 있도록 하는 폐쇠성을 가진다.

클로저 함수를 변수에 할당하면 독립적으로 사용할 수 있다.

데이터와 메서드의 모듈화·은닉화에 용이하다.

클로저 개념을 활용하여 이벤트를 조작할 수 있다. [dom_event.md👉"이벤트 조작" part 참고!](https://github.com/ehhdrud/TIL/blob/main/JavaScript/dom%2Cevent.md)

> **📌이해하기**
>
> > **👉Closure X**
> >
> > ```js
> > function legDay() {
> >   const workout = "Squat";
> >   console.log(workout);
> > }
> >
> > legDay(); //Squat
> > const getSquat = legDay();
> > getSquat(); //error: getSquat is not a function
> > console.log(workout); //error: workout is not defined
> > ```
> >
> > legDay 함수가 실행이 종료되면 workout 변수에는 접근할 수 있는 방법이 없다.
>
> > **👉Closure O**
> >
> > ```js
> > function legDay() {
> >   const workout = "Squat";
> >   return function closurehahaha() {
> >     const str = "Shut Up And";
> >     console.log(str, workout);
> >   };
> > }
> >
> > const getSquat = legDay();
> > getSquat(); //Shut Up And Squat //이런 식으로 workout 변수에 접근 가능!
> > ```
> >
> > 하지만! 클로저 함수를 사용하면 이 함수를 통해 간접적으로 workout 변수에 접근할 수 있다.
>
> **why❓❓❓**  
> legDay 함수가 생성될 때 실행 컨텍스트가 생기고 실행 컨텍스트와 함께 Lexical Enviroment(*함수의 지역변수의 정보, 이 함수의 상위 스코프의 대한 정보*가 포함됨)도 함께 생성된다. 실행이 끝나면 실행 컨텍스트도 종료되는데 내부에 함수(클로저)가 선언된다면 Lexical Enviroment가 같이 묶여서 선언되기 때문이다.

### 1. 클로저를 통한 모듈화

**📌모듈화 예제 1**

```js
function returnChar1(x) {
  let outerChar = x;

  //클로저 함수
  return function returnChar2(y) {
    let innerChar = y;

    return outerChar + innerChar;
  };
}

//변수에 저장해 독립적인 사용이 가능하다.
const x = returnChar1("Workout: "); //실행이 보류되고 문자열을 저장한다.

//매개변수 2개를 모두 받으면 실행된다.
const upper = x("Upper Body");
const lower = x("Lowwr Body");

console.log(upper); //Workout: Upper Body
console.log(lower); //Workout: Lowwr Body
```

**📌모듈화 예제 2**

```js
function rpe10(num1) {
  return function (num2) {
    return function (num3) {
      return num1 + num2 + num3;
    };
  };
}
//화살표 함수로 간단하게 표현 가능👇
//const sum = (num1) => (num2) => (num3) => num1 + num2 + num3;

const strengthTraining = rpe10(5);
const hypertrophyTraining = rpe10(12);

console.log(strengthTraining(4)(3)); //12
console.log(hypertrophyTraining(10)(8)); //30
```

### 2. 클로저를 통한 은닉화

**📌은닉화 예제 1**

```js
function privateData() {
  let secret = "my squat 1rm is dropped by 3%";

  return {
    value: function () {
      return secret;
    },
    changeValue: function (newVal) {
      return (secret = newVal);
    },
  };
}

const private = privateData();
console.log(private.value()); //my squat 1rm is dropped by 3%
private.changeValue("my squat 1rm is dropped by 5%");
console.log(private.value()); //my squat 1rm is dropped by 5%
```

**📌은닉화 예제 2**

```js
function counterApp(initValue) {
  let startingPoint = initValue ?? 0;
  //값이 들어오지 않으면 0이 반환된다.

  return {
    value: function () {
      return startingPoint;
    },
    increase: function () {
      startingPoint++;
    },
    decrement: function () {
      startingPoint--;
    },
  };
}

const squat = counterApp(5);
const legExtension = counterApp(12);

console.log(squat.value()); //5
console.log(legExtension.value()); //12

squat.increase();
squat.increase();
squat.increase();

console.log(squat.value()); //8
console.log(legExtension.value()); //12
```
