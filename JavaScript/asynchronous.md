# 비동기(Asynchronous)

## 1. 동기(Synchronous)와 비동기(Asynchronous)

## 1.1. 동기

동기란 순서대로 한번에 하나의 작업을 수행하는 것이고, 자바스크립트는 동기적 언어이다.

동기는 다른 말로 '싱글 스레드'라고도 부르는데 이는 하나의 Call Stackt만을 가지고 있음을 의미한다.

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

콜백 함수를 사용하면 순서에 상관없이 호출될 때만 원하는 동작을 실행시킬 수 있다. 이러한 동작은 비동기적 처리를 가능하도록 한다.

### 2.2. Promise

자바스크립트 비동기 처리에 사용되는 객체로, *내용은 실행되었지만 결과를 아직 반환하지 않은 객체*이다.

주로 서버에서 받아온 데이터를 화면에 표시할 때 사용한다.

비동기 연산이 종료된 이후에 결과값의 상태를 pending(대기), fullfilled(이행), rejected(실패)로 알려준다.

`resolve`와 `reject`는 자바스크립트가 자체적으로 제공하는 콜백함수이다.

<!--
new Promise에 전달되는 함수는 executer라고 부릅니다.
executor의 인수 resolve와 reject는 자바스크립트가 자체적으로 제공하는 콜백함수입니다. resolve와 reject를 신경 쓰지 않고 executor 안 코드만 작성하면 되지만, executor에선 상황에 따라 인수로 넘겨준 콜백(resolve, reject)중 하나를 반드시 호출해야 합니다.
 -->

#### 2.2.1. Promise의 3가지 상태

##### 2.2.1.1. pending

`new Promise`를 통해 메서드를 생성하는 동시에 초기 상태인 pending(대기) 상태가 된다.

`resolve`와 `reject` 인자를 사용할 수 있다.

##### 2.2.1.2. fulfilled

`resolve`인자를 실행하면 fulfilled(이행) 상태가 된다.

##### 2.2.1.3. rejected

`reject`인자를 실행하면 rejected(실패) 상태가 된다.

#### 2.2.2. Promise 메서드

##### 2.2.2.1. `Promise.then`

fullfiled 상태가 되면 `Promise.then`을 통해 처리 결과값을 받을 수 있다.

##### 2.2.2.2. `Promise.catch`

rejected 상태가 되면 `Promise.catch`를 통해 처리 결과값을 받을 수 있다.

##### 2.2.2.3. `Promise.resolve(value)`

`Promise.resolve` 메서드는 주어진 값(value)으로 이행하는 `Promise.then` 객체를 반환한다. 그 값이 Promise인 경우, Promise를 반환한다.

##### 2.2.2.4. `Promise.reject(reason)`

`Promise.reject` 메서드는 주어진 이유(reason)로 거부된 Promise를 반환한다.

##### 2.2.2.5. `Promise.finally`

Promise의 실행 여부와 관계없이 Promise가 처리된 후 무조건 한 번은 실행되는 코드이다.

체이닝의 마지막에 작성한다.

## 3. async, await

콜백 함수나 Promise를 연속적으로 사용한다면 이른바 "콜백 지옥" 또는 "then 지옥"에 빠질 수 있다.`async`와 `await`를 사용함으로써 해결할 수 있다.

### 3.1. `async`

일반적인 함수 선언 앞에 `async`를 붙여주면 AsyncFunction 객체를 반환하는 하나의 비동기 함수를 정의할 수 있다. 이 비동기 함수는 Promise를 사용하여 결과를 반환한다.

아래 두 코드는 동일한 결과를 갖는다.

```js
async function foo() {
  return 1;
}
```

```js
function foo() {
  return Promise.resolve(1);
}
```

### 3.2. `await`

`await`연산자는 Promise를 기다리기 위해 사용한다.

`async`로 선언된 함수 내부에서만 사용 가능하다.

`Promise.then`의 기능을 대체할 수 있다.

아래 두 코드는 동일한 결과를 갖는다.

```js
async function foo() {
  await 1;
}
```

```js
function foo() {
  return Promise.resolve(1).then(() => undefined);
}
```
