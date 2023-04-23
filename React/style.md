# 리액트 스타일링

## `style` 속성을 이용한 인라인 스타일

JSX에서 인라인으로 스타일을 주고자할 때, '문자열'을 사용하는 HTML과는 다르게 '객체'를 사용한다. 그러므로 여러 개의 속성을 사용할 시 쉼표가 아닌 세미콜론으로 구분한다. 또한 속성의 이름에서 `-`를 사용하지 않고 대신 카멜 표기법을 사용한다. 그리고 숫자 인라인 프로퍼티는 `px` 접미사를 자동으로 추가한다는 특징이 있다.

**📌 HTML**

```html
<h1 style="color: red; background-color: yellow; height: 10px">Hello World</h1>
```

**📌 JSX**

```js
<h1 style={color: "red", backgroundColor: "yellow", height: "10",}>Hello World</h1>

const divStyle = {color: "blue", backgroundColor: "green", height: "10",};
<div style={divStyle}>Hello World</div>
```

다만, 리액트에서도 인라인 방식은 간단한 스타일링이나 테스트용으로 적합하고 가독성, 재사용성, 성능 등을 고려해 CSS 클래스를 이용하는 것이 권장된다.

## CSS 클래스

CSS 클래스를 사용하기 위해 `className`이라는 props를 이용한다. 작성법에 따라 `className`를 통해 CSS 클래스 이름을 지정해주고, HTML에서 사용하던 방식대로 CSS 파일을 외부에 작성한다.

```js
render() {
  return <span className="menu navigation-menu">Menu</span>
}
```

CSS 클래스는 문자열이기 때문에, 동적으로 CSS 클래스를 추가하고자할 때 다음과 같이 작성할 수 있다.

```js
render() {
  let className = "menu";
  if (props.isActive) {
    className += " menu-active";
  }
  return <span className={className}>Menu</span>
}
```

이러한 방식이 번거롭다면 `classNames`라는 props를 사용할 수 있다.

```js
import classNames from "classnames";

function Menu(props) {
  const className = classNames("menu", { "menu-active": props.isActive });
  return <span className={className}>Menu</span>;
}
```

이러한 방법은 장점이 많지만, 다른 CSS 파일과 클래스 이름 간의 충돌 문제, 전역 스코프를 가짐으로써 발생하는 문제, 클래스 이름 관리 등의 측면에서 단점이 존재한다. 이를 보완하기 위해 'CSS 모듈'을 사용할 수 있다.

## CSS 모듈

'Create React App'으로 생성한 리액트 폴더에 `[name].module.css`라는 이름을 가진 CSS 파일을 작성하고 해당 파일을 `import`하여 CSS 모듈을 사용할 수 있다. 만약 'styles'라는 이름으로 모듈화하였고 'className'이라는 클래스를 사용하여 스타일을 적용하고자 한다면, `styles.className`이라는 이름으로 간편하게 스타일을 적용할 수 있다.

해당 방법은 클래스 이름 충돌을 방지하고, 지역 스코프 사용으로 스코프로 인한 오류를 줄이고, 클래스 이름을 해시값을 통해 저장하기 때문에 클래스 이름 작명에 시간을 쓸 필요가 없고 코드의 유지 보수 측면에서도 이점을 가져온다. 가독성을 높이기 위해 카멜 표기법으로 클래스 이름을 작성하는 것이 권장된다.

> **📌 Button.module.css**
>
> ```css
> .error {
>   background-color: red;
> }
> ```

> **📌 another-stylesheet.css**
>
> ```css
> .error {
>   color: red;
> }
> ```

> **📌 JS 파일**
>
> ```js
> import React, { Component } from "react";
> import styles from "./Button.module.css";
> import "./another-stylesheet.css";
>
> class Button extends Component {
>   render() {
>     // reference as a js object
>     return <button className={styles.error}>Error Button</button>;
>   }
> }
> ```

CSS 모듈과 일반 CSS 파일 간 클래스 이름 충돌이 발생하지 않는다.

이는 CSS 모듈이 클래스 이름을 다음과 같이 해시값을 추가하여 관리하기 때문이다.

```html
<button class="Button_error_ax7yz">Error Button</button>
```
