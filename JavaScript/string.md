# String

텍스트 길이에 상관없이 문자열 형태로 저장되는 자료형이다.

자바스크립트의 문자열은 페이지 인코딩 방식과 상관없이 항상 UTF-16 형식을 따른다.

## 대표 속성(property)과 메서드(method)

### 1. 문자열 길이: `String.length`

```javascript
let str = "hello\nworld\n!!!";

console.log(str.length); //15
```

### 2. 문자열 접근: `String.charAt(index)`, `String.charCodeAt(index)`

```javascript
let str = "hello";

console.log(str.charAt(1)); //e
console.log(str[1]); //e
console.log(str.charCodeAt(1)); //101 //index의 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환한다.
```

### 3. 문자열 검색: `String.indexOf()`, `String.lastIndexOf()`, `String.includes()`, `String.startWith()`, `String.endWith()`

```javascript
let text = "hello world!!!";

console.log(text.indexOf("l")); //2 //첫번째로 만난 "l"의 위치를 반환한다.
console.log(text.indexOf("l", 3)); //3 //index:3부터 검색해서 "l"의 위치를 반환한다.
console.log(text.lastIndexOf("l")); //9 //뒤에서부터 역방향으로 검색해서 첫번째로 만난 "l"의 위치를 반환한다.

console.log(text.includes("HELLO")); //false //대소문자가 구분된다.
console.log(text.startsWith("ello", 1)); //true //원래는 ello로 시작하지 않으므로 false를 반환하나, index:1부터 검색해서 true를 반환한다.
console.log(text.endsWith("world")); //false //world로 끝나지 않으므로 false를 반환한다.
```

### 4. 문자열 반환: `String.toUpperCase()`, `String.toLowerCase()`

```javascript
let str = "Hello";
console.log(str.toUpperCase()); //HELLO //대문자로 변경된 값을 반환한다.
console.log(str.toLowerCase()); //hello //소문자로 변경된 값을 반환한다.
```

### 5. 문자열 치환: `String.replace()`

```javascript
let text = "helLo, world!!!";
let changed_text = "";

changed_text = text.replace("world", "earth");

console.log(changed_text); //helLo, earth!!!
console.log(text); //helLo, world!!!

console.log(text.replace("!", "?")); //helLo, world?!!
console.log(text.replace("l", "i")); //heiLo, world!!!
```

- 정규 표현식을 활용한 문자열 치환 방법: `/치환문자열/g(전체)i(대소문자구분X)`

```javascript
let text = "helLo, world!!!";

console.log(text.replace(/l/g, "i")); //heiLo, worid!!!
console.log(text.replace(/l/gi, "i")); //heiio, worid!!!
```

### 6. 문자열 추출

- 위치 기반 문자열 추출: `String.slice(start, end)`, `String.substring(start, end)`
- 길이 기반 문자열 추출: `String.sunstr(start, length)`

```javascript
let text = "hello, world!!!";

console.log(text.slice(0, 5)); //hello //index:0부터 4까지 반환한다.
console.log(text.slice(4, 5)); //o //index:4를 반환한다.
console.log(text.slice(4)); //o, world!!! //index:4부터 반환한다.
console.log(text.slice(-4)); //d!!! //뒤에서 4번째부터 반환한다.

console.log(text.slice(2, 6)); //llo,
console.log(text.slice(6, 2)); //출력X
console.log(text.substring(2, 6)); //llo,
console.log(text.substring(6, 2)); //llo, //substring은 자체적으로 (2, 6)으로 변환한다.

console.log(text.substr(2, 6)); //llo, w //index:2부터 length:6만큼 반환한다.
console.log(text.substr(-5, 3)); //ld! //뒤에서 5번째부터 length:3만큼 반환한다.
```

### 7. 문자열을 배열로 분할: `String.split()`

```javascript
let fruits = "apple banana melon";

let result = fruits.split(" ");
console.log(result); //[ 'apple', 'banana', 'melon' ]

console.log(result[0]); //apple
console.log(result[1]); //banana
console.log(result[2]); //melon

let text = "hello";

result = text.split("");
console.log(result); //[ 'h', 'e', 'l', 'l', 'o' ]
console.log(result.length); //5
console.log(result[0]); //h

result = text.split("", 3); //분할 후 length:3만큼 반환한다.
console.log(result); //[ 'h', 'e', 'l' ]
console.log(result.length); //3
```
