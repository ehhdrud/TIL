# Array.from의 인자에 대해 알려줘.

Array.from() 함수는 배열 혹은 유사 배열 객체를 기반으로 새로운 배열을 생성하는 JavaScript 내장 함수입니다. 이 함수의 문법은 다음과 같습니다:

```js
Array.from(arrayLike [, mapFn [, thisArg]])
```

여기서 각 인자들의 역할을 설명하겠습니다:

arrayLike: 배열로 변환하고자 하는 유사 배열 객체 또는 반복 가능한 객체(iterable). 유사 배열 객체는 length 프로퍼티와 숫자 인덱스를 가지고 있지만, 배열 메서드를 직접 사용할 수는 없는 객체를 의미합니다. 반복 가능한 객체는 Symbol.iterator 메서드를 가지고 있어서 순회할 수 있는 객체를 말합니다.

mapFn (선택적): 배열의 각 요소에 대해 호출될 함수로서, 각 요소를 가공하거나 매핑하는데 사용됩니다. 즉, 이 함수를 통해 새로운 배열 요소를 생성할 수 있습니다.

thisArg (선택적): mapFn을 호출할 때 사용할 this 값입니다.

Array.from() 함수는 주어진 arrayLike 객체를 배열로 변환하여 반환합니다. 만약 mapFn이 제공되면, mapFn을 통해 각 요소를 변환한 후 새로운 배열을 반환합니다. thisArg를 사용하면 mapFn 내에서 this 값을 지정할 수 있습니다.

간단한 예시를 통해 이해해봅시다:

```js
// 유사 배열 객체
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };

// Array.from을 이용하여 배열로 변환
const newArray = Array.from(arrayLike);
console.log(newArray); // Output: ['a', 'b', 'c']

// mapFn을 사용하여 각 요소를 변환
const newArraySquared = Array.from(arrayLike, (item) => item + item);
console.log(newArraySquared); // Output: ['aa', 'bb', 'cc']
```

위 예제에서 Array.from(arrayLike)는 주어진 유사 배열 객체를 배열로 변환한 것을 확인할 수 있습니다. 또한 Array.from(arrayLike, (item) => item + item)는 각 요소를 2번 반복하여 새로운 배열을 생성하는 것을 보여줍니다.
