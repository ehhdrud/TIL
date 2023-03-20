# 리액트(React)

UI를 만들기 위한 JS 라이브러리.

선언형: 리액트는 상호작용이 많은 UI를 만들 때 생기는 어려움을 줄여준다. 애플리케이션의 각 상태에 대한 간단한 뷰만 설계하면 리액트는 데이터가 변경됨에 따라 적절한 컴포넌트만 효율적으로 갱신하고 렌더링한다.

컴포넌트 기반: 스스로 상태를 관리하는 캡슐화된 컴포넌트를 만들고 이를 조합해 복잡한 UI를 구현할 수 있도록 도와준다.

## 1. 리액트에 대한 이해

### 1.1.

구현해야 하는 기능이 많을 때 여러개의 CSS파일과 JS파일을 여러개로 분리하는데, 리액트를 통한 모듈화는 '어떤 element들 + 그 element를 꾸미기 위한 style + 그 element의 동작에 대한 script'로 묶는다. 이 각각의 묶음들을 '컴포넌트'라고 부른다.

### 1.2.

웹 페이지의 UI를 변경하고자할 때, 자바스크립트만을 이용한다면 DOM 노드를 직접 조작해야 하지만, 리액트를 활용하면 DOM 노드를 직접 조작하지 않아도 된다. 즉 UI 로직과 비지니스 로직(데이터와 상태값을 다루는 로직)을 분리할 수 있다. 쉽게 설명하자면 'DOM 노드를 조작하는 방식'은 이전 요소의 특정 부분을 바꾸는 방식이라면, '리액트를 활용한 방식'은 이전 뷰를 날려버리고 결과적으로 보여줘야 하는 뷰를 보여주는 방식이다. 이러한 방식의 코드는 더 깔끔하고, 유지보수에도 적합하고, DOM을 처음부터 다시 그리지 않고 해당 컴포넌트만 업데이트하면 되기 때문에 성능면에서도 뛰어나다.

### 1.3.

리액트는 내부적으로 가상돔(Virtual DOM)이라는 것을 통해 변경된 부분만 업데이트할 수 있도록 도와준다. 웹 애플리케이션은 공통적으로 라우팅, 전역 상태 관리, API 호출, 빌드 시스템 등의 기능을 필요로 하는데, 이러한 필수 기능이 내장된 형태를 '프레임워크'라고 한다. 하지만 리액트는 프레임워크가 아닌 '라이브러리'이므로 이러한 기능을 직접 구현하거나 이러한 기능을 담당하는 또 다른 라이브러리를 사용해야 한다. ([ex]API 호출을 위한 라이브러리인 axios) 즉, 마음에 드는 라이브러리를 선택하여 시스템을 구축할 수 있다는 장점이 있지만, 여러가지 라이브러리를 학습해야 한다는 단점이 존재한다.

## 2. 리액트 프로젝트의 개발 환경 설정

### 2.2.

**🔎 1단계: HTML 파일에 DOM 컨테이너 설치**

편집할 HTML 파일의 DOM container가 될 요소에 id값을 할당한다.

```html
<div id="follow_button_container"></div>
```

**🔎 2단계: 스크립트 태그 추가**

편집할 HTML 파일의 `</body>` 앞에 3개의 `<script>`를 추가한다. 첫번째 라인은 'React', 두번째 라인은 'ReactDOM', 세번째 라인은 '컴포넌트'를 가져온다.

```html
  <!-- ... 다른 HTML ... -->

  <!-- React를 실행. -->
  <!-- 주의: 사이트를 배포할 때는 "development.js"를 "production.min.js"로 대체하세요. -->
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

  <!-- 만든 React 컴포넌트를 실행. -->
  <script src="follow_button.js"></script>

</body>
```

**🔎 3단계: 리액트 컴포넌트 만들기**

'follow_button.js'라는 이름으로 HTML 페이지 옆에 새 자바스크립트 파일을 만든다. 해당 파일에 원하는 동작을 구현하고, 맨 뒷줄에 다음 코드 세 줄을 추가한다. 여기서 'FollowButton'은 윗단에서 따로 정의가 필요하고, `e()`는 `React.creatElement()`와 동일하다.

```js
const domContainer = document.querySelector("#follow_button_container");
const root = ReactDOM.createRoot(domContainer);
root.render(e(FollowButton));
```
