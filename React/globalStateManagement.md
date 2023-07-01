# 전역 상태 관리

전역 상태 관리는 애플리케이션의 상태를 관리하고 각 컴포넌트 간의 데이터 전달을 보다 쉽고 효율적으로 처리하기 위한 방법이다.

일반적으로, React에서는 props를 사용하여 컴포넌트 간에 데이터를 전달한다. 그러나 컴포넌트 계층 구조가 복잡하고 많은 수의 컴포넌트가 중간에 위치할 때 props를 사용하여 데이터를 전달하는 것은 번거롭고 관리하기 어려울 수 있다. 예를 들어, A-B-C-D 라는 컴포넌트가 아래로 뻗어있다고 생각해보자. D 컴포넌트에서 A 컴포넌트의 상태(데이터)를 받아오려면 B,C 컴포넌트를 거쳐야 한다. 이 때 B,C 컴포넌트는 단순히 데이터를 전달해주는 역할을 하게 되고 이러한 상태 관리는 매우 비효율적이다.

그러나 전역으로 데이터를 관리한다면 A 아래 어떤 자식 컴포넌트든 해당 데이터에 수월하게 접근할 수 있다. 이는 애플리케이션의 유지 보수성을 향상시키고 코드의 재사용성을 높이는 효과가 있다.

## 1. Context API

React의 Context API는 컴포넌트 간에 전역적으로 데이터를 공유하는 방법을 제공한다. **상태를 트리 구조로 전파하는 방식으로 동작하며, 컴포넌트마다 개별적인 상태를 가질 수 있다**

Context API는 Provider와 Consumer라는 두 가지 컴포넌트로 이루어져 있다. (현재는 Consumer 대신 useContext를 주로 사용한다.) Provider는 Context의 값을 설정하는 컴포넌트이고, 자식 컴포넌트에게 값을 전달한다. Consumer는 Context의 값을 가져오는 컴포넌트이고, Context의 값을 사용하여 UI를 렌더링한다.

### 1.1. `creatContext` / `Provider` / `useContext`

createContext 함수는 Context 객체를 반환하며, 이 객체는 Provider와 useContext를 통해 값을 제공하고 제공받는다. createContext 함수의 인자로는 Context 객체의 초기값을 전달할 수 있다. 이 값은 Provider가 없을 때에 기본값으로 사용된다.

Provider는 value를 통해 하위에 있는 컴포넌트에게 값을 전달한다. Provider 하위에 또 다른 Provider를 배치하는 것도 가능하며, 이 경우 하위 Provider의 값이 우선시된다. Provider 하위에서 context를 구독하는 모든 컴포넌트는 Provider의 value prop가 바뀔 때마다 다시 렌더링된다. 이 때 값을 전달받을 수 있는 컴포넌트의 수에 제한은 없다.

useContext는 Context 객체의 값을 가져오는 훅으로, Context 객체를 인자로 받아 해당 Context 객체의 값을 반환한다. useContext 훅이 추가된 이후로는 Consumer 컴포넌트를 사용하지 않고도 간편하게 Context 값을 받아올 수 있다.

### 1.2. Context API와 useState()를 이용한 전역 상태 관리

아래는 Context API와 useState를 이용한 전역 상태 관리 예제이다.

> **💬 App.js**
>
> ```js
> import { BrowserRouter, Routes, Route } from "react-router-dom";
> import MainPage from "./components/MainPage";
> import TechPage from "./components/TechPage";
> import BlogPage from "./components/BlogPage";
> import JavascriptPage from "./components/JavascriptPage";
> import ReactPage from "./components/ReactPage";
> import ReactDocPage from "./components/ReactDocPage";
> import Logo from "./components/Logo";
> import UserStore from "./store/user";
>
> function App() {
>   return (
>     <UserStore>
>       <BrowserRouter>
>         <Routes>
>           <Route path={"/"} element={<Logo />}>
>             <Route path={"/"} element={<MainPage />} />
>             <Route path={"tech"} element={<TechPage />}>
>               <Route path="javascript" element={<JavascriptPage />} />
>               <Route path="react" element={<ReactPage />}>
>                 <Route path=":docId" element={<ReactDocPage />} />
>               </Route>
>             </Route>
>             <Route path={"blog"} element={<BlogPage />} />
>           </Route>
>         </Routes>
>       </BrowserRouter>
>     </UserStore>
>   );
> }
>
> export default App;
> ```

