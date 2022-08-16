## String

- 텍스트 길이에 상관없이 문자열 형태로 저장되는 자료형
- 자바스크립트에는 문자열 하나만 저장할 수 있는 char 자료형이 없음
- 자바스크립트에서 문자열은 페이지 인코딩 방식과 상관없이 항상 UTF-16 형식을 따름

### 대표 속성(property)과 메서드(method)

- `String.length`: 문자열 길이

```javascript
let str = "hello\nworld\n!!!";

console.log(str.length); //15
```

- `String.charAt(index)`, `String.charCodeAt(index)`: 문자열 접근

```javascript
let str = "hello";

console.log(str.charAt(1)); //e
console.log(str[1]); //e
console.log(str.charCodeAt(1)); //101
```

- `String.indexOf()`, `String.lastIndexOf()`, `String.includes()`, `String.startWith()` 등: 문자열 검색

```javascript
let text = "hello world!!!";

console.log(text.indexOf("l")); //2 //첫번째로 만난 l의 위치를 리턴함
console.log(text.indexOf("l", 3)); //3 //3번째("hel")까지 건너뛰고 검색해서 두번째 l의 위치 리턴함
console.log(text.lastIndexOf("l")); //9 //뒤에서부터 시작해서 첫번째로 만난 l의 위치 리턴함

console.log(text.includes("HELLO")); //false //대소문자 구분해서 false 리턴
console.log(text.startsWith("ello", 1)); //true //ello로 시작하지 않으면 false 리턴. 그래서 첫번째("h") 건너뛰고 검색해서 true 리턴
console.log(text.endsWith("world")); //false //world로 끝나지 않으므로 false 리턴
```

- `String.toUpperCase()`, `String.toLowerCase()`: 문자열 변환

```javascript
let str = "Hello";
console.log(str.toUpperCase()); //HELLO //대문자로 변경
console.log(str.toLowerCase()); //hello //소문자로 변경
```

- `String.replace()`: 문자열 치환

```javascript
let text = "helLo, world!!!";
let changed_text = "";

changed_text = text.replace("world", "earth");

console.log(changed_text);
console.log(text);

console.log(text.replace("!", "?"));
console.log(text.replace("l", "i"));
```

- 정규 표현식 활용 문자열 치환 방법
  : 치환 문자열에 정규 표현식 기입 → `/치환문자열/g(전체)i(대소문자구분X)`

```javascript
let text = "helLo, world!!!";

console.log(text.replace(/l/g, "i")); //heiLo, worid!!!
console.log(text.replace(/l/gi, "i")); //heiio, worid!!!
```

- `String.slice(start, end)`, `String.substring(start, end)`:위치 기반 문자열 추출
  `String.sunstr(start, length)`:길이 기반 문자열 추출

```javascript
let text = "hello, world!!!";

console.log(text.slice(0, 5)); //hello //0번-4번 자리 출력
console.log(text.slice(4, 5)); //o //4번 자리 출력
console.log(text.slice(4)); //o, world!!! //4번자리 이후 출력
console.log(text.slice(-4)); //d!!! //-n이면 뒤에서n번째자리 이후 출력

console.log(text.slice(2, 6)); //llo,
console.log(text.slice(6, 2)); //   //출력안됨
console.log(text.substring(2, 6)); //llo,
console.log(text.substring(6, 2)); //llo, //substring은 내부적으로 (2, 6)으로 변환하여 출력

console.log(text.substr(2, 6)); //llo, w //2번 자리부터 6글자 출력
console.log(text.substr(-5, 3)); //ld! //-5번 자리부터 3글자 출력
```

- `String.split()`: 문자열 분할

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

result = text.split("", 3);
console.log(result); //[ 'h', 'e', 'l' ]
console.log(result.length); //3
```
