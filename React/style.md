# 리액트 스타일링

## `style` 속성을 이용한 인라인 스타일

JSX에서 인라인으로 스타일을 주고자할 때, '문자열'을 사용하는 HTML과는 다르게 '객체'를 사용한다. 그러므로 여러 개의 속성을 사용할 시 쉼표가 아닌 세미콜론으로 구분한다. 또한 속성의 이름에서 `-`를 사용하지 않고 대신 카멜 표기법을 사용한다. 그리고 숫자 인라인 프로퍼티는 `px` 접미사를 자동으로 추가한다는 특징이 있다.

**📌 HTML**

```html
<h1 style="color: red; background-color: yellow; height: 10px">Hello World</h1>
```

**📌 JSX**

```js
<h1 style={color: "red", backgroundColor: "yellow", height: "10"}>Hello World</h1>

const divStyle = {color: "blue", backgroundColor: "green", height: "10"};
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

CSS 모듈은 클래스 이름 충돌을 방지하고, 지역 스코프 사용으로 스코프로 인한 오류를 줄이고, 클래스 이름을 해시값을 통해 저장하기 때문에 클래스 이름을 설정하는데에 긴 시간을 쓸 필요가 없고 코드의 유지 보수 측면에서도 이점을 가져온다.

가독성을 높이기 위해 카멜 표기법으로 클래스 이름을 작성하는 것이 권장된다.

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

## CSS-in-JS

CSS-in-JS란 외부의 파일에 CSS를 정의하는 대신 자바스크립트와 결합하는 패턴을 의미한다. 이러한 기능은 리액트에 포함된 기능이 아니라, 'styled-components' 등의 별도의 라이브러리를 통해 제공된다.

CSS-in-JS를 사용하면 컴포넌트별로 스타일을 작성하여 사용할 수 있다. 또한 CSS 모듈과 마찬가지로 해시값을 이용해 동적인 클래스 이름을 만들고 해당 요소와 연결해주어 클래스 이름 충돌을 방지한다. 또한 CSS-in-JS는 컴포넌트에 props를 전달하여 스타일을 동적으로 생성할 수 있다는 장점이 있다.

아래 명령어를 실행하여 styled-components 라이브러리를 설치한다.

```bash
npm install styled-components
```

styled-components 라이브러리에서는 CSS 스타일 코드를 자바스크립트 파일로 분리하여 사용한다. 분리할 파일은 `[name].styles.js`라는 이름을 가진다. 코드가 간결하다면 기존 자바스크립트 파일에서 분리하지 않고 바로 사용하기도 한다.

> **📌 ProductsTable.styles.js**
>
> ```js
> import styled from "styled-components";
>
> export const Category = styled.td`
>   font-weight: bold;
> `;
>
> export const ProductName = styled.td`
>   color: ${(props) => (props.stocked ? "black" : "red")};
> `;
> ```

> **📌 ProductsTable.js**
>
> ```jsx
> import React from "react";
> import * as S from "./ProductsTable.style";
>
> export default function ProductsTable(props) {
>   const { category, items, inStockOnly } = props;
>   const filteredItems = inStockOnly
>     ? items.filter((item) => item.stocked)
>     : items;
>
>   return (
>     <table>
>       <tr>
>         <S.Category>{category}</S.Category>
>       </tr>
>
>       {filteredItems.map((item, idx) => (
>         <tr key={idx}>
>           <S.ProductName stocked={item.stocked}>{item.name}</S.ProductName>
>             {item.name}
>           </td>
>           <td>{item.price}</td>
>         </tr>
>       ))}
>     </table>
>   );
> }
> ```