> **💬 user.js**
>
> ```js
> import React, { createContext, useState } from "react";
>
> export const UserContext = createContext();
>
> export default function UserStore(props) {
>   const [job, setJob] = useState("FE-developer");
>
>   const user = {
>     name: "seodongkeyong",
>     job,
>     changeJob: (updatedJob) => setJob(updatedJob),
>   };
>
>   return (
>     <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
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
>   const userInfo = useContext(UserContext);
>   console.log(userInfo);
>   // name: "seodongkeyong", job: "FE-developer", changeJob: updatedJob => setJob(updatedJob)
>
>   return (
>     <div>
>       <h1>BlogPage</h1>
>     </div>
>   );
> }
> ```

### 1.3. Context API와 useReducer()를 이용한 전역 상태 관리

추가로, useReducer를 사용하여 상태를 사용하는 컴포넌트의 수가 많을 때 혹은 복잡한 로직을 더 효율적으로 관리할 수 있다. 또한 Reducer 함수는 항상 동일한 입력에 대해 동일한 출력을 보장하므로, 상태 변화가 예측 가능하고 디버깅이 용이하며 시간에 따라 상태의 변경 히스토리를 쉽게 추적할 수 있다.

아래는 useState 대신 useReducer를 사용해서 전역 상태를 관리하는 예제이다.

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
>
>   return (
>     <div>
>       <h1>BlogPage</h1>
>       <button
>         onClick={() => dispatch({ type: "changeJob", text: "BE-developer" })}
>       >
>         {/* 버튼을 누르면 job을 변경하는 기능 추가 */}
>         ChangeJob
>       </button>
>     </div>
>   );
> }
> ```

위 코드에서 BlogPage 컴포넌트는 Context 객체인 UserContext에서 dispatch만을 가져와 사용하고 있는데, 만약 user에 변경이 일어나서 BlogPage가 리렌더링된다면 불필요한 렌더링이 발생하는 것이다. 이 문제는 Context API와 useState를 이용한 전역 상태 관리에서도 마찬가지이다.

이 문제를 해결하려면 사용할 각 속성을 하나하나의 컴포넌트로 나눠서 관리하거나 Redux를 사용해야 한다.

## 2. Redux

Redux는 React 애플리케이션에서 상태를 효율적으로 관리하기 위한 상태 관리 라이브러리이자, Redux는 Flux 아키텍처(단방향 데이터 흐름을 강제하는 애플리케이션)의 구현체 중 하나이다.

Redux를 사용하면 **하나의 중앙 집중화된 스토어(store)에 상태를 저장하고 관리할 수 있으며**, React 컴포넌트는 오직 필요한 데이터만을 props로 전달받아 사용할 수 있다. 또한 애플리케이션의 복잡도를 낮출 수 있으며, 개발자가 애플리케이션의 상태를 쉽게 추적하고 디버그할 수 있다.

Redux는 설치가 필요하다.

```bash
npm install redux
```

Rudux는 **useReducer를 사용하지 않고도 Reducer 함수를 통해 상태를 관리할 수 있다.** 초기 상태를 정의할 때 초기값을 인자로 전달하는 것이 아니라 `createStore()` 함수를 통해 Store 객체를 생성하여 초기 상태를 정의한다. 이 때 "미들웨어(Middleware)"를 사용하고자 한다면, 다음과 같이 `createStore()`의 두번째 인자에 `applyMiddleware()` 함수로 가져온 미들웨어를 넣어준다. (미들웨어에 대한 설명은 아래에서 다룸.)

```js
import { createStore, applyMiddleware } from "redux";

const store = createStore(rootReducer, applyMiddleware(middleware));
```

그 외의 중요 함수로 `combineReducers()` 함수가 있다. 이 함수는 여러 개의 reducer를 하나로 합친 'rootReducer'를 만드는 역할을 한다.

```js
import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
});

