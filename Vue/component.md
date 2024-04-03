# Component

- 재사용 가능한 코드 조각
- setup 키워드를 통해 Composition API를 사용하면 import만 하면 사용 가능!

## Fallthrough Attribute(non-prop)

- id, class, style 등으로 props, emission, event에 명시적으로 선언되지 않은 속성 또는 이벤트
- non-prop은 하위 컴포넌트가 단일한 root element를 가질 때 자동으로 상속된다.

> **그 밖의 non-prop 상속 규칙**
>
> - 하위 컴포넌트의 root 요소에 이미 class 혹은 다른 속성이 있는 경우 fallthrough attribute와 병합된다
> - 하위 컴포넌트가 다른 컴포넌트를 root node로 렌더링하는 경우 다시 상속된다.
> - `inheritAttrs: false`를 통해 상속을 방지할 수 있다. 다만 Composition API에서는 사용할 수 없어서 아래처럼 스크립트 태그를 하나 더 생성해서 적용한다.
>
> ```
> <script>
> export default {
>   inheritAttrs: false
> }
> </script>
> ```
>
> - $attrs, context.attrs, useAttrs을 통해 상위 속성에 명시적으로 접근할 수 있다.

## Props

- Props는 상위 컴포넌트에서 하위 컴포넌트로의 단방향 바인딩을 형성한다.
- 하위 컴포넌트 입장에서 Read Only이다. 따라서 props를 조작하는 함수를 사용하려면 상위 컴포넌트로부터 같이 전달받아야 한다.
- 자식 컴포넌트는 `defineProps`를 통해 props를 전달받는다. defineProps는 최대한 자세하게 정의하는 것이 권장된다. (type, required, default, validator...)

## Emit

- `$emits`을 통해 부모 컴포넌트에게 커스텀 이벤트를 보낸다. 부모 컴포넌트는 커스텀 이벤트를 전달받아 함수를 실행시킬 수 있다. (값을 함께 전달할 수도 있다.)
- `defineEmits`을 통해 정의하는 것이 권장된다. 단순한 배열 기반 문법과 유효성 검사가 가능한 객체 기반 분법이 있다. (Props와 달리 defineEmit 없이도 동작한다.)
