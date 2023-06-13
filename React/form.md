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

함수 컴포넌트에서는 `useRef()`를 사용하여 비제어 컴포넌트를 구현한다. 함수 컴포넌트에서는 `useRef()` 메서드를 사용하여 ref 객체를 생성하여 단일한 요소에 대한 참조를 가져올 수 있고 추가로 `ref.current`를 사용하면 해당 요소를 참조하고 있는 대상에 접근할 수도 있다.

아래는 함수 컴포넌트에서 `useRef`를 사용하여 비제어 컴포넌트를 구현한 예제이다.

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
        // 함수 컴포넌트에서 ref 속성을 사용할 수는 없지만, 함수 컴포넌트 내부에서 DOM 요소나 클래스 컴포넌트에 인스턴스에 접근하기 위해 ref 속성을 사용하는 것은 가능 !
        ref={inputRef}
      />
      <input type="submit" value="제출" />
    </form>
  );
}
```

아래는 클래스 컴포넌트에서 `createRef`를 사용하여 비제어 컴포넌트를 구현한 예제이다.

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

ref 속성은 컴포넌트의 DOM 요소나 컴포넌트 인스턴스에 대한 참조 가져와서 해당 요소의 속성을 수정하거나 메서드를 호출하는 등의 작업을 수행할 수 있다. 또한 ref 속성은 React의 가상 DOM과 실제 DOM을 연결하는 역할을 한다. ref 속성을 사용하면 컴포넌트 외부에서 해당 컴포넌트의 DOM 요소에 직접적인 접근이 가능해지며, 이를 통해 input 요소에 포커스를 주거나, 특정 컴포넌트의 메서드를 호출하는 등 다양한 작업이 가능하게 한다.

ref 속성을 리액트 컴포넌트에서 사용할 때는 함수 컴포넌트와 클래스 컴포넌트에서 다르게 사용된다. ref 속성은 리액트 컴포넌트가 마운트되면 해당 컴포넌트의 인스턴스를 가리키는 객체를 반환한다. 이 인스턴스는 클래스 컴포넌트에서 생성되며, 클래스 컴포넌트에서만 ref 속성를 사용할 수 있다. 그러나, 함수 컴포넌트에서는 인스턴스 개념이 존재하지 않기 때문에, 함수 컴포넌트에는 ref 속성을 사용할 수 없다. (함수 컴포넌트 내부에서 DOM 요소나 클래스 컴포넌트에 인스턴스에 접근하기 위해 사용하는 것은 가능!)

ref 속성은 다른 속성과 마찬가지로 컴포넌트에 전달된다. ref 속성을 사용하여 React 엘리먼트 또는 컴포넌트의 인스턴스에 접근할 수 있다.

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
      // CustomTextInput 컴포넌트가 클래스 컴포넌트일 경우 ref 속성을 사용할 수 있다.
      // 만약 CustomTextInput 컴포넌트가 함수 컴포넌트라면 동작하지 않는다.
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

### 3.1. `forwardRef()`

`forwardRef()`을 이용하여 부모 컴포넌트가 자식 컴포넌트의 ref를 자신의 ref로서 외부에 노출시키게 함으로써 함수 컴포넌트에서도 ref을 사용할 수 있다.

아래는 `forwardRef()`을 사용하여 함수 컴포넌트인 자식 컴포넌트에서 ref 속성을 사용하여 자식 컴포넌트에 접근하는 예제이다.

> 📌 부모 컴포넌트 'CatParent'
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
>         {/* 생성한 catRef를 Cat 컴포넌트의 ref 속성으로 전달한다.  */}
>         {/* 아래의 Cat 컴포넌트는 함수 컴포넌트지만, 해당 컴포넌트에서 forwardRef을 사용하고 있으므로, ref 속성을 사용할 수 있다. */}
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
> // 자식 컴포넌트는 forwardRef()를 사용하여 ref 속성을 전달받는다.
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
>         // 전달받은 ref 속성에 img 요소가 연결된다.
>         ref={ref}
>       ></img>
>     </div>
>   );
> });
>
> export default Cat;
> ```

이렇게 CatRef 속성, ref 속성, img 속성이 연결되면, CatParent 컴포넌트에서 'catRef.current'를 통해 Cat 컴포넌트 내부의 img 요소에 대한 참조를 얻을 수 있다. 따라서 'catRef.current.height'와 같은 방법으로 Cat 컴포넌트의 img 요소의 height를 얻을 수 있다.

### 3.2. `useImperativeHandle()`

한편 `forwardRef()`를 사용하여 자식 컴포넌트의 인스턴스를 부모 컴포넌트에 전달할 수 있는데, 자식 컴포넌트의 모든 메서드나 속성이 부모 컴포넌트에서 직접적으로 사용될 필요는 없다. 이때, `useImperativeHandle()`을 사용하면 부모 컴포넌트에서 사용할 메서드나 속성만 선택적으로 노출시킬 수 있다.

### 3.3. 변경 가능한 ref 객체

`useRef()`는 current 속성으로 전달된 인자(initialValue)로 초기화된 '변경 가능한 ref 객체'를 반환한다. 즉, `useRef()`는 current 속성에 변경 가능한 값을 담고 있는 "상자"와 같은 것이다. 그렇다면 `useRef()` 역시 `useState()`처럼 상태값을 관리하기 위한 용도로 사용할 수도 있다.

