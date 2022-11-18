# 모듈(Module)

모듈이란 비슷한 기능을 가진 함수나 변수들을 모아놓은 것이다.

한 프로그램에서뿐만 아니라 다른 프로그램에서도 이용할 수 있다.

## 1. CommonJS

자바스크립트를 모듈 단위의 프로그래밍으로 작성할 수 있도록 도와준다.

자바스크립트를 브라우저에서뿐만 아니라 어디에서나 동작하도록 할 수 있다.

**Server** 환경에서 주로 사용된다(심지어 초기이름은 ServerJS였음).

모듈이 로딩된 후 실행된다. 즉 **동기적** 작업만 수행한다.

`require`를 통해 '가져오기'를 할 수 있다. `<script>`태그를 사용하는 브라우저 환경에서는 물론이고, **NodeJS**에서도 CommonJS를 기본 모듈 시스템으로 채택하고 있기 때문에, Babel과 같은 ES6 코드를 변환해주는 도구를 사용할 수 없는 상황에서는 좋든 싫든 `require` 키워드를 사용해야 한다.

'내보내기' 시 ES6처럼 *명시적으로 변수를 선언*해주는 것이 아니라 *변수 자체나 그 변수의 속성으로 내보낼 객체를 설정*해주어야 한다. 하나의 객체를 내보낼 경우에는 `module.exports` 변수 자체에 할당하고, 여러 개의 객체를 내보낼 경우에는 `exports` 변수의 속성으로 할당한다.

> 📌**app_1.js**
>
> ```js
> function squatForWarmup(weight) {
>   return weight * 20;
> }
>
> function WeightForHypertrophyAtSet(weight) {
>   return weight * 12;
> }
>
> const WeightForStrengthAtSet = function (weight) {
>   return weight * 5;
> };
>
> exports.WeightForHypertrophyAtSet = squatForHypertrophy;
> exports.WeightForStrengthAtSet = squatForStrength;
> ```
>
> 📌**app_2.js**
>
> ```js
> const test = require("./app_1");
>
> console.log(test.WeightForHypertrophyAtSet(100)); // 1200
> console.log(test.WeightForStrengthAtSet(150)); // 750
> ```

## 2. AMD(Asynchronous Module Definition)

CommonJS와는 다르게 **비동기적**으로 필요한 파일을 다운로드하는 방식이다.

**Client** 환경에서 외부 모듈을 가져올 때 유리하다.

```javascript
//❗
define(["[path]"], function(module){
    return function{

    }
})
```

## 3. UMD(Univarsal Module Definition)

어떤 방식으로 외부 모듈을 로딩하는 것과는 무관하게 각 모듈을 선언하는 방식이다.

CommonJS, AMD 두 방식을 모두 지원. 즉, **Client**, **Server**에서 모두 작동한다.

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
import hello from "[path]";
```

```javascript
//여러개 가져오기1
import { a, hello } from "[path]";

//여러개 가져오기2
import * as i "[path]"; //i.b, i,hi라는 이름으로 가져온다.
```

### 4.3. 브라우저에서 모듈 사용

```javascript
//순서대로 가져오기
<script type="module" src="[path]"></script>
```

```javascript
//비동기로 가져오기
<script async type="module" src="[path]"></script>
```

```javascript
//인라인 형식으로 가져오기
<script type="module"></script>;
import { a, hello } from "[paht]";
```
