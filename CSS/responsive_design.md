# 반응형 웹 디자인(Responsive Web Design)

다양한 화면 크기가 등장함에 따라 반응형 웹 디자인의 개념이 대두되었다. 서로 다른 화면 넓이와 해상도에 맞게 하나의 웹페이지가 조판과 모양을 변경하도록 한다.

아래와 같은 `<meta>`태그가 필수적이다

```css
<meta name="viewport" content="width=device-width, initial-scale=1.0">
/* 장치의 가로 길이에 맞추고 첫 화면 비율을 그대로 보여줄 것! */
```

## 1. 미디어 쿼리(Media Query): `@media`

미디어 쿼리는 반응형 웹 디자인의 핵심 부분으로, 지정한 규칙에 브라우저 및 장치 환경이 일치하는 경우에만 CSS를 적용할 수 있는 방법을 제공한다.

특정 조건에 특정 CSS 파일을 불러오고 싶을 때는 `<link>`태그에서

> 📌미디어 쿼리 작성 규칙
>
> `@media`로 구문을 시작하여 특정 규칙(하나의 media-type과 하나 이상의 media-feature-rule)을 작성하고 `{}`에 적용할 CSS 문법을 작성한다.  
> 특정 규칙을 작성할 때 AND는 `and` OR은 `,`로 작성한다.
>
> ```css
> @media media-type and (media-feature-rule) {
>   /* CSS rules go here */
> }
> ```

미디어 쿼리는 반응형 웹 디자인의 핵심 부분으로, 지정한 규칙에 브라우저 및 장치 환경이 일치하는 경우에만 CSS를 적용할 수 있는 방법을 제공한다.

## 1. media-type

미디어 타입의 기본값인 `all`은 `screen`, `print`, `speech` 키워드를 모두 사용한다. 보통 `all`이나 `screen` 키워드를 주로 사용한다.

## 2. media-feature-rule

- `max-width`, `min-width`, `max-height`, `min-height`: 최대 최소 넓이, 또는 최대 최소 높이를 정의한다.
- `orientation: landscope`, `orientation: portrait`: 가로모드, 또는 세로모드로 정의한다.
