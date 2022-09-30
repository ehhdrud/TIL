# Math

표준 bulit-in 객체로써 수학적인 연산을 위한 속성값과 메서드를 제공하는 객체이다.

Math는 생성자 함수가 아니며, 모든 속성과 메서드는 정적이기에 `Math.function()`으로 언제든 호출 가능하다.

## 대표 속성 및 메서드

### 1. 고유 값 표시

- `Math E`: 오일러 상수
- `Math.PI`: 파이

```javascript
console.log(Math.E); //2.718281828459045
console.log(Math.PI); //3.141592653589793
```

### 2. 최대값, 최소값

배열을 인수로 받아 최대, 최소로 산출하려면 함수 혹은 스프레드 문법 사용 필요.

- `Math.max()`: 최댓값
- `Math.min()`: 최솟값

```javascript
//MAX, MIN
console.log(Math.max(-1, 1)); //1
console.log(Math.min(-1, 1)); //-1

console.log(Math.max(1, -1, 5, 23, 17, -4)); //23
console.log(Math.min(1, -1, 5, 23, 17, -4)); //-4

let nums = [1, -1, 5, 23, 17, -4];
console.log(Math.max(nums)); //NaN //배열은 인자로 받을 수 없다.
console, log(Math.max(...nums)); //23 //전개연산자를 이용하면 가능하다.
```

### 3. `Math.abs(x)`: 절댓값

```javascript
console.log(Math.abs(1)); //1
console.log(Math.abs(-1)); //1
console.log(Math.abs(-Infinity)); //Infinity
```

### 4. `Math.random()`: 랜덤 난수 값

```javascript
console.log(Math.random()); //0.3658909807700941
console.log(Math.random() * 10); //6.340983123199808
console.log(Number.parseInt(Math.random() * 10)); //2
console.log(Number.parseInt(Math.random() * 100)); //36

for (let i = 0; i < 10; i++) {
  console.log(Number.parseInt(Math.random() * 10));
} //0 2 4 7 0 5 8 1 4 2
```

### 5. 제곱과 제곱근

- `Math.pow(x,y)`: 제곱 → ES6부터는 `**`로 대체 가능!
- `Math.sqrt(x)`; 제곱근

```javascript
//pow
console.log(Math.pow(2, 3)); //8
console.log(2 ** 3); //8

//sqrt
console.log(Math.sqrt(4)); //2
console.log(Math.sqrt(2)); //1.4142135623730951
```

### 6. 소수점 처리

- `Math.round(x)`: 소수점 이하 반올림
- `Math.ceil(x)`: 소수점 이하 올림
- `Math.floor(x)`: 소수점 이하 내림

```javascript
//round(반올림)
console.log(Math.round(3.5)); //4
console.log(Math.round(-2.3)); //-2
console.log(Math.round(-2.7)); //-3

//ceil(올림)
console.log(Math.ceil(3.5)); //4
console.log(Math.ceil(-2.3)); //-2
console.log(Math.ceil(-2.7)); //-2

//floor(내림)
console.log(Math.floor(3.5)); //3
console.log(Math.floor(-2.3)); //-3
console.log(Math.floor(-2.7)); //-3
```
