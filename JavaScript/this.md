# this

this란 **예약어**다.

**함수에서의 this**는 **전역 공간**을 가르키고, **메서드**에서의 this는 **호출한 객체의 공간**을 가르킨다.

```javascript
let user = {
  name: "SDK",
};

let admin = {
  name: "Seo",
};

//함수 내부 this값은 런타임에 결정된다.
function hello_func() {
  console.log("hello" + this.name);
}

user.func = hello_func;
admin.func = hello_func;

user.func(); //helloSDK //this->user
admin.func(); //helloSEO //this->admin
```

## 1. 바인딩

this는 예측이 어렵게 동작하므로 명시적 바인딩, 즉 this의 객체를 명시적으로 지정해주는 과정이 필요하다.

- `function.call(this가 가르킬 객체,function의 매개변수)`
- `function.apply(this가 가르킬 객체,function의 매개변수를 가진 배열)`: 매개변수로 배열을 넘기고 싶을 때 사용한다.
- `function.bind(this가 가르킬 객체)`: 함수를 실행하지 않고 바인딩된 함수를 리턴하여 영구적인 지정이 가능하다.

```javascript
const me = {
  name: "동경",
  sayName: function () {
    return this.name + "입니다.";
  },
};

const mom = {
  name: "향자",
  sayName: function () {
    return this.name + "입니다.";
  },
};

function sayFullName(firstName) {
  return firstName + this.sayName();
}

const result1 = sayFullName.call(me, "서");
console.log(result1); //서동경입니다.

const result2 = sayFullName.apply(me, ["서"]);
console.log(result2); //서동경입니다.

const boundSay = sayFullName.bind(me);
const result3 = boundSay("서");
console.log(result3); //서동경입니다.
```

## 2. this의 사용

### 2.1. 전역에 선언된 함수의 this

#### 2.1.1. function이 전역(window, global)인 경우

```javascript
function myFn() {
  return this;
}
myFn(); // window 객체 출력
```

#### 2.1.2. new연산자를 사용해 생성자 함수 방식으로 인스턴스를 생성한 경우

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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
