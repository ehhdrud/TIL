# Life Cycle(생명주기)

리액트 컴포넌트는 'Life Cycle'이라고 불리는 생명주기를 갖는다. 생명주기란 각 컴포넌트의 '생성(Mount) - 업데이트(Update) - 제거(Unmount)'라는 세 가지 단계을 의미한다.

![life-cycle](../img/lifeCycle.PNG)

다음은 생명주기에 대한 예제이다.

```js
import React from "react";

export default class Clock extends React.Component {
  // 컴포넌트가 '생성될 때', 즉 React 엘리먼트를 생성하고 초기 상태를 설정하는 단계에서 호출되는 메서드이다.
  constructor(props) {
    // super()는 React.Component 클래스의 생성자를 호출한다. ❗❓
    super(props);
    this.state = { date: new Date() };
  }

  // 새로운 Date값을 date에 할당하는 tick() 함수를 정의한다.
  tick() {
    this.setState({
      date: new Date(),
    });
  }

  // 컴포넌트가 '마운트된 후', 즉 React 엘리먼트가 브라우저 DOM에 마운트된 직후에 호출되는 메서드이다.
  componentDidMount() {
    // Mount시, 즉 생성 단계에 setInterval 함수를 한번만 실행하도록 설정한다.
    // setInterval 함수는 한번만 실행하면, 1초마다 tick함수를 실행하여 새로운 Date값을 가져와 state의 date에 할당한다.
    console.log("componentDidMount");
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // 컴포넌트가 '업데이트된 후' 호출되는 메서드이다.
  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this.state.date);
  }

  // 컴포넌트가 '언마운트된 후' 호출되는 메서드이다.
  componentWillUnmount() {
    console.log("componentWillUnmount");
    clearInterval(this.timerID);
  }

  render() {
    // 첫 렌더링을 정의한다.
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
