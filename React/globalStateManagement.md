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