# 비동기(Asynchronous)

## 1. 동기(Synchronous)와 비동기(Asynchronous)

## 1.1. 동기

> 자바스크립트는 동기적 언어.  
> 순서대로 한 번에 하나의 작업을 수행.  
> '단일(싱글) 스레드'라고도 부름(자바스크립트는 하나의 Call stack만을 가지고 있음을 의미).
> 이러한 동작은 Memory Heap과 Call Stack으로 이루어진 *자바스크립트 엔진*으로부터 비롯됨.

- 동작 원리

1. 코드가 실행되면 순서대로 Call Stack에 실행할 함수가 쌓인다.(push)
2. 쌓인 반대 순서로 함수가 실행된다.(LIFO)
3. 실행이 된 함수는 Call Stack에서 제거된다(pop)

## 2.1. 비동기

> 자바스크립트는 단일 스레드, 동기식으로 동작하지만 비동기적 작업이 필요함.  
> 특히 자바스크립트가 웹 사이트에서 동작하려면 빠른 반응을 위해 비동기적 작업이 필수적.  
> 이러한 동작은 *자바스크립트 실행환경(런타임)*으로부터 비롯됨(자바스크립트 실행환경에서는 DOM, AJAX같은 비동기적 처리를 위한 Web API를 제공함).

- 동작원리

1. Call Stack에서 비동기 함수가 호출되면 Call Stack에 먼저 쌓였다가 Web API(백그라운드)로 이동한 후 해당 함수가 등록되고 Call Stack에서 사라진다.
2. Web API에서 비동기 함수의 이벤트가 발생하면, 해당 콜백 함수는 Callback Queue에 push(이동)된다.
3. 이제 Call Stack이 비어있는지 이벤트 루프(Event Loop)가 확인을 하는데 만약 비어있으면, Call Stack에 Callback Queue에 있는 콜백 함수를 넘겨준다(push).
4. Call Stack에 들어온 함수는 실행이 되고 실행이 끝나면 Call Stack에서 사라진다.

## 2. 콜백(Callback)

> 콜백 함수를 사용하면 순서에 상관없이 호출될 때만 원하는 동작을 실행시킬 수 있음.  
> 이러한 동작은 비동기적 처리를 가능하도록 함.  
> 비동기 처리를 위해 콜백 함수를 연속해서 사용하다보면 이른바 "콜백 지옥"에 빠질 수 있는데, 이를 해결하기 위해서는 각 콜백 함수를 분리해주거나 `Promise` 혹은 `async`와 `await`를 사용할 수 있음.

## 3. Promise

> 자바스크립트 비동기 처리에 사용되는 객체.  
> 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용.  
> 비동기 연산이 종료된 이후에 결과값의 상태를 대기(pending),이행(fullfilled),실패(rejected)로 알려줌.  
> `new Promise`를 통해 생성.

### 3.1 대기: `new Promise`

> 메서드를 호출하는 동시에 대기 상태(초기 상태)가 됨.  
> 콜백함수 인자로 `[resolve]`와 `[reject]`를 사용할 수 있음.

### 3.2. 이행: `[resolve]`, `Promise.then`

> 콜백 함수의 `[resolve]`인자를 실행하면 이행 상태가 됨.  
> 이행 상태가 되면 `Promise.then`을 통해 처리 결과값을 받을 수 있음.

### 3.3. 실패: `[reject]`, `Promise.catch`

> 콜백 함수의 `[reject]`인자를 실행하면 실패 상태가 됨.  
> 실패 상태가 되면 `Promise.catch`를 통해 처리 결과값을 받을 수 있음.

### 3.4. `Promise.resolve(value)`

> `Promise.resolve` 메서드는 주어진 값(value)으로 이행(fullfill)하는 `Promise.then`객체를 반환(그 값이 Promise인 경우, Promise를 반환).

### 3.5. `Promise.reject(reason)`

> `Promise.reject` 메서드는 주어진 이유(reason)로 거부(reject)된 Promise를 반환

### 3.6. `Promise.finally`

> Promise의 실행 여부와 관계없이 Promise가 처리된 후 무조건 한 번은 실행되는 코드.  
> 체이닝의 마지막에 작성.

## 4. async, await

### 4.1. `async`

> AsyncFunction객체를 반환하는 하나의 비동기 함수를 정의한다(일반적인 함수 선언 앞에 `async`를 붙여주면 됨).  
> 이 비동기 함수는 Promise를 사용하여 결과를 반환.

```javascript
async function foo() {
  return 1;
}
```

> 이 코드는 아래와 같음.

```javascript
function foo() {
  return Promise.resolve(1);
}
```

### 4.2. `await`

> `await`연산자는 Promise를 기다리기 위해 사용.  
> `async function`내부에서만 사용 가능.  
> `Promise.then`의 기능을 대체.

```javascript
async function foo() {
  await 1;
}
```

> 이 코드는 아래와 같음.

```javascript
function foo() {
  return Promise.resolve(1).then(() => undefined);
}
```
