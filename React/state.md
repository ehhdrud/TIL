# state(상태)

리액트의 state를 이해하려면, 우선 리액트의 작동 방식을 알아볼 필요가 있다. 리액트는 자바스크립트의 라이브러리로, 자바스크립트 코드를 사용하지만, 일반적인 자바스크립트와는 다른 작동 방식을 갖는다. 자바스크립트는 웹페이지가 로드될 때 한번 실행되고, 이벤트가 발생할 때마다 자바스크립트 코드를 실행한다. 하지만 리액트는 '상태를 변경'하면 가상 DOM(Virtual DOM)을 생성하여, 이전의 가상 DOM과 생성된 새로운 가상 DOM을 비교하여 변경된 부분만 업데이트한다. 따라서 실제 DOM 조작을 최소화하기 때문에 성능 향상에 도움이 된다.

state는 컴포넌트 내부에서 관리되는 데이터를 의미한다. state는 컴포넌트가 렌더링될 때, 그리고 사용자와의 상호작용으로 인해 변경될 때 사용된다. 그러므로 리액트에서 브라우저에 어떤 변화를 주기 위해선 state를 조작해야 한다.

만약 state를 조작하는 것이 아닌, 이벤트를 발생시켜 화면에 변화를 주는 코드를 실행한다면 어떻게 동작할까?

> 💬 `Counter.js`
>
> ```js
> import React from "react";
>
> export default function Counter() {
>   let count = 0;
>   return (
>     <div>
>       <button onClick={() => (count += 1)}>+1</button>
>       <br />
>       Counter: {count}
>     </div>
>   );
> }
> ```

> 💬 `App.js`
>
> ```js
> import "./App.css";
> import Counter from "./components/Counter";
>
> function App() {
>   return (
>     <div className="App">
>       <Counter />
>     </div>
>   );
> }
>
> export default App;
> ```

예상한대로 버튼을 클릭하더라도 의도한 대로 'count'가 증가하지 않는다. 왜냐하면 리액트에서는 이벤트가 발생한다고해서 코드가 실행되지 않기 때문에 처음에 렌더링됐던 0이 계속 남아있게 된다. 그러므로 state를 조작하여 데이터를 관리해야 한다.

state는 클래스 컴포넌트와 함수형 컴포넌트에서 모두 사용될 수 있다. 클래스 컴포넌트에서는 state를 클래스 내부에서 선언하고, 함수형 컴포넌트에서는 Hook 함수 중 하나인 `useState`를 사용한다.

## 1. `useState`

useState는 React 훅(Hook) 중 하나로, 함수 컴포넌트에서 상태를 관리하는 데 사용된다. 해당 훅을 사용하려면 다음과 같이 React 모듈에서 `useState` 함수를 가져와야 한다.

```js
//`useState`와 같이 React 모듈에서 내보낸 기능은 default export가 아닌, named exports이므로 중괄호를 사용하여 가져와야 한다.
import React, { useState } from "react";
```

`useState`는 배열을 반환한다. 일반적으로 `const [state, setState] = useState(initialstate)` 형태로 표현한다. 첫 번째 요소는 '현재의 상태값'이고, 두 번째 요소는 '상태를 변경할 때 쓰는 함수'로 리렌더링을 발생시킨다. `state`에 직접 접근해서 속성을 수정해서는 안되고, `setState`를 이용하여 조작해야 한다. 매개변수인 'initialstate'에는 상태의 초기값을 할당해준다.

아래는 state를 사용해 'Counter.js'를 수정한 코드이다.

```js
import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <br />
      Counter: {count}
    </div>
  );
}
```

이제는 버튼을 클릭하면 'count'가 증가한다. 이를 통해 React의 상태 관리는 `useState`를 활용해야 한다는 것을 확인할 수 있다.

## 2. state 불변성

불변성이란 '메모리 영역의 값을 직접적으로 변경하지 않는다'는 의미를 지닌다.

