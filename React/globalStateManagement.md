# 전역 상태 관리

전역 상태 관리는 애플리케이션의 상태를 관리하고 각 컴포넌트 간의 데이터 전달을 보다 쉽고 효율적으로 처리하기 위한 방법이다.

일반적으로, React에서는 props를 사용하여 컴포넌트 간에 데이터를 전달한다. 그러나 컴포넌트 계층 구조가 복잡하고, 많은 수의 컴포넌트가 중간에 위치할 때 props를 사용하여 데이터를 전달하는 것은 번거롭고, 관리하기 어려울 수 있다. 예를 들어, A-B-C-D 라는 컴포넌트가 아래로 뻗어있다고 생각해보자. D 컴포넌트에서 A 컴포넌트의 상태(데이터)를 받아오려면 B,C 컴포넌트를 거쳐야 한다. 이 때 B,C 컴포넌트는 단순히 데이터를 전달해주는 역할을 하게 되고 이러한 상태 관리는 매우 비효율적이다. 그러나 전역으로 데이터를 관리한다면, A 아래 어떤 자식 컴포넌트든 해당 데이터에 수월하게 접근할 수 있다. 이는 애플리케이션의 유지 보수성을 향상시키고, 코드의 재사용성을 높이는 효과가 있다.

## 1. Context API

React의 Context API는 컴포넌트 간에 전역적으로 데이터를 공유하는 방법을 제공한다.

Context API는 Provider와 Consumer라는 두 가지 컴포넌트로 이루어져 있다. Provider는 Context의 값을 설정하는 컴포넌트이고, 자식 컴포넌트에게 값을 전달한다. Consumer는 Context의 값을 가져오는 컴포넌트이고, Context의 값을 사용하여 UI를 렌더링한다.

### 1.1. creatContext

createContext 함수는 Context 객체를 반환하며, 이 객체는 Provider와 Consumer 컴포넌트를 생성할 때 사용한다. createContext 함수의 인자로는 Context 객체의 초기값을 전달할 수 있다. 이 값은 Provider가 없을 때에 기본값으로 사용된다.

Provider는 value prop을 받아서 이 값을 하위에 있는 컴포넌트에게 전달하며, 값을 전달받을 수 있는 컴포넌트의 수에 제한은 없다. Provider 하위에 또 다른 Provider를 배치하는 것도 가능하며, 이 경우 하위 Provider의 값이 우선시된다. Provider 하위에서 context를 구독하는 모든 컴포넌트는 Provider의 value prop가 바뀔 때마다 다시 렌더링된다.

```js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserStore(props) {
  const [job, setJob] = useState("FE-developer");

  const user = {
    name: "seodongkeyong",
    job,
    changeJob: (updatedJob) => setJob(updatedJob),
  };

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}
```

### 1.2. useContext

useContext는 Context 객체의 값을 가져오는 훅이다. Context 객체를 인자로 받아 해당 Context 객체의 값을 반환한다.

useContext 훅이 추가된 이후로는 Consumer 컴포넌트를 사용하지 않고도 Context 값을 간편하게 받아올 수 있다.

```js
import React, { useContext } from "react";
import { UserContext } from "../store/user";

export default function BlogPage() {
  const userInfo = useContext(UserContext);
  console.log(userInfo);

  return (
    <div>
      <h1>BlogPage</h1>
    </div>
  );
}
```

## 1.3. Context API와 useReducer를 이용한 전역 상태 관리

위는 useState를 통해 전역 상태를 관리한 예제라면, 아래는 useReducer를 통해서 전역 상태를 관리할 수 있다. useReducer를 이용한다면 상태를 사용하는 컴포넌트의 수가 많을 때, 혹은 복잡한 로직을 구현할 때 더 적합하다.

> **💬 user.js**
>
> ```js
> import React, { createContext, useReducer } from "react";
>
> export const UserContext = createContext();
>
> const reducer = (state, action) => {
>   switch (action.type) {
>     case "changeJob":
>       return { ...state, job: action.text };
>
>     default:
>       throw new Error();
>   }
> };
> const initialUser = {
>   name: "seodongkeyong",
>   job: "FE-developer",
> };
>
> export default function UserStore(props) {
>   const [user, dispatch] = useReducer(reducer, initialUser);
>   console.log(user);
>
>   return (
>     <UserContext.Provider value={{ user, dispatch }}>
>       {props.children}
>     </UserContext.Provider>
>   );
> }
> ```

> **💬 blogPage.js**
>
> ```js
> import React, { useContext } from "react";
> import { UserContext } from "../store/user";
>
> export default function BlogPage() {
>   const { dispatch } = useContext(UserContext);
>   console.log(dispatch);
>
>   return (
>     <div>
>       <h1>BlogPage</h1>
>       <button
>         onClick={() => dispatch({ type: "changeJob", text: "BE-developer" })}
>       >
>         ChangeJob
>       </button>
>     </div>
>   );
> }
> ```

Context API와 useReducer를 이용한 전역 상태 관리 예제이다. 위 코드에서 BlogPage 컴포넌트는 Context 객체인 UserContext에서 dispatch만을 가져와 사용하고 있는데, 만약 user에 변경이 일어나서 BlogPage가 리렌더링된다면 불필요한 리렌더링이 발생하는 것이다. (이 문제는 Context API와 useState를 이용한 전역 상태 관리에서도 마찬가지이다!)

