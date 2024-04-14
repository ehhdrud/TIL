## 디자인 패턴

### 1. MVC

- Model은 데이터를 처리하고 View는 Model을 이용하여 화면을 그리며 Controller는 사용자의 input을 받아 처리한다.
- Controller는 View와 Model의 중재자 역할을 하며 여러 개의 View를 담당한다.

### 2. MVP

- MVC와 유사하지만 View를 통해 input을 받고 Presenter에게 전달하여 처리한다.
- Presenter는 View와 Model의 중재자 역할을 하는데, MVC 패턴과는 달리 View는 Presenter를 이용해 데이터를 주고 받을 수 밖에 없기 때문에 View는 Presenter에 매우 의존적이고, Presenter는 View와 1대1로 매칭된다.

### MVVM(Vue)

- 모든 데이터를 서버에서 처리하는 것이 부담스러워져 웹에서 실시간으로 데이터를 처리하여 동적으로 View를 변화시킬 수 있도록 하는 MVVM 패턴이 등장한다.
- Model은 도메인 특화 데이터를 처리하고 ViewModel은 상태 데이터를 담당하는데 이 상태 데이터는 '데이터 바인딩'이라는 개념을 통해 변경 즉시 자동으로 View에 반영된다.
- MVP 패턴처럼 View와 Model 사이에 의존성이 없다. 다만 ViewModel의 설계가 쉽지 않다.

### Flux(React)

- 위 패턴들과는 다르게 단방향 데이터 흐름을 가진다. 데이터는 항상 Dispatcher에서 Store로 Store에서 View로 View에서 다시 Action을 통해 Dispatcher로 흘러간다. 이러한 데이터 흐름은 구조적으로 단순하여 디버깅 시 용이하다.

## 상태 변화

### React의 상태 변화(state)

- 상태를 불변적으로 취급한다. 즉 불변성을 유지해야 상태 변화를 감지할 수 있다.
- 값 변경 시 원시 타입의 경우 자동으로 새로운 주소값을 갖게 되지만(불변성을 유지), 객체 타입의 경우 새로운 주소값을 갖지 않는다(불변성X).
- 따라서 객체 타입의 값을 변경할 때, 해당 변화를 감지하려면 '복사'를 통해 새로운 주소값을 생성해야 한다.

### Vue의 상태 변화(reactive)

- 상태 비교를 위해 Proxy를 사용한다. Proxy는 특정 객체를 감싸 해당 객체에 가해지는 작업(getter, setter)을 감지할 수 있다.
- 값 변경 시 원시 타입의 경우 Proxy를 씌울 수 없고, 객체 타입의 경우 새로운 주소값으로 인해 새로운 Proxy를 만들어버린다. (이를 방지하기 위해 아래와 같이 객체로 감싸는 꼼수를 써서 사용할 수 있다.)
- 따라서 원시 타입의 경우 감시가 불가능하고, 객체 타입의 경우 기존 주소값을 유지하기 위해 push 등의 메서드를 사용해야 한다.

```vue
<!-- 원시 타입인 경우-->
<script setup>
import { reactive } from "vue";
// const msg = reactive("") // 변화 감지 불가!!
const msg = reactive({ value: "" });
</script>

<template>
  <!-- <h1>msg = {{ msg }}</h1> -->
  <!-- <input v-model="msg" /> -->
  <h1>msg = {{ msg.value }}</h1>
  <input v-model="msg.value" />
</template>
```

```vue
<!-- 객체 타입인 경우-->
<script setup>
import { reactive } from "vue";

// const list = reactive([]) // 변화 감지 불가!!
const list = reactive({ a: [] });
const onClick = () => {
  list = [...list, "a"];
};
</script>

<template>
  <!--<h1> List: {{ list.join(', ')  }} </h1>-->
  <h1>List: {{ list.a.join(", ") }}</h1>
  <button @click="onClick">add</button>
</template>
```

### Vue의 ref를 이용하자

- ref가 해주는 일은 위 꼼수를 자동으로 처리해준다. 즉 데이터의 `value`안에 값을 넣어주고 `object`로 변경해준다. 이를 통해 value에 주소값이 부여되며 Proxy를 사용할 수 있는 것이다.
- 이를 통해 원시 타입의 변화를 감지할 수도 있고, 객체 타입에서 복사 개념을 활용할 수도 있다.
