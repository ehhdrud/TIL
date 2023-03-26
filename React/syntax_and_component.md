# 리액트 기본 문법과 컴포넌트 소개

## 1. JSX

JSX(JavaScript XML)는 React에서 사용되는 자바스크립트의 확장 문법으로, 이를 사용하면 HTML과 유사한 구문으로 React 엘리먼트를 작성할 수 있습니다. 즉, 자바스크립트와 HTML의 문법이 합쳐진 형태를 띄고 있다.

### 1.1. JSX에 JS의 표현식 포함시키기

HTML 요소 내부에 중괄호를 통해 자바스크립트 표현식을 포함시킬 수 있다.

한편 JSX 자체도 표현식이기 때문에 if, for 안에 사용하고, 변수에 할당하고, 인자로서 받아들이고, 함수로부터 반환할 수 있다.

```js
function App() {
  const message = (name) => {
    if (name === "dongkyeong") return `Hello, ${name}! Learn React`;
    return `Welcome, ${name}! Learn React`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {message("Zerobase")}
        </a>
      </header>
    </div>
  );
}
```

### 1.2. JSX 속성 정의

JSX가 DOM 요소를 리턴할 때 기본적으로 요소들이 가지고 있던 표준 속성들을 모두 사용할 수 있다.

JSX는 HTML 보다는 JS에 가깝기 때문에, React DOM은 HTML 어트리뷰트 이름 대신 카멜 표기법에 따른 프로퍼티 명명 규칙을 따른다. 예를 들어 'tabindex'는 'tabIndex'가 된다. 'class', 'for' 등은 이미 자바스크립트의 예약어이기 때문에, 각각 'className', 'htmlFor'로 사용한다.

```js
function App() {
  const message = (name) => {
    if (name === "dongkyeong") return `Hello, ${name}! Learn React`;
    return `Welcome, ${name}! Learn React`;
  };

  return (
    <div className="App" tabIndex="0">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {message("Zerobase")}
        </a>
      </header>
      <input type="checkbox" name="agreement" id="agreement-el"></input>
      <label htmlFor="agreement-el">동의</label>
    </div>
  );
}
```

### 1.3. 조건부 렌더링

#### 1.3.1. 삼항 연산자 이용

if문, for문 등은 자바스크립트 표현식 자체가 아니라 자바스크립트를 사용한 것일 뿐이므로, HTML 요소 내부에 포함시킬 수 없다. 그러나 삼항연산자는 자바스크립트의 표현식이므로, HTML 요소 내에 포함될 수 있다.

```js
function App() {
  const name = "seodongkyeong";

  return (
    <div className="App" tabIndex="0">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {name === "dongkyeong"
            ? `Hello, ${name}! Learn React`
            : `Welcome, ${name}! Learn React`}
        </a>
      </header>
      <input type="checkbox" name="agreement" id="agreement-el"></input>
      <label htmlFor="agreement-el">동의</label>
    </div>
  );
}
```

#### 1.3.2. 논리연산자 이용

AND, OR 논리 연산자를 이용해 조건문을 표현할 수 있다.

자바스크립트에서 논리 연산자 `&&`는 `true && expression`일 때 `expression`으로 평가되고, `false && expression`일 때 `false`로 평가된다. 즉, 첫 번째 피연산자가 `true`라면 두 번째 피연산자(`expression`)가 반환되고, 첫 번째 피연산자가 `false`라면 첫 번째 피연산자(`false`)가 반환되는 것이다. 여기서 주의할 점은, 조건이 'falsy'한 표현식이라 falsy한 표현식이 반환된다면, React는 여전히 조건문을 건너뛰지만, falsy한 표현식이 그대로 출력된다는 것이다. 해당 조건 앞에 NOT 연산자 두개(`!!`)를 붙여서 확실히 false값으로 만들어주면 falsy한 표현식이 그대로 출력되는 것을 방지할 수 있다.

