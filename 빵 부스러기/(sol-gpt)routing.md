**Q**:  
너가 해준 방법은 아주 효율적이야. 그런데 /about 페이지로 접속해도 이전화면이 유지되면서 About 컴포넌트가 추가되는 이유가 뭐야?

**A**:  
React Router의 Routes 컴포넌트 내에서 각 Route는 URL 경로에 해당하는 컴포넌트를 렌더링합니다. 그러나 Routes 컴포넌트 내부에 다시 Route 컴포넌트가 포함되어 있고, /about 경로가 / 경로의 하위 경로로 정의되어 있기 때문에, /about 경로로 이동할 때 Header 컴포넌트는 여전히 렌더링되어 있습니다.

즉, /about 경로로 이동할 때는 / 경로와 /about 경로 모두를 렌더링하기 때문에, 브라우저의 주소 표시줄에 /about이 나타나지만, 실제로 보여지는 내용은 / 경로와 /about 경로의 컴포넌트가 함께 렌더링된 것입니다.

이를 해결하기 위해서는 Header 컴포넌트에서 /about 경로에 대한 Route를 / 경로의 직접적인 하위 요소로 정의해주어야 합니다. 다음과 같이 코드를 수정해보세요.

```js
// Header.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Category from "./headerComponents/Category";
import Logo from "./headerComponents/Logo";
import Sns from "./headerComponents/Sns";
import About from "./headerComponents/categoryPage/About";
import "../styles/Header.css";

export default function Header(props) {
  return (
    <div className="header">
      <Logo />
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Sns />
    </div>
  );
}
```

위와 같이 수정하면 /about 경로로 이동했을 때 Header 컴포넌트가 유지되지 않고, About 컴포넌트만 렌더링됩니다.
