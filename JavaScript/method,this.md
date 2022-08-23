# Method

> 배열의 요소(element), 객체의 속성(property)에 함수를 정의하여 저장 가능  
> 객체에 저장된 값이 함수인 경우, 이를 메서드(Method)라고 부름  
> 객체에 대한 주소 값을 가지고, 객체 내 함수도 다시 주소값을 가짐(다른 속성들은 주소값 없음)

```javascript
//주소값 이해하기

//함수 선언식으로 정의
function add_1(x, y) {
  return x + y;
}
//함수 표현식으로 정의
const add_2 = function (x, y) {
  return x + y;
};
//화살표 함수로 정의
const add_3 = (x, y) => x + y;

const add_4 = add_1;

console.log(add_2 == add_1); //false //동작은 같지만 주소값이 달라서 거짓
console.log(add_4 == add_1); //true //주소값도 복사되어 같으므로 참
```

```javascript
let list = [
  "SDK",
  28,
  function hello_func() {
    console.log("hello");
  }, //배열의 요소(element)에 저장된 함수 -> Method
];

let obj = {
  name: "SDK",
  age: 27,
  hello_func() {
    console.log("hello");
  }, //객체의 속성(property)에 저장된 함수 -> Method
};

obj.hello_func(); //hello
list[2](); //hello

console.log(typeof obj.hello_func); //function
console.log(typeof list[2]); //function
```

```javascript
function hello_func() {
  console.log("hello");
}

function hi_func() {
  console.log("hi");
}

let obj = {
  name: "SDK",
  age: 28,
  func: hello_func,
};

hello_func(); //hello
obj.func(); //hello
console.log(hello_func == obj.func); //true

obj.func = hi_func; //이런식으로 메소드 변경 가능
obj.func(); //hi
console.log(hello_func == obj.func); //false //변경되어 더이상 같지 않음
console.log(hi_func == obj.func); //true //변경되어 같음
```

# this

> 메서드에서 객체 내부의 속성 값에 접근할 수 있도록 하는 지시자  
> this를 사용하는 method는 추가 가능하며, 이 때 this는 runtime에 결정되어 호출한 객체에 따라 다름

```javascript
let user = {
  name: "SDK",
};

let admin = {
  name: "Seo",
};

//hello_func 내 this값은 런타임에 결정
function hello_func() {
  console.log("hello" + this.name);
}

user.func = hello_func;
admin.func = hello_func;

user.func(); //helloSDK //this->user
admin.func(); //helloSEO //this->admin
```
