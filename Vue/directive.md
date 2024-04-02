## 디렉티브

- v- 접두사를 가지는 특수 속성

### v-bind

- HTML 속성에 데이터를 바인딩하기 위한 디렉티브
- 생략 가능하므로 `:`만 사용하면 됨

### v-if, v-else-if, v-else

- **v-if**: 조건이 true인 경우 요소를 렌더링한다.
- **v-else-if**: 앞선 조건이 false이고 현재 조건이 true인 경우 요소를 렌더링한다.
- **v-else**: 앞선 조건이 모두 false인 경우 요소를 렌더링한다.

> **v-show**
>
> 조건이 true이면 display:block으로 처리하여 요소를 보여주고, false면 display:none이면 처리되어 요소를 숨겨준다.

### v-for

- HTML 요소를 반복적으로 렌더링한다.

> **예시**
>
> ```js
> <p v-for="element in arrayData" :key="element.id"/>{{element}}</p>
> <p v-for="(element, index) in arrayData" :key="element.id"/>{{index}}:{{element}}</p>
> ```

### v-model

- 폼 입력 요소와 함께 사용하여 양방향 데이터 바인딩을 구현하는 디렉티브(폼 요소 업데이트를 위한 함수를 만들 필요가 없어짐)
- **@input.lazy**: input 이벤트가 change 이벤트처럼 동작하도록 만든다.

> **IME issue**
>
> 한국어, 일본어 등의 언어(IME)에는 v-model의 업데이트가 어색하다. 이러한 경우 input 이벤트와 메서드를 사용한다.
