# 그리드(Grid)

내부의 요소를 이차원으로 배치하는 레이아웃 모델이다.

요소들을 감싸고 있는 외부의 부모 영역을 그리드 컨테이너(Grid Container), 내부에서 정렬을 위해 배치된 자식 영역을 그리드 아이템(Grid Item)이라고 부른고, 행(Rows)과 열(Columns)로 구성되며 각 행과 각 열 사이에는 공백이 존재한다.

## 1. Grid Container에 사용하는 속성

### 1.1. `display: grid`

`display` 속성의 `grid`를 사용하여 그리드를 만들 수 있다.

### 1.2. `grid-templete-rows`와 `grid-templete-columns` 속성

`grid-templete-rows`는 행, `grid-templete-columns`는 열을 설정한다. `length`, `%`, `fr` 등을 통해 크기를 설정한다. 여러개를 만들 때 `spacing`으로 구분한다.

함수표기법으로 표현할 수 있다. `minmax()`를 사용하면 첫 번째 인자에는 최소값, 두 번째 인자에는 최대값을 입력한다. `repeat()`를 사용하면 첫 번째 인자에는 몇 개의 행 또는 열을 가질 것인지, 두 번째 인자에는 크기를 입력한다.

내부에 그리드 아이템이 없더라도 명시된 크기만큼의 자리를 차지하게 된다.

### 1.3. `grid-area`, `grid-templete-areas` 속성

`grid-area`속성을 사용해 각 요소마다 이름을 지정하고, 지정한 이름을 `grid-templete-areas` 속성을 통해 `spacing`으로 구분한 그리드 아이템들을 배치한다. 열이 바뀔때는 새로운 문자열을 사용한다.

`grid-area` 속성으로 이름을 지정할 때 적고 동일한 글자수를 가지는 것이 가독성에 유리하다.

문자열로 작성한 그리드 아이템 집합은 사각형 형태를 띄어야 한다.

빈 영역은 문자열에 `.`를 입력해준다.

> **📌`grid-templete-areas` 속성 작성법**
>
> ```css
> .header {
>   grid-area: hd;
> }
>
> .main {
>   grid-area: ma;
> }
>
> .sidebar {
>   grid-area: sb;
> }
>
> .footer {
>   grid-area: ft;
> }
> .container {
>   display: grid;
>   grid-template-areas:
>     "hd hd hd hd hd"
>     "ma ma ma sb sb"
>     "ft ft ft ft ft";
> }
> ```
>
> ![grid_area](/img/grid_area.png)

### 1.4. `row-gap`과 `column-gap` 속성

각 행, 각 열의 간격을 설정한다.

### 1.5. `gap` 단축 속성

`row-gap`, `column-gap`의 단축 속성이다.

앞 속성값이 `row-gap`, 뒤 속성값이 `column-gap`이다.

### 1.6 `grid-auto-rows`와 `grid-auto-columns` 속성

그리드 아이템이 추가되어 `grid-templete-rows`, `grid-templete-columns` 속성으로 인해 명시된 크기만큼의 자리를 벗어날 때, 추가된 그리드 아이템의 행 또는 열의 크기를 설정할 수 있다.

`grid-templete-rows`와 `grid-templete-columns`속성이 명시적 크기 지정이라면, `grid-auto-rows`와 `grid-auto-columns` 속성은 암시적 크기 지정이다.

### 1.7. `grid-auto-flow` 속성

그리드 아이템들이 자리를 잡는 흐름을 설정한다.

#### 1.7.1. `grid-auto-flow` 속성의 키워드

- `row`: 기본값으로, 행 방향으로 자리잡는다.
- `column`: 열 방향으로 자리잡는다.
- `dense`: `row`,`column`뒤에 추가적으로 붙는 키워드로, 빈 공간이 생기면 해당 공간에 들어갈 수 있는 그리드 아이템들로 자리를 채운다. `row`는 기본값이므로 `dense`만 입력해도 `row dense`로 동작하지만 `column`에 적용하려면 반드시 `column dense`로 입력해야한다.

### 1.8. `grid` 속성

명시적 속성인 `grid-templete-rows`, `grid-templete-columns`, `grid-templete-areas`와 암시적 속성인 `grid-auto-rows`, `grid-auto-columns`, `grid-auto-flow`의 단축 속성이다.

