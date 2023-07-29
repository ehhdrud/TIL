# 배열(Array)

여러 개체(Entity)값을 순차적으로 나열한 자료구조를 배열(Array)라고 한다.

배열 내 값을 요소(Element)라고 하며, 배열 요소는 [Index]로 접근한다.

## 1. 배열의 실체

메모리가 연속적인 밀집 배열(Dense Array)이 아닌 비연속적인 희소 배열(Sparse Array)이다.

자바스크립트의 배열은 다른 언어의 일반적인 배열이 아닌 Hash 기반의 객체이다. 그러므로 [once], [twice]와 같이 Hash 기반 작성이 가능하다. 그러나 길이는 element만 계산한다.

일반적인 배열에 비해 특정 요소를 탐색하거나 배열 요소를 삽입 또는 삭제하기에 용이하다. 그러나 배열 요소에 접근하는 경우, 일반적인 배열보다 느리다는 단점이 있다.

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

## 2. 배열 반복문

- for … length(index 접근): `for (let i = 0; i < arr.length; i++){console.log(arr[i]);}`
- for … of(element 접근): `for (let element of arr){console.log(element);}`
- for … in(key 접근): `for (let key in arr){console.log(arr[key]);}`

```javascript
let fruits = ["apple", "orange", "melon"];

//index 접근
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]); //apple   orange   melon
}
```

```javascript
let nums = [];

nums[0] = "one";
nums[1] = "two";
nums["once"] = "ONCE";
nums["twice"] = "TWICE";

console.log(nums); //[ 'one', 'two', once: 'ONCE', twice: 'TWICE' ]

//element 접근
for (let element of nums) {
  console.log(element); //one  two
}

//key 접근
for (let key in nums) {
  console.log(nums[key]); //one  two  ONCE  TWICE
}
```

## 3. 대표 속성(property)과 메서드(method)

### 3.1. 배열 여부 확인, 배열로 변경

- `Array.isArray()`: 배열 여부 확인

```javascript
console.log(Array.isArray(arguments)); //false //배열이 아닌 유사 배열 객체.
console.log(Array.isArray(NodeList)); //false //배열이 아닌 유사 배열 객체.
```

- `Array.from()`: *유사 배열 객체(Array Like Object)*나 *반복 가능한 객체(Iterable Object)*를 얕게 복사해 새로운 배열 객체를 생성

```javascript
arguments.push("hi"); //TypeError: arguments.push is not a function

const arr1 = Array.from(arguments);
arr1.push("hi"); //Array.push 메서드가 잘 동작한다.
```

### 3.2. 배열 선언/접근/속성

- `new Array()` 혹은 `[]`를 통해 선언하며, 사이즈 혹은 값을 입력하여 초기화
- `Array[index]`: index를 통해 접근한다.
- `Array.length`: 배열 요소의 개수를 확인한다.

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

### 3.3. 원본 데이터에 영향이 있는 배열 조작

#### 3.3.1. 배열 추가/삭제

##### 3.3.1.1. 뒤에서 추가/삭제

- `Array.push(element)`: Array 뒤쪽에서 요소를 추가하고, 추가한 배열의 크기를 반환한다.
- `Array.pop()`: Array 뒤쪽에서 요소를 삭제하고, 삭제한 element를 반환한다.

```javascript
let fruits = ["apple", "orange", "melon"];
let ret;

ret = fruits.push("watermelon");
console.log(fruits); //[ 'apple', 'orange', 'melon', 'watermelon' ]
console.log(ret); //4

ret = fruits.pop();
console.log(fruits); //[ 'apple', 'orange', 'melon' ]
console.log(ret); //watermelon
```

##### 3.3.1.2. 앞에서 추가/삭제

- `Array.unShift(element)`: Array 앞쪽에서 요소를 추가하고, 추가한 배열의 크기를 반환한다.
- `Array.shift()`: Array 앞쪽에서 요소를 삭제하고, 삭제한 element를 반환한다.

```javascript
let fruits = ["apple", "orange", "melon"];
let ret;

ret = fruits.shift();
console.log(fruits); //[ 'orange', 'melon' ]
console.log(ret); //apple

ret = fruits.unshift("watermelon");
console.log(fruits); //[ 'watermelon', 'orange', 'melon' ]
console.log(ret); //3
```

