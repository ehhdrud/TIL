# Utility Types

유틸리티 타입은 타입 변경을 쉽고 용이하게 하기 위한 타입이다.

독립적인 코드 문법이 아니라, 타입스크립트 문법을 이용해 만들어진 함수이다. ('ctrl + 우클릭'으로 문법 확인 가능!)

### Partial

-   TYPE의 모든 속성을 선택적으로 변경한 새로운 타입 반환 (인터페이스)
-   `<TYPE>`

### Required

-   TYPE의 모든 속성을 필수로 변경한 새로운 타입 반환 (인터페이스)
-   `<TYPE>`

### Readonly

-   TYPE의 모든 속성을 읽기 전용으로 변경한 새로운 타입 반환 (인터페이스)
-   `<TYPE>`

### Record

-   KEY를 속성으로, TYPE를 그 속성값의 타입으로 지정하는 새로운 타입 반환 (인터페이스)
-   `<KEY, TYPE>`

### Pick

-   TYPE에서 KEY로 속성을 선택한 새로운 타입 반환 (인터페이스)
-   `<TYPE, KEY>`

### Omit

-   TYPE에서 KEY로 속성을 생략하고 나머지를 선택한 새로운 타입 반환 (인터페이스)
-   `<TYPE, KEY>`

### Exclude

-   TYPE1에서 TYPE2를 제외한 새로운 타입 반환 (유니언)
-   `<TYPE1, TYPE2>`

### Extract

-   TYPE1에서 TYPE2를 추출한 새로운 타입 반환 (유니언)
-   `<TYPE1, TYPE2>`

### NonNullable

-   TYPE에서 null과 undefined를 제외한 새로운 타입 반환 (유니언)
-   `<TYPE>`

### Parameters

-   TYPE의 매개변수 타입을 새로운 튜플 타입으로 반환 (함수, 튜플)
-   `<TYPE>`

### ConstructorParameters

-   TYPE의 매개변수 타입을 새로운 튜플 타입으로 반환 (클래스, 튜플)
-   `<TYPE>`

### ReturnType

-   TYPE의 반환 타입을 새로운 타입으로 반환 (함수)
-   `<TYPE>`

### InstanceType

-   TYPE의 인스턴스 타입을 반환 (클래스)
-   `<TYPE>`

### ThisParameterType

-   TYPE의 명시적 this 매개변수 타입을 새로운 타입으로 반환 (함수)
-   `<TYPE>`

### OmitThisParameter

-   TYPE의 명시적 this 매개변수를 제거한 새로운 타입을 반환 (함수)
-   `<TYPE>`

### ThisType

-   TYPE의 this 컨텍스트(Context)를 명시, 별도 반환 없음! (인터페이스)
-   `<TYPE>`

> **🙏 참고 자료**
>
> [인파 블로그](https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0-%ED%83%80%EC%9E%85-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC '인파 블로그')
