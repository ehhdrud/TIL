# 리액트의 `<form>` 요소

`<input>`, `<label>`, `<textarea>`, `<select>` 등의 HTML 폼 엘리먼트들은 자체적으로 상태를 관리한다. 예를 들어, `<input>` 요소의 경우에는 사용자가 입력한 값을 내부적으로 유지하고, 이 값을 폼 전송 시에 서버로 전송한다.

> **📌 리액트에서의 `<teaxarea>`**
>
> 리액트에서 `<textarea>` 요소는 자식으로 텍스트를 포함시키는 것이 아니라, value 속성을 사용하여 텍스트를 설정한다.
>
> ```js
> // <textarea>hello world</textarea>
> <textarea value="hello world" />
> ```

> **📌 리액트에서의 `<select>`**
>
> 리액트에서는 제어 컴포넌트를 위하여 selected 속성보다 value 속성을 사용하여 select 요소의 선택된 값을 설정하는 것이 권장된다.
>
> ```js
> /*
> <select>
>   <option value="apple">사과</option>
>   <option value="banana">바나나</option>
>   <option selected value="orange">오렌지</option>
> </select>
> */
> <select value="orange">
>   <option value="apple">사과</option>
>   <option value="banana">바나나</option>
>   <option value="orange">오렌지</option>
> </select>
> ```

## 1. 제어 컴포넌트(Controlled Component)

리액트에서 폼 앨리먼트의 값을 관리하려면 '제어 컴포넌트(Controlled Component)' 기술을 사용해야 한다. 제어 컴포넌트를 사용하면, 폼 엘리먼트의 값(value)을 React 컴포넌트의 state로 저장하고, 이를 업데이트하여 조작하는 방식으로 값을 관리할 수 있다.

아래는 제어 컴포넌트 기술을 이용하여 폼 엘리먼트의 값을 관리하는 예제이다.

```js
import React, { useState } from "react";

export default function SingleForm() {
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(nickname);
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>닉네임 : </label>
      <input
        type="text"
        name="nickname"
        onChange={handleChange}
        value={nickname}
      />
      <input type="submit" value="제출" />
    </form>
  );
}
```

아래는 함수 컴포넌트가 아닌 클래스 컴포넌트에서의 폼 엘리먼트의 값을 관리하는 예제이다.

```js
import React from "react";

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

아래는 제어 컴포넌트를 이용해 여러개의 입력을 제어하는 예제이다.

```js
import React, { useState } from "react";

export default function Lonin() {
  // const [id, setId] = useState("");
  // const [password, setPassword] = useState("");
  const [input, setInput] = useState({
    id: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, password } = input;
    alert(`아이디: ${id}, 패스워드: ${password}`);
  };

  const handleChange = (e) => {
    // if (e.target.name === "id") return setId(e.target.value);
    // setpassword(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>아이디 : </label>
      <input
        type="text"
        name="id"
        onChange={handleChange}
        // value={id}
        value={input.id}
      />
      <label>패스워드 : </label>
      <input
        type="text"
        name="password"
        onChange={handleChange}
        // value={password}
        value={input.password}
      />
      <input type="submit" value="확인" />
    </form>
  );
}
```

## 2. 비제어 컴포넌트(Uncontrolled Component)

리액트에서 폼 구현시 제어 컴포넌트를 사용하는 것이 좋지만, 모든 이벤트 핸들러를 등록하고, 모든 입력을 연결해야하기 때문에 다소 번거롭게 느껴질 수도 있다. 이럴 때 대안으로 고려할 수 있는 기술이 '비제어 컴포넌트(Uncontrolled Component)'이다.

제어 컴포넌트는 폼 데이터를 리액트 컴포넌트에서 다루지만, 비제어 컴포넌트는 DOM 자체에서 폼 데이터가 다루어진다. 예를 들어, `<input>` 요소의 value 속성은 상태로 관리하는 것이 아니라 DOM에서 직접 값을 가져와 처리하도록 한다. DOM 요소에 직접적으로 접근하기 위해서는 `ref`를 사용한다.

함수형 컴포넌트에서는 `useRef`, 클래스형 컴포넌트에서는 `createRef`를 사용하여 비제어 컴포넌트를 구현한다. `useRef`는 함수형 컴포넌트에서 사용할 수 있으며, `useRef()` 메서드를 사용하여 ref 객체를 생성한다. 생성한 ref 객체는 `ref.current` 형태로 사용할 수 있다. `createRef`는 클래스형 컴포넌트에서 사용할 수 있으며, `React.createRef()` 메서드를 사용하여 ref 객체를 생성한다. 생성한 ref 객체는 `this.refName` 형태로 사용할 수 있다.

ref 속성은 React 속성으로, 다른 속성과 마찬가지로 컴포넌트에 전달된다. ref 속성을 사용하여 React 엘리먼트 또는 컴포넌트의 인스턴스에 접근할 수 있다.

아래는 함수형 컴포넌트에서 `useRef`를 사용하여 비제어 컴포넌트를 구현한 예제이다.

```js
import React, { useRef } from "react";

