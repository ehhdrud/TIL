## Array

- 여러 개체(Entity)값을 순차적으로 나열한 자료구조
- 배열 내 값을 요소(Element)라고 하며, 배열 요소는 index로 접근

### 대표 속성(property)과 메서드(method)

- `Array.length()`, `Array.isArray()`: 배열의 크기 및 배열 여부 확인
- `Array.()`, `Array.pop()`, `Array.unShift()`, `Array.Shift()`, `Array.splice()`, `Array.slice()` 등: 배열 추가, 삭제
- `Array.indexOf()`, `Array.lastIndexOf()`, `Array.includes()`: 배열 탐색
- `Array.sort()`, `Array.reverse()`, `Array.join`: 배열 변형(callback 미사용)

#### 배열 선언/접근/속성

- 선언: `new Array()` 혹은 `[]`를 통해 선언하며, 사이즈 혹은 값을 입력하여 초기화 가능
- 접근 방법: `Array[index]`를 통해 index를 통하여 접근
- 배열 속성: `Array.length`를 통해 배열 요소의 개수 확인 가능

```javascript
let arr_1 = new Array(10);
let arr_2 = [];

console.log(arr_1); //[ <10 empty items> ]
console.log(arr_2); //[]

let fruits = ["apple", "orange", "melon"];

console.log(fruits); //[ 'apple', 'orange', 'melon' ]
console.log(fruits.length); //3
console.log(fruits[0]); //apple
console.log(fruits[1]); //orange
console.log(fruits[2]); //melon

fruits[1] = "kiwi";
console.log(fruits); //[ 'apple', 'kiwi', 'melon' ]
```

#### 배열의 실체

- 자바스크립트의 배열은 다른 언어의 일반적인 배열이 아닌 Hash 기반의 객체
- 메모리가 연속적인 밀집 배열(dense array)이 아닌 비연속적인 희소 배열(sparse array)
- 단순히 연속적인 배열이 아니라서 [0], [1], [once], [twice]와 같이 Hash 기반 작성이 가능, 길이는 정수인 index만 계산

```javascript
let nums = [];

nums[0] = "one";
nums[1] = "two";
console.log(nums); //[ 'one', 'two' ]
console.log(nums.length); //2

nums["once"] = "once";
nums["twice"] = "twice";
console.log(nums); //[ 'one', 'two', once: 'once', twice: 'twice' ]
console.log(nums.length); //2
```

#### 배열 타입 확인 및 요소 삭제

- 배열 타입 확인: `Array.isArray(value)`
- 배열 요소 삭제: `delete array[index]`(삭제해도 배열 사이즈가 그대로인 문제점 발생 -> `Array.pop`, `Array.shift`를 주로 사용)

```javascript
let num = 123.456;
let str = "here i am";
let fruits = ["apple", "orange", "melon"];

console.log(Array.isArray(num)); //false
console.log(Array.isArray(str)); //false
console.log(Array.isArray(fruits)); //true

console.log(fruits); //[ 'apple', 'orange', 'melon' ]
console.log(fruits.length); //3

delete fruits[1];
console.log(fruits); //[ 'apple', <1 empty item>, 'melon' ]
console.log(fruits.length); //3
```

#### 배열 조작

- 배열 추가/삭제

  - Back LIFO(Last In First Out: 마지막에 들어온 것이 먼저 나간다)  
    :배열 추가: `Array.push(element)`  
    :배열 삭제: `Array.pop()`
  - Front LIFO(Last In First Out: 마지막에 들어온 것이 먼저 나간다)  
    :배열 추가: `Array.unShift(element)`  
    :배열 삭제: `Array.Shift()`

  ```javascript
  let fruits = ["apple", "orange", "melon"];
  let ret;

  ret = fruits.push("watermelon");
  console.log(fruits); //[ 'apple', 'orange', 'melon', 'watermelon' ]
  console.log(ret); //4

  ret = fruits.pop();
  console.log(fruits); //[ 'apple', 'orange', 'melon' ]
  console.log(ret); //watermelon

  ret = fruits.shift();
  console.log(fruits); //[ 'orange', 'melon' ]
  console.log(ret); //apple

  ret = fruits.unshift("watermelon");
  console.log(fruits); //[ 'watermelon', 'orange', 'melon' ]
  console.log(ret); //3
  ```

