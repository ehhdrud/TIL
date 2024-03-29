# 조건문

조건에 따라 실행이 달라지게 할 때 사용하는 명령문.

## 1. if-else문

알고리즘에서 논리적 비교를 할 때 사용하는 조건식이다.

`if`, `if-else`, `else` 키워드를 통해 구성되며, 조건식에 맞을 경우 중괄호({}) 내 명령문을 수행한다.

```javascript
let apple_price = 2000;

if (apple_price >= 2000) {
  console.log("very expensive :(");
} else if (apple_price < 1000) {
  console.log("very cheap :)");
} else {
  console.log("nice");
}

console.log("done");
```

## 2. 삼항 연산자

세 개의 피연산자를 갖는 조건식으로, if-else문에 비해 간결하다.

`condition ? truthy : falsy` condition이 참일 경우 truthy의 값을, 거짓일 경우 falsy의 값을 반환한다.

```javascript
let age = 20;

let msg = age < 19 ? "The user is not adult." : "The user is adult.";
console.log(msg); //The user is adult.
```

## 3. switch문

표현식을 평가하여 그 값이 일치하는 `case`문을 실행하는 조건식이다.

`switch`, `case`, `break`, `default` 키워드를 통해 구성되며, 일반적으로 하나의 `case`만 수행되도록 `case`의 끝을 `break`로 끝낸다.

```javascript
let day_number = 1;
let day = "";

switch (day_number) {
  case 0:
    day = "Sun";
    break;
  case 1:
    day = "Mon";
    break;
  case 2:
    day = "Tue";
    break;
  case 3:
    day = "Wed";
    break;
  case 4:
    day = "Thu";
    break;
  case 5:
    day = "Fri";
    break;
  case 6:
    day = "Sat";
    break;
  default:
    day = "error";
    break;
}
console.log(day);
```
