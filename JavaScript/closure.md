# 클로저(closure)

클로저 함수는 특정 데이터를 스코프 안에 가둔 채로 계속 사용할 수 있도록 하는 폐쇠성을 가진다.

클로저 함수를 변수에 할당하면 독립적으로 사용할 수 있다.

데이터와 메서드의 모듈화·은닉화에 용이하다.

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

```js
//클로저 예제1
function returnChar1(x) {
  let outerChar = x;

  //클로저 함수
  return function returnChar2(y) {
    let innerChar = y;

    return outerChar + innerChar;
  };
}

const x = returnChar1("x"); //실행이 보류되고 'x'를 저장한다.

//매개변수 2개를 모두 받아야 실행된다.
const xy = x("y");
const xz = x("z");

console.log(xy); //xy
console.log(xz); //xz
```

```js
//클로저 예제2
function sum(num1) {
  return function (num2) {
    return function (num3) {
      return num1 + num2 + num3;
    };
  };
}
//화살표 함수로 간단하게 표현 가능! → const sum = (num1) => (num2) => (num3) => num1 + num2 + num3;

const sum5 = sum(5);
const sum10 = sum(10);

console.log(sum5(20)(20)); //45
console.log(sum10(20)(20)); //50
```

## 1. 은닉화

```js
//은닉화 예제2
function privateData() {
  let temp = "a";

  return {
    value: function () {
      return temp;
    },
    changeValue: function (newVal) {
      return (temp = newVal);
    },
  };
}

const private = privateData();
console.log(private.value()); //a
private.changeValue("b");
console.log(private.value()); //b
```

```js
//은닉화 예제2
function counterApp(initValue) {
  let countValue = initValue ?? 0; //값이 들어오지 않으면 0이 반환된다.

  return {
    value: function () {
      return countValue;
    },
    increment: function () {
      countValue++;
    },
    decrement: function () {
      countValue--;
    },
  };
}

const counter1 = counterApp(1);
const counter2 = counterApp(2);

console.log(counter1.value()); //1
console.log(counter2.value()); //2

counter1.increment();
counter1.increment();
counter1.increment();

console.log(counter1.value()); //4
console.log(counter2.value()); //2
```

## 2. 클로저의 활용

클로저 개념을 활용하여 이벤트를 조작할 수 있다.

### 2.1. debounce

이벤트를 그룹화하여 특정 시간이 지난 후, 마지막 이벤트만 발생하도록 하는 기술이다.

매개변수는 *실행시킬 함수*와 *지연시킬 밀리세컨드*이다.

이벤트가 실행되었을 때 일정 시간을 기다렸다가 이벤트를 수행하도록 만들고, 일정 시간 내에 같은 이벤트가 또 들어오면 이전 요청을 취소하는 방식으로 구현한다.

### 2.2. throttle

일정 시간동안 일어난 이벤트를 차단하고 단 한 번만 실행하는 기술이다.

매개변수는 *실행시킬 함수*와 *차단시킬 밀리세컨드*이다.

타이머가 없을 경우 타이머를 설정하고, 타이머가 있을 경우 아무런 동작도 하지 않도록 하여 일정 시간 이후에 이벤트가 1번 실행되도록 구현한다.