- 배열 삭제

  - 원본 데이터에 영향O: `Array.splice(index[,deleteCount, elem1,…,elemN])`

  ```javascript
  let fruits = ["apple", "orange", "melon"];

  console.log(fruits.splice(1)); //[ 'orange', 'melon' ] //index=1부터 삭제해서 리턴
  console.log(fruits); //[ 'apple' ] //index=0만 살아남음

  fruits = ["apple", "orange", "melon", "strawberry"];
  console.log(fruits.splice(1, 1)); //[ 'orange' ] //index=1부터 삭제하는데 그중에 1개만 삭제해서 리턴
  console.log(fruits); //[ 'apple', 'melon', 'strawberry' ]
  console.log(fruits.splice(1, 1, "mango", "kiwi")); //[ 'melon' ] //index=1부터 삭제하는데 그중에 1개만 삭제해서 리턴, 그 자리엔 mango, kiwi 삽입
  console.log(fruits); //[ 'apple', 'mango', 'kiwi', 'strawberry' ]
  ```

  - 원본데이터에 영향X: `Array.slice(start,end)`

  ```javascript
  let fruits = ["apple", "orange", "melon"];

  console.log(fruits.slice(1)); //[ 'orange', 'melon' ] //index=1부터 데이터를 리턴
  console.log(fruits); //[ 'apple', 'orange', 'melon' ] //원본데이터에는 영향을 안줌

  console.log(fruits.slice(1, 2)); //[ 'orange' ] //index=1부터2까지(즉 1만) 데이터를 리턴
  console.log(fruits.slice(-2)); //[ 'orange', 'melon' ] //-2는 orange 이므로 그 뒤로 리턴
  ```

- 배열 병합: `Array.concat(arg1, arg2…)`

```javascript
let fruits = ["apple", "orange", "melon"];

console.log(fruits.concat("strawberry")); //[ 'apple', 'orange', 'melon', 'strawberry' ]
console.log(fruits.concat(["cherry", "banana"])); //[ 'apple', 'orange', 'melon', 'cherry', 'banana' ]
console.log(fruits.concat(["cherry", "banana"], "mango")); //[ 'apple', 'orange', 'melon', 'cherry', 'banana', 'mango' ]
```

#### 배열 반복문

- 반복문을 통해 배열 요소에 접근 가능
- 반복문 문법

  - for … length(index 접근)
    :(ex)`for (let i = 0; i < fruits.length; i++){console.log(fruits[i]);}`
  - for … of(element 접근)
    :(ex)`for (let fruit of fruits){console.log(fruit);}`
  - for … in(key 접근)
    :(ex)`for (let key in fruits){console.log(fruits[key]);}`

  ```javascript
  let fruits = ["apple", "orange", "melon"];

  //index 접근
  for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]); //apple   orange   melon
  }

  //element 접근
  for (let fruit of fruits) {
    console.log(fruit); //apple   orange   melon
  }

  //key 접근
  for (let key in fruits) {
    console.log(fruits[key]); //apple   orange   melon
  }
  ```

#### 배열 탐색

- index 탐색(앞에서부터): `Array.indexOff(item, from)`
- index 탐색(앞에서부터): `Array.lastIndexOff(item, from)`
- 값 포함 여부 확인: `Array.includes(item, from)`

