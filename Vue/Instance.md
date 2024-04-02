## 인스턴스

- 모든 Vue App은 인스턴스를 생성하여 시작한다.
- 인스턴스를 통해 App의 진입점을 생성한다.

### 인스턴스 생성

- 인스턴스 생성 시 초기화 과정을 거친다.
- DOM을 업데이트하는 과정에서 라이프 사이클을 지닌다.
- `createApp()`으로 인스턴스를 생성하고 옵션을 정의할 수 있다. `mount()`는 DOM 요소를 지정한다.

> **생성 방법**
>
> ```js
> import { createApp } from "vue";
> import App from "./App.vue";
>
> createApp(App).mount("#app");
> ```

### 라이프 사이클

- `beforeCreate`, `created`: 인스턴스 생성의 전후
- `beforeMount`, `mounted`: 마운트(with 렌더링)의 전후
- `beforeUpdate`, `updated`: 업데이트 전후
- `beforeUnmount`, `unmounted`: 언마운트 전후

### 컴포넌트

- 재사용 가능한 코드 조각
- setup 키워드를 통해 Composition API를 사용하면 import만 하면 사용 가능!
