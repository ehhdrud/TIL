# 함수(Funtion)

> 함수는 다수의 명령문을 코드 블록으로 감싸고, 하나의 실행 단위로 만들 실행 집합이자, 유사한 동작을 하는 코드를 하나로 묶어 범용성을 확대시킨 블록 코드.  
> 정의 부분과 호출 부분으로 구성.  
> 함수는 가급적 한 가지 일만 하며, 매개 변수는 최대 3개 이내로 작성을 권장.

## 1. 함수 정의

### 1.1. 함수 선언식

`function func (arg1,arg2,…,argN){expression;}`

### 1.2. 함수 표현식

`const func = function (arg1,arg2,…,argN){expression;}`

### 1.3. 화살표 함수

> ECMAScript2015(ES6)에 추가된 문법.  
> 기존 함수와 다르게 arguments가 존재하지 않고 this의 동작 방식이 다름.

`const func = (arg1,arg2,…,argN)=>expression;`

```javascript
//함수 선언식
function add_1(x, y) {
  return x + y;
}

//함수 표현식
const add_2 = function (x, y) {
  return x + y;
};

//화살표 함수
const add_3 = (x, y) => x + y;

const add_4 = add_1;

console.log(add_4(1, 3));

console.log(add_2 == add_1); //false //동작은 같지만 주소값이 다름
console.log(add_4 == add_1); //true //주소값도 복사되어 같으므로
```

## 2. 함수 호출

> 자바스크립트 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않으므로, 달라도 에러 뜨지 않음.

- default value(`...argument = default value`): 기본값을 통해 undefined 변수가 들어올 경우 값 초기화 지정 가능(ES6에서 도입)
- dynamic parameters(`argument[n]`): 매개변수 부분에 아무 입력이 없어도 실제 넘어오는 매개변수 값을 핸들링 할 수 있음

```javascript
function print_add(x, y = 10) {
  //default value 10으로 설정
  console.log(x + y); //20
}

print_add(10, 20, 30); //에러 없이 30은 무시하고 계산 //30
print_add(10); //y는 undefined이므로 default value인 10으로 계산 //20

function print_min() {
  console.log(arguments[0] - arguments[1]);
} //매개변수 부분 입력이 없지만 dynamic parameters를 통해 제어

print_min(10, 20, 30); //-10
```

## 3. 함수 반환

> 반환 자체의 의미도 있지만 break 기능도 병행.

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
  console.log("hello!"); //동작하지 않는 라인(VS Code에서도 흐릿하게 처리)
}

let result = add(10, 20);
console.log(result); //30 //"hello!"는 출력X
```

## 4. 재귀 함수

> 함수 스스로 자신을 참조해 호출하면서 동일한 코드가 계속적으로 수행되는 함수 호출 방법.  
> 재귀 함수는 특정 조건이 됐을 때 자신을 그만 호출하도록 하는 exit code가 필요.

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

> 콜백 함수란 다른 함수의 매개 변수로 전달되어 수행되어지는 함수.  
> 고차 함수란 매개변수를 통해 콜백 함수를 받아 호출하는 함수.

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

> 함수 내에서 매개 변수 값을 변경시켜도 영향을 미치지 않음.  
> 원시형(number, string, boolian, null, undefined, symbol)을 매개 변수로 넘겼을 때 발생.

```javascript
let a = 1;
let add = function (b) {
  b = b + 1;
}; //callee
add(a); //caller
console.log(a); //1 //함수 내 매개변수가 2가 되어도 원본 데이터는 유지
```

## 2 .Call by reference: 주소에 의한 복사

> 함수 내에서 매개 변수 값을 변경시키면 원본 데이터에 영향을 받음.  
> 참조형(object, array, function 등)을 매개 변수로 넘겼을 때 발생(주소값을 갖기 때문에).

```javascript
let a = { value: 1 };
let add = function (b) {
  b.value = b.value + 1;
}; //callee
add(a); //caller
console.log(a); //2 //함수 내 매개변수가 2가 되면 원본 데이터도 같이 변함
```

# 생성자 함수 `new`

> 유사한 객체를 다중으로 만들 때 사용되는 함수(타 언어에서의 class 개념과 유사).  
> 일반적으로 생성자 함수의 첫 글자는 대문자로 시작.

- `new`: 생성자 함수로 객체 생성

```javascript
//붕어빵 틀
function FishBread(flavor, price) {
  this.flavor = flavor;
  this.price = price;
  this.base = "flour";
}

//붕어빵 종류
let bread_1 = new FishBread("cream", 1200);
let bread_2 = new FishBread("redbean", 1000);
let bread_3 = new FishBread("milk", 1500);

console.log(bread_1); //FishBread { flavor: 'cream', price: 1200, base: 'flour' }
console.log(bread_2); //FishBread { flavor: 'redbean', price: 1000, base: 'flour' }
console.log(bread_3); //FishBread { flavor: 'milk', price: 1500, base: 'flour' }
```

- `new.target`: 객체 내부적으로 new가 없으면 undefiend 출력(이를 활용해 new를 추가해줄 수 있음)

```javascript
function User(name) {
  //if문을 통해 new 안 붙여도 정상 동작하도록 활용
  if (!new.target) {
    return new User(name);
  }
  this.name = name;
}

let result_1 = User("john");
console.log(result_1); //User { name: 'john' } //생성자 함수 new가 없어도 제대로 출력됨

let result_2 = new User("john");
console.log(result_2); //User { name: 'john' }
```