행/열은 명시/명시 혹은 명시/암시 혹은 암시/명시의 특성을 가지게 된다.

`/`를 기준으로 앞 쪽은 행에 대한 속성값, 뒤 쪽은 열에 대한 속성값을 작성한다. `grid-auto-flow`의 속성값을 `row`로 하고 싶다면 `/` 앞 쪽에 `auto-flow` 혹은 `auto-flow dense`를 입력하면 되고, `column`으로 하고 싶다면 `/` 뒤 족에 `auto-flow` 혹은 `auto-flow dense`를 입력하면 된다.

### 1.9. 정렬 관련 속성

#### 1.9.1. `justify-content` 속성

콘텐츠 사이와 콘텐츠 주위의 빈 공간을 그리드의 '인라인 축(주축)'을 따라 배치하는 방식을 결정한다.  
(플렉스 박스에 사용할 때는 '주축'을 기준으로 '플렉스 아이템들'을 어떻게 정렬할지 결정 !)

##### 1.9.1.1. `justify-content` 속성의 키워드

- `start`: 인라인 축이 시작하는 위치에 그리드 아이템들이 정렬된다.
- `end`: 인라인 축이 끝나는 위치에 그리드 아이템들이 정렬된다.
- `center`: 인라인 축을 기준으로 가운데에 그리드 아이템들이 정렬된다.
- `space-between`: 그리드 아이템들이 인라인 축의 양끝을 채우고 동일한 간격으로 정렬된다.
- `space-around`: 각 그리드 아이템들 사이에 간격이 모두 동일하게 정렬된다. 첫 그리드 아이템과 마지막 그리드 아이템 간에도 간격이 있기 때문에 인라인 축의 양끝을 채우진 않는다.

#### 1.9.2. `align-content` 속성

콘텐츠 사이와 콘텐츠 주위의 빈 공간을 그리드의 '블록 축(교차축)'을 따라 배치하는 방식을 결정한다.  
(플렉스 박스에 사용할 때는 '교차축'을 기준으로 '여러 줄의 플렉스 박스들'을 어떻게 정렬할지 결정 !)

##### 1.9.2.1. `align-content` 속성의 키워드

- `start`: 블록 축이 시작하는 위치에 그리드 행들이 정렬된다.
- `end`: 블록 축이 끝나는 위치에 그리드 행들이 정렬된다.
- `center`: 블룩 축을 기준으로 가운데에 그리드 행들이 정렬된다.
- `space-between`: 그리드 행들이 블록 축의 양끝을 채우고 동일한 간격으로 정렬된다.
- `space-around`: 각 그리드 행들 사이에 간격이 모두 동일하게 정렬된다. 첫 그리드 행와 마지막 그리드 행 간에도 간격이 있기 때문에 블록 축의 양끝을 채우진 않는다.

#### 1.9.3. `justify-items` 속성

각각의 그리드 아이템들이 '인라인 축(주축)'을 따라 어떻게 자리잡을지를 결정한다.

하나의 그리드 아이템에만 적용하고 싶을 때는 `justify-self` 속성을 사용한다.

##### 1.9.3.1. `justify-items` 속성의 키워드

- `stretch`: 기본값으로, 그리드 아이템이 인라인 축 영역 전부를 차지한다.
- `start`: 인라인 축이 시작하는 위치에 그리드 아이템이 정렬된다.
- `end`: 인라인 축이 끝나는 위치에 그리드 아이템이 정렬된다.
- `center`: 인라인 축을 기준으로 가운데에 그리드 아이템이 정렬된다.

#### 1.9.4. `align-items` 속성

각각의 그리드 아이템들이 '블록 축(교차축)'을 따라 어떻게 자리잡을지를 결정한다.

하나의 그리드 아이템에만 적용하고 싶을 때는 `align-self` 속성을 사용한다.

##### 1.9.4.1. `align-items` 속성의 키워드

- `stretch`: 기본값으로, 그리드 아이템이 블록 축 영역 전부를 차지한다.
- `start`: 블록 축이 시작하는 위치에 그리드 아이템이 정렬된다.
- `end`: 블록 축이 끝나는 위치에 그리드 아이템이 정렬된다.
- `center`: 블록 축을 기준으로 가운데에 그리드 아이템이 정렬된다.

