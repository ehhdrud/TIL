# State

리액트의 State(상태)를 이해하려면, 우선 리액트의 작동 방식을 알아볼 필요가 있다. 리액트는 자바스크립트의 라이브러리로, 자바스크립트 코드를 사용하지만, 일반적인 자바스크립트와는 다른 작동 방식을 갖는다. 자바스크립트는 웹페이지가 로드될 때 한번 실행되고, 이벤트가 발생할 때마다 자바스크립트 코드를 실행한다. 하지만 리액트는 '상태를 변경'하면 가상 DOM(Virtual DOM)을 생성하여, 이전의 가상 DOM과 생성된 새로운 가상 DOM을 비교하여 변경된 부분만 업데이트한다. 따라서 실제 DOM 조작을 최소화하기 때문에 성능 향상에 도움이 된다.

State는 컴포넌트 내부에서 관리되는 데이터를 의미한다. State는 컴포넌트가 렌더링될 때, 그리고 사용자와의 상호작용으로 인해 변경될 때 사용된다. 그러므로 리액트에서 브라우저에 어떤 변화를 주기 위해선 State를 조작해야 한다.

만약 State를 조작하는 것이 아닌, 이벤트를 발생시켜 화면에 변화를 주는 코드를 실행한다면 어떻게 동작할까?

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

예상한대로 버튼을 클릭하더라도 의도한 대로 'count'가 증가하지 않는다. 왜냐하면 리액트에서는 이벤트가 발생한다고해서 코드가 실행되지 않기 때문에 처음에 렌더링됐던 0이 계속 남아있게 된다. 그러므로 State를 조작하여 데이터를 관리해야 한다.

State는 클래스 컴포넌트와 함수형 컴포넌트에서 모두 사용될 수 있다. 클래스 컴포넌트에서는 state를 클래스 내부에서 선언하고, 함수형 컴포넌트에서는 Hook 함수 중 하나인 `useState`를 사용한다.

## `useState`

useState는 React 훅(Hook) 중 하나로, 함수 컴포넌트에서 상태를 관리하는 데 사용된다. 해당 훅을 사용하려면 다음과 같이 React 모듈에서 `useState` 함수를 가져와야 한다.

```js
//`useState`와 같이 React 모듈에서 내보낸 기능은 default export가 아닌, named exports이므로 중괄호를 사용하여 가져와야 한다.
import React, { useState } from "react";
```

`useState`는 배열을 반환한다. 일반적으로 `const [state, setState] = useState(initialState)` 형태로 표현한다. 첫 번째 요소는 '현재의 상태값'이고, 두 번째 요소는 '상태를 변경할 때 쓰는 함수'로 리렌더링을 발생시킨다. 매개변수인 'initialState'에는 상태의 초기값을 할당해준다.

아래는 State를 사용해 'Counter.js'를 수정한 코드이다.

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
