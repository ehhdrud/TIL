# 함수(Funtion)

> 함수는 다수의 명령문을 코드 블록으로 감싸고, 하나의 실행 단위로 만들 실행 집합이자, 유사한 동작을 하는 코드를 하나로 묶어 범용성을 확대시킨 블록 코드이다.  
> 정의 부분과 호출 부분으로 구성된다.

## 1. 함수 정의

### 1.1. 함수 선언식

`function func (arg1,arg2,…,argN){expression;}`

### 1.2. 함수 표현식

`const func = function (arg1,arg2,…,argN){expression;}`

### 1.3. 화살표 함수

`const func = (arg1,arg2,…,argN)=>expression;`

> ECMAScript2015(ES6)에 추가된 문법으로 기존 정의 방법에 비해 간결하다.  
> 기존 함수와 다르게 `arguments`가 존재하지 않고 `this`의 동작 방식도 다르다.

## 2. 함수 호출

> 자바스크립트 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않으므로, 일치하지 않더라도 동작한다.  
> Default Value: 매개변수에 undefined 변수가 들어올 경우, 기본값을 통해 값 초기화가 가능하다(ES6에서 도입).  
> Dynamic Parameters(`argument[n]`): 매개변수 부분에 아무 입력이 없어도 실제 넘어오는 매개변수 값을 핸들링 할 수 있다.

```javascript
function print_add(x, y = 10) {
  //default value: 10
  console.log(x + y); //20
}

print_add(10, 20, 30); //30 //인수 30은 무시하고 계산한다
print_add(10); //20 //y는 undefined이므로 default value인 10으로 계산한다

function print_min() {
  console.log(arguments[0] - arguments[1]);
} //매개변수 부분 입력이 없지만 dynamic parameters를 통해 제어한다.

print_min(10, 20, 30); //-10
```

## 3. 함수 반환

> `return` 자체의 의미도 있지만 `break` 기능도 병행한다.

```javascript
function checkAge(age) {
  if (age >= 18) return true;
  else return false;
}

console.log(checkAge(14)); //false
console.log(checkAge(20)); //true
```

```javascript
function add(x, y) {
  return x + y;
  console.log("hello!"); //동작하지 않는 라인이다
}

let result = add(10, 20);
console.log(result); //30
```

## 4. 재귀 함수

> 함수 스스로 자신을 참조해 호출하면서 동일한 코드가 계속적으로 수행되는 함수 호출 방법이다.  
> 재귀 함수는 특정 조건이 됐을 때 자신을 그만 호출하도록 하는 exit code가 필수적이다.

```javascript
//재귀함수 예제1
function recursive(num) {
  if (num == 0) return; //exit code
  console.log(num);
  recursive(num - 1);
}

recursive(3); //3 2 1
```

```javascript
//재귀함수 예제2
function recursive(num) {
  if (num == 0) return 0; //exit code
  return num + recursive(num - 1);
}

console.log(recursive(3)); //6
```

```javascript
//재귀함수 예제3(팩토리얼 구현)
function factorial(num) {
  if (num == 0) return 1; //exit code
  return num * factorial(num - 1);
}

console.log(factorial(3)); //6
```

[![image.png](https://i.postimg.cc/T3DDHhVh/image.png)](https://postimg.cc/w19M1qbd)

## 5. 콜백 함수, 고차 함수

> 콜백 함수란 다른 함수의 매개 변수로 전달되어 수행되어지는 함수이다.  
> 고차 함수란 매개변수를 통해 콜백 함수를 받아 호출하는 함수이다.

```javascript
//콜백함수
function add(x, y) {
return x + y;
}
function sub(x, y) {
return x - y;
}
function mul(x, y) {
return x \* y;
}
function div(x, y) {
return x / y;
}

//고차함수
function calculator(callback, x, y) {
return callback(x, y);
}

console.log(calculator(add, 8, 2)); //10
console.log(calculator(sub, 8, 2)); //6
console.log(calculator(mul, 8, 2)); //16
console.log(calculator(div, 8, 2)); //4
```

# 함수 복사

## 1. Call by value: 값에 의한 복사

> 원시형(number, string, boolian, null, undefined, symbol)을 매개 변수로 넘겼을 때 발생한다.  
> 함수 내에서 매개 변수 값을 변경시켜도 영향을 미치지 않는다.

```javascript
let a = 1;
let add = function (b) {
  b = b + 1;
};
add(a);
console.log(a); //1
```

## 2 .Call by reference: 주소에 의한 복사

> 참조형(object, array, function 등)을 매개 변수로 넘겼을 때 발생한다(주소값을 갖기 때문!).  
> 함수 내에서 매개 변수 값을 변경시키면 원본 데이터에 영향을 받는다.

```javascript
let a = { value: 1 };
let add = function (b) {
  b.value = b.value + 1;
};
add(a);
console.log(a); //2
```

# Method

> 배열의 요소(element), 객체의 속성(property)에 함수를 정의하여 저장이 가능하고, 이 저장된 함수를 메서드(Method)라고 부른다.  
> 객체에 대한 주소 값을 가지고, 객체 내 함수도 다시 주소값을 가짐(다른 속성들은 주소값 없음).

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

obj.func = hi_func; //이런식으로 메소드 변경이 가능하다
obj.func(); //hi
```
