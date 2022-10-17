# 레이아웃(Layout)

## 1. `display` 속성

인라인, 블록, 인라인-블록 요소 중 어느 쪽으로 처리할지 설정한다.

### 1.1. `inline` 키워드

인라인 요소로 처리한다.

> **📌인라인 요소의 특징**
>
> 1. 영역의 크기가 내부 콘텐츠 크기로 정해진다.
> 2. margin, padding의 right, left는 조절할 수 있지만, top, bottom은 조절할 수 없다.
> 3. 요소가 가로 배치된다.

### 1.2. `block` 키워드

블록 요소로 처리한다.

> **📌블록 요소의 특징**
>
> 1. 영역의 크기를 `width`, `height`로 조절할 수 있다.
> 2. width를 지정하지 않으면 가로 전체를 지정한다.
> 3. 요소가 새로 배치된다.

### 1.3. `inline-block` 키워드

안라인 블록 요소로 처리한다.

> **📌인라인-블록 요소의 특징**
>
> 1. 영역의 크기를 `width`, `height`로 조절할 수 있다.
> 2. 요소가 가로 배치된다.

### 1.4. `none` 키워드

요소를 없앤다.

> **📌`display: none`과 `visibility: hidden`의 차이점**
>
> `display: none`을 사용하면 마치 코드 자체가 없었던 것처럼 레이아웃 상에서 완전히 배제된다.  
> `visibility: hidden`을 사용하면 요소가 그 자리는 그대로 유지하지만 레이아웃 상에서 그려지지는 않는다.

## 2. `float` 속성

요소를 "Normal Flow"로 부터 띄워 별도의 배치 효과를 가지고, 다른 요소와의 배치를 설정한다.

CSS3에서 `flex`가 추가됨에 따라 사용빈도는 줄어들었다.

### 2.1. `float`의 키워드

- `none`: 요소를 띄우는데, 좌우측에 다른 요소들이 추가 될 수 없도록 한다.
- `left`: 요소는 왼쪽에 떠있고, 다른 요소들이 우측에 추가될 수 있도록 한다.
- `right`: 요소는 오른쪽에 떠있고, 다른 요소들이 좌측에 추가될 수 있도록 한다.

## 3. `position` 속성

문서 상에 요소를 배치하는 방법을 지정한다.

> **📌Normal Flow**
>
> 요소의 레이아웃을 변경하지 않았을 때, 웹페이지가 자기 자신을 배치하는 방법.

### 3.1. `static` 키워드

기본값으로, 요소를 Normal Flow에 따라 배치한다.

### 3.2. `relative` 키워드

요소를 Normal Flow에 따라 배치하는데, `top`, `right`, `bottom`, `left` 속성을 사용하여 *자기 자신*을 기준으로 이동 배치할 수 있다.

### 3.3. `absolute` 키워드

요소를 Normal Flow에서 제거하고 페이지 레이아웃에 공간도 배정하지 않는다. 즉 공중에 떠있는 모습으로 배치된다.

`top`, `right`, `bottom`, `left` 속성을 사용하여 *조상 요소 중에서 `position`이 `static`이 아닌 요소*를 기준으로 이동 배치할 수 있다. 모든 요소가 static이 아니라면 최상위 요소인 `<body>`를 기준으로 삼는다.

### 3.4. `fixed` 키워드

요소를 Normal Flow에서 제거하고 페이지 레이아웃에 공간도 배정하지 않는다. 즉 공중에 떠있는 모습으로 배치된다.

*뷰포트*를 기준으로 삼아 배치하므로, 스크롤로 화면 이동을 해도 위치가 고정된다.

### 3.5. `sticky` 키워드

요소를 Normal Flow에 따라 배치하는데, 스크롤로 화면을 내리면 `fixed`처럼 동작한다. 다시 스크롤을 올려서 원래의 위치를 찾게 되면 그 위치를 유지한다.

`<body>`처럼 스크롤이 되는 조상의 바로 아래 자식에 적용해야 동작한다.

## 4. `overflow` 단축 속성

요소의 콘텐츠가 너무 커서 요소의 블록 서식에 맞출 수 없을 때의 처리법을 지정한다.

`overflow-x`, `overflow-y`속성의 단축속성이다. `overflow`속성에 하나의 키워드를 작성하면 `overflow-x`, `overflow-y` 두 속성 모두에 적용된다.

### 4.1. `overflow`의 키워드

- `visible`: 기본값으로, 오버플로우 부분이 모두 보여진다.
- `hidden`: 오버플로우 부분이 숨겨진다.
- `scroll`: 스크롤을 통해 오버플로우 부분을 볼 수 있다.
- `auto`: 오버플로우가 없다면 `visible`, 오버플로우 있다면 `scroll`로 동작한다.

## 5. `z-index` 속성

요소와 그 자손 또는 하위 플렉스 아이템의 Z축 순서를 지정한다.

더 큰 `z-index`값을 가진 요소가 작은 값을 가진 요소 위를 덮는다. `z-index`의 기본값인 `auto`키워드는 '0'과 같다.