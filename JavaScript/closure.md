# 클로저(Closure)

클로저란 자신이 선언될 때의 환경을 기억한 상태로 호출될 때의 환경에 접근할 수 있는 것을 말한다. 이를 통해 클로저 함수는 내부 변수 뿐만 아니라 외부 변수에도 접근할 수 있게 된다.

여기서 말하는 환경이란, 실행 컨텍스트를 공부할 때 배웠던 렉시컬 환경(Lexical Environment)이다. 렉시컬 환경은 여러가지 역할 중, 해당 스코프의 변수와 함수의 식별자를 기억하는 역할이 클로저와 연관되어 있다.

즉 클로저 함수는 자신이 선언될 때의 렉시컬 환경을 기억한 상태로, 호출 될 때 렉시컬 환경에 접근할 수 있는 함수이다. 즉 자신이 선언될 때의 렉시컬 환경에 의해 내부 변수에 접근할 수 있는 것이고, 호출될 때의 렉시컬 환경에 의해 외부 변수에도 접근할 수 있는 것이다.

동시에 클로저 함수는 외부에서 클로저 내부의 변수에 접근할 수 없는 은닉화·모듈화 기능을 가지게 된다. 그래서 "폐쇠"라는 뜻을 가진 클로저라는 이름으로 불리는 것이다.

즉 클로저는 스코프와 연관된 개념이다. 스코프는 중첩이 가능하고 안쪽 스코프에서 바깥쪽 스코프로는 접근할 수 있지만 반대로는 불가능하다.

한편 클로저 개념을 활용한 debounce, throttle을 통해 이벤트를 조작할 수 있다. [dom_event.md👉"이벤트 조작" part 참고!](https://github.com/ehhdrud/TIL/blob/main/JavaScript/dom%2Cevent.md)

> **📌이해하기**
>
> > **👉클로저가 없는 코드**
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
> > **👉클로저를 사용한 코드**
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
