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

## 2. Redux

> **📌 useReducer를 사용한 예제**
>
> > **💬 user.js**
> >
> > ```js
> > import React, { createContext, useReducer } from "react";
> >
> > export const UserContext = createContext();
> >
> > const reducer = (state, action) => {
> >   switch (action.type) {
> >     case "changeJob":
> >       return { ...state, job: action.text };
> >
> >     default:
> >       throw new Error();
> >   }
> > };
> > const initialUser = {
> >   name: "seodongkeyong",
> >   job: "FE-developer",
> > };
> >
> > export default function UserStore(props) {
> >   const [user, dispatch] = useReducer(reducer, initialUser);
> >   console.log(user);
> >
> >   return (
> >     <UserContext.Provider value={dispatch}>
> >       {props.children}
> >     </UserContext.Provider>
> >   );
> > }
> > ```
>
> > **💬 blogPage.js**
> >
> > ```js
> > import React, { useContext } from "react";
> > import { UserContext } from "../store/user";
> >
> > export default function BlogPage() {
> >   const dispatch = useContext(UserContext);
> >   console.log(dispatch);
> >
> >   return (
> >     <div>
> >       <h1>BlogPage</h1>
> >       <button
> >         onClick={() =>
> >           dispatch({ type: "changeJob", text: "BE-developer" })
> >         }
> >       >
> >         ChangeJob
> >       </button>
> >     </div>
> >   );
> > }
> > ```