#### 3.3.2. `Array.splice(index,deleteCount,elem1,…,elemN)`

특정 위치 배열을 삭제 혹은 삭제와 추가를 동시에 하는 메서드이다.

```javascript
let fruits = ["apple", "orange", "melon"];

console.log(fruits.splice(1)); //[ 'orange', 'melon' ] //index:1부터 삭제해서 반환한다.
console.log(fruits); //[ 'apple' ] //원본 배열은 index:0만 남는다.

fruits = ["apple", "orange", "melon", "strawberry"];
console.log(fruits.splice(1, 1)); //[ 'orange' ] //index:1부터 삭제하는데 그중에 1개만 삭제해서 반환한다.
console.log(fruits); //[ 'apple', 'melon', 'strawberry' ]
console.log(fruits.splice(1, 1, "mango", "kiwi")); //[ 'melon' ] //index:1부터 삭제하는데 그중에 1개만 삭제해서 반환하고 그 자리엔 mango, kiwi를 삽입한다.
console.log(fruits); //[ 'apple', 'mango', 'kiwi', 'strawberry' ]
```

#### 3.3.3 `delete array[index]`

배열 사이즈가 그대로인 배열 요소를 삭제하는 메서드이다.

```javascript
let fruits = ["apple", "orange", "melon"];

delete fruits[1];
console.log(fruits); //[ 'apple', <1 empty item>, 'melon' ]
console.log(fruits.length); //3
```

### 3.4. 원본 데이터에 영향이 없는 배열 조작

#### 3.4.1 `Array.slice(start,end)`

특정 위치 배열을 제외하고 반환하는 메서드이다.

```javascript
let fruits = ["apple", "orange", "melon"];

console.log(fruits.slice(1)); //[ 'orange', 'melon' ] //index:1부터 반환한다.
console.log(fruits); //[ 'apple', 'orange', 'melon' ] //원본데이터에는 영향X!

console.log(fruits.slice(1, 2)); //[ 'orange' ] //index:1만 반환한다.
console.log(fruits.slice(-2)); //[ 'orange', 'melon' ] //뒤에서 2번째부터 반환한다.
```

#### 3.4.2. `Array.concat(arg1, arg2…)`

배열을 병합하는 메서드이다.

```javascript
let fruits = ["apple", "orange", "melon"];

console.log(fruits.concat("strawberry")); //[ 'apple', 'orange', 'melon', 'strawberry' ]
console.log(fruits.concat(["cherry", "banana"])); //[ 'apple', 'orange', 'melon', 'cherry', 'banana' ]
console.log(fruits.concat(["cherry", "banana"], "mango")); //[ 'apple', 'orange', 'melon', 'cherry', 'banana', 'mango' ]
console.log(["grape"].concat(fruits)); //[ 'grape', 'apple', 'orange', 'melon' ]
```

> **📌*배열 구조 분해*를 이용한 배열 병합**
>
> ```javascript
> let Lengs = ["JS", "HTML", "CSS"];
> let otherLengs = ["React", "TS"];
> let arr = [...Leng, ...otherLeng, "Node.js", "ReactNative", "Swift"];
> console.log(arr); //['JS','HTML','CSS','React','TS','Node.js','ReactNative','Swift']
> ```

### 3.5. 배열 탐색

- `Array.indexOf(item, from)`: 앞에서 해당 item의 index를 탐색하는 메서드이다.
- `Array.lastIndexOf(item, from)`: 뒤에서 해당 item의 index를 탐색하는 메서드이다.
- `Array.includes(item, from)`: 값 포함 여부를 확인하는 메서드이다.

