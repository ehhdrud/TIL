# 비동기(Asynchronous)

## 1. 동기(Synchronous)와 비동기(Asynchronous)

## 1.1. 동기

동기란 순서대로 한번에 하나의 작업을 수행하는 것이고, 자바스크립트는 동기적 언어이다.

동기는 다른 말로 '싱글 스레드'라고도 부르는데 이는 하나의 Call Stack만을 가지고 있음을 의미한다.

이러한 동작은 *Memory Heap*과 *Call Stack*으로 이루어진 *자바스크립트 엔진*으로부터 비롯된다.

> **동작 원리**
>
> 1. 코드가 실행되면 순서대로 Call Stack에 실행할 함수가 쌓인다.
> 2. 쌓인 반대 순서로 코드가 실행된다(Last In First Out).
> 3. 실행이 된 코드는 Call Stack에서 제거된다.

## 1.2. 비동기

자바스크립트는 동기식으로 동작하지만 비동기적 작업이 필요하다. 특히 자바스크립트가 웹 사이트에서 동작하려면 빠른 반응을 위해 비동기적 작업이 필수적이다.

이러한 비동기 동작은 **자바스크립트 실행환경(런타임)**으로부터 가능해진다. 자바스크립트 실행환경에서는 DOM, AJAX같은 비동기적 처리를 위한 **Web API**를 제공하기 때문이다.

> **동작 원리**
>
> 1. Call Stack에서 비동기 함수가 호출되면 Call Stack에 먼저 쌓였다가 Web API로 이동한 후 해당 함수가 등록되고 Call Stack에서 사라진다.
> 2. Web API에서 비동기 함수의 이벤트가 발생하면, 해당 콜백 함수는 Task Queue에 이동된다.
> 3. 이제 Call Stack이 비어있는지 이벤트 루프(Event Loop)가 확인을 하는데, 만약 비어있으면 Task Queue에 있는 콜백 함수를 순서대로 Call Stack에 넘겨준다(First In First Out).
> 4. Call Stack에 들어온 함수는 실행이 되고 실행이 끝나면 Call Stack에서 제거된다.

## 2. 비동기 처리 방법

### 2.1. 콜백(Callback)

콜백 함수를 호출하는 함수(고차함수)에 비동기적 처리를 포함시키면 해당 고차 함수가 실행이 완료되지 않더라도 자바스크립트는 다음 코드를 읽어들일 수 있다.

콜백함수를 갖는, 그 자체로 비동기적인 함수는 대표적으로 setTimeout, setInterval, addEventListener 등이 있다.

- setTimeout(callback, delay): 콜백 함수(callback)를 일정한 시간(delay) 뒤에 실행시키는 함수

- setInterval(callback, interval): 콜백 함수(callback)를 일정한 시간 간격(interval)을 두고 반복해서 실행하는 함수

- addEventListener(eventType, callback): 특정 이벤트(eventType)가 발생할 때 콜백 함수(callback)를 실행하는 함수

비동기로 동작하는 함수는 Call Stack으로 바로 들어가서 실행되지 않고, Web API를 거쳐 콜백 함수를 Queue에서 대기시킨다. 대기 중인 콜백 함수의 실행은 Call Stack이 비어있는 상태여야만 비로소 Call Stack으로 넘어가서 완료된다.

과도한 들여쓰기로 인한 "콜백 지옥"이 발생할 수 있다. 이는 Promise나 async/await를 통해 해결할 수 있다.

### 2.2. Promise

자바스크립트 비동기 처리에 사용되는 객체로, *내용은 실행되었지만 결과를 아직 반환하지 않은 객체*이다.

주로 서버에서 받아온 데이터를 화면에 표시할 때 사용한다.

비동기 연산이 종료된 이후에 결과값의 상태를 pending(대기), fullfilled(이행), rejected(실패)로 알려준다.

