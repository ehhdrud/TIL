# 폰트 관련 속성

## 1. `font-size`

폰트의 크기를 조절한다.

주로 `숫자+px`,`%`를 사용한다.

대부분의 브라우저는 `16px`을 기본값으로 사용한다.

## 2. `font-style`

폰트의 스타일을 조작한다.

키워드는 주로 `italic`을 사용하여 기울임꼴로 변경한다.

대부분의 브라우저는 `normal`을 기본값으로 사용한다.

## 3. `font-weight`

폰트의 굵기를 조절한다.

키워드는 주로 `bold`, `700`을 사용한다.

대부분의 브라우저는 `400`을 기본값으로 사용한다.

## 4. `font-family`

글꼴을 조작한다.

여러가지 키워드를 나열해서 앞선 키워드의 글꼴이 없을 경우를 대비할 수 있다.

속성값으로 자주 사용되는 `serif`와 `sans-serif`는 브라우저에 기본값이 저장되어 있다. `serif`는 획의 마지막이 꺾여있는 글꼴이고 `sans-serif`는 획의 마지막이 껶여있지 않은 글꼴이다.

## 5. `line-height`

글꼴마다 높이가 다른데, 이를 조절하고자 할 때 사용한다.

기본값인 `normal`값은 1.2~1.5를 주로 사용한다.

## 6. `font`: 단축 속성(shorthand)

`font-size`, `font-family`, `font-style`, `font-variant`, `font-weight`, `line-height`의 단축 속성으로, `font-size`, `font-family`는 필수이고 나머지는 옵션이다. 각 속성은 `spacing`으로 구분하고 순서를 지켜야 한다.

`font-style`과 `font-weight`를 조작하려면 `font-size`속성 앞 쪽에 `spacing`으로 구분해 순서대로 작성한다.

`line-height`를 조절하려면 `font-size`속성 바로 뒤에 `/`로 구분하여 붙여준다.

입력하지 않은 속성은 기본값을 사용한다.

```css
/*
font-size: 20px
font-family: "Times New Roman", Times, serif
font-weight: 100
font-style: italic
line-height: 1.7
위 값을 단축 속성으롤 표현하려면?
*/
 {
  font: italic 100 200px/1.7 "Times New Roman", Times, serif;
}
```

## 7. `letter-spacing`, `word-spacing`

글자 혹은 단어 사이에 간격을 조절한다.

기본값이 가독성에 최적화된 값이기 때문에 디자인적 요소로서 꼭 필요하지 않는 한 조작하지 않는다.

## 8. `text-align`,

가로 정렬을 설정한다.

`center`, `right`, `left`를 사용해 가운데 정렬, 오른쪽 정렬, 왼쪽 정렬이 가능하다.

가로 길이가 한정된 인라인 요소에는 적용되지 않는다. 이런 경우에는 블록 요소인 태그로 감싸서 `text-align`을 적용한다.

## 9. `text-indent`

들여쓰기의 길이를 설정한다

가로 길이가 한정된 인라인 요소에는 적용되지 않는다. 이런 경우에는 블록 요소인 태그로 감싸서 `text-indent`을 적용한다.

## 10. `text-decoration`: 단축 속성(shorthand)

`text-decoration-line`, `text-decoration-color`, `text-decoration-style`, `text-decoration-thickness`의 단축 속성으로 `text-decoration-line`은 필수이고 나머지는 옵션이다. 각 속성은 `spacing`으로 구분하고 순서는 상관없다.

`font`단축 속성보다 사용 빈도가 높다.

### 10.1. `text-decoration-line`의 키워드

여러 개를 적용할 수 있다. 이 때 다른 속성들의 키워드와 섞이면 안되고 붙어있어야 한다.

- `none`: 기본값
- `underline`: 밑줄
- `overline`: 윗줄
- `line-through`: 취소선

### 10.2. `text-decoration-style`의 키워드

- `soild`: 기본값
- `double`: 두줄
- `dotted`: 점선
- `dashed`: 굵은 점선
- `wavy`: 물결

```css
/*
text-decoration-line: line-through
text-decoration-color: black
text-decoration-style: wavy
text-decoration-thickness: 2px
위 값을 단축 속성으롤 표현하려면?
*/
 {
  text-decoration: black line-through wavy 2px;
}
```

## 11. `word-braek`

텍스트가 자기 콘텐츠 박스 밖으로 오버플로우될 때 줄을 바꿀 지 설정한다.

- `normal`: 기본값으로, 기본 줄 바꿈 규칙을 사용한다. 한중일 텍스트의 경우 오버플로우시 자동으로 줄이 바뀐다.
- `break-all`: 오버플로우를 방지하기 위해서 줄바꿈이 일어난다.
- `keep-all`: 한중일 텍스트에서 오버플로우 방지를 위한 줄바꿈이 일어나지 않는다. 한중일 텍스트가 아니라면 `normal`과 동일하다.

## 12. `text-transform`

- `none`: 기본값
- `capitalize`: 단어의 앞글자가 대문자로 변경된다.
- `uppercase`: 모든 단어가 대문자로 변경된다.
- `lowercase`: 모든 단어가 소문자로 변경된다.