```javascript
let fruits = ["apple", "orange", "banana", "orange", "melon"];
console.log(fruits.indexOf("orange")); //1
console.log(fruits.indexOf("Orange")); //-1 //존재하지 않는다면 -1이 출력된다.
console.log(fruits.indexOf("orange", 2)); //3 //index:2부터 탐색한다.

console.log(fruits.lastIndexOf("orange")); //3
console.log(fruits.lastIndexOf("orange", -3)); //1 //뒤에서 3번째부터 역방향으로 탐색한다.
console.log(fruits.lastIndexOf("orange", 0)); //-1 //0을 입력하면 그 역방향으로는 어떠한 orange도 없으므로 -1이 출력된다.

console.log(fruits.includes("banana")); //true
console.log(fruits.includes("Banana")); //false
console.log(fruits.includes(0)); //false
```

### 3.6. 배열 변형

- `Array.sort()`: 배열을 임의로 정렬시키는 메서드이다.
- `Array.reverse()`: 배열을 반전시키는 메서드이다.
- `Array.join("separator")`: 배열을 문자열로 변환하는 메서드이다.

```javascript
let nums = [1, -1, 4, 5, 2, 0];
console.log(nums.sort()); //[ -1, 0, 1, 2, 4, 5 ]
console.log(nums.reverse()); //[ 5, 4, 2, 1, 0, -1 ]

let fruits = ["apple", "orange", "banana", "melon"];
console.log(fruits.sort()); //[ 'apple', 'banana', 'melon', 'orange' ]
console.log(fruits.reverse()); //[ 'orange', 'melon', 'banana', 'apple' ]

let str = fruits.join(); //separator에 아무것도 안쓰면 기본값 ','를 사용해서 분리,변환한다.
console.log(str); //orange,melon,banana,apple
let str_separator = fruits.join(";"); //';'를 사용해서 분리,변환한다.
console.log(str_separator); //orange;melon;banana;apple
```

## 4. 배열 고차 함수

하나 이상의 함수를 매개 변수로 취하거나 또는 함수를 결과로 반환하는 함수(매개 변수로 전달되는 함수는 콜백함수)를 고차함수라고 한다.

### 4.1. `Array.sort(function)`

배열을 임의로 정렬시키는 메서드이다.

#### 4.1.1 **기존 정렬의 문제점**

sort, reverse는 배열의 요소가 일시적으로 문자열로 변경되어 정렬되어 제대로 정렬이 안되는 경우가 발생한다.

```javascript
let nums = [1, -1, 4, 0, 10, 20, 12];

console.log(nums.sort()); //[-1, 0, 1, 10, 12, 20, 4] //4가 10,12,20보다 높은 수로 취급
console.log(nums.reverse()); // [4, 20, 12, 10, 1, 0, -1] //4가 10,12,20보다 높은 수로 취급
```

#### 4.1.2. 해결책

아래 원칙을 이용해 여러가지 방법 중 하나로 오름차순 함수 또는 내림차순 함수를 구현하고, 구현한 함수를 `sort`의 콜백함수로 불러들인다.

```
반환값이 0보다 큰 값이면 y가 x보다 앞에 오도록 정렬한다.
반환값이 0보다 작은 값이면 x가 y보다 앞에 오도록 정렬한다.
반환값이 0이면 순서를 변경하지 않는다.
```

```javascript
//방법1(문자는 정렬 불가) //x,y의 순서 바꿔주면 내림차순
return x - y;

//방법2 //x,y의 순서 바꿔주면 내림차순
if (x > y) return 1;
else if (x < y) return -1;
else return 0;

//방법3 //x,y의 순서 바꿔주면 내림차순
return x > y ? 1 : -1;
```

##### 4.1.2.1. 구현 1

```javascript
let nums = [1, -1, 4, 0, 10, 20, 12];

//오름차순 함수
let ascending_order = function (x, y) {
  return x - y; //x-y>0이 참이면 두 값의 위치가 바뀜
};

//내림차순 함수
let decending_order = function (x, y) {
  return y - x; //y-x>0이 참이면 두 값의 위치가 바뀜
};

console.log(nums.sort(ascending_order)); //[-1, 0, 1, 4, 10, 12, 20]
console.log(nums.sort(decending_order)); //[20, 12, 10, 4, 1, 0, -1]
```

##### 4.1.2.2. 구현 2

