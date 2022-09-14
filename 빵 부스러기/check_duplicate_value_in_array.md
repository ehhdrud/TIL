# 중복된 값 찾기

## 1. 반복문 이용하기

> 2개의 반복문을 사용해 중복값을 체크한다.  
> 첫 번째 반복문에서는 배열의 element들을 순차적으로 순회한다.  
> 두 번째 반복문에서는 첫 번째 반복문에서 선택된 element를 그 이후의 element와 비교한다.

```javascript
const arr = ["a", "b", "c", "b", "c"];

let dupYn = false;
let dupValue;
let dupValueIndex;
for (let i = 0; i < arr.length; i++) {
  const currElem = arr[i];

  for (let j = i + 1; j < arr.length; j++) {
    if (currElem === arr[j]) {
      dupYn = true;
      dupValue = arr[j];
      dupValueIndex = j;
      break;
    }
  }

  if (dupYn) {
    break;
  }
}

console.log("dupYn: " + dupYn); //dupYn: true
console.log("dupValue: " + dupValue); //dupValue: b
console.log("dupValueIndex: " + dupValueIndex); //dupValueIndex: 3
```

## 2. Set 객체 이용하기

> Set은 중복을 허용하지 않는 값을 모아놓은 Collection 객체.  
> 원본 배열의 크기와 원본 배열을 가지고 생성한 Set객체의 크기가 다르면 중복값이 존재.  
> 그러나 이 방법은 객체를 담은 배열의 중복값을 제거하기에는 어려움이 있음.

```javascript
const arr = ["a", "b", "c", "b", "c"];

const set = new Set(arr);
const set2 = [...new Set(arr)];

console.log(set); //Set(3) { 'a', 'b', 'c' }
console.log(set2); //[ 'a', 'b', 'c' ]

if (arr.length !== set.size) {
  console.log("duplicate!"); //duplicate!
}
```

## 3. Array.filter 이용

### 3.1. Array.filter \* Array.indexOf

> `Array.indexOf` 메서드의 배열에서 첫 번째에 해당하는 Index를 반환하는 특성을 이용.  
> 해당 값을 찾아서 첫번째로 해당하는 값만 `Array.filter`를 이용하여 반환.

```javascript
const arr = ["a", "b", "c", "b", "c"];

const result = arr.filter((value, index) => arr.indexOf(value) === index);

console.log(result); //[ 'a', 'b', 'c' ]
```

### 3.2. Array.filter \* Array.findIndex

> `Array.indexOf` 메서드는 객체의 값까지는 판단하지 못하므로, `Array.findIndex` 메서드를 이용하여 객체의 특정 값을 지정하여 해당 값의 첫 번째 위치를 찾아 비교

```javascript
const arr = [
  { name: "a" },
  { name: "b" },
  { name: "c" },
  { name: "b" },
  { name: "c" },
];
const result = arr.filter(
  (value, index) =>
    arr.findIndex((value2) => value2.name === value.name) === index
); //❗❓

console.log(result); //[ { name: 'a' }, { name: 'b' }, { name: 'c' } ]
```

### 4. Array.reduce \* Array.indexOf

> `Array.reduce`메서드는 배열 요소들을 순차적으로 순회하면서 하나의 값을 만드는 함수.  
> `Array.indexOf`메서드를 이용해 추가가 안된 요소라면 추가하고, 그렇지 않으면 추가하지 않음.

```javascript
const arr = ["a", "b", "c", "d", "e"];

const initialValue = [];

const result = arr.reduce(
  (acc, obj) => (acc.includes(obj) ? acc : [...acc, obj]), //❗❓
  initialValue
);
console.log(result); //[ 'a', 'b', 'c' ]
```