```javascript
let fruits = ["apple", "orange", "banana", "orange", "melon"];
console.log(fruits.indexOf("orange")); //1
console.log(fruits.indexOf("Orange")); //-1 //존재하지 않는다면 -1이 출력
console.log(fruits.indexOf("orange", 2)); //3 //index 2부터 탐색

console.log(fruits.lastIndexOf("orange")); //3
console.log(fruits.lastIndexOf("orange", -3)); //1 //banana부터 역방향으로 검색
console.log(fruits.lastIndexOf("orange", 0)); //-1 //0을 입력하면 그 역방향으로는 어떠한 orange도 없으므로 -1 출력

console.log(fruits.includes("banana")); //true
console.log(fruits.includes("Banana")); //false
console.log(fruits.includes(0)); //false
```

#### 배열 변형

- 배열 정렬: `Array.sort()`
- 배열 반전: `Array.reverse()`
- 배열 변환(배열 값을 문자열로 변환): `Array.join("separator")`

```javascript
let nums = [1, -1, 4, 5, 2, 0];
console.log(nums.sort()); //[ -1, 0, 1, 2, 4, 5 ]
console.log(nums.reverse()); //[ 5, 4, 2, 1, 0, -1 ]

let fruits = ["apple", "orange", "banana", "melon"];

console.log(fruits.sort()); //[ 'apple', 'banana', 'melon', 'orange' ]
console.log(fruits.reverse()); //[ 'orange', 'melon', 'banana', 'apple' ]

let str = fruits.join(); //separator에 아무것도 안쓰면 기본값 ','를 사용해서 분리
console.log(str); //orange,melon,banana,apple

let str_separator = fruits.join(";"); //';'를 사용해서 분리
console.log(str_separator); //orange;melon;banana;apple
```

#### 배열 고차 함수

