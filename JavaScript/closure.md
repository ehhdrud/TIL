# 클로저(closure)

클로저 함수는 특정 데이터를 스코프 안에 가둔 채로 계속 사용할 수 있도록 하는 폐쇠성을 가진다.

클로저 함수를 각각의 변수에 할당하면 각자 독립적으로 사용하고 값을 보존할 수 있기 때문에 데이터와 메서드를 묶어 모듈화·은닉화할 때 용이하다.

```javascript
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

```javascript
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

```javascript
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

```javascript
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

## 2.1. debounce

이벤트를 그룹화하여 특정 시간이 지난 후, 마지막 이벤트만 발생하도록 하는 기술이다.

매개변수는 *실행시킬 함수*와 *지연시킬 밀리세컨드*이다.

이벤트가 실행되었을 때 일정 시간을 기다렸다가 이벤트를 수행하도록 만들고, 일정 시간 내에 같은 이벤트가 또 들어오면 이전 요청을 취소하는 방식으로 구현한다.

## 2.2. throttle

일정 시간동안 일어난 이벤트를 차단하고 단 한 번만 실행하는 기술이다.

매개변수는 *실행시킬 함수*와 *차단시킬 밀리세컨드*이다.

타이머가 없을 경우 타이머를 설정하고, 타이머가 있을 경우 아무런 동작도 하지 않도록 하여 일정 시간 이후에 이벤트가 1번 실행되도록 구현한다.