`useRef()`는 내용이 변경될 때 그것을 알려주지는 않는다. current 속성을 변형하는 것이 리렌더링을 발생시키지는 않는다. 이는 장점이 될 수도 있고, 단점이 될 수도 있다. 만약 리액트가 DOM 노드에 ref를 attach하거나 detach할 때 어떤 코드를 실행하고 싶다면 대신 '콜백 ref'를 사용한다.

아래 예제는 이러한 `useRef()`의 특성을 잘 보여주는 예제이다.

```js
import React, { useRef, useState } from "react";
import Cat from "./Cat";

export default function CatParent() {
  const catRef = useRef();

  console.log("부모 컴포넌트 CatParent");
  console.log(catRef);

  const ageRef = useRef(1);
  const [state, setState] = useState(1);

  console.log(ageRef.current);

  return (
    <div>
      <h4> 고양이가 세상을 구한다 ️</h4>
      <div>
        <Cat a="a" ref={catRef} />
        <h4>나이: {ageRef.current}</h4>
        <h4>상태값: {state}</h4>
        <button
          onClick={() => {
            alert(catRef.current.height);
          }}
        >
          고양이의 크기를 알고싶어
        </button>
        <button
          onClick={() => {
            ageRef.current = ageRef.current + 1;
          }}
        >
          새해
        </button>
        <button
          onClick={() => {
            setState(state + 1);
          }}
        >
          리렌더링
        </button>
      </div>
    </div>
  );
}
```

'새해' 버튼을 클릭하더라도 나이는 변경되지 않지만 '리렌더링' 버튼을 클릭하면 클릭한 횟수만큼 나이가 올라가는 것을 확인할 수 있다. 이는 값에 변경이 이뤄지기는 하지만 리렌더링되지는 않는 useRef의 특성을 잘 보여준다.

## 3.4. 콜백 ref

📌 부모 컴포넌트 'CallbackParentCat'

```js
import React, { useRef, useState } from "react";
import CallbackCat from "./CallbackCat";

export default function CallbackCatParent() {
  const [height, setHeight] = useState(1);
  // node 매개변수는 전달된 ref 객체가 연결되는 DOM 엘리먼트를 의미한다.
  // node가 null이 아닌 경우에만 setHeight 함수가 실행되므로, DOM 엘리먼트가 실제로 마운트된 이후에 해당 높이 값을 가져온다.
  const callbackCatRef = (node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  };

  return (
    <div>
      <h4> 고양이가 세상을 구한다 ️</h4>
      <div>
        {/* 원래는 ref 속성에 ref 객체를 넣었는데, ref 콜백 함수를 넣는 것으로 변경 */}
        <CallbackCat a="a" ref={callbackCatRef} />
        <h4>키: {height}</h4>
      </div>
    </div>
  );
}
```

📌 자식 컴포넌트 'CallbackCat'

```js
import React, { forwardRef, useEffect, useState } from "react";

const CallbackCat = forwardRef((props, ref) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <img
        src="https://static01.nyt.com/images/2016/03/30/universal/ko/well_cat-korean/well_cat-superJumbo-v2.jpg?quality=90&auto=webp"
        alt="cat"
        style={{ width: "150px" }}
        ref={loaded ? ref : undefined}
        // 이미지가 로드되는 시점에 height가 일시적으로 0으로 출력되어 파생되는 문제를 해결하기 위한 onload 속성
        onLoad={() => {
          alert("onload");
          setLoaded(true);
        }}
      ></img>
    </div>
  );
});

export default CallbackCat;
```

위와 같은 방식으로 콜백함수인 'callbackCatRef'를 'CallbackCat'의 ref으로 전달하여 렌더링을 유도할 수 있다.

한편 `onLoad()` 함수에 이벤트 핸들러를 인라인 형식으로 넘기는 방식은 간편하지만, 매번 렌더링 될 때마다 새로운 함수를 생성하기 때문에 성능 문제가 발생할 수 있다. 아래와 같이 useCallback Hook을 사용하여 이러한 성능 문제를 해결할 수 있다.

```js
import React, { forwardRef, useCallback, useEffect, useState } from "react";

const CallbackCat = forwardRef((props, ref) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    alert("onload");
    setLoaded(true);
  }, []);

  return (
    <div>
      <img
        src="https://static01.nyt.com/images/2016/03/30/universal/ko/well_cat-korean/well_cat-superJumbo-v2.jpg?quality=90&auto=webp"
        alt="cat"
        style={{ width: "150px" }}
        ref={loaded ? ref : undefined}
        onLoad={handleLoad}
      />
    </div>
  );
});

export default CallbackCat;
```

콜백 함수를 `useCallback()`으로 감싸면 최초 렌더링 시 함수를 생성하고, 다음 렌더링 시에는 이전에 생성된 함수를 재사용한다. 이렇게 메모리제이션된 함수는 새로운 참조값을 가지지 않기 때문에, 부모 컴포넌트에서 콜백 함수가 변경되어도 자식 컴포넌트에서 불필요한 리렌더링이 발생하지 않는다.
