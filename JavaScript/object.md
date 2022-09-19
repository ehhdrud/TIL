# 객체(Object)

## 1.객체 생성

### 1.1. 싱글 리터럴(객체 리터럴)을 통한 객체 생성

```javascript
const obj = {
  property: "value",
  method: function () {},
  //...
};
```

### 1.2. `new`연산자를 통한 객체 생성

> 여러 유사한 객체를 만들 때 주로 사용한다.

```javascript
function NewObject(name) {
  this.name = name;
}
const obj = new NewObject("seo");
```

### 1.3. `Object.create([프로토타입],[객체서술자])`메서드를 통한 객체 생성

> 만들 떄부터 자세하게 만들고 싶은 경우 주로 사용한다.

```javascript
const obj = Object.create(Object.prototype, {
  name: {
    value: "seo",
    writable: true, //덮어쓸 수 있는지?
    enumerable: true, //열거할 수 있는지?
    configurable: true, //객체 서술자를 수정할 수 있는지?
  },
});
```

## 2. 객체의 추가, 삭제

### 2.1. `object.key = value`, `object["key"] = value`: 추가

```javascript
let user = {
  name: "SDK",
  age: 28,
};

user.height = 183; //추가
user["weight"] = 83; //추가
console.log(user); //{ name: 'SDK', age: 28, height: 183, weight: 83 }
```

### 2.2. 삭제: `delete object.key`: 삭제

```javascript
let user = {
  name: "SDK",
  age: 28,
};

delete user.age; //삭제
console.log(user); //{ name: 'SDK'}
```

## 3. 객체를 특정 배열로 반환

### 3.1. `Object.keys()`: key값을 배열로 반환

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.keys(obj)); //[ 'a', 'b', 'c' ]
```

### 3.2. `Object.values()`: value값을 배열로 반환

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.values(obj)); //[ 1, 2, 3 ]
```

### 3.3. `Object.entries()`: key, value값를 이중 배열 형태로 반환

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.entries(obj)); //[ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
```

## 객체 복사

> 객체 복사는 주소값만을 복사하여 결국 같은 공간을 가르키게 되는 문제가 생기므로 [얕은 복사(Shallow copy)](#1-얕은-복사shallow-copybr)와 [깊은 복사(Deep copy)](#2-깊은-복사deep-copy)를 통해 대상 전체를 복사해야 한다.

### 1. 얕은 복사(Shallow copy)

> *객체 내부에 또 다른 객체가 없을 경우*의 복사 방법이다.

#### 1.1. 반복문 for문을 통한 객체 복사

```javascript
let user = {
  name: "SDK",
  age: 28,
};

let admin = {}; //1. 빈 객체를 만들어준다.

for (let key in user) {
  admin[key] = user[key];
} //2. for...in문을 통해 admin에 할당한다.

admin.name = "Seo";
console.log(admin.name); //Seo
console.log(user.name); //SDK
```

#### 1.2. Object.assign() 함수를 이용한 복사

```javascript
let user = {
  name: "SDK",
  age: 28,
};

let admin = Object.assign({}, user); //Object.assign함수를 이용해 할당한다.

admin.name = "Seo";
console.log(admin.name); //Seo
console.log(user.name); //SDK
```

#### 1.3. ES6에서부터 지원하는 전개연산자(Spread Operator)를 이용한 복사(제일 좋음!)

```javascript
let user = {
  name: "SDK",
  age: 28,
};

let admin = { ...user }; //전개연산자를 이용해 새로운 공간을 만들어서 그 공간으로 복사한다.

admin.name = "Seo";
console.log(admin.name); //Seo
console.log(user.name); //SDK
```

### 2. 깊은 복사(Deep copy)

> *객체 내부에 또 다른 객체가 있을 경우*의 복사 방법이다.

#### 2.1. 재귀 함수를 이용한 깊은 복사

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
}

letadmin = copy(user);

admin.sizes.weight++;
--admin.sizes.height;

console.log(admin.sizes.height); //output:182
console.log(admin.sizes.weight); //output:84
console.log(user.sizes.height); //output:183
console.log(user.sizes.weight); //output:83
```

#### 2.2. JSON 객체를 이용한 깊은 복사

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
//stringify를 이용해 user객체를 원본 객체와 참조를 끊으면서 문자열로 만들고, parse를 이용해 문자열을 다시 객체로 만들어서 admin에 넣는다.

admin.sizes.weight++;
--admin.sizes.height;

console.log(admin.sizes.height); //output:182
console.log(admin.sizes.weight); //output:84
console.log(user.sizes.height); //output:183
console.log(user.sizes.weight); //output:83
```

#### 2.3. 라이브러리를 이용한 깊은 복사

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

const admin = _.cloneDeep(user); //cloneDeep함수를 이용하여 복사한다.

admin.sizes.weight++;
--admin.sizes.height;

console.log(admin.sizes.height); //output:182
console.log(admin.sizes.weight); //output:84
console.log(user.sizes.height); //output:183
console.log(user.sizes.weight); //output:83
```
