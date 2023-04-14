# 리액트에서의 `<form>` 요소

`<input>`, `<label>`, `<textarea>`, `<select>` 등의 HTML 폼 엘리먼트들은 자체적으로 상태를 관리한다. 예를 들어, `<input>` 요소의 경우에는 사용자가 입력한 값을 내부적으로 유지하고, 이 값을 폼 전송 시에 서버로 전송한다. 리액트에서 이를 관리하려면 '제어 컴포넌트(Controlled Component)' 기술을 사용해야 한다. 제어 컴포넌트를 사용하면, 폼 엘리먼트의 값을 React 컴포넌트의 state로 저장하고, 이를 업데이트하는 방식으로 값을 관리할 수 있다.

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