- 하나 이상의 함수를 매개 변수로 취하거나 함수를 결과로 반환하는 함수(매개 변수로 전달되는 함수는 콜백함수)
- 대표 배열 조작 메서드, 고차함수

  - 임의정렬: `Array.sort(callback function)`  
    (문제점) sort, reverse는 배열의 요소가 일시적으로 문자열로 변경되어 정렬됨  
    (결과1) 2,3,…,9보다 10이 먼저 정렬되는 문제 발생  
    (결과2) 대소문자 구분 없이 정렬이 불가능한 문제 발생  
    (해결책) 오름차순, 내림차순 함수를 정의하고 콜백함수로 불러들여 해결

    > 0보다 큰 값 -> y가 x보다 앞에 오도록 정렬한다  
    > 0보다 작은 값 -> x가 y보다 앞에 오도록 정렬한다  
    > 0 -> 순서를 변경하지 않는다

  ```javascript
  //오름차순 구현1
  return x - y;

  //오름차순 구현2
  if (x > y) return 1;
  else if (x < y) return -1;
  else return 0;

  //오름차순 구현3
  return x > y ? 1 : -1;

  //x,y의 순서 바꿔주면 내림차순
  ```

  ```javascript
  //오름차순 구현1 예제
  let nums = [1, -1, 4, 0, 10, 20, 12];

  console.log(nums.sort()); //[-1, 0, 1, 10, 12, 20, 4] //4가 10보다 높은 수로 취급되는 문제 발생
  console.log(nums.reverse()); // [4, 20, 12, 10, 1, 0, -1] //4가 10보다 높은 수로 취급되는 문제 발생

  //오름차순 함수
  let ascending_order = function (x, y) {
    return x - y; //x-y>0이 참이면 두 값의 위치가 바뀜 //(ex)(10,4) -> 10-4=6 > 0 -> true -> (4,10)
  };

  //내림차순 함수
  let decending_order = function (x, y) {
    return y - x; //y-x>0이 참이면 두 값의 위치가 바뀜 //(ex) (4,10) -> 10-4=6 > 0 -> true -> (10,4)
  };

  console.log(nums.sort(ascending_order)); //[-1, 0, 1, 4, 10, 12, 20]
  console.log(nums.sort(decending_order)); //[20, 12, 10, 4, 1, 0, -1]
  ```

  ```javascript
  //오름차순 구현2 예제
  let fruits = ["apple", "Orange", "orange", "melon"];

  //오름차순 함수, String method를 통해 모두 대문자로 치환하고 오름차순 정렬
  let ascending_order = function (x, y) {
    x = x.toUpperCase();
    y = y.toUpperCase();

    if (x > y) return 1;
    else if (y > x) return -1;
    else return 0;
  };

  //내림차순 함수, String method를 통해 모두 대문자로 치환하고 내림차순 정렬
  let decending_order = function (x, y) {
    x = x.toUpperCase();
    y = y.toUpperCase();

    if (y > x) return 1;
    else if (x > y) return -1;
    else return 0;
  };

  console.log(fruits.sort(ascending_order)); //[ 'apple', 'melon', 'Orange', 'orange' ]
  console.log(fruits.sort(decending_order)); //[ 'Orange', 'orange', 'melon', 'apple' ]
  ```

  ```javascript
  //오름차순 구현3 예제
  let ascending_order = function (x, y) {
    if (typeof x === "string") x = x.toUpperCase();
    if (typeof y === "string") y = y.toUpperCase();

    return x > y ? 1 : -1;
  };

  let decending_order = function (x, y) {
    if (typeof x === "string") x = x.toUpperCase();
    if (typeof y === "string") y = y.toUpperCase();

    return y > x ? 1 : -1;
  };

  let nums = [1, -1, 4, 0, 10, 20, 12];
  console.log(nums.sort(ascending_order)); //[-1, 0, 1, 4, 10, 12, 20]
  console.log(nums.sort(decending_order)); //[20, 12, 10, 4, 1, 0, -1]

  let fruits = ["apple", "Orange", "orange", "melon"];
  console.log(fruits.sort(ascending_order)); //[ 'apple', 'melon', 'orange', 'Orange' ]
  console.log(fruits.sort(decending_order)); //[ 'Orange', 'orange', 'melon', 'apple' ]
  ```

  - 반복작업: `Array.forEach(function(item, index, array){});`  
    : 배열에 포함되는 요소를 차례대로(반복) 꺼내 콜백 함수에 전달하여 처리  
    : `item`: 배열 요소, `index`: 배열 위치, `array`: 배열

  ```javascript
  let nums = [0, 1, 2];

  //use for loop
  for (let i = 0; i < nums.length; i++) {
    console.log(nums[i]); //0  1  2
  }

  //use forEach
  nums.forEach(function (i) {
    console.log(i); //0  1  2
  });
  ```

  - 콜백함수 결과 배열 반환: `Array.map(function(item, index, array){});`  
    : 배열 요소 별 호출 및 결과를 배열로 변환

  ```javascript
  let nums = [1, 2, 3, 4, 5];

  //use for loop
  let use_for_loop = [];
  for (let i = 0; i < nums.length; i++) {
    use_for_loop.push(nums[i] * 2);
  }
  console.log(use_for_loop); //[ 2, 4, 6, 8, 10 ]

  //use map
  let use_map = nums.map(function (item) {
    return item * 2;
  });
  console.log(use_map); //[ 2, 4, 6, 8, 10 ]
  ```

  - 조건 만족하는 하나의 값 반환: `Array.find(function(item, index, array){},accumulator_initial);`

  ```javascript
  let users = [
    { name: "kyeong", age: 23, job: false },
    { name: "dong", age: 26, job: false },
    { name: "seo", age: 29, job: true },
  ];

  let find_job = users.find(function (user) {
    return user.job == false;
  });
  console.log(find_job); //{ name: 'kyeong', age: 23, job: false } //Array.find는 하나의 값만 반환

  let find_age = users.find(function (user) {
    return user.age > 25;
  });
  console.log(find_age); //{ name: 'dong', age: 26, job: false } ////Array.find는 하나의 값만 반환
  ```

  - 조건 만족하는 모든 값 배열로 변환: `Array.filter(function(item, index, array){});`

  ```javascript
  let users = [
    { name: "kyeong", age: 23, job: false },
    { name: "dong", age: 26, job: false },
    { name: "seo", age: 29, job: true },
  ];

  let find_job = users.filter(function (user) {
    return user.job == false;
  });
  console.log(find_job); //[ { name: 'kyeong', age: 23, job: false }, { name: 'dong', age: 26, job: false } ] //filter는 모든 값 반환

  let find_age = users.filter(function (user) {
    return user.age > 25;
  });
  console.log(find_age); //[ { name: 'dong', age: 26, job: false }, { name: 'seo', age: 29, job: true } ] //filter는 모든 값 반환
  ```

  - 누적 결과값 변환: `Array.reduce(function(accumulator,item, index, array){});`  
    : 요소 별 함수 수행 후 누적된 결과값을 반환  
    : `accumulator`: 이전 함수 결과  
    : `accumulator_initial:` acuumulator의 초기값 설정 가능, 없다면 1부터 시작

  ```javascript
  let nums = [1, 2, 3, 4, 5];
  let call_count = 0;

  console.log("result\tvalue\tindex");
  let sum = nums.reduce(function (accumulator, item, index, array) {
    console.log(accumulator, "\t\t", item, "\t\t", index);
    call_count++;
    return accumulator + item;
  }, 0); //만약 initial이 없다면 index 1부터 시작 -> value:2부터 시작하게 됨
  /*
  result	value	index
  0 		 1 		 0
  1 		 2 		 1
  3 		 3 		 2
  6 		 4 		 3
  10 		 5 		 4
  5
  15
  */
  console.log(call_count); //5
  console.log(sum); //15
  ```

