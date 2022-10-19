# 플렉스박스(Flexbox)

내부의 요소를 일차원으로 "다닥다닥" 배치하는 레이아웃 모델이다.

요소들을 감싸고 있는 외부의 부모 영역을 **Flex Container**, 내부에서 정렬을 위해 배치된 자식 영역을 **Flex Item**, 주축을 **Main Axis**, 주축과 수직을 이루는 교차축을 **Cross Axis**라고 부른다.

## 1. Flex Container에 사용하는 속성

### 1.1. `display` 속성의 `flex` 키워드

레이아웃을 변경할 때 사용하는 `display` 속성에는 바깥쪽 레이아웃을 조작하는 `inline`, `block`, `inline-block` 키워드(`display-outside`) 외에, 안쪽 키워드를 조작하는 `flex` 키워드(`display-inside`)를 사용할 수 있다. `display-outside`와 `display-inside`는 다른 개념이므로 `inline-flex`처럼 `-`를 이용해 같이 사용할 수 있다.

### 1.2. `flex-direction` 속성

플렉스 컨테이너 내의 아이템을 배치할 때 사용할 주축의 위치 및 방향을 조절한다.

키워드로는 기본값인 `row`(→)와 `row-reverse`(←), `column`(↓), `column-reverse`(↑)를 사용할 수 있다.

### 1.3. `flex-wrap` 속성

플렉스 아이템들이 강제로 한 줄에 배치되게 할 것인지, 또는 가능한 영역 내에서 벗어나지 않는 대신 여러행으로 나누어 표현할 것인지를 결정하는 속성이다. 만약 영역 내에서 벗어나지 못하게 설정한다면, 동시에 요소의 방향 축을 결정할 수 있다.

키워드로는 기본값인 `nowrap`(무조건 한 줄에 배치)과 `wrap`(여러 행에 걸쳐 배치), `wrap-reverse`(여러 행에 걸쳐 배치하는데, 시작점과 끝점이 반대로 배치됨)를 사용할 수 있다.

### 1.4. `flex-flow` 단축 속성

`flex-direction`, `flex-wrap`의 단축 속성이다.

순서에 상관없이 `spacing`을 통해 구분하여 입력한다.

## 2. Flex Item에 사용하는 속성

### 2.1. `order` 속성

플렉스 컨테이너 혹은 그리드 컨테이너 안에서 현재 요소의 배치 순서를 정한다. 즉 부모 컨테이너는 `display: flex`혹은 `display: grid`가 설정되어 있어야 한다.

값이 낮을 수록 앞에 배치된다. 기본값은 0이고 음수도 가능하다.

### 2.2. `flex-grow` 속성

*플렉스 아이템 요소가 플렉스 컨테이너 요소 내부에서 할당 가능한 공간의 정도*를 비율로 선언한다.

기본값은 0이다.

### 2.3. `flex-shrink` 속성

### 2.4. `flex-basic` 속성

### 2.5. `flex` 단축 속성

`flex-grow`, `flex-shrink`, `flex-basic`
