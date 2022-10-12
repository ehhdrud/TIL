# Number

자바스크립트에서 일반적인 숫자는 64비트 형식의 IEEE-754 표준 기반 형태로 저장되는 자료형이다.

10진수 외에도 16진수, 8진수, 2진수의 다양한 진수를 사용할 수 있다.

대표 상수값

- `Number.MAX|MIN_VALUE`: 지수로 표시되는 양수의 최대/최소값
- `Number.MAX|MIN_SAFE_INTEGER` :안전하게 표시되는 최대(양수)/최소(음수)값
- `Number.POSITIVE|NEGATIVE_INFINITY`: 무한대의 양수/음수값
- `Number.NaN`: 부동 소수점 산술에서 정의되지 않거나 표현할 수 없는 값으로 해석될 수 있는 데이터 유형

지수 표기법

- `e`: 0의 숫자를 대체할 수 있다.  
  **[ex1]** 1e9: 1000000000  
  **[ex2]** 1e-6: micro sec

진수 표기법

- `0x`(hexadecimal): 16진수 표기
- `0o`(octal): 8진수 표기
- `0b`(binary): 2진수 표기

## 대표 속성 및 메서드

### 1. 문자열로 변환: `Number.toString()`, `String(Number)`, `Number + ""`

```javascript
let us = 1e-6;

console.log(us.toString()); //0.000001
console.log(typeof us.toString()); //string
console.log(typeof String(us)); //string
console.log(typeof (us + "")); //string
```

### 2. 특정 자리수까지 제한하여 숫자 표현: `Number.toFixed()`,`Number.toPrecision()`

```javascript
let num_1 = 125.0;
let num_2 = 123.456;

console.log(num_1 - num_2); //1.543999999999997
console.log((num_1 - num_2).toFixed(3)); //1.544
console.log((num_1 - num_2).toPrecision(3)); //1.54
```

### 3. 타입 확인: `Number.isNaN()`, `Number.isFinite()`

```javascript
console.log(Number.isNaN(123)); //false
console.log(!Number.isNaN(123 / "hello")); //false
console.log(Number.isFinite(123)); //true
console.log(Number.isFinite("hello")); //false //문자열은 Finite하지 않다고 본다.
```

> **📌`Number.isNaN()`과 `isNaN()`의 차이**
>
> `Number.isNaN()`: 엄격한 검사  
> `isNaN()`: 비교적 느슨한 검사

```javascript
console.log(Number.isNaN(undefined)); //false
console.log(Number.isNaN({})); //false
console.log(Number.isNaN("문자열")); //false

console.log(isNaN(undefined)); //true
console.log(isNaN({})); //true
console.log(isNaN("문자열")); //true
```

- `Number.parseInt()`, `Number.parseFloat()`: 정수(n진수로도 명시적으로 변환 가능), 실수로 변환

```javascript
console.log(Number.parseInt("123seo")); //123 //문자열이 섞여도 정수만 뽑아낸다.
console.log(Number.parseFloat("1.25seo")); //1.25
console.log(Number.parseInt("1.25seo")); //1
console.log(Number.parseInt("seo125")); //NaN //앞에 문자열이 섞이면 못 뽑아낸다.
console.log(Number.parseInt("0f", 16)); //15
```
