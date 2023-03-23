# 리액트 프로젝트의 개발 환경 설정

## 1. 프로젝트에 리액트를 추가하는 방법

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

> **📌 주요 리액트 API**
>
> `React.creatElement(component, props, ...children)`는 ReactElement를 반환한다. 'component'가 문자열이라면 HTML 요소를 의미하고, 문자열이 아니라면 리액트 컴포넌트를 의미한다. 'props'는 해당 컴포넌트의 속성을 의미하고 객체 형태로 넣어준다. 'children'은 컴포넌트의 내부 자식 요소를 의미하므로 텍스트 혹은 다른 컴포넌트를 넣어줄 수 있다.
>
> `ReactDOM.render(reactComponent, container)`는 ReactElement를 루트의 DOM 노드에 렌더링한다. containers는 렌더링될 요소이다. 두번째 인자를 생략한다면 `<body>` 요소를 렌더링될 대상으로 삼는다. 그러나, 해당 문법보다 `ReactDOM.createRoot(container).render(reactComponent)`가 더 최신 문법이므로, 해당 문법에 더 익숙해지자.

## 2. CRA를 이용한 개발 환경 세팅

CRA(Creat-React-App)를 이용하면 리액트앱을 만들기 위한 필수 개발 도구들을 포함하고 있는 개발 환경을 빠르게 세팅할 수 있다.

다음 명령어를 통해

```bash
npx create-react-app react-app
```

'react-app'에서 다음 명령어를 통해 리액트 개발 환경을 활성화한다.

```bash
npm start
```

## 3. CRA 없이 개발 환경 세팅 - Babel, Webpack, HMR

CRA없이 리액트 개발환경을 세팅하려면, Babel, Webpack, HMR(hot-module-replacement) 등을 사용해야 한다.

### 3.1. Babel

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

### 3.2. Webpack

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

### 3.3. Hot Module Replacement(HMR)

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
