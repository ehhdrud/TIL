## collection

- 구조 또는 비구조화 형태로 프로그래밍 언어가 제공하는 값을 담을 수 있는 공간
- 자바스크립트에서 제공하는 Collection
  - Indexed Collection
    - Array
    - Typed Array
  - keyed Collection:
    - Object
    - Map
    - Set
    - Weak Map
    - Weak Set

### map

- 다양한 자료형의 key를 허용하고, keys⇒values 형태의 자료형을 저장할 수 있는 Collection
- Map은 Object 대비 다양한 key의 사용을 허용하고, 값의 추가/삭제 시 ‘{}’, ‘.’이 아닌 메서드를 통해 수행 가능
- 대표 속성(property) 및 메서드(method)
  - 생성자: `new Map()`
  - 개수 확인: `Map.size`
  - 요소 추가: `Map.set(keye, value)`
    - 호출 시 map이 반환되므로 체이닝(chaning) 가능
  - 요소 접근: `Map.get(key)`
  - 요소 삭제: `Map.delete(key)`
  - 전체 삭제: `Map.clear()`
  - 요소 존재 여부 확인: `Map.has(key)`
  - 그 밖의 메서드: `Map.keys()`, `Map.values()`, `Map.entires()`
- Map 반복문: Collection 객체인 Map의 iterator 속성을 이용하여 `for … of` 구문을 통해 반복문 수행 가능
- Map-Object 변환
  - `Object.entry(Object)`, `Object.fromEntres(Map)`를 통해 Map, Object 간 변환이 가능

### set

- value만을 저장하며 중복을 허용하지 않는 Collection
- set
- 대표 속성(property) 및 메서드(method)
  - 생성자: new
  - 개수 확인: Set.size
  - 요소 추가: `Set.add(value)`
    - 호출 시 set이 반환되므로 체이닝(chaning) 가능
  - 요소 삭제: `Set.delete(value)`
  - 전체 삭제: Set.clear
  - 요소 존재 여부 확인: `Set.has(key)`
  - 그 밖의 메서드: `Set.keys()`, `Set.values()`, `Set.entires()`
- Set 반복문: Collection 객체인 Set의 iterator 속성을 이용하여 `for … of` 구문을 통해 반복문 수행 가능
