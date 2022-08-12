# 자료형

## 원시 타입(Primitive Type)

`boolean`

- 논리적 값인 true, false를 갖는 데이터 타입
- 주로 조건문에서 동작 판단의 기준으로 사용

`null`

- 존재하지 않거나 유효하지 않는 주소를 표시하는 데이터 타입
- nothing, empty, unknown 값을 나타내는데 사용

`undefined`

- 선언 후 값을 할당하지 않은 변수를 표시하는 데이터 타입

`number`

- 정수, 실수 등 숫자를 표시하는 데이터 타입
- 정수의 한계는 ±2^53(그 이상은 `bigint`라는 자료형 사용)
- `NaN`, `Infinity`도 포함

`string`

- 빈 문자열이나 글자들을 표현하는 데이터 타입
- 큰 따옴표, 작은 따옴표, 역 따옴표(백틱)을 통해 표현 가능
- 백틱 안에 `${}`를 넣어서 문자열 안에서 변수를 넣을 수 있음

`symbol`

- 문자열과 함께 객체 property로 사용(ES6에 추가)

## 객체 타입(Object Type)

`object`

- 두개 이상의 복잡한 개체(원시형 데이터 타입) 저장 가능
- `Object()` 혹은 중괄호(`{}`)를 통해 생성 가능
- object의 개체는 key: value 형태로 표현하며(ex>`name: “”`), 접근은 object.key 형태로 표현(ex>`user.weight`), 삭제는 `delete` 명령을 통해
- object 복사는 주소값만을 복사하여 결국 같은 공간을 가르키게 되는 문제가 생기므로 얕은 복사(Shallow copy)와 깊은 복사(Deep copy)를 통해 대상 전체를 복사해야 함

```javascript
let user = {
  name: "SDK",
  age: 28,
};

console.log(user); //{ name: 'SDK', age: 28 }

user.weight = 83; //추가
console.log(user); //{ name: 'SDK', age: 28, weight: 83 }

delete user.age; //삭제
console.log(user); //{ name: 'SDK', weight: 83 }
```

### 객체 복사

object 복사는 주소값만을 복사하여 결국 같은 공간을 가르키게 되는 문제가 생기므로 얕은 복사(Shallow copy)와 깊은 복사(Deep copy)를 통해 대상 전체를 복사해야 한다

#### 1. 얕은 복사(Shallow copy)<br>

객체 내부에 또 다른 객체가 없을 경우

##### 1.1. 반복문 for문을 통한 객체 복사

```javascript
let user = {
  name: "SDK",
  age: 28,
};

let admin = {}; //admin변수에 빈 {}를 만들어준다

for (let key in user) {
  admin[key] = user[key];
} //for문을 이용해 하나하나 복사

admin.name = "Seo";
console.log(admin.name); //output: Seo
console.log(user.name); //output: SDK
```

##### 1.2. Object.assign() 함수를 이용한 복사

```javascript
let user = {
  name: "SDK",
  age: 28,
};

let admin = Object.assign({}, user); //Object.assign함수를 이용해 할당

admin.name = "Seo";
console.log(admin.name); //output: Seo
console.log(user.name); //output: SDK
```

##### 1.3. ES6에서부터 지원하는 전개연산자(Spread Operator)를 이용한 복사(제일 좋음!)

```javascript
let user = {
  name: "SDK",
  age: 28,
};

let admin = { ...user }; //전개연산자를 이용해 새로운 공간을 만들어서 그 공간으로 복사

admin.name = "Seo";
console.log(admin.name); //output: Seo
console.log(user.name); //output: SDK
```

#### 2. 깊은 복사(Deep copy)

객체 내부에 또 다른 객체가 있을 경우

##### 2.1. 재귀 함수를 이용한 깊은 복사

```javascript
let user = {
  name: "SDK",
  age: 28,
  sizes: {
    height: 183,
    weight: 83,
  },
};

function copy(user) {
  let result = {};

  for (let key in user) {
    if (typeof user[key] === "object") {
      result[key] = copy(user[key]);
    } else {
      result[key] = user[key];
    }
  }
  return result;
} //재귀함수를 이용한 깊은 복사

admin = copy(user);

admin.sizes.weight++;
--admin.sizes.height;

console.log(admin.sizes.height); //output:182
console.log(admin.sizes.weight); //output:84
console.log(user.sizes.height); //output:183
console.log(user.sizes.weight); //output:83
```

##### 2.2. JSON 객체를 이용한 깊은 복사

stringify는 객체를 문자열로 변환하는데 이때 원본 객체와의 참조가 끊긴다.

```javascript
let user = {
  name: "SDK",
  age: 28,
  sizes: {
    height: 183,
    weight: 83,
  },
};

let admin = JSON.parse(JSON.stringify(user));
//stringify를 이용해 user객체를 문자열로 만들고, parse를 이용해 문자열을 다시 객체로 만들어서 admin에 넣음. 이 과정에서 원본 객체와의 참조가 끊김.

admin.sizes.weight++;
--admin.sizes.height;

console.log(admin.sizes.height); //output:182
console.log(admin.sizes.weight); //output:84
console.log(user.sizes.height); //output:183
console.log(user.sizes.weight); //output:83
```

##### 2.3. 라이브러리를 이용한 깊은 복사

```javascript
import _ from "lodash";
let user = {
  name: "SDK",
  age: 28,
  sizes: {
    height: 183,
    weight: 83,
  },
};

const admin = _.cloneDeep(user); //cloneDeep함수를 이용한 깊은 복사

admin.sizes.weight++;
--admin.sizes.height;

console.log(admin.sizes.height); //output:182
console.log(admin.sizes.weight); //output:84
console.log(user.sizes.height); //output:183
console.log(user.sizes.weight); //output:83
```