## 2. Grid Item에 사용하는 속성

### 2.1. `grid-row`와 `grid-column` 속성

`grid-row`는 `grid-row-start`, `grid-row-end`의 단축 속성이고, `grid-column`은 `grid-column-start`, `grid-column-end`의 단축 속성이다. 각 속성값은 `/`로 구분하여 작성한다.

`grid-row-start`, `grid-row-end`는 그리드 아이템이 차지할 행을 설정하고, `grid-column-start`, `grid-column-end`는 그리드 아이템이 차지할 열을 설정한다.

속성값으로는 숫자가 들어가는데 이 숫자는 '차지하고자 하는 행 또는 열의 개수'가 아니라, '행과 열을 나누는 선의 고유 번호'를 작성한다. 이 숫자의 음수값인 고유번호는 명시적으로 발생한 선만 가지고, 암시적으로 발생할 선들은 양수값으로 작성해야 한다.

'차지하고자 하는 행 또는 열의 개수'를 속성값에 명시하고 싶다면, 앞 속성값에는 '행과 열을 나누는 선의 고유 번호'를 작성하고 뒤 속성값에 `span` 키워드와 함께 N개의 '차지하고자 하는 행 또는 열'을 작성한다. 예를 들어 `grid-row: 2 / span 2`로 그리드 아이템을 두 번째 행에서 시작하여 두 개의 행에 걸쳐 확장시킬 수 있다.

> **📌행과 열을 나누는 선의 고유 번호**
>
> ![grid_line_number](/img/grid_line_number.png)

### 2.2. `grid-area` 단축 속성

`grid-templete-areas` 속성에서 사용할 수 있는 이름을 지정하는 용도 외에, `grid-row-start`, `grid-column-start`, `grid-row-end`, `grid-column-end`의 단축 속성으로도 사용할 수 있다.

`/`로 구분해 `grid-row-start`, `grid-column-start`, `grid-row-end`, `grid-column-end` 순서로 작성한다.

### 2.3. `order` 속성

플렉스 컨테이너 혹은 그리드 컨테이너 안에서 현재 요소의 배치 순서를 정한다. 즉 부모 컨테이너는 `display: flex`혹은 `display: grid`가 설정되어 있어야 한다.

값이 낮을 수록 앞에 배치된다. 기본값은 0이고 음수도 가능하다.

## 3. Grid 단위

### 3.1. `fr` 단위

"fraction"의 약어로, 그리드 컨테이너의 여유 공간을 비율로 나눠 설정한다.

예를 들어 `1fr 2fr 1fr`라고 작성하면 세개의 행 또는 열이 1:2:1의 비율을 갖는다. 다른 단위와 혼합해서 사용할 수도 있다.

### 3.2. `min-content`와 `max-content`

단위처럼 사용할 수 있는 키워드로, 최소 공간 또는 최대 공간을 활용할 수 있도록 콘텐츠를 변경시킨다.

### 3.3. `auto-fill`

단위처럼 사용할 수 있는 키워드로, 여유 공간에 자동으로 다음 그리드 아이템을 채운다.

`minmax()` 함수 표기법을 같이 사용하면 유용하게 사용할 수 있다. `minmax()`에는 최솟값과 최대값을 순서대로 입력한다. 예를 들어 `grid-template-column: repeat(auto-fill, minmax(100px, 1fr))`처럼 그리드 컨테이너를 정의한다면 100px의 여유가 생긴다면 다음 행의 그리드 아이템이 해당 행에 채워지고, 그렇지 않다면 해당 행의 그리드 아이템들의 크기가 동일한 비율로 늘어난다.

### 3.4. `auto-fit`

단위처럼 사용할 수 있는 키워드로, 여유 공간을 자동으로 채운다.

`auto-fill`은 다음에 채워질 그리드 아이템이 없다면 `minmax()`를 같이 사용하더라도 여유 공간을 채울 수 없지만 `auto-fit` 키워드는 해당 그리드 컨테이너 안의 아이템의 크기를 조절해 여유 공간을 채운다.
