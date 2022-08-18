# 반복문

> 프로그램 내에서 똑같은 명령을 일정 횟수만큼 반복하여 수행하도록 제어하는 명령문

## for문

- `for(선언문; 조건문; 증감문)` 형태로 이루어짐, 각 자리에 공백 입력 가능
- 조건문이 fail이 되기 전까지 반복 수행

```javascript
//for문
for (let i = 0; i < 3; i++) {
  console.log(i);
}

//선언문과 증감문 없는 for문
let num = 0;
for (; num < 2; ) {
  console.log(num);
  num++;
}

//3중 for문
for (let x = 0; x < 3; x++) {
  for (let y = 0; y < 3; y++) {
    for (let z = 0; z < 3; z++) {
      console.log(`${x} + ${y} + ${z} = ${x + y + z}`);
    }
  }
}
```

### for in문

- `for(key in object){}`
- 객체의 key, value형태를 반복하여 수행하는데 최적화된 유형
- 첫 번째부터 마지막까지, 객체의 key 개수만큼 반복

```javascript
const person = { fname: "DongKyeong", lname: "Seo", age: 28 };

let text = "";

for (let x in person) {
  text += person[x]; //text = text + person[x] (객체 person의 각 key의 값(value)들이 for문을 통해 할당되고 더해짐)
}

console.log(text); //DongKyeongSeo28
```

### for of문

- `for(variable of iterable){}`
- Collection 객체가 Symbol.iterator속성를 가지고 있어야 동작 가능한 유형<br>(Symbol.iterator속성을 가지고 있어야 value들이 반복되는 iteration 동작을 정의하는 것을 허용함)
- ES6에 새로 추가된 Collection 기반의 반복 구문

```javascript
let language = "JavaScript"; //문자열(string)도 Symbol.iterator속성을 가지고 있음
let text = "";

for (let x of language) {
  text += x; //text = text + x
  console.log(x); //J a v a s c r i p t(한글자씩 가져온다는 것을 알 수 있음)
}
console.log(text); //Javascript
```

## while

- 조건문이 true일 때 코드 블록을 계속해서 반복 수행하는 반복문
- for문에 비해 선언문과 증감문 없이 loop를 수행하며, 무한 loop 수행 시 많이 사용

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

- 조건문을 코드 블록보다 아래로 옮긴 `do … while` 반복문도 존재, 최소 한번 수행이 필요할 때 많이 사용

```javascript
let i = 100;
do {
  console.log(i);
  i++;
} while (i < 101);
```

## 제어 방법

### `break`

- 반복문 수행 시, 코드 블록을 탈출할 때 쓰는 식별자
- 다중 반복문의 경우 가장 안쪽의 반복문을 제어

```javascript
let text = "";

for (let i = 0; i < 10; i++) {
  if (i == 3) break; //3일때 for문에서 빠져나옴!
  text += i;
}
console.log(text);
```

- Label을 통하여 다중 반복문을 한번에 종료 가능

```javascript
//Label 사용X
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(i + "*" + j + "=" + i * j);
    break; //0*0=0, 1*0=0, 2*0=0
  }
}

//Label 사용
end: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(i + "*" + j + "=" + i * j);
    break end; //0*0=0
  }
}
```

### `continue`

- 반복문 수행 시, 코드 블록 실행을 해당 라인에서 중지하고 블록 코드를 종료시킨 후 반복문 내 명시된 조건 판단
- 특정 조건의 뒤의 코드를 스킵하려고 할 때 많이 사용

```javascript
let text = "";

for (let i = 0; i < 10; i++) {
  if (i == 3) continue; //3일때 조건문 의 뒤 코드를 수행하지 않고 for문으로 돌아감
  text += i;
}
console.log(text);
```