### N차원 Array

- 배열 안에 N개 만큼의 배열이 존재하는 객체
- 2/3차원 지도 정보, RGB를 저장하는 2차원 사진 파일 등을 표현할 때 활용 가능

```javascript
//2차원 배열 예제
let array = [
  [101, 102, 103],
  [201, 202, 203],
  [301, 302, 303],
];

console.log(array); //[ [ 101, 102, 103 ], [ 201, 202, 203 ], [ 301, 302, 303 ] ]
console.log(array[0]); //[ 101, 102, 103 ]
console.log(array[2][1]); //302

let array_2 = array.pop();
console.log(array); //[ [ 101, 102, 103 ], [ 201, 202, 203 ] ]
console.log(array.length); //2
console.log(array_2); //[ 301, 302, 303 ]

let array_3 = array.push([401, 402, 403]);
console.log(array.length); //3
console.log(array_3); //3
console.log(array); //[ [ 101, 102, 103 ], [ 201, 202, 203 ], [ 401, 402, 403 ] ]
```

```javascript
//2차원 배열 반복문 예제1
let array = [
  [101, 102, 103],
  [201, 202, 203],
  [301, 302, 303],
];

for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array[i].length; j++) {
    console.log([i], [j]);
  }
}
/*
[ 0 ] [ 0 ]
[ 0 ] [ 1 ]
[ 0 ] [ 2 ]
[ 1 ] [ 0 ]
[ 1 ] [ 1 ]
[ 1 ] [ 2 ]
[ 2 ] [ 0 ]
[ 2 ] [ 1 ]
[ 2 ] [ 2 ]
*/
```

```javascript
//2차원 배열 반복문 예제2
let fruits = [
  ["strawberry", 50],
  ["banana", 100],
  ["ice", 150],
];

for (let i = 0; i < fruits.length; i++) {
  console.log(`fruit: ${fruits[i][0]}, amount: ${fruits[i][1]}`);
}
/*
fruit: strawberry, amount: 50
fruit: banana, amount: 100
fruit: ice, amount: 150
*/
```