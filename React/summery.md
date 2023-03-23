# 리액트(React)

리액트는 선언적(Declarative)이고, 컴포넌트 기반(Component-based)의 자바스크립트 라이브러리로, 가상 DOM(Virtual DOM)을 활용하여 빠르고, 가독성 좋고, 확장성 있는 웹 애플리케이션 개발을 가능하게 한다.

선언적: 리액트는 상호작용이 많은 UI를 만들 때 생기는 어려움을 줄여준다. 애플리케이션의 각 상태에 대한 간단한 뷰만 설계하면 리액트는 데이터가 변경됨에 따라 적절한 컴포넌트만 효율적으로 갱신하고 렌더링한다.

컴포넌트 기반: 스스로 상태를 관리하는 캡슐화된 컴포넌트를 만들고 이를 조합해 복잡한 UI를 구현할 수 있도록 도와준다.

## 1. 리액트에 대한 이해

### 1.1.

구현해야 하는 기능이 많을 때 여러개의 CSS파일과 JS파일을 여러개로 분리하는데, 리액트를 통한 모듈화는 '어떤 element들 + 그 element를 꾸미기 위한 style + 그 element의 동작에 대한 script'로 묶는다. 이 각각의 묶음들을 '컴포넌트'라고 부른다.

이렇게 만들어진 각 컴포넌트는 독립적으로 사용할 수 있는, '사용자 정의 태그'라고도 볼 수 있다. 따라서 리액트는 '사용자 정의 태그를 만드는 기술'이라고 정의할 수도 있다.

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

**🔎 2단계: 스크립트 추가**

편집할 HTML 파일의 `</body>` 앞에 3개의 `<script>` 요소를 추가한다. 첫번째 라인은 'React', 두번째 라인은 'ReactDOM', 세번째 라인은 '컴포넌트'를 가져온다.

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
root.render(e(FollowButton), domContainer);
```

### 2.1. 프로젝트에 리액트를 추가하는 방법

`React.creatElement(component, props, ...children)`는 ReactElement를 반환한다. 'component'가 문자열이라면 HTML 요소를 의미하고, 문자열이 아니라면 리액트 컴포넌트를 의미한다. 'props'는 해당 컴포넌트의 속성을 의미하고 객체 형태로 넣어준다. 'children'은 컴포넌트의 내부 자식 요소를 의미하므로 텍스트 혹은 다른 컴포넌트를 넣어줄 수 있다.

`ReactDOM.render(reactComponent, container)`는 ReactElement를 루트의 DOM 노드에 렌더링한다. containers는 렌더링될 요소이다. 두번째 인자를 생략한다면 `<body>` 요소를 렌더링될 대상으로 삼는다. 그러나, 해당 문법보다 `ReactDOM.createRoot(container).render(reactComponent)`가 더 최신이다.

### 2.2. CRA를 이용한 개발 환경 세팅

CRA(Creat-React-App)를 이용하면 리액트앱을 만들기 위한 필수 개발 도구들을 포함하고 있는 개발 환경을 빠르게 세팅할 수 있다.

다음 명령어를 통해

```bash
npx create-react-app react-app
```

'react-app'에서 다음 명령어를 통해 리액트 개발 환경을 활성화한다.

```bash
npm start
```

### 2.3. CRA 없이 개발 환경 세팅 - Babel, Webpack, HMR

CRA없이 리액트 개발환경을 세팅하려면, Babel, Webpack, HMR(hot-module-replacement) 등을 사용해야 한다.

#### 2.3.1. Babel

Babel은 JavaScript 코드를 변환해주는 컴파일러로, 최신 버전의 JavaScript 코드를 예전 버전으로 변환하여 브라우저 호환성 문제를 해결하는데 사용한다.

리액트에서 Babel은 JSX 언어를 JS 언어로 변환해주는 역할을 수행한다.

다음 명령어로 babel을 설치한다.

```bash
npm i -D @babel/core @babel-cli @babel/preset-react
```

다음 명령어로 JSX 언어가 자바스크립트로 변환되는 것을 확인할 수 있다.

```bash
npx babel src/components/FollowButton.js --presets=@babel/preset-react
npx babel src/index.js --presets=@babel/preset-react
```

babel.config 파일을 JS 혹은 JSON으로 작성하여 preset, plugin 등을 설정한다.

```js
module.exports = function (api) {
  api.cache(true);

  const presets = [];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
```

#### 2.3.2. Webpack

Webpack은 자바스크립트 모듈 번들러로, 자바스크립트 파일 뿐만 아니라 CSS, 이미지 등 다양한 파일들도 모듈로 인식하여 번들링(여러 파일들을 하나로 합치는 작업)할 수 있다.

리액트로 한 개의 HTML 파일로 이루어진 웹 어플리케이션을 의미하는 싱글 페이지 애플리케이션(SPA)을 개발할 수 있다. 이때 Webpack을 사용하여 하나의 파일로 번들링하는 작업을 수행한다.

다음 명령어를 통해 Webpack을 설치한다.

```bash
npm i -D webpack webpack-cli html-webpack-plugin babel-loader
```

webpack.config 파일을 JS 혹은 JSON으로 작성하여, webpack 실행 환경을 설정한다.

```js
// 노드 모듈 "path"를 가져와서 파일을 잘 읽어올 수 있도록 처리한다.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-react-jsx"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  optimization: { minimizer: [] },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
```

아래 명령어를 통해 webpack을 실행하여, 'dist' 파일에서 'bundle.js'와 최종적으로 완성된 'index.html'을 확인한다.

```bash
npx webpack
```

#### 2.3.3. Hot Module Replacement(HMR)

HMR은 애플리케이션의 일부분만 수정하면, 새로고침 없이 변경된 내용을 브라우저에서 바로 확인할 수 있도록 도와주는 Webpack의 기능이다. HMR을 사용하면, 애플리케이션의 코드를 수정할 때마다 웹팩은 수정된 모듈만 다시 컴파일하여 webpack-dev-server를 통해 브라우저에 전송한다. 브라우저는 수정된 모듈만 새롭게 적용하여 렌더링한다. 새로고침없이 화면이 변경되기 때문에 생산성 향상에 도움을 준다.

아래 명령어를 통해 HMR을 위한 webpack-dev-server를 설치한다.

```bash
npm i -D webpack-dev-server
```

webpack.config에 다음 코드를 추가한다.

```js
  devServer: {
    static: "./dist",
    hot: true,
  },
```

그리고, 아래 명령어를 통해 HMR을 작동시켜 링크를 생성한다.

```bash
npx webpack serve
```