콜백 지옥을 해결할 수 있지만, Promise 메서드 체인으로 인한 then 지옥에 빠질 수 있다. then 지옥은 async/await를 사용하면 해결된다.

#### 2.2.1. Promise의 3가지 상태

##### 2.2.1.1. pending

`new Promise(callback)`을 통해 메서드를 생성하는 때의 초기 상태인 "대기" 상태이다

콜백 함수는 `resolve`와 `reject` 인자를 사용할 수 있다. 성공 시 `resolve`, 실패 시 `reject`를 호출한다.

##### 2.2.1.2. fulfilled

`resolve`인자를 실행했을 때, 즉 "성공" 상태이다.

##### 2.2.1.3. rejected

`reject`인자를 실행했을 때, 즉 "실패" 상태이다.

#### 2.2.2. Promise를 "제공"하는 메서드

##### 2.2.2.1. `Promise.resolve(value)`

`resolve(value)`에서 Value는 성공적으로 실행했을 때의 반환값을 나타낸다.

실행 시 state는 fulfilled, result에는 value가 들어간다.

##### 2.2.2.2. `Promise.reject(error)`

`reject(error)`의 error는 실행에 실패했을 때의 반환값을 나타낸다.

실행 시 state는 rejected, result에는 error가 들어간다.

#### 2.2.3. Promise를 "소비"하는 메서드

##### 2.2.3.1. `Promise.then`

fullfiled 상태가 되면 `Promise.then`을 통해 처리 결과값을 받을 수 있다.

##### 2.2.3.2. `Promise.catch`

rejected 상태가 되면 `Promise.catch`를 통해 처리 결과값을 받을 수 있다.

#### 2.2.4. 기타 메서드

##### 2.2.4.1. `Promise.finally`

Promise의 실행 여부와 관계없이 Promise가 처리된 후 무조건 한 번은 실행되는 코드이다.

체이닝의 마지막에 작성한다.

##### 2.2.4.2. `Promise.all`

배열 형식으로 인자를 받아 한 개 이상의 Promise를 실행할 때 사용한다.

배열 내 Promise 중 어느하나라도 reject라면 `Promise.all`의 결과값도 reject를 반환한다.

### 2.3. async, await

콜백 함수나 Promise를 연속적으로 사용한다면 이른바 "콜백 지옥" 또는 "then 지옥"에 빠질 수 있다.`async`와 `await`를 사용함으로써 해결할 수 있다.

#### 2.3.1. `async`

일반적인 함수 선언 앞에 `async`를 붙여주면 **AsyncFunction 객체를 반환**하는 하나의 **비동기 함수**를 정의할 수 있다. 이 비동기 함수는 **Promise를 사용하여 결과를 반환**한다.

```js
function getNumber() {
  return Promise.resolve(10);
}

async function getNumberAsync() {
  return 10;
}

console.log(func()); // Promise { 1 }
console.log(asyncFunc()); // Promise { 1 }
```

#### 2.3.2. `await`

`await`연산자는 **Promise가 처리될 때까지 기다리기 위해 사용**한다. 즉 비동기 방식을 동기 방식으로 사용할 수 있도록 해준다.

`async`로 선언된 함수 내부에서만 사용 가능하다.

`Promise.then`의 기능을 대체할 수 있다. `await`을 사용하는 것이 가독성 측면에서 유리하다.

```js
async function foo() {
function addOne(number) {
  return Promise.resolve(number + 1);
}

async function addOneAsync(number) {
  return number + 1;
}

function addTwo(number) {
  return Promise.resolve(number + 2);
}

async function addTwoAsync(number) {
  return number + 2;
}

// Promise.then을 사용하는 경우
addOne(10)
  .then(addTwo)
  .then(console.log); // 13

// async/await를 사용하는 경우
async function addThreeAsync() {
  const number = await addOneAsync(10);
  const result = await addTwoAsync(number);
  console.log(result); // 13
}
```
