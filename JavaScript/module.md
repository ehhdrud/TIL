# 모듈(Module)

모듈이란 비슷한 기능을 가진 함수나 변수들을 모아놓은 것이다.

한 프로그램에서뿐만 아니라 다른 프로그램에서도 이용할 수 있다.

## 1. CommonJS

자바스크립트를 모듈 단위의 프로그래밍으로 작성할 수 있도록 도와준다.

자바스크립트를 브라우저에서뿐만 아니라 어디에서나 동작하도록 할 수 있다.

모듈이 로딩된 후 실행, 즉 _동기적_ 작업만 수행한다.

*Server 환경*에서 주로 사용되고 Node.js도 CommonJS의 명세를 따른다.

```javascript
module.exports = moduleName;

const moduleName = require("./[path]]");
```

## 2. AMD(Asynchronous Module Definition)

CommonJS와는 다르게 *비동기적*으로 필요한 파일을 다운로드하는 방식이다.

*Client 환경*에서 외부 모듈을 가져올 때 유리하다.

```javascript
//❗
define(["./[path]"], function(module){
    return function{

    }
})
```

## 3. UMD(Univarsal Module Definition)

어떤 방식으로 외부 모듈을 로딩하는 것과는 무관하게 각 모듈을 선언하는 방식이다.

CommonJS, AMD 두 방식을 모두 지원. 즉, _Client, Server에서 모두_ 작동한다.

## 4. ESM(ECMAScript Modules)

ES6에서는 최신 브라우저에서 모듈 시스템을 사용할 수 있도록 지원한다.

### 4.1. 내보내기

```javascript
//기본 내보내기(하나만 내보내기)
export defalut function hello(){
    return "hello";
}
```

```javascript
//여러개 내보내기1
export const a = "a";

export funtion hello(){
    return "hello";
}

//여러개 내보내기2
const b = "b";
function hi(){
    return "hi";
}
export {b, hi};
```

### 4.2. 가져오기

```javascript
//기본 가져오기(하나만 가져오기)
import hello from "./[path]";
```

```javascript
//여러개 가져오기1
import { a, hello } from "./[path]";

//여러개 가져오기2
import * as i "./[path]"; //i.b, i,hi라는 이름으로 가져온다.
```

### 4.3. 브라우저에서 모듈 사용

```javascript
//순서대로 가져오기
<script type="module" src="./[path]"></script>
```

```javascript
//비동기로 가져오기
<script async type="module" src="./[path]"></script>
```

```javascript
//인라인 형식으로 가져오기
<script type="module"></script>;
import { a, hello } from "./[paht]";
```
