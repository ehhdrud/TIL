# Collection

> 구조 또는 비구조화 형태로 프로그래밍 언어가 제공하는 값을 담을 수 있는 공간

- Indexed Collection
  - Array
  - Typed Array
- keyed Collection:
  - Object
  - Map
  - Set
  - Weak Map
  - Weak Set

## 1. Map

> 다양한 자료형의 key를 허용하고, keys⇒values 형태의 자료형을 저장할 수 있는 Collection  
> Map은 Object 대비 다양한 key의 사용을 허용하고, 값의 추가/삭제 시 ‘{}’, ‘.’이 아닌 메서드를 통해 수행 가능

### 1.1. 대표 속성(property) 및 메서드(method)

- 생성자: `new Map()`
- 개수 확인: `Map.size`
- 요소 추가: `Map.set(keye, value)`  
  : 호출 시 map이 반환되므로 체이닝(chaning) 가능
- 요소 접근: `Map.get(key)`
- 요소 삭제: `Map.delete(key)`
- 전체 삭제: `Map.clear()`
- 요소 존재 여부 확인: `Map.has(key)`
- 그 밖의 메서드: `Map.keys()`, `Map.values()`, `Map.entires()`

```javascript
let map = new Map();

map.set("name", "john"); //string key
map.set(123, 456); //numbet key
map.set(true, "bool_type"); //boolean key

console.log(map); //Map(3) { 'name' => 'john', 123 => 456, true => 'bool_type' }
console.log(map.get(123)); //456
console.log(map.get("name")); //john
console.log(map.size); //3

map.clear();
console.log(map); //Map(0) {}
map.set("name", "alice").set(123, 456).set(false, "bool_type"); //이런식으로도 추가 가능
console.log(map); //Map(3) { 'name' => 'alice', 123 => 456, false => 'bool_type' }
```

### 1.2. Map 반복문: Collection 객체인 Map의 iterator 속성을 이용하여 `for … of` 구문을 통해 반복문 수행 가능

```javascript
let recipe_juice = new Map([
  ["strawberry", 50],
  ["banana", 100],
  ["ice", 150],
]);

for (let entity of recipe_juice) {
  console.log(entity);
} //[ 'strawberry', 50 ] [ 'banana', 100 ] [ 'ice', 150 ]
for (let item of recipe_juice.keys()) {
  console.log(item);
} //strawberry banana ice
for (let amount of recipe_juice.values()) {
  console.log(amount);
} //50 100 150

console.log(recipe_juice); //Map(3) { 'strawberry' => 50, 'banana' => 100, 'ice' => 150 }
console.log(recipe_juice.entries); //[Function: entries]s
```

### 1.3. Map-Object 변환

> `Object.entry(Object)`, `Object.fromEntres(Map)`를 통해 Map, Object 간 변환이 가능

```javascript
let recipe_juice = new Map([
  ["strawberry", 50],
  ["banana", 100],
  ["ice", 150],
]);

let recipe_juice_obj = Object.fromEntries(recipe_juice); //object로 변환
let recipe_juice_kv = Object.entries(recipe_juice_obj); //keys&values로 변환
let recipe_juice_map = new Map(recipe_juice_kv);

console.log(recipe_juice); //Map(3) { 'strawberry' => 50, 'banana' => 100, 'ice' => 150 }
console.log(recipe_juice_obj); //{ strawberry: 50, banana: 100, ice: 150 }
console.log(recipe_juice_kv); //[ [ 'strawberry', 50 ], [ 'banana', 100 ], [ 'ice', 150 ] ]
console.log(recipe_juice_map); //Map(3) { 'strawberry' => 50, 'banana' => 100, 'ice' => 150 }
```

## 2. Set

> value만을 저장하며 중복을 허용하지 않는 Collection

### 2.1. 대표 속성(property) 및 메서드(method)

- 생성자: `new Set()`
- 개수 확인: `Set.size`
- 요소 추가: `Set.add(value)`  
  : 호출 시 set이 반환되므로 체이닝(chaning) 가능
- 요소 삭제: `Set.delete(value)`
- 전체 삭제: Set.clear
- 요소 존재 여부 확인: `Set.has(key)`
- 그 밖의 메서드: `Set.keys()`, `Set.values()`, `Set.entires()`

```javascript
let set = new Set();
let num = new Set([1, 2, 3, 4, 5]);
let str = new Set("Hello!");

console.log(set); //Set(0) {}
console.log(num); //Set(5) { 1, 2, 3, 4, 5 }
console.log(str); //Set(5) { 'H', 'e', 'l', 'o', '!' } //중복된 값은 제거됨

set.add(1).add(1).add(10).add(20);
console.log(set); //Set(3) { 1, 10, 20 }

console.log(set.has(10)); //true
console.log(set.has(2)); //false

set.delete(1);
console.log(set); //Set(2) { 10, 20 }
```

### 2.2. Set 반복문

> Collection 객체인 Set의 iterator 속성을 이용하여 `for … of` 구문을 통해 반복문 수행 가능

```javascript
let str = new Set("Hello!");

console.log(str); //Set(5) { 'H', 'e', 'l', 'o', '!' }

for (let item of str) console.log(item); //H e l o ! //value가 item으로 리턴
for (let item of str.keys()) console.log(item); //H e l o ! //set은 key가 없으므로 value가 리턴
for (let item of str.values()) console.log(item); //H e l o !
for (let item of str.entries()) console.log(item); //[ 'H', 'H' ] [ 'e', 'e' ] [ 'l', 'l' ] [ 'o', 'o' ] [ '!', '!' ] //Map과 호환성을 위해 [value, value]형태로 반환

console.log(str.keys); //[Function: values]
console.log(str.entries); //[Function: entries]
```