이 문제를 해결하려면 사용할 각 속성을 하나하나의 컴포넌트로 나눠서 관리하거나 Redux를 사용해야 한다.

## 2. Redux

Redux는 React 애플리케이션에서 상태를 효율적으로 관리하기 위한 상태 관리 라이브러리이자, Redux는 Flux 아키텍처(단방향 데이터 흐름을 강제하는 애플리케이션)의 구현체 중 하나이다. Redux는 전역적인 상태를 관리하며 React 컴포넌트 간에 데이터를 공유하는 데 유용하므로 React의 컴포넌트 기반 설계와 함께 사용하기에 적합하다. Redux를 사용하면 상태를 중앙 집중적으로 관리할 수 있으며, React 컴포넌트는 오직 필요한 데이터만을 props로 전달받아 사용할 수 있다. 또한 애플리케이션의 복잡도를 낮출 수 있으며, 개발자가 애플리케이션의 상태를 쉽게 추적하고 디버그할 수 있다.

Redux는 설치가 필요하다.

```bash
npm install redux
```

Rudux는 useReducer와 마찬가지로 Reducer 함수를 사용하고, 상태 변화를 일으키는 정보를 포함하는 action 객체를 사용한다. 초기 상태를 정의할 때 초기값을 인자로 전달하는 것이 아니라 createStore 함수를 통해 Store 객체를 생성하여 초기 상태를 정의한다(이는 createContext와 유사한 방식!).

Store 객체는 subscribe, dispatch, getState 메서드를 가진다.

- subscribe  
  : 스토어의 상태가 업데이트될 때마다 호출되는 콜백 함수를 등록하는 메서드이다. 이를 통해 스토어의 변화를 확인할 수 있다.

- dispatch
  : 스토어에 액션을 보내서 상태를 변경하는 메서드이다. 액션은 애플리케이션에서 발생하는 이벤트나 사용자 입력과 같은 것들을 나타내며, 반드시 type이라는 프로퍼티를 가지고 있어야 한다. useReducer에서 사용하는 dispatch와 동일이다.

- getState  
  : 스토어의 현재 상태를 반환하는 메서드이다. 이를 통해 현재 상태를 확인할 수 있다.

### 2.1. Redux Toolkit

Redux Toolkit은 Redux 개발을 단순화하고 개발 생산성을 향상시키는 데 도움을 주는 공식적인 Redux 패키지다.

Redux Toolkit은 설치가 필요하다.

```bash
npm install @reduxjs/toolkit
```

다음은 Redux Toolkit의 대표적인 함수이다.

#### 2.1.1. `configureStore()`

Redux Store를 생성하는 데 사용되는 기능이다. 이를 사용하면 일반적인 Redux Store를 구성하는 데 필요한 작업들을 자동으로 처리할 수 있다.

configureStore는 다음과 같은 인자(key)를 가진다.

- reducer  
  : 리듀서 함수를 전달한다. 리덕스 스토어의 상태를 변경하는 역할을 한다.
- **middleware**  
  : 미들웨어 함수나 배열을 전달한다. 액션 디스패치와 리듀서의 실행 사이에 실행되는 함수로, 리덕스의 동작을 확장하거나 변경하는 역할을 한다.
- devTools  
  : Redux DevTools를 사용하기 위한 설정이다. true로 설정하면 Redux DevTools Extension을 사용할 수 있고, false로 설정하면 Redux DevTools를 사용하지 않는다.
- preloadedState  
  : 스토어의 초기 상태를 설정할 수 있다.
- enhancer  
  : 스토어를 보강하는 역할을 하는 함수이다. 보통 Redux DevTools Extension과 같은 추가 기능을 사용할 때 활용된다.

### 2.2. `createReducer()`

일반적으로 Redux에서는 액션의 타입별로 분기를 처리하는 switch문으로 리듀서를 작성한다. 그러나 이렇게 작성된 리듀서는 코드량이 많아지면 유지보수가 어렵고, 코드의 가독성이 떨어지는 단점이 있다. createReducer는 이러한 문제점을 개선하기 위해, 간단한 객체 형태로 리듀서를 작성할 수 있도록 도와준다. 객체 형태로 작성된 리듀서는 각각의 액션 타입에 해당하는 함수를 가지며, 이 함수는 이전 상태를 인자로 받아서 새로운 상태를 반환한다.

### 2.3. `createSlice()`

Reducer와 Action Creator를 한 번에 생성하는 기능이다. 이를 사용하면 보일러플레이트 코드를 줄일 수 있고 Redux 리듀서를 쉽게 작성할 수 있다.

createSlice 함수는 리듀서 함수(creatReducer)와 액션 생성자 함수(createAction)를 모두 생성합니다. 이 함수를 사용하여, 슬라이스(slice)라는 개념을 도입하고, 슬라이스 별로 리듀서를 관리할 수 있습니다. 슬라이스는 애플리케이션의 상태(state)에서 특정한 영역을 담당합니다.

createSlice 함수의 첫 번째 인자(key)로는 슬라이스의 이름과 초기 상태를 객체 형태로 전달한다. 두 번째 인자로는 객체 형태의 리듀서 케이스와 미들웨어 함수를 전달할 수 있다. 슬라이스 이름은 name 속성으로, 초기 상태는 initialState 속성으로 정의한다. 리듀서 케이스는 reducers 속성으로 전달한다.