export default rootReducer;
```

> **📌 Store 객체의 메서드**
>
> - `subscribe`  
>   : 스토어의 상태가 업데이트될 때마다 호출되는 콜백 함수를 등록하는 메서드이다. 이를 통해 스토어의 변화를 확인할 수 있다.
>
> - `dispatch`
>   : 스토어에 액션을 보내서 상태를 변경하는 메서드이다. 액션은 애플리케이션에서 발생하는 이벤트나 사용자 입력과 같은 것들을 나타내며, 반드시 type이라는 프로퍼티를 가지고 있어야 한다. useReducer에서 사용하는 dispatch와 동일이다.
>
> - `getState`  
>   : 스토어의 현재 상태를 반환하는 메서드이다. 이를 통해 현재 상태를 확인할 수 있다.

> **📌 react-redux**
>
> react-redux 모듈은 React 애플리케이션과 Redux store를 연결하는 데에 특화되어 있다. react-redux 모듈을 사용하면 React 컴포넌트에서 Redux store의 상태를 가져오거나 액션을 디스패치하여 Redux 상태를 업데이트할 수 있다.
>
> react-redux 역시 설치가 필요하다.
>
> ```bash
> npm install react-redux
> ```
>
> 다음은 주요 리액트 함수이다.
>
> - `Provider`
>   : Redux store를 React 애플리케이션에 제공하여 하위 컴포넌트에서 Redux store에 접근할 수 있도록 하는 컴포넌트이다. Context API의 Provider와 유사하다.
> - `connect()`  
>   :Redux store와 React 컴포넌트를 연결하여 Redux 상태를 React 컴포넌트의 props로 전달하거나, Redux 액션을 React 컴포넌트에서 디스패치할 수 있도록 하여 React 컴포넌트에서 Redux 상태를 사용하거나 업데이트하는 함수이다.
> - `useSelector()`
>   : Redux 스토어에 있는 상태를 가져올 때 사용하는 함수이다.
> - `useDispatch()`
>   : 액션을 디스패치하는 함수를 가져올 때 사용하는 함수이다.
> - `useStore()`
>   : Redux 스토어를 가져올 때 사용하는 함수이다.

### 2.1. Redux Toolkit

Redux의 또 다른 장점은 **Redux Toolkit이라는 Redux 공식 패키지를 통해 개발 생산성을 향상**시킬 수 있다는 점이다.

Redux Toolkit은 설치가 필요하다.

```bash
npm install @reduxjs/toolkit
```

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

#### 2.1.2. `createReducer()`

일반적으로 Redux에서는 액션의 타입별로 분기를 처리하는 switch문으로 리듀서를 작성한다. 그러나 이렇게 작성된 리듀서는 코드량이 많아지면 유지보수가 어렵고, 코드의 가독성이 떨어지는 단점이 있다. createReducer는 이러한 문제점을 개선하기 위해, 간단한 객체 형태로 리듀서를 작성할 수 있도록 도와준다. 객체 형태로 작성된 리듀서는 각각의 액션 타입에 해당하는 함수를 가지며, 이 함수는 이전 상태를 인자로 받아서 새로운 상태를 반환한다.

#### 2.1.3. `createSlice()`

Reducer와 Action Creator를 한 번에 생성하는 기능이다. 이를 사용하면 보일러플레이트 코드를 줄일 수 있고 Redux 리듀서를 쉽게 작성할 수 있다.

createSlice 함수는 리듀서 함수(creatReducer)와 액션 생성자 함수(createAction)를 모두 생성한다. 이 함수를 사용하여, 슬라이스(slice)라는 개념을 도입하고, 슬라이스 별로 리듀서를 관리할 수 있다. 슬라이스는 애플리케이션의 상태에서 특정한 영역을 담당한다.

createSlice 함수의 첫 번째 인자(key)로는 슬라이스의 이름과 초기 상태를 객체 형태로 전달한다. 두 번째 인자로는 객체 형태의 리듀서 케이스와 미들웨어 함수를 전달할 수 있다. 슬라이스 이름은 name 속성으로, 초기 상태는 initialState 속성으로 정의한다. 리듀서 케이스는 reducers 속성으로 전달한다.

#### 2.1.4. `createAsyncThunk()`

미들웨어로, Redux에서 비동기 작업을 처리하는 데 최적화된 간단한 패턴을 제공한다. createAsyncThunk를 사용하면 액션 생성 함수를 자동으로 생성하여 API 호출에 대한 상태와 오류를 처리하는 등의 기능을 제공한다.

### 2.2. 미들웨어(Middleware)

Redux는 **다양한 미들웨어를 제공**한다. 미들웨어는 Redux와 같은 상태 관리 라이브러리에서 애플리케이션의 상태를 변경하기 전에 사용되는 함수로, 액션이 디스패치되는 과정에서 추가적인 동작을 수행하고 상태 변화를 제어할 수 있는 확장 기능이다.

로깅, 에러 처리와 같은 비동기 작업들은 액션을 전달하는 역할을 하는 dispatch 함수에 작성하여 처리하는 것은 가독성을 떨어뜨리고 유지보수도 어렵게 만든다. 한편 Reducer 함수는 '순수 함수(동일한 인자가 주어졌을 때, 동일한 결과를 반환하는 함수!)'로 작성되어야 하는데, 비동기 처리 작업은 같은 입력에 대해 다른 결과를 만들어내기 때문에 순수 함수의 조건을 위반하므로 Reducer에서는 아예 처리할 수는 없다. 이러한 이유 때문에 미들웨어는 Action과 Reducer 사이에서 위치하여 비동기 작업을 처리한다.

대표적인 비동기 통신을 위한 미들웨어로는 redux-thunk, redux-saga, redux-observable이 있다. 다만 요즘에는 Redux Toolkit과 함께 createAsyncThunk를 사용하는 추세이다.

> **📌 redux-thunk 예제**
>
> redux-thunk 미들웨어를 사용하면 다음과 같은 장점이 있다.
>
> 첫째, 액션 생성자 함수는 동기적으로 동작하기 때문에 미들웨어를 통해 비동기 작업을 수행한다. 그러므로 액션 생성자 함수 내부에서 API 호출 등의 비동기 작업 수행이 가능하게 한다. 이렇게 하면 컴포넌트에서 직접 비동기 작업을 수행하는 대신, 액션 생성자 함수 내부에서 비동기 작업을 처리하므로 컴포넌트는 단순히 액션을 디스패치한다. 이로써 컴포넌트의 역할을 단순화할 수 있다.
>
> 둘째, 비동기 작업의 상태를 관리하기 용이하다. 비동기 작업이 진행 중일 때는 로딩 상태를 표시하고, 작업이 완료되면 데이터를 업데이트해야 힌다. redux-thunk를 사용하면 이러한 작업을 쉽게 처리할 수 있다.
>
> 셋째, 액션 생성자 함수 내부에서 여러 개의 액션을 디스패치할 수 있다. 예를 들어, API 호출이 성공할 때는 성공 액션을 디스패치하고, 실패할 때는 실패 액션을 디스패치할 수 있다. 이렇게 함으로써 컴포넌트에서는 성공/실패 여부에 따라 분기 처리하는 것보다 더 간단하게 작성 가능하다.
>
> redux-thunk는 설치가 필요하다.
>
> ```bash
> npm install redux-thunk
> ```
>
> redux-thunk를 Redux store에 추가한다.
>
> ```js
> import { createStore, applyMiddleware } from "redux";
> import thunk from "redux-thunk";
>
> const store = createStore(rootReducer, applyMiddleware(thunk));
> ```
>
> dispatch 함수에 thunk 함수를 넣어준다.
>
> ```js
> function handleClick() {
>   dispatch(fetchUserThunk());
> }
> ```
>
> 다음은 액션 생성 함수로 비동기 처리를 가능하게 해주는 thunk 함수의 예제이다.
>
> ```js
> export const fetchUserThunk = () => {
>   return async (dispatch) => {
>     dispatch(fetchUserRequest());
>     try {
>       const res = await fetchUser();
>       dispatch(fetchUserSuccess({ name: res.name, email: res.email }));
>     } catch {
>       dispatch(fetchUserFailure());
>     }
>   };
> };
> ```

## 3. Recoil

Facebook에서 개발된 상태 관리 라이브러리로, 전역 상태 관리를 지원한다.

Recoil을 사용하면 **Atoms에서 Selectors를 거쳐 React 컴포넌트로 내려가는 data-flow graph를 만들 수 있다**. Atoms는 컴포넌트가 구독할 수 있는 상태의 단위다. Selectors는 Atoms 상태 값을 동기 또는 비동기 방식을 통해 변환하여 필요한 데이터를 만들어낸다. Atoms는 React의 로컬 컴포넌트의 상태 대신 사용할 수 있다. 동일한 Atom이 여러 컴포넌트에서 사용되는 경우 모든 컴포넌트는 상태를 공유한다. 상태 업데이트가 발생하면 관련된 컴포넌트들이 자동으로 업데이트되도록 설계되어 있다.

Recoil은 설치가 필요하다

```bash
npm i recoil
```

아래와 같이 `atom()` 함수를 통해 생성하고, `Selector()` 함수를 통해 필요한 데이터를 반환한다.

```js
// 현재 사용자의 ID를 저장하는 Atom
const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
});

