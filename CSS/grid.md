# 그리드(Grid)

내부의 요소를 이차원으로 배치하는 레이아웃 모델이다.

요소들을 감싸고 있는 외부의 부모 영역을 **Grid Container**, 내부에서 정렬을 위해 배치된 자식 영역을 **Grid Item**이라고 부른고, 행(Rows)과 열(Columns)로 구성되며 각 행과 각 열 사이에는 공백이 존재한다.

## 1. Grid Container에 사용하는 속성

### 1.1. `display` 속성의 `grid` 키워드

레이아웃을 변경할 때 사용하는 `display` 속성에는 바깥쪽 레이아웃을 조작(`display-outside`)하는 `inline`, `block`, `inline-block` 키워드 외에, 안쪽 레이아웃을 조작(`display-inside`)하는 `grid` 키워드를 사용할 수 있다. `display-outside`와 `display-inside`는 다른 개념이므로 `inline-grid`처럼 `-`를 이용해 같이 사용할 수 있다.

### 1.2. `grid-templete-rows`와 `grid-templete-columns` 속성

`grid-templete-rows`는 행, `grid-templete-columns`는 열을 설정한다. 크기를 명시적으로 입력해야 하고 여러개를 만들 때 `spacing`으로 구분한다. 내부에 그리드 아이템이 없더라도 명시된 크기만큼의 자리를 차지하게 된다.

`fr`단위를 사용한다면 크기를 비율로 설정할 수 있다. 예를 들어 `1fr 2fr 1fr`라고 작성하면 세개의 행 또는 열이 1:2:1의 비율을 갖는다.

`repeat()` 함수 표기법을 사용할 수도 있다. 첫 번째 인자에는 몇 개의 행 또는 열을 가질 것인지, 두 번째 인자에는 크기를

### 1.3. `grid-templete-areas` 속성

`grid-area` 속성의 값을 `spacing`으로 구분하여 문자열로 작성하여 "Grid Areas"를 설정한다.

`grid-area` 속성의 값의 덩어리는 사각형 형태를 띄어야 한다.

빈 영역은 문자열에 `.`를 입력해준다.

> 📌`grid-area` 속성
>
> 각 요소마다 `grid-area` 속성을 작성하여 `grid-templete-areas` 속성에서 사용할 수 있는 이름을 붙여준다.  
> 적고 동일한 글자수를 가지는 것이 가독성에 유리하다.

> 📌`grid-templete-areas` 속성 작성법
>
> ```css
> grid-templete-areas: "hd hd hd hd hd" "ma ma ma sb sb" "ft ft ft ft ft";
> ```
>
> ![grid_area](/img/grid_area.png)

### 1.4. `row-gap`과 `column-gap` 속성

각 행, 각 열의 간격을 설정한다.

### 1.5. `gap` 단축 속성

`row-gap`, `column-gap`의 단축 속성이다.

앞 속성값이 `row-gap`, 뒤 속성값이 `column-gap`이다.

### 1.6 `grid-auto-rows`와 `grid-auto-columns` 속성

그리드 아이템이 추가되어 `grid-templete-rows`와 `grid-templete-columns` 속성으로 인해 명시된 크기만큼의 자리를 벗어날 때, 추가된 그리드 아이템의 행 또는 열의 크기를 설정할 수 있다.

`grid-templete-rows`와 `grid-templete-columns`속성이 명시적 크기 지정이라면, `grid-auto-rows`와 `grid-auto-columns` 속성은 암시적 크기 지정이다.

### 1.7. `grid-auto-flow` 속성

그리드 아이템들이 자리를 잡는 흐름을 설정한다.

#### 1.7.1. `grid-auto-flow` 속성의 키워드

- `row`: 기본값으로, 행 축의 방향으로 자리잡는다.
- `column`: 열 축의 방향으로 자리잡는다.
- `dense`: `row`,`column`뒤에 추가적으로 붙는 키워드로, 빈 공간이 생기면 해당 공간에 들어갈 수 있는 그리드 아이템들로 자리를 채운다. `row`는 기본값이므로 `dense`만 입력해도 `row dense`로 동작하지막 `column`에 적용하려면 반드시 `column dense`로 입력해야한다.

### 1.8. `grid` 단축 속성(❗)

명시적 속성인 `grid-templete-rows`, `grid-templete-columns`, `grid-templete-areas`와 암시적 속성인 `grid-auto-rows`, `grid-auto-columns`, `grid-auto-flow`의 단축 속성이다.

행/열은 명시/명시 혹은 명시/암시 혹은 암시/명시의 특성을 가지게 된다.

`/`를 기준으로 앞 쪽은 행에 대한 속성값, 뒤 쪽은 열에 대한 속성값을 작성한다. `grid-auto-flow`의 속성값을 `row`로 하고 싶다면 `/` 앞 쪽에 `auto-flow` 혹은 `auto-flow dense`를 입력하면 되고, `column`으로 하고 싶다면 `/` 뒤 족에 `auto-flow` 혹은 `auto-flow dense`를 입력하면 된다.