```jsx
render() {
  const count = 0;
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

그러므로 'false'나 'Messages: 0'이 표시되는 것이 아니라, '0'이 표시되게 된다.

논리연산자 `||`는 `true || expression`일 때 `true`으로 평가되고, `false || expression`일 때 `expression`로 평가된다. 즉, 첫 번째 피연산자가 `true`라면 첫 번째 피연산자(`true`)가 반환되고, `false`라면 두 번째 피연산자(`expression`)가 반환된다.

아래 예시는 AND, OR 논리 연산자를 이용한 조건문이다.

```js
/* {message("Zerobase")} */
// name === "dongkyeong"
//   ? `Hello, ${name}! Learn React`
//   : `Welcome, ${name}! Learn React`
(name === "dongkyeong" && `Hello, ${name}! Learn React`) ||
  `Welcome, ${name}! Learn React`;
```

이처럼 논리 연산자를 통해 삼항 연산자를 대체할 수도 있다.

## 2. 컴포넌트

컴포넌트를 통해 UI를 여러 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있다.

컴포넌트는 항상 대문자로 시작하도록 작성한다.

다음은 'App.js'에서 'Header' 컴포넌트를 가져오는 예제이다.

> 💬 `Header.js`
>
> ```js
> import logo from "../logo.svg";
>
> export default function Header() {
>   const name = "seodongkyeong";
>   const count = 0;
>
>   return (
>     <div>
>       <header className="App-header">
>         <img src={logo} className="App-logo" alt="logo" />
>         <p>
>           Edit <code>src/App.js</code> and save to reload.
>         </p>
>         <a
>           className="App-link"
>           href="https://reactjs.org"
>           target="_blank"
>           rel="noopener noreferrer"
>         >
>           {(name === "dongkyeong" && `Hello, ${name}! Learn React`) ||
>             `Welcome, ${name}! Learn React`}
>           <div>{count && <h1>Messages: {count}</h1>}</div>
>         </a>
>       </header>
>     </div>
>   );
> }
> ```

> 💬 `App.js`
>
> ```js
> import "./App.css";
> import Header from "./component/Header";
>
> export default function App() {
>   return (
>     <div className="App" tabIndex="0">
>       <Header />
>       <input type="checkbox" name="agreement" id="agreement-el"></input>
>       <label htmlFor="agreement-el">동의</label>
>     </div>
>   );
> }
> ```

### 2.1. 컴포넌트를 정의하는 방법

#### 2.1.1. 함수 컴포넌트

```js
function Hello(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

#### 2.2.2. 클래스 컴포넌트

```js
class Hello extends React.Componet {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### 2.2. `props`

React 컴포넌트의 `props`는 컴포넌트 내부에서 사용되는 속성값들을 의미한다. 컴포넌트가 사용되는 곳에서 해당 컴포넌트에 대한 설정 정보를 전달하거나, 데이터를 전달하는 등의 역할을 한다.

HTML 파일에서 React 컴포넌트에 props 값을 전달할 때, 중괄호({})를 사용하고, JS 파일에서 이를 읽어올 때는 해당 컴포넌트를 사용하는 부모 컴포넌트의 매개변수에 `props`를 전달해주어야 한다.

아래의 'Header_props.js', 'App.js'를 통해 `props` 사용 방법을 확인할 수 있다.

> 💬 `Header_props.js`
>
> ```js
> import logo from "../logo.svg";
>
> const Header = (props) => {
>   return (
>     <div>
>       <header className="App-header">
>         <img src={logo} className="App-logo" alt="logo" />
>         <p>
>           Edit <code>src/App.js</code> and save to reload.
>         </p>
>         <a
>           className="App-link"
>           href="https://reactjs.org"
>           target="_blank"
>           rel="noopener noreferrer"
>         >
>           {props.title}
>         </a>
>       </header>
>     </div>
>   );
> };
>
> export default Header;
> ```

> 💬 `App.js`
>
> ```js
> import "./App.css";
> import Header from "./component/Header_props";
>
> function App() {
>   return (
>     <div className="App" tabIndex="0">
>       <Header title={"Learn React A"} />
>       <Header title={"Learn React B"} />
>       <Header title={"Learn React C"} />
>     </div>
>   );
> }
>
> export default App;
> ```

#### 2.2.1. `props.children`

`props.children`은 컴포넌트의 여는 태그와 닫는 태그 사이의 내용을 가르킨다.

예를 들어 `<header> Learn React </header>`와 같은 요소가 있다면 'Learn React'가 Header의 `props.children`이다.
