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

#### 배열의 실체

- 자바스크립트의 배열은 다른 언어의 일반적인 배열이 아닌 Hash 기반의 객체
- 메모리가 연속적인 밀집 배열(dense array)이 아닌 비연속적인 희소 배열(sparse array)
- 단순히 연속적인 배열이 아니라서 [0], [1], [once], [twice]와 같이 Hash 기반 작성이 가능, 길이는 정수인 index만 계산

#### 배열 타입 확인 및 요소 삭제

- 배열 타입 확인: `Array.isArray(value)`
- ~~배열 요소 삭제: `delete array[index]`~~(삭제해도 배열 사이즈가 그대로인 문제점 발생)

#### 배열 조작

- 배열 추가/삭제(LIFO(Last In First Out: 마지막에 들어온 것이 먼저 나간다) - BACK)
  - 배열 추가: `Array.push(element)`
  - 배열 삭제: `Array.pop()`
- 배열 추가/삭제(LIFO(Last In First Out: 마지막에 들어온 것이 먼저 나간다) - Front)
  - 배열 추가: `Array.unShift(element)`
  - 배열 삭제: `Array.Shift()`
- 배열 삭제/변경(index)
  - 배열 요소 삭제/변경: `Array.splice(index[,deleteCount, elem1,…,elemN])`
- 배열 삭제(index): `Array.slice(start,end)`
- 배열 병합: `Array.concat(arg1, arg2…)`

#### 배열 반복문

- 반복문을 통해 배열 요소에 접근 가능
- 반복문 문법
  - for … length(index 접근)
    : ex→`for (let i = 0; i < fruits.length; i++){console.log(fruits[i]);}`
  - for … of(element 접근)
    : ex→`for (let fruit of fruits){console.log(fruit);}`
  - for … in(key 접근)
    : ex→`for (let key in fruits){console.log(fruits[key]);}`

#### 배열 탐색

- index 탐색(앞에서부터): `Array.indexOff(item, from)`
- index 탐색(앞에서부터): `Array.lastIndexOff(item, from)`
- 값 포함 여부 확인: `Array.includes(item, from)`

#### 배열 변형

- 배열 정렬: `Array.sort()`
- 배열 반전: `Array.reverse()`
- 배열 변환(배열 값을 문자열로 변환): `Array.join("separator")`

#### 배열 고차 함수

- 하나 이상의 함수를 매개 변수로 취하거나 함수를 결과로 반환하는 함수(매개 변수로 전달되는 함수는 콜백함수)
- 대표 배열 조작 메서드, 고차함수

  - 임의정렬: `Array.sort(callback function)`

    - 문제점: sort, reverse는 배열의 요소가 일시적으로 문자열로 변경되어 정렬됨

      1. 2,3,…,9보다 10이 먼저 정렬되는 문제 발생
      2. 대소문자 구분 없이 정렬이 불가능한 문제 발생
         → 오름차순, 내림차순 함수를 정의하고 콜백함수로 불러들여 해결

      ```jsx
      /*
      0보다 큰 값 -> y가 x보다 앞에 오도록 정렬한다
      0보다 작은 값 -> x가 y보다 앞에 오도록 정렬한다
      0 -> 순서를 변경하지 않는다
      */

      //오름차순 구현1
      return x - y;

      //오름차순 구현2
      if (x > y) return 1;
      else if (x < y) return -1;
      else return 0;

      //오름차순 구현3
      return x > y ? 1 : -1;
      ```

  - 반복작업: `Array.forEach(function(item, index, array){});`
    - 배열에 포함되는 요소를 차례대로(반복) 꺼내 콜백 함수에 전달하여 처리
    - `item`: 배열 요소, `index`: 배열 위치, `array`: 배열
  - 콜백함수 결과 배열 반환: `Array.map(function(item, index, array){});`
    - 배열 요소 별 호출 및 결과를 배열로 변환
  - 조건 만족하는 하나의 값 반환: `Array.find(function(item, index, array){},accumulator_initial);`
  - 조건 만족하는 모든 값 배열로 변환: `Array.filter(function(item, index, array){});`
  - 누적 결과값 변환: `Array.reduce(function(accumulator,item, index, array){});`
    - 요소 별 함수 수행 후 누적된 결과값을 반환
    - `accumulator`: 이전 함수 결과
    - `accumulator_initial:` acuumulator의 초기값 설정 가능, 없다면 1부터 시작

### N차원 Array

- 배열 안에 N개 만큼의 배열이 존재하는 객체
- 2/3차원 지도 정보, RGB를 저장하는 2차원 사진 파일 등을 표현할 때 활용 가능
