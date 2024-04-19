## API

### ref

- 반응형 데이터를 만들거나 DOM 혹은 컴포넌트를 가르키는 역할을 한다.
- 참조 타입, 원시 타입 데이터의 변화까지 감지한다. (`reactive`는 참조 타입의 변화만 감지)

### computed

- 계산된 값을 반환하는 속성으로, 계산된 값을 캐싱하여 재생성을 방지한다.
- 읽기 전용이지만, getter, setter를 활용하여 수정이 가능하다.

> **computed vs method**
>
> computed는 결과를 캐싱하고 종속 대상이 변경되어야 실행되지만 method는 종속 대상이라는 개념 없이 모든 렌더링마다 실행된다.

### watch

- 종속 대상이 변경될 때 특정 함수를 트리거하는 역할을 한다.
- 새로운 데이터와 이전의 데이터를 가져와 사용할 수 있다.

> **watch vs computed**
>
> 둘 다 종속성을 가지지만, watch는 함수를 위한 트리거이고 computed는 값을 반환하는 일종의 표현식이다.

### watchEffect

- 자동으로 종속 대상을 지정하여 함수를 트리거한다.
- Composition API에서만 사용 가능하다.
- watchEffect를 변수에 할당하고 해당 변수를 함수를 사용하듯이 사용하면 watchEffect를 중지할 수 있다. 해당 watchEffect 내부에서도 사용할 수 있다.

> **watchEffect vs watch**
>
> watchEffect는 자동으로 종속 대상을 지정하고 watch는 명시적으로 지정한 대상만 종속성을 가진다.
> watch는 새로운 데이터와 이전의 데이터를 가져올 수 있다.