리액트가 리렌더링될 때 이전 state와 이후 state를 비교한다. 이때 메모리 영역의 값을 직접 변경하면, 즉, 불변성을 지키지 않으면 리액트는 state가 바뀌었다고 인지하지 못한다. 왜냐하면 리액트는 자바스크립트와 마찬가지로 '얕은 비교'가 기본이기 때문이다. 즉 리액트에서 변화를 인식하려면 메모리 영역의 값을 직접 변경하는 방식이 아닌, 메모리 영역 자체를 바꿔야 한다.

> **📌 얕은 비교(Shallow Compare)란?**
>
> 얕은 비교란 객체의 프로퍼티를 비교할 때, 해당 객체의 참조가 같은 경우에만 같은 것으로 판단하는 비교 방식이다. 즉, 두 객체가 같은 프로퍼티를 가지고 있지만, 서로 다른 메모리 주소를 가리키고 있다면, 얕은 비교에서는 두 객체를 다른 것으로 간주한다.

### 2.1. 원시 타입

원시 타입의 값, 즉 숫자(number), 문자열(string), 불리언(boolean), null, undefined, 심볼(symbol)은 값 복사(pass-by-value) 방식으로 변수에 할당된다.

변수에 원시 타입의 값을 할당하면 메모리에는 '값 자체'가 저장된다. 변수에 값을 다시 할당하면 이전의 메모리 공간을 남긴 채로(이것이 불변!) 새로운 메모리 주소가 생성된다. 즉 원시 타입은 불변성을 지니므로, 리액트에서 문제가 되지 않는다.

> **💬 원시 타입 할당 예시**
>
> ```js
> import React, { useState } from "react";
>
> export default function Counter() {
>   const [count, setCount] = useState(0);
>   const [show, setShow] = useState(true);
>   const operators = ["+", "-", "*"];
>   const [operator, setOperator] = useState(operators[0]);
>
>   return (
>     <div>
>       <button
>         onClick={() => {
>           let result;
>           if (operator === "+") result = count + 1;
>           if (operator === "-") result = count - 1;
>           if (operator === "*") result = count * 1;
>           setCount(result);
>         }}
>       >
>         {operator}1
>       </button>
>       <button onClick={() => setShow(!show)}>Show and Hide</button>
>       <button
>         onClick={() => {
>           const idx = Math.floor(Math.random() * operators.length);
>           setOperator(operators[idx]);
>         }}
>       >
>         Change Operator
>       </button>
>       <br />
>       {show && `Counter: ${count}`}
>     </div>
>   );
> }
> ```

### 2.2. 참조 타입

참조 타입의 값, 즉 객체(object), 배열(array), 함수(function), Date 등은 있다. 참조 타입의 값은 참조 복사(pass-by-reference) 방식으로 할당된다.

#### 2.2.1. 문제점

반면, 변수에 참조 타입의 값을 할당한다면, 메모리에는 '메모리 주소를 가르키는 참조값'이 할당된다. 변수에 값을 다시 할당하면, 변수의 참조값에 따른 메모리 공간을 그대로 사용하기 때문에 불변성을 가지지 않는다. 그러므로 참조 타입은 리액트에서 사용 시 주의를 기울여야 한다.

> **💬 잘못된 참조 타입 할당 예시**
>
> ```js
> import React, { useState } from "react";
>
> export default function Counter() {
>   const operators = ["+", "-", "*"];
>   const [info, setInfo] = useState({
>     count: 0,
>     show: true,
>     operator: operators[0],
>   });
>
>   return (
>     <div>
>       <button
>         onClick={() => {
>           let result;
>           if (info.operator === "+") result = info.count + 1;
>           if (info.operator === "-") result = info.count - 1;
>           if (info.operator === "*") result = info.count * 1;
>           info.count = result;
>           const newInfo = info;
>           setInfo(newInfo);
>         }}
>       >
>         {info.operator}1
>       </button>
>       <button
>         onClick={() => {
>           info.show = !info.show;
>           const newInfo = info;
>           setInfo(newInfo);
>         }}
>       >
>         Show and Hide
>       </button>
>       <button
>         onClick={() => {
>           const idx = Math.floor(Math.random() * operators.length);
>           info.operator = operators[idx];
>           const newInfo = info;
>           setInfo(newInfo);
>         }}
>       >
>         Change Operator
>       </button>
>       <br />
>       {info.show && `Counter: ${info.count}`}
>     </div>
>   );
> }
> ```