export default function UncontrolledForm() {
  // useRef() 훅을 사용하여 ref 객체를 생성한다.
  const inputRef = useRef();

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    // inputRef.current를 사용하여 <input> 요소의 값에 접근한다.
    alert(inputRef.current.value);
    // ref.current.focus()는 React에서 사용되는 함수 중 하나로, 해당 ref가 가리키는 DOM 노드(element)에 포커스를 설정하는 역할을 한다.
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>닉네임 : </label>
      <input
        type="text"
        name="nickname"
        onChange={handleChange}
        // inputRef를 <input> 요소의 ref 속성으로 전달한다.
        // 함수 컴포넌트에서 ref 속성을 사용할 수는 없지만, 함수 컴포넌트 내부에서 DOM 요소나 클래스형 컴포넌트에 인스턴스에 접근하기 위해 ref 속성을 사용하는 것은 가능 !
        ref={inputRef}
      />
      <input type="submit" value="제출" />
    </form>
  );
}
```

아래는 클래스형 컴포넌트에서 `createRef`를 사용하여 비제어 컴포넌트를 구현한 예제이다.

```js
import React, { Component } from "react";

class UncontrolledForm extends Component {
  constructor(props) {
    super(props);
    // React.createRef() 메소드를 사용하여 ref 객체를 생성한다.
    this.inputRef = React.createRef();
  }

  handleChange = (e) => {
    console.log(e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // this.inputRef.current를 사용하여 <input> 요소의 값에 접근한다.
    alert(this.inputRef.current.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>닉네임 : </label>
        <input
          type="text"
          name="nickname"
          onChange={this.handleChange}
          // inputRef를 <input> 요소의 ref 속성으로 전달한다.
          ref={this.inputRef}
        />
        <input type="submit" value="제출" />
      </form>
    );
  }
}

export default UncontrolledForm;
```

## 3. ref 속성

ref 속성을 React 컴포넌트에서 사용할 때는 함수형 컴포넌트와 클래스형 컴포넌트에서 다르게 사용된다.

ref 속성은 React 컴포넌트가 마운트되면 해당 컴포넌트의 인스턴스를 가리키는 객체를 반환한다. 이 인스턴스는 클래스형 컴포넌트에서 생성되며, 클래스형 컴포넌트에서만 ref 속성를 사용할 수 있다. 그러나, 함수 컴포넌트에서는 인스턴스 개념이 존재하지 않기 때문에, 함수 컴포넌트에는 ref 속성을 사용할 수 없다. (함수 컴포넌트 내부에서 DOM 요소나 클래스형 컴포넌트에 인스턴스에 접근하기 위해 사용하는 것은 가능!)

```js
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    // 자식 컴포넌트의 메서드를 부모에서 실행시킬 수 있다 !
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      // CustomTextInput 컴포넌트가 클래스형 컴포넌트일 경우 ref 속성을 사용할 수 있다.
      // 만약 CustomTextInput 컴포넌트가 함수형 컴포넌트라면 동작하지 않는다.
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

### 3.1. `forwardRef()`

`forwardRef()`을 이용하여 부모 컴포넌트가 자식 컴포넌트의 ref를 자신의 ref로서 외부에 노출시키게 함으로써 함수형 컴포넌트에서도 ref을 사용할 수 있다.

아래는 `forwardRef()`을 사용하여 함수형 컴포넌트인 자식 컴포넌트에서 ref 속성을 사용하여 자식 컴포넌트에 접근하는 예제이다.

> 📌 부모 컴포넌트 'ParentCat'
>
> ```js
> import React, { useRef } from "react";
> import Cat from "./Cat";
>
> export default function CatParent() {
>   const catRef = useRef(); // useRef()를 사용하여 catRef를 생성한다.
>
>   console.log("부모 컴포넌트 CatParent");
>   console.log(catRef); // current: undefined
>
>   return (
>     <div>
>       <h4> 고양이가 세상을 구한다 ️</h4>
>       <div>
>         // catRef를 Cat 컴포넌트의 ref 속성으로 전달한다.
>         <Cat a="a" ref={catRef} />
>         <button
>           onClick={() => {
>             alert(catRef.current.height);
>           }}
>         >
>           고양이의 크기를 알고싶어
>         </button>
>       </div>
>     </div>
>   );
> }
> ```

> 📌 자식 컴포넌트 'Cat'
>
> ```js
> import React, { forwardRef, useEffect } from "react";
>
> // 자식 컴포넌트는 forwardRef()를 사용하여 ref를 받는다.
> const Cat = forwardRef((props, ref) => {
>   console.log("자식 컴포넌트 Cat");
>   console.log(ref); // current: undefined
>
>   useEffect(() => {
>     console.log("useEffect in Cat");
>     console.log(ref); // current: img
>   }, []);
>
>   return (
>     <div>
>       <img
>         src="https://static01.nyt.com/images/2016/03/30/universal/ko/well_cat-korean/well_cat-superJumbo-v2.jpg?quality=90&auto=webp"
>         alt="cat"
>         style={{ width: "150px" }}
>         // Cat 컴포넌트는 img 요소를 반환하고, ref 속성을 img 요소에 전달한다.
>         ref={ref}
>       ></img>
>     </div>
>   );
> });
>
> export default Cat;
> ```

이렇게 ref 속성이 전달되면, CatParent 컴포넌트에서 'catRef.current'를 통해 Cat 컴포넌트에 대한 참조를 얻을 수 있다. 따라서 'catRef.current.height'와 같은 방법으로 Cat 컴포넌트의 img 요소의 높이를 얻을 수 있다.

### 3.2. `useImperativeHandle()`

한편 `forwardRef()`를 사용하여 자식 컴포넌트의 인스턴스를 부모 컴포넌트에 전달할 수 있는데, 자식 컴포넌트의 모든 메서드나 속성이 부모 컴포넌트에서 직접적으로 사용될 필요는 없다. 이때, `useImperativeHandle()`을 사용하면 부모 컴포넌트에서 사용할 메서드나 속성만 선택적으로 노출시킬 수 있다.
