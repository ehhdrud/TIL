# 모듈(Module)

> 모듈이란 비슷한 기능을 가진 함수나 변수들을 모아놓은 것이다.  
> 한 프로그램에서뿐만 아니라 다른 프로그램에서도 이용할 수 있다.

## CommonJS

> 자바스크립트를 모듈 단위의 프로그래밍으로 작성할 수 있도록 도와준다.
> 자바스크립트를 브라우저에서뿐만 아니라 어디에서나 동작하도록 할 수 있다.  
> 모듈이 로딩된 후 실행, 즉 동기적 작업만 수행한다.  
> Server환경에서 주로 사용되고 Node.js도 CommonJS의 명세를 따른다.

```javascript
module.exports = moduleName;

const moduleName = require("./module");
```

## AMD(Asynchronous Module Definition)

> CommonJS와는 다르게 비동기적으로 필요한 파일을 다운로드하는 방식이다.  
> Client단(브라우저 환경)에서 외부 모듈을 가져올 때 유리하다.

```javascript
//❗
define(["./module"], function(module){
    return function{

    }
})
```

## UMD(Univarsal Module Definition)

> 어떤 방식으로 외부 모듈을 로딩하는 것과는 무관하게 각 모듈을 선언하는 방식이다.  
> CommonJS, AMD 두 방식을 모두 지원. 즉, Cliemt, Server에서 모두 작동한다.
