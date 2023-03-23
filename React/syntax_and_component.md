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

자바스크립트에서 논리 연산자 `&&`는 `true && expression`일 때 `expression`으로 평가되고, `false && expression`일 때 `false`로 평가된다. 즉, 첫 번째 피연산자가 `true`라면 두 번째 피연산자(`expression`)가 반환되고, 첫 번째 피연산자가 `false`라면 첫 번째 피연산자(`false`)가 반환되는 것이다. 여기서 주의할 점은 'falsy'한 표현식이 반환된다면, React는 여전히 조건문을 건너뛰지만, falsy한 표현식이 그대로 출력된다는 것이다.

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
