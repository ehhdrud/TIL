# 모듈(Module)

모듈이란 비슷한 기능을 가진 함수나 변수들을 모아놓은 것이다.

한 프로그램에서뿐만 아니라 다른 프로그램에서도 이용할 수 있다.

## 1. ⭐CommonJS

자바스크립트를 모듈 단위의 프로그래밍으로 작성할 수 있도록 도와준다.

자바스크립트를 브라우저에서뿐만 아니라 어디에서나 동작하도록 할 수 있다.

초기이름이 ServerJS였을 정도로 **Server** 환경에서 주로 사용된다.

모듈이 로딩된 후 실행된다. 즉 **동기적** 작업만 수행한다.

### 1.1. ✨내보내기

#### 1.1.1. `module.exports`: 하나만 내보내기

단일 객체를 내보낼 때 사용한다. `module.exports` 자체에 할당한다.

#### 1.1.2. `exports`: 여러 개 내보내기

복수 객체를 내보낼 때 사용한다. `exports`의 속성으로 할당한다.

<br>

> **📌예시**
>
> ```js
> //app_1.js
> function weightForWarmupAtSet(weight) {
>   return weight * 20;
> }
>
> function weightForHypertrophyAtSet(weight) {
>   return weight * 12;
> }
>
> const weightForStrengthAtSet = function (weight) {
>   return weight * 5;
> };
>
> exports.weightForHypertrophyAtSet = weightForHypertrophyAtSet;
> exports.weightForStrengthAtSet = weightForStrengthAtSet;
> //복수의 객체를 불러오므로 exports키워드의 속성에 할당한다.
> ```

### 1.2. ✨불러오기: `require`

`<script>`태그를 사용하는 브라우저 환경에서는 물론이고 **NodeJS**에서도 CommonJS를 기본 모듈 시스템으로 채택하고 있기 때문에, Babel과 같은 ES6 코드를 변환해주는 도구를 사용할 수 없는 상황에서는 `require` 키워드를 사용해야 한다.

`require`로 불러온 객체를 변수에 담아 사용한다.

<br>

> **📌예시**
>
> ```js
> //app_2.js
> const test = require("./app_1");
>
> console.log(test.weightForHypertrophyAtSet(100)); // 1200
> console.log(test.weightForStrengthAtSet(150)); // 750
> ```

## 2. AMD(Asynchronous Module Definition)

CommonJS와는 다르게 **비동기적**으로 필요한 파일을 다운로드하는 방식이다. CommonJs가 자바스크립트를 브라우저 밖으로 꺼내기 위한 그룹이라면, AMD는 브라우저에 중점을 둔 그룹이다.

**Client** 환경에서 외부 모듈을 불러올 때 유리하다.

`define` 키워드를 통해 모듈을 추출하고, `require`를 통해 추출한 모듈을 사용한다.

## 3. UMD(Univarsal Module Definition)

어떤 방식으로 외부 모듈을 로딩하는 것과는 무관하게 각 모듈을 선언하는 방식이다. CommonJS, AMD 두 방식을 모두 지원하여 CommonJS와 AMD가 서로 호환되지 않는 문제를 해결했다.

**Client**, **Server**에서 모두 작동한다.

CommonJS의 `module.exports`와 `exports`, AMD의 `define`을 사용해 모듈을 추출한다.

## 4. ⭐⭐ESM(ECMAScript Modules)

**ES6**에서는 최신 브라우저에서 최신 스팩의 모듈 시스템을 사용할 수 있도록 지원한다.

비동기 방식으로 작동하고 모듈에서 실제로 쓰이는 부분만 불러오기 때문에 성능과 메모리 부분에서 유리하다.

`import`, `from`, `export`, `default`처럼 모듈 관리 전용 키워드를 사용하기 때문에 가독성에 유리하다.

### 4.1. ✨내보내기

#### 4.1.1. `export default`: 하나만 내보내기

```js
export default function hello() {
  return "hello";
}
```

#### 4.1.2. `export`: 여러 개 내보내기

##### 4.1.2.1. 개별적으로 내보내는 방법

```js
export const a = "a";

export funtion hello(){
    return "hello";
}
```

##### 4.1.2.2. 한번에 내보낼 수 있는 방법

```js
const a = "a";
function hello() {
  return "hello";
}
export { a, hello };
```

<br>

> **📌예시**
>
> ```js
> //app_1.js
> function squatForWarmup(weight) {
>   return weight * 20;
> }
>
> export function weightForHypertrophyAtSet(weight) {
>   return weight * 12;
> } //"개별적으로 내보내는 방법"을 사용해 내보냄!
>
> const weightForStrengthAtSet = function (weight) {
>   return weight * 5;
> };
> export { weightForStrengthAtSet };
> //한놈만 내보내긴 했지만, "한번에 내보낼 수 있는 방법"을 이용해 내보냄!
> ```

### 4.2. ✨불러오기

#### 4.2.1. `import {[불러올 객체]} from "[path]"`

#### 4.2.2. `import * as [불러올 모든 객체에 붙일 별명] from "[path]"`

<br>

> 📌**예시**
>
> ```js
> //app_2.js
> import { weightForHypertrophyAtSet } for "./app_1";
>
> console.log(test.weightForHypertrophyAtSet(100)); // 1200
>
> import * as weightAtSet from "./app_1";
> //weightAtSet.weightForHypertrophyAtSet, weightAtSet.weightForStrengthAtSet라는 이름으로 불러온다.
>
> console.log(test.weightForStrengthAtSet(150)); // 750
> ```

### 4.3. 브라우저에서 모듈 사용

```js
//순서대로 불러오기
<script type="module" src="[path]"></script>
```

```js
//비동기로 불러오기
<script async type="module" src="[path]"></script>
```

```js
//인라인 형식으로 불러오기
<script type="module"></script>;
import { a, hello } from "[paht]";
```
