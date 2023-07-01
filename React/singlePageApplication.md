# 싱글 페이지 애플리케이션(Single-page application, SPA)

리액트는 싱글 페이지 애플리케이션을 구현하기 적합한 프레임 워크이다. 싱글 페이지 애플리케이션이란 말 그대로 하나의 HTML 페이지를 가진 애플리케이션을 말한다. 여러개의 HTML 페이지를 가지는 전통적인 웹 애플리케이션은 URL이 변경될 경우 매번 새로운 페이지를 로드하기 때문에 서버의 부담이 컸다. 그러나 SPA를 사용함으로써 URL이 변경되더라도 새로운 HTML을 서버에 요청하지 않고 Client에서 그리는 것(Clinet Side Rendering, CSR)이 가능해졌다. 그러므로 페이지 이동 없이 필요한 데이터만 동적으로 로드하여 사용자에게 보여줄 수 있게 되었다. 또한 SPA는 모바일 기기에서 빠른 성능과 좋은 사용자 경험을 제공하는 데도 적합하다.

SPA로 웹 애플리케이션을 구축할 때, HTML은 하나지만 유저가 볼 수 있는 화면은 여러가지여야 한다. 이렇게 여러 화면을 동적으로 생성하기 위해 '라우팅(Routing)'이라는 방법을 사용한다. 라우팅은 URL에 따라 알맞은 콘텐츠(UI)를 전달해주는 기능이다.

SPA에서 라우팅을 구현하기 위해서는 브라우저의 History API를 사용한다. History API는 HTML5에서 추가된 브라우저 API 중 하나로, history 객체를 이용하여 브라우저의 세션 기록을 조작할 수 있는 방법을 제공한다. 이를 이용하면 SPA에서 URL을 변경하거나 브라우저의 뒤로 가기, 앞으로 가기 등의 기능을 구현할 수 있다.

## React Router

React Router는 리액트 애플리케이션에서 라우팅을 구현할 때 사용하는 라이브러리이다. React Router는 SPA에서 여러 화면을 렌더링하고 URL 경로에 따라 다른 컴포넌트를 렌더링하는 것을 쉽게 구현할 수 있도록 도와준다.

React Router를 기반으로 하는 react-router-dom 패키지는 브라우저에서 사용되는 라우팅을 지원한다. 아래 명령어를 통해 react-router-dom을 설치한다.

```bash
npm install react-router-dom@6
```

아래는 react-router-dom의 주요 컴포넌트이다. import를 통해 사용할 수 있다.

- `<BrowserRouter>`  
  : `<BrowserRouter>` 컴포넌트는 HTML5의 History API를 사용하여 브라우저의 주소와 UI를 동기화시키는 라우터 컴포넌트이다. 이 컴포넌트로 앱을 감싸주면 브라우저의 URL에 따라 적절한 컴포넌트가 렌더링되도록 할 수 있다. 이 컴포넌트는 최상위 컴포넌트인 App.js에서 사용한다.

- `<Router>`  
  : 라우팅 기능을 구현하는 컴포넌트이지만, 일반적으로 개발자는 직접 Router 컴포넌트를 사용하기보다 BrowserRouter 컴포넌트를 사용하는 것이 편리하다. BrowserRouter 컴포넌트는 Router 컴포넌트를 상속받은 구현체로, HTML5의 History API를 활용하여 브라우저의 주소와 상호작용한다.

- `<Routes>`  
  : `<Routes>` 컴포넌트는 URL 경로를 확인하고 하나 이상의 `<Route>` 컴포넌트를 렌더링한다.

- `<Route>`  
  : `<Route>` 컴포넌트는 경로와 경로와 일치하는 URL에 렌더링할 컴포넌트를 정의한다. 예를 들어, `<Route path="/about" element={<About/>} />`와 같이 사용하면 URL 경로가 "/about"인 경우 About 컴포넌트가 렌더링된다. `<Route>` 컴포넌트는 path와 element 속성을 가지며, path 속성에는 렌더링할 경로를, element 속성에는 렌더링할 컴포넌트를 지정한다. `<Route>` 컴포넌트의 자식 요소로 `<Route>` 컴포넌트를 사용하는 것도 가능하다.

