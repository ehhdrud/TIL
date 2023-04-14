# 리액트의 이벤트 처리

DOM 이벤트 핸들러에서는 이벤트 핸들러가 이벤트를 처리하는 동안에만 액세스 할 수 있는 이벤트 객체가 있다. 이 이벤트 객체는 이벤트가 발생한 요소와 관련된 정보를 제공한다. 그러나 리액트에서는 '합성 이벤트(SyntheticEvent)' 객체를 사용하여 이벤트 핸들러에서 이벤트 객체의 역할을 대신한다. 합성 이벤트는 이벤트가 발생하는 DOM 요소에 직접 연결되지 않지만, 이벤트 객체와 마찬가지로 이벤트가 발생한 요소에 대한 정보, 이벤트의 타입, 이벤트가 발생한 위치 등의 정보를 포함한다.

리액트의 이벤트 핸들러에서는 `return false`를 입력해도 이벤트의 기본 동작을 막지 못한다. 대신 `e.preventDefault()` 또는 `e.stopPropagation()`와 같은 메서드를 호출하는 방식으로 기본 동작, 이벤트 전파를 방지할 수 있다.

아래 코드에서 `e`는 합성 이벤트 객체이다.

```js
export default function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

위 예제는 `e.preventDefault()`를 통해 form 요소의 기본 동작을 방지하는 예제이다. form 요소의 기본 동작인 summit 이벤트가 작동하지 않는 것을 확인할 수 있다.

```js
import { useState } from "react";

const Banner = () => {
  const getCoupon = () => {
    alert("10% 할인 쿠폰에 담청 되었습니다.");
  };

  const [visible, setVisible] = useState(true);
  const closeBanner = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  return (
    visible && (
      <div
        style={{
          backgroundColor: "orange",
          fontWeight: "bold",
          height: "50px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        onClick={getCoupon}
      >
        이 곳을 클릭해서 쿠폰을 받아가세요.
        <button onClick={closeBanner}>닫기</button>
      </div>
    )
  );
};

export default Banner;
```

위 예제는 `e.stopPropagation()`를 통해 이벤트 전파를 막는 예제이다. 닫기 버튼을 클릭하면 의도한 대로 'getCoupon' 함수는 실행되지 않고 'closeBanner' 함수만 실행되는 것을 확인할 수 있다

## 클래스 컴포넌트의 이벤트 처리

클래스의 컴포넌트는 함수 컴포넌트에 비해 이벤트를 처리할 때 주의할 점이 있다. 이벤트 핸들러 내부에서 this 키워드를 사용할 경우, this가 예상한 대상을 참조하지 않을 수 있기 때문이다.

```js
import React from "react";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this);
  }

  handleClick() {
    console.log("handleClick");
    console.log(this);
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    console.log("render");
    console.log(this);

    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}

export default Toggle;
```

위 예제에서 'handleClick' 함수 내부에 존재하는 this는 예상한 대상을 참조하지 않고 undefined로 출력된다. 이러한 문제를 해결하기 위해서는 핸들러 내부에서 this를 올바르게 참조하려면 bind 메서드를 사용해야 한다.

```js
constructor(props) {
  // ...
  this.handleClick = this.handleClick.bind(this);
}
```

bind 메서드를 사용하는 것이 번거롭다면, 화살표 함수를 이용하여 함수를 정의하는 것이 도움이 된다. (일반 함수의 this와 화살표 함수의 this는 다르게 동작!)

```js
handleClick = () => {
  //...
};
```