#### 2.2.2. 해결책

그렇다면 리액트에서 참조값인 객체에 변화를 주려면 어떻게 해야할까? 위 예제처럼 객체의 속성 값을 직접 변경하면 안되고, 이전 상태를 복제하고 변경된 속성 값을 수정한 새로운 객체를 생성하여 전달해야 한다. 그렇다면 불변성이 유지되어 리액트는 상태변경을 감지하여 렌더링할 수 있게 된다.

`setState({ ...state, newItem})`를 사용하여 문제를 해결할 수 있다. 이렇게 하면, 스프레드 연산자를 사용하여 'info' 객체의 모든 속성을 새로운 객체에 복사하고 새로운 객체의 속성을 변경하는 방식을 통해 불변성을 가지게 하여 변화를 감지한다.

> **💬 올바른 참조 타입 할당 예시**
>
> ```js
> import React, { useState } from "react";
>
> export default function Counter() {
>   const operators = ["+", "-", "*"];
>   const [info, setInfo] = useState({
>     count: 0,
>     show: true,
>     operator: operators[0],
>   });
>
>   return (
>     <div>
>       <button
>         onClick={() => {
>           let result;
>           if (info.operator === "+") result = info.count + 1;
>           if (info.operator === "-") result = info.count - 1;
>           if (info.operator === "*") result = info.count * 1;
>           setInfo({ ...info, count: result });
>         }}
>       >
>         {info.operator}1
>       </button>
>       <button
>         onClick={() => {
>           setInfo({ ...info, show: !info.show });
>         }}
>       >
>         Show and Hide
>       </button>
>       <button
>         onClick={() => {
>           const idx = Math.floor(Math.random() * operators.length);
>           // setOperator(operators[idx]);
>           setInfo({ ...info, operator: operators[idx] });
>         }}
>       >
>         Change Operator
>       </button>
>       <br />
>       {info.show && `Counter: ${info.count}`}
>     </div>
>   );
> }
> ```

만약 변경하고자 하는 데이터가 배열이라면, `setState([...state, newItem])`를 사용하여 불변성을 가지게 할 수 있다.

## 3. props와 state 비교

props는 부모 컴포넌트가 자식 컴포넌트에게 전달하는 값으로, 값을 자신(자식 컴포넌트)이 변경할 수 없다.

state는 자신(컴포넌트)가 스스로 관리하는 값으로, 값을 자신이 변경할 수 있다.

props를 통해 값을 내려 받거나 state에 변경이 발생하면 컴포넌트 렌더링이 발생한다는 공통점이 있다.

## 4. 비동기로 이루어지는 setState

React는 성능을 위해 여러 `setState()` 호출을 단일 업데이트로 한꺼번에 처리할 수 있다. 즉 `setState()` 호출은 비동기적으로 이뤄진다.

다음 코드를 살펴보자.

```js
import React, { useState } from "react";

export default function App() {
  const [number, setNumber] = useState(1);

  const add = () => setNumber(number + 1);
  const subtract = () => setNumber(number - 1);
  const multiplyBy2 = () => setNumber(number * 2);
  const multiplyBy2AndAddBy1 = () => {
    multiplyBy2();
    add();
  };

  return (
    <div>
      <h1>Number : {number}</h1>
      <div>
        <button onClick={add}>+ 1</button>
        <button onClick={subtract}>- 1</button>
        <button onClick={multiplyBy2}>*2</button>
        <button onClick={multiplyBy2AndAddBy1}>*2 + 1</button>
      </div>
    </div>
  );
}
```

