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

- `v-bind`를 통해 상위 컴포넌트에서 하위 컴포넌트로의 단방향 바인딩을 형성하여 Props를 전달할 수 있다.
- 하위 컴포넌트 입장에서 Read Only이다. 따라서 props를 조작하는 함수를 사용하려면 상위 컴포넌트로부터 같이 전달받아야 한다.
- 자식 컴포넌트는 `defineProps`를 통해 props를 전달받는다. defineProps는 최대한 자세하게 정의하는 것이 권장된다. (type, required, default, validator...)

## Emit

- `$emits`을 통해 부모 컴포넌트에게 커스텀 이벤트를 보낸다. 부모 컴포넌트는 커스텀 이벤트를 전달받아 함수를 실행시킬 수 있다. (값을 함께 전달할 수도 있다.)
- `defineEmits`을 통해 정의하는 것이 권장된다. 단순한 배열 기반 문법과 유효성 검사가 가능한 객체 기반 분법이 있다. (Props와 달리 defineEmit 없이도 동작한다.)

## slot

- 부모 컴포넌트에서 특정 자식 컴포넌트의 내부(양 대괄호 사이)에서 작성한 '요소'를 해당 자식 컴포넌트에서 `<slot>`을 통해 사용할 수 있다. 요소는 부모 컴포넌트의 변수에만 접근할 수 있다.
- 부모 컴포넌트의 요소는 자식 컴포넌트의 변수에는 접근할 수 없는데, 자식 컴포넌트에서 v-bind를 통해서 props를 정의하면 부모 컴포넌트에서 v-slot을 통해 객체 형식으로 해당 props를 사용할 수 있다. (변수나 로직의 은닉화 가능)
- 슬롯을 여러 개 사용하고 싶다면 `<template #slot-name>` 혹은 `<template v-slot:header>` 방식을 사용할 수 있다. 자식 컴포넌트에서는 `<slot name="slot-name">`로 사용한다.

## provide, inject

- 상위 컴포넌트에서 `provide`를 사용하여 변수를 선언하면 props drilling 없이 타겟 컴포넌트에서 `inject`를 통해 받아올 수 있다.
- 다만 반응형 데이터가 아니기 때문에 타겟 컴포넌트에서 값을 변경하더라도 렌더링이 발생하지 않는다. provide에 들어가는 데이터를 반응형으로 선언하여 이를 해결할 수 있다. 이 때 value를 직접 수정하는 방법보다는 provide에서 값을 변경하는 함수를 같이 전달하여 변강하는 것이 권장된다.

## template Ref

- 요소 자체를 선택하기 위해 사용한다. document.querySeclector 대신 사용한다.
- null로 초기화한 ref 변수를 정의하고 요소의 ref 속성에 해당 변수를 넣어준다.
- ref처럼 value를 통해 요소 자체에 접근할 수 있다.

> template Ref
>
> template Ref는 요소 자체에 접근할 때, v-model은 요소의 value에 접근할 때 사용한다.
