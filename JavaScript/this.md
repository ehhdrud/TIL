# this

this란 특정 **객체**에 접근할 수 있는 **지시자**이자 **예약어**이다.

**함수에서의 this**는 **전역 공간**을 가르키고, **메서드**에서의 this는 **호출한 객체의 공간**을 가르킨다.

`new`와 함께 사용하면 비슷한 여러개의 객체를 쉽게 찍어낼 수 있다.

```js
let user = {
  name: "SDK",
};

let admin = {
  name: "Seo",
};

function hello_func() {
  console.log("hello" + this.name);
}
//함수 내부 this값은 런타임에 결정된다.

user.func = hello_func;
admin.func = hello_func;

user.func(); //helloSDK
admin.func(); //helloSEO
```

## 1. 바인딩

### 1.1. 암시적 바인딩

기본적으로 *아래 규칙*처럼 동작한다. 하지만 여러가지 환경적 요소가 암시적 바인딩에 관여하므로 예측하기 매우 어렵다.

#### 1.1.1. 전역 공간에서의 `this`

**전역 객체**에 바인딩된다. 실행환경마다 전역 객체가 다르기 때문에 브라우저에서는 `window`, node.js에서는 `global`을 가르킨다.

#### 1.1.1.1. 함수에서의 `this`

호출되는 위치에 따라 바인딩된다.

아무것도 명시하지 않고 호출 시 **전역 객체**에 바인딩된다.

`obj.func`처럼 **호출되는 위치**가 있다면 그 위치(`obj`)에 바인딩 된다.

#### 1.1.1.1. 메서드에서의 `this`

호출한 객체의 공간, 즉 **호출되는 위치**를 가르킨다. 을 가르킨다.

### 1.2. 명시적 바인딩

암시적 바인딩이 예측이 어렵게 동작할 때를 대비해, this의 객체를 명시적으로 지정해 줄 수 있다.

#### 1.2.1. `function.call`

**함수를 호출**하는 함수이다.

첫 번째 인자로 **this가 가르킬 객체**, 두 번째 인자부터는 **함수의 매개변수**를 입력한다.

#### 1.2.2. `function.apply`

**함수를 호출**하는 함수이다.

첫 번째 인자로 **this가 가르킬 객체**, 두 번째 인자부터는 **배열인 함수의 매개변수**를 입력한다.

#### 1.2.3. `function.bind`

**함수를 실행하지 않고 지정한 객체로 바인딩된 함수를 리턴**하는 함수이다.

첫 번째 인자로 **this가 가르킬 객체**를 입력한다.

> **📌call, apply, bind 함수 예시**
>
> ```js
> const user = {
>   name: "동경",
>   sayName: function () {
>     return this.name + "입니다.";
>   },
> };
>
> function sayFullName(firstName) {
>   return firstName + this.sayName();
> }
>
> const result1 = sayFullName.call(user, "서");
> console.log(result1); //서동경입니다.
>
> const result2 = sayFullName.apply(user, ["서"]);
> console.log(result2); //서동경입니다.
>
> const boundSay = sayFullName.bind(user);
> const result3 = boundSay("서");
> console.log(result3); //서동경입니다.
> ```

## 2. this의 사용

### 2.1. 전역에 선언된 함수의 this

#### 2.1.1. function이 전역(window, global)인 경우

```js
function myFn() {
  return this;
}
myFn(); // window 객체 출력
```

#### 2.1.2. new연산자를 사용해 생성자 함수 방식으로 인스턴스를 생성한 경우

```js
function MyFn() {
  this.title = "Hello World!";
  return this;
}
// new 연산자를 이용해서 새로운 객체를 얻는다.
const myfn = new MyFn();
myfn; // MyFn {title: 'Hello World!'}
```

### 2.2. 객체에 선언된 메서드의 this

#### 2.2.1. 해당 객체를 바로 가르키는 경우

showTitle() 메소드는 fn 객체의 메소드이기 때문에 this는 fn 객체를 참조한다.

```js
const fn = {
  title: "Hello World!",
  showTitle() {
    console.log(this.title);
  },
};
fn.showTitle(); // 'Hello World!'
```

#### 2.2.2. 고차함수의 콜백함수 안에서의 this

##### 2.2.2.1. 문제점

콜백함수가 일반함수이므로 전역 객체를 참조한다.

```js
const fn = {
  title: "Hello World!",
  tags: [1, 2, 3],
  showTags() {
    this.tags.forEach(function (tag) {
      console.log(tag);
      console.log(this); // window
    });
  },
};
fn.showTags();
/**
 * output:
 * 1
 * window 객체 출력
 * 2
 * window 객체 출력
 * 3
 * window 객체 출력
 */
```

##### 2.2.2.1. 해결 방법

콜백함수 다음 인자로 참조할 객체를 전달해준다.

```js
const fn = {
  title: "Hello World!",
  tags: [1, 2, 3],
  showTags() {
    this.tags.forEach(function (tag) {
      console.log(tag);
      console.log(this); // fn
    }, this); // 여기는 일반 함수 바깥, 즉 fn 객체를 참조할 수 있다.
  },
};
fn.showTags();
/**
 * output:
 * 1
 * fn 객체 출력
 * 2
 * fn 객체 출력
 * 3
 * fn 객체 출력
 */
```

#### 2.2.3. 화살표 함수에서의 this

function 키워드로 생성한 일반함수와 화살표 함수의 가장 큰 차이점이 바로 this이다.

화살표 함수에서의 this는 언제나 상위 스코프의 this이다. 이를 **Lexical this**라고 한다. 즉, 일반함수는 함수를 *호출*할 때 바인딩할 객체가 동적으로 정해진다면, 화살표 함수는 함수를 *선언*할 때 바인딩할 객체가 정적으로 정해진다.

화살표 함수의 this는 `call`, `apply`, `bind`를 통해 변경할 수 없다.

> **📌Lexical Scope(Static Scope)**
>
> 함수가 어디서 *호출*되었는지가 아니라 어디서 *선언*되었는지에 따라 상위 스코프가 결정

```js
const fn = {
  title: "Hello World!",
  tags: [1, 2, 3],
  showTags() {
    this.tags.forEach((tag) => {
      console.log(tag);
      console.log(this); // fn
    });
  },
};
fn.showTags();
/**
 * output:
 * 1
 * fn 객체 출력
 * 2
 * fn 객체 출력
 * 3
 * fn 객체 출력
 */
```