위 코드에서 '\*2 + 1' 버튼을 눌러도 `multiplyBy2()`, `add()` 모두 실행되는 것이 아니라, `add()`만 실행되는 것을 확인할 수 있다. 이러한 오류는 state의 업데이트가 동기적으로 실행되는 것이 아니라 여러 업데이트가 예약되어 나중에 일괄적으로 처리되기 때문에 발생한다. 즉 마지막으로 호출된 `add()` 함수에서 사용되는 'number' 변수는 `multiplyBy2()`의 결과값이 아니라 multiplyBy2()에서도 사용되었던 'number'의 값이다. 만약 초기값이 '5'라면, 결과적으로 `multiplyBy2AndAddBy1()` 함수는 { 5, 10, 6 } 이라는 3개의 Number를 가지게 되고 마지막 결과값인 6이라는 결과로 덮어씌워져 출력되는 것이다.

이러한 문제는 setState의 인자를 넘겨줄 때 콜백 함수를 넘겨주면 해결된다. 콜백 함수를 전달하면, setState 함수는 이전 값을 매개변수로 받아서, 이전 값에 대해 즉시 새로운 값을 계산한다. 아래 코드는 setState에 대한 수정이다.

```js
import React, { useState } from "react";

export default function App() {
  const [number, setNumber] = useState(1);

  const add = () => setNumber((number) => number + 1);
  const subtract = () => setNumber((number) => number - 1);
  const multiplyBy2 = () => setNumber((number) => number * 2);
  const multiplyBy2AndAddBy1 = () => {
    multiplyBy2();
    add();
  };

  return (
    <div>
      <h1>Number : {number}</h1>
      <div>
        <button onClick={add}>+ 1</button>
        <button onClick={subtract}>- 1</button>
        <button onClick={multiplyBy2}>*2</button>
        <button onClick={multiplyBy2AndAddBy1}>*2 + 1</button>
      </div>
    </div>
  );
}
```

이렇게 setState의 인자로 콜백 함수가 들어간 코드를 실행하면 정상적으로 `multiplyBy2AndAddBy1()` 함수가 실행되는 것을 확인할 수 있다.

## 5. 단방향 데이트 흐름

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다. 이를 '하향식' 또는 '단방향식' 데이터 흐름이라고 한다. 모든 state는 항상 특정한 컴포넌트가 소유하고 있으며 그 state로 부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의 아래에 있는 컴포넌트에만 영향을 미친다.

## 6. state 끌어올리기

React에서의 데이터 흐름은 일방향이기 때문에, 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하면서 하위 컴포넌트에서는 해당 데이터를 사용할 수 있다. 그러나 하위 컴포넌트에서 데이터를 수정하고자 할 때는 상위 컴포넌트로 데이터를 다시 전달하여 업데이트를 수행해야 한다. 'state 끌어올리기'는 state를 최상위 부모 컴포넌트로 옮김으로써, 상태 데이터를 수정할 때 상위 컴포넌트에서 업데이트를 수행하고 하위 컴포넌트로 다시 전달하는 방식을 취한다. 이를 통해 상태 데이터가 단방향 데이터 흐름을 유지하면서도 상태를 효율적으로 관리할 수 있도록 한다.

state 끌어올리기를 사용하면 컴포넌트에서 상태 데이터를 최상위 부모 컴포넌트로 옮기므로, 해당 부모 컴포넌트에서 데이터를 관리하고, 다른 하위 컴포넌트에서는 이 데이터를 참조하는 방식으로 '단일 진실 공급원'을 구현할 수 있다. 단일 진실 공급원이란 애플리케이션 내에서 데이터의 원본을 정의하고, 다른 모듈이나 컴포넌트에서는 이 원본 데이터를 참조하는 방식의 소프트웨어 설계를 의미한다.