- `<Switch>`  
   : 여러 개의 Route 컴포넌트 중에서 가장 처음으로 매칭되는 경로에 해당하는 컴포넌트만 렌더링하는 역할을 수행한다. Switch 컴포넌트는 위에서 아래로 Route 컴포넌트를 순서대로 검사하며, 첫 번째로 매칭되는 경로에 해당하는 컴포넌트를 렌더링하고 나머지는 무시한다. 이를 통해 중복된 경로에 대한 충돌을 방지하고, 하나의 경로에 대해 여러 개의 컴포넌트가 렌더링되는 것을 방지한다.

- `<Link>`  
  : `<Link>` 컴포넌트는 `to` 속성을 사용하여 이동할 경로를 지정할 수 있다. `to` 속성은 문자열이나 객체 형태로 지정한다. `<a>`와 달리 새로운 요청을 보내지 않는다.

- `<Outlet>`
  : `<Outlet>` 컴포넌트는 매칭된 컴포넌트를 렌더링할 수 있도록 도와준다. 이는 중첩 `<Route>`에서 필수이며 상위 컴포넌트 내부에 작성한다.

> **💬 예시 코드**
>
> ```js
> import { BrowserRouter, Routes, Route } from "react-router-dom";
> import MainPage from "./components/MainPage";
> import TechPage from "./components/TechPage";
> import BlogPage from "./components/BlogPage";
> import JavascriptPage from "./components/JavascriptPage";
> import ReactPage from "./components/ReactPage";
> import ReactDocPage from "./components/ReactDocPage";
> import Logo from "./components/Logo";
> import UserStore from "./store/user";
>
> function App() {
>   return (
>     <UserStore>
>       <BrowserRouter>
>         <Routes>
>           <Route path={"/"} element={<Logo />}>
>             <Route path={"/"} element={<MainPage />} />
>             <Route path={"tech"} element={<TechPage />}>
>               <Route path="javascript" element={<JavascriptPage />} />
>               <Route path="react" element={<ReactPage />}>
>                 {/* 세미콜론(:)은 이 경로 매개변수를 정의하는 문법으로, 이를 통해 URL 경로에 동적인 값을 전달할 수 있다. */}
>                 {/* 이 때 path는 "react/:docId"로 수정해주어야 한다. */}
>                 <Route path=":docId" element={<ReactDocPage />} />
>               </Route>
>             </Route>
>             <Route path={"blog"} element={<BlogPage />} />
>           </Route>
>         </Routes>
>       </BrowserRouter>
>     </UserStore>
>   );
> }
>
> export default App;
> ```

아래는 react-router-dom의 주요 Hook이다. 마찬가지로 import하여 사용할 수 있다.

- `useHistory()`  
  : 현재 브라우저 세션의 기록을 조작하고, 이전/다음 페이지로 이동하거나 페이지를 교체할 수 있다.

- `useParams()`  
  : URL 경로에서 추출한 매개변수를 읽어오기 위해 사용된다.

- `useNavigate()`  
  : 프로그래밍 방식으로 페이지를 이동시키는 데 사용된다. 예를 들어, 사용자가 어떤 작업을 수행한 후에 특정 경로로 이동해야 할 경우 사용될 수 있다.

- `useLocation()`  
  : 현재 URL의 정보를 가져온다.

## SPA의 단점

SPA는 첫 로딩이 길다는 점이 단점이 있다. 일반적으로 서버에서 HTML 페이지 전체를 렌더링하여 클라이언트에게 전송하는 방식과 달리 SPA는 초기에 필요한 모든 HTML, CSS 및 JavaScript 파일을 가져와야 하기 때문이다. 따라서 이러한 파일을 다운로드하고 해석하는 데 시간이 오래 걸릴 수 있으며, 특히 앱의 규모가 큰 경우에는 더욱 그러하다. 이러한 단점은 렌더링 최적화 기술인 'Code Spliting' 등의 기술로 보완할 수 있다.

또한 React로 개발된 SPA는 빌드 과정에서 클라이언트 측에서 실행될 자바스크립트 파일들이 번들링되어 bundle.js와 같은 파일로 만들어진다. 서버 측에서는 이러한 자바스크립트 파일을 로드하는 HTML만을 전달하게 되고, 서버에서 전달받는 HTML은 비어있게 된다. 그러므로 검색 엔진이 이를 인식할 때 최종적으로 렌더링되는 DOM 결과물만을 참고하게 된다. (bundle.js는 검색 엔진 최적화에 관여되지 않는다.) 따라서 검색 엔진 최적화 작업이 어려워지고, 효율이 떨어지는 문제가 발생한다. 이를 해결하기 위해서는 서버 측에서 렌더링이 가능한 Next.js와 같은 프레임워크를 사용할 수 있다.