```javascript
let fruits = ["apple", "Orange", "orange", "melon"];

//오름차순 함수
let ascending_order = function (x, y) {
  x = x.toUpperCase();
  y = y.toUpperCase();

  if (x > y) return 1;
  else if (y > x) return -1;
  else return 0;
};

//내림차순 함수
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

##### 4.1.2.3. 구현3

```javascript
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

> **📌localCompare()를 이용한 문자 정렬**
>
> ```javascript
> let arr = ["b", "c", "a", "d", "e"];
>
> let sortArr = arr.sort(function (a, b) {
>   return a.localeCompare(b);
> });
>
> console.log(sortArr); //[ 'a', 'b', 'c', 'd', 'e' ]
> ```

### 4.2. `Array.forEach(function(item, index, array){});`

배열에 포함되는 요소를 차례대로 꺼내 **콜백 함수에 전달하여 반복 작업을 수행**하는 메서드이다.

```javascript
let nums = [0, 1, 2];

nums.forEach(function (i) {
  console.log(i); //0  1  2
});
```

### 4.3. `Array.map(function(item, index, array){});`

**콜백함수 결과**를 **배열로 반환**하는 메서드이다.

```javascript
let nums = [1, 2, 3, 4, 5];

let useMap = nums.map(function (item) {
  return item * 2;
});
console.log(useMap); //[ 2, 4, 6, 8, 10 ]
```

### 4.4. 조건을 만족하는 값을 반환

#### 4.4.1. `Array.find(function(item, index, array){},accumulatorInitial);`

조건을 만족하는 단 하나의 첫 번째 값을 반환하는 메서드이다.

```javascript
let users = [
  { name: "kyeong", age: 23, job: false },
  { name: "dong", age: 26, job: false },
  { name: "seo", age: 29, job: true },
];

let find_job = users.find(function (user) {
  return user.job === false;
});
console.log(find_job); //{ name: 'kyeong', age: 23, job: false }

let find_age = users.find(function (user) {
  return user.age > 25;
});
console.log(find_age); //{ name: 'dong', age: 26, job: false }
```

#### 4.4.2. `Array.findIndex(function(item){})`

조건을 만족하는 단 하나의 첫 번째 값의 위치를 반환하는 메서드이다.

```javascript
let members = ["엄마", "아빠", "누나", "동경"];

let result = members.findIndex(function (member) {
  return member === "동경";
});
console.log(result); //3
```

#### 4.4.3. `Array.filter(function(item){});`

배열의 요소를 필터링하여 새로운 배열을 반환하는 메서드이다. 콜백 함수를 사용하여 각 요소를 평가하고, 콜백 함수가 true를 반환하는 요소만으로 이루어진 새로운 배열을 반환한다.

```javascript
let users = [
  { name: "kyeong", age: 23, job: false },
  { name: "dong", age: 26, job: false },
  { name: "seo", age: 29, job: true },
];

let find_job = users.filter(function (user) {
  return user.job == false;
});
console.log(find_job); //[ { name: 'kyeong', age: 23, job: false }, { name: 'dong', age: 26, job: false } ]

let find_age = users.filter(function (user) {
  return user.age > 25;
});
console.log(find_age); //[ { name: 'dong', age: 26, job: false }, { name: 'seo', age: 29, job: true } ]
```

### 4.5. `Array.reduce(function(accumulator, item, index, array){},accumulatorInitial);`

요소 별 함수 수행 후 누적된 결과값을 반환한다.

`accumulatorInitial`를 생략한다면, 배열의 첫 번째 요소가 `accumulator`의 초기값이 된다.

```javascript
let nums = [1, 2, 3, 4, 5];
let call_count = 0;

console.log("result\tvalue\tindex");
let sum = nums.reduce(function (accumulator, item, index, array) {
  console.log(accumulator, "\t\t", item, "\t\t", index);
  call_count++;
  return accumulator + item;
}, 0);
/*
result	value	index
0 		 1 		 0
1 		 2 		 1
3 		 3 		 2
6 		 4 		 3
10 		 5 		 4
*/
console.log(call_count); //5
console.log(sum); //15
```

## 5. N차원 배열

배열 안에 N개의 배열이 존재하는 객체이다.

2,3차원 지도 정보, RGB를 저장하는 2차원 사진 파일 등 표현 시 유용하다.

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