// currentUserIDState를 사용하여 사용자 이름을 가져오는 Selector
const currentUserNameState = selector({
  key: "CurrentUserName",
  get: ({ get }) => {
    return tableOfUsers[get(currentUserIDState)].name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameState);
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <CurrentUserInfo />
    </RecoilRoot>
  );
}
```

Recoil의 가장 강력한 점은 아래와 같이 **비동기 데이터 쿼리를 통해 함수들이 비동기로 동작하는 기능을 제공한다**는 것이다. 위 코드를 아래와 같이 비동기로 작성할 수 있다.

```js
const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
});

// currentUserIDState Atom을 사용하여 비동기적으로 데이터베이스에서 사용자 이름을 가져오는 Selector
const currentUserNameStateQuery = selector({
  key: "CurrentUserName",
  get: async ({ get }) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    return response.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameStateQuery);
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <CurrentUserInfo />
    </RecoilRoot>
  );
}
```

추가적인 특징으로는, Recoil은 **promise가 resolve 되기 전에 보류중인 데이터를 다루기 위해 React Suspense와 함께 동작하도록 디자인되어 있다**는 점이다.

또한 **에러 처리 과정의 이점**도 있다. Selector는 컴포넌트에서 특정 값을 사용하려고 할 때에 어떤 에러가 생길지에 대한 에러를 던질 수 있는데, 이는 `<ErrorBoundary>`를 이용하여 쉽게 처리할 수 있다.

> 📌 그 외 (전역)상태 관리 라이브러리
>
> **Jotai**
>
> - Recoil의 영향을 받아 일본에서 만들어진 라이브러리
> - Recoil과 마찬가지로 Atoms 단위를 사용하지만, Jotai는 Atoms을 더 선언적인 방식으로 정의하여 사용하므로 가독성이 뛰어남
> - Recoil과 비슷한 기능을 제공
>
> **constate**
>
> - Context + State라는 의미로, Context API를 기반으로 단점을 보완한 상태 관리 라이브러리
> - 다른 라이브러리들과는 달리, 컴포넌트 내부에서 상태와 관련된 로직을 함께 작성하여, 코드의 가독성을 높일 수 있음

## 4. React-Query

비동기적 전역 상태 관리를 위해 redux-thunk, createAsyncThunk, recoil 등을 다 사용해봐도 너무 코드가 비대해지는 것 같다면, React-Query이 효율적인 대안이다.

React-Query는 **서버로부터 데이터를 가져오고 관리하기 위한 라이브러리로, 데이터에 대한 '패칭, 캐싱, 동기화, 업데이트'의 기능**을 가진다. 이 라이브러리는 **컴포넌트 수준에서 데이터를 관리할 수 있도록 하고, 비동기 데이터를 가져오는 로직을 컴포넌트에서 분리하여 관리하므로 코드가 더 간결해지고 유지보수가 용이**해진다.

React-Query는 전역 상태를 사용하여 데이터와 관련된 상태를 관리하지만, 이를 중앙 집중적으로 관리하지는 않는다. 즉, **상태 관리를 위한 별도의 store나 reducer가 필요하지 않으며, 전역 상태를 관리하기 위해 QueryClient라는 객체를 사용하고 컴포넌트 내부에서 필요한 Queries와 Mutation을 직접 정의하고 사용**한다. QueryClient 객체는 캐시와 쿼리의 상태를 관리하며, 전역으로 데이터를 저장하는 역할을 수행한다. useQuery와 useMutation 훅에서는 QueryClient 객체에 접근하여 캐시된 데이터를 가져오거나, 새로운 데이터를 쿼리하거나, 새로운 데이터를 변경하는 등의 작업을 수행한다. 이러한 방식은 Redux나 Recoil과는 다르다.

### 4.1. React-Query의 핵심 개념

#### 4.1.1. Queries

Query는 서버로부터 데이터를 가져오는, 고유한 키와 연결된 요청을 의미한다. Query는 Promise 기반의 모든 메서드(GET 및 POST 메서드 포함)와 함께 사용하여 서버에서 데이터를 가져오는 데 사용될 수 있다. React-Query에서는 useQuery 훅을 사용하여 데이터를 가져오는데, useQuery는 데이터를 요청하고, 캐싱하며, 리프레시를 관리한다. 또한 데이터를 다시 가져올 필요가 있을 때 자동으로 데이터를 재요청한다.

#### 4.1.2. Mutation

서버에 데이터를 수정하는 요청을 의미한다. React-Query에서는 useMutation 훅을 사용하여 데이터를 수정한다. useMutation은 데이터를 수정하고, 캐시를 업데이트하며, 성공 및 실패에 대한 상태를 반환한다.

#### 4.1.3. Query Invalidation

서버 데이터의 변경으로 인해 캐시된 데이터가 더 이상 유효하지 않을 때, 이전 데이터를 업데이트해야 하는데 이를 Query Invalidation이라고 한다. React-Query에서는 Query Invalidation을 위해 queryKey와 staleTime 등의 개념을 사용한다. queryKey는 서버 데이터의 변경 여부를 확인하기 위해 사용되며, staleTime은 데이터가 캐시에서 얼마나 오래된 상태로 유지될 수 있는지를 설정한다.

### 4.2. 주요 Hook

#### 4.2.1. `useQuery`

React 컴포넌트에서 데이터를 가져오기 위한 훅이며, query의 결과물을 가져와서 렌더링할 수 있다.

useQuery의 첫 번째 인자로는 고유한 키 값인 queryKey가 들어간다. 이 키는 캐시와 연결되며, 쿼리가 변경되거나 업데이트될 때마다 새로운 데이터를 가져오도록 트리거한다. 보통 이 키는 문자열 또는 배열로 구성된다. 두 번째 인자는 데이터를 가져오기 위해 비동기 작업을 실행하는 함수인 queryFn를 전달할 수 있다. 이 함수는 Promise를 반환해야 하며, useQuery가 자동으로 이 Promise를 처리하여 데이터를 캐시한다. 이 함수를 생략하면 useQuery는 첫 번째 인자로 전달된 queryKey에 해당하는 캐시된 데이터를 가져온다. 그러나 캐시된 데이터가 없으면, useQuery는 자동으로 queryKey에 해당하는 비동기 함수를 찾은 후 실행하여 데이터를 가져와 캐시한다. 이외에도 옵션에는 staleTime, cacheTime 등 다양한 설정이 가능하다.

useQuery가 반환하는 객체는 React 컴포넌트 내에서 사용될 수 있는 `data`, `isLoading`, `isError`와 같은 속성을 가지고 있다. data는 비동기적으로 받아온 데이터이고, isLoading은 데이터를 가져오는 중인지 여부를 나타내며, isError는 데이터를 가져오는 동안 오류가 발생했는지 여부를 나타낸다.

#### 4.2.2. `useQueries`

useQueries 훅은 여러개의 Query를 처리하는데 사용된다. useQuery와 같은 인자를 배열을 사용하여 설정한다. 이 배열은 개별 Query를 정의하는 객체들로 구성된다.

useQuery는 기본적으로 병렬적으로 동작하지만 Suspense Mode로 사용하면 useQuery는 병렬적으로 동작하지 않는다. 이 때, useQueries를 사용하면 병렬 처리를 구현할 수 있다.

#### 4.2.3. `useMutation`

데이터를 생성, 변경하거나 서버에서 어떤 일을 수행하는 데에 사용하는 훅으로, React-Query의 핵심 개념인 'Mutation'를 위한 훅이다.

useMutation은 첫 번째 인자로 콜백 함수를 받는데, 이 콜백 함수는 데이터를 변경하기 위한 API 요청을 수행하며, Promise 객체를 반환한다.

두 번째 인자는 객체 형태의 옵션으로, 이 옵션은 `onSuccess`, `onError` 등의 속성을 통해 useMutation에서 사용되는 mutate 함수의 동작을 세부적으로 제어할 수 있도록 해준다.

##### 4.2.3.1. `mutate()`

useMutation로 반환한 객체의 메서드로, 해당 객체를 처리하여 캐시를 업데이트하고 화면을 다시 렌더링하는 역할을 한다. mutate 함수의 인자는 useMutation의 콜백함수의 인자로 사용된다.

#### 4.2.4. `QueryClient`

new 연산자와 함께 사용하여 query client 인스턴스를 생성하는 컴포넌트이다.

#### 4.2.5. `useQueryClient`

query client를 가져오는데 사용하는 훅이다. query client를 이용해 캐시된 데이터를 가져올 수 있다.

#### 4.2.6.2. `invalidateQueries()`

useQueryClient로 반환한 객체의 메서드로, React-Query의 핵심 개념인 'Query Invalidation'를 위한 메서드이다. 쿼리의 기존 데이터가 더 이상 유효하지 않을 때 invalidateQueries 메서드는 해당 쿼리의 데이터를 만료 처리하고, 해당 쿼리를 다시 가져오는 작업을 수행한다. 이 때, 만료된 쿼리가 다른 컴포넌트에서 사용되고 있다면, 해당 컴포넌트도 자동으로 다시 렌더링된다.

#### 4.2.7. `QueryClientProvider`

query client를 하위 컴포넌트에서 사용할 수 있도록 제공해주는 Provider 컴포넌트이다. QueryClient로 생성한 객체를 client 속성의 인자로 넣어서 사용한다.

### 4.3. React-Query의 캐시(Ceche)

React-Query에서 전역 상태 관리는 캐시를 이용해서 이루어진다. 캐시는 데이터를 저장하고 관리하는 데 필요한 메모리 공간을 의미하며, React-Query에서는 이 캐시를 이용해서 API 호출 결과 등의 데이터를 저장하고 관리한다. 이 캐시는 React-Query 내부에서 자동으로 관리되며, 이전에 호출한 API의 응답 결과를 저장해서 동일한 요청이 있을 경우 API 호출을 생략하고 캐시된 결과를 반환하는 등의 성능 최적화가 가능하다. 또한, 캐시된 데이터를 인터셉트해서 다양한 방식으로 가공하거나 변형시켜서 사용할 수도 있다.

React-Query에서는 staleTime과 cacheTime 옵션을 제공하여 캐시와 관련된 시간을 조작한다. 이 두 가지 옵션을 사용하면, 데이터를 가져오는 데 필요한 비용을 최소화하고, 적절한 시기에 데이터를 업데이트할 수 있다. 이 옵션은 useQuery의 세 번째 인자에서 사용할 수 있다. 만약 모든 컴포넌트에 디폴트 값으로 설정하고 싶다면, QueryClient 생성자의 defaultOptions 객체의 속성 중 하나인 queries에 작성하면 된다.

#### 4.3.1. `staleTime`

React Query에서 useQuery나 useInfiniteQuery를 사용하여 쿼리를 수행할 때 기본적으로 캐시된 데이터를 "stale"한 것으로 간주한다. 캐시된 데이터가 stale하다는 것은 해당 데이터가 최신이 아니라는 의미로, 이는 서버에서 새로운 데이터가 업데이트되었을 때, React Query가 해당 데이터를 감지하고 자동으로 업데이트하기 위한 설정이라고 볼 수 있다.

staleTime은 데이터가 만료되기 전에 stale 상태로 남아있을 수 있는 최대 시간을 나타내는 옵션이다. 쉽게 말해 staleTime은 데이터가 stale 상태가 되는 시간을 의미한다. staleTime을 '0'으로 설정한다면, 항상 서버로부터 새로운 데이터를 가져오게 되고, 'Infinity'로 설정한다면 stale 상태가 되지 않으므로 데이터가 리패치되지 않는다. 만약 staleTime 값이 설정되지 않았다면, cacheTime 값이 사용된다.

#### 4.3.2. `cacheTime`

cacheTime은 데이터가 캐시에 유지되는 최대 시간을 나타내는 옵션이다. 예를 들어 cacheTime을 '15 \* 60 \* 1000'로 설정한다면 15분 동안은 데이터가 유지된다. cacheTime으로 설정한 시간이 지나면, React Query는 해당 쿼리 결과를 삭제하고, 이후 해당 쿼리에 대한 새로운 데이터 요청을 실행한다. 만약 cacheTime 값이 설정되지 않았다면 디폴트 값인 5분 동안 데이터가 유지된다.
