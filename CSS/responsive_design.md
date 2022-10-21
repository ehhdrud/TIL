# 반응형 웹 디자인(Responsive Web Design)

다양한 화면 크기가 등장함에 따라 반응형 웹 디자인의 개념이 대두되었다. 서로 다른 화면 넓이와 해상도에 맞게 하나의 웹페이지가 조판과 모양을 변경하도록 한다.

아래와 같은 `<meta>`태그가 필수적이다.

```css
<meta name="viewport" content="width=device-width, initial-scale=1.0">
/* 장치의 가로 길이에 맞추고 첫 화면 비율을 그대로 보여줄 것! */
```

## 1. 미디어 쿼리(Media Query): `@media`

미디어 쿼리는 반응형 웹 디자인의 핵심 부분으로, 지정한 규칙에 브라우저 및 장치 환경이 일치하는 경우에만 CSS를 적용할 수 있는 방법을 제공한다.

*미디어 쿼리 작성 규칙*에 따라 작성한다.

여러개의 CSS 파일을 사용하고자 할 때, HTML파일의 `<link>`태그에서 `media`속성에 *미디어 쿼리 작성 규칙*따라 작성하면 특정 조건에 특정 CSS 파일을 불러올 수도 있다. 다만 성능적으로 유리한 방법은 아니다.

> **📌미디어 쿼리 작성 규칙**
>
> `@media`로 구문을 시작하여 특정 규칙(하나의 media-type과 하나 이상의 media-feature-rule)을 작성하고 `{}`에 적용할 CSS 문법을 작성한다.  
> 특정 규칙을 작성할 때 AND는 `and` OR은 `,`로 작성한다.
>
> ```css
> @media media-type and (media-feature-rule) {
>   /* CSS rules go here */
> }
> ```
>
> > **📌media-type**
> >
> > 미디어 타입의 기본값인 `all`은 `screen`, `print`, `speech` 키워드를 모두 사용한다. 주로 `screen`이나 `all` 키워드를 사용한다.
>
> > **📌media-feature-rule**
> >
> > `max-width`, `min-width`, `max-height`, `min-height`를 통해 최대 최소 넓이, 또는 최대 최소 높이를 정의할 수도 있고, `orientation: landscope`, `orientation: portrait`을 통해 가로 모드, 또는 세로 모드로 설정할 수도 있다.

## 1.1. 브레이크포인트(Breakpoint)

대게 0px부터 480px(혹은 640px)미만 까지 아주 작은 모바일 기기, 480이상 768px미만까지 모바일 기기, 768px이상부터 1024px미만까지 테블릿, 1024px 이상부터 데스크탑으로 정의하는데 이러한 지점들을 Breakpoint라고 부른다.

기본적으로 불러오는 CSS를 모바일 기준으로 하겠다면 `min-width: 480px` → `min-width: 768px` → `min-width: 1024px`순의 "모바일 퍼스트"로 작성한다. 반대 순서인 "데스트탑 퍼스트"로 작성한다면 기본적으로 불러오는 CSS는 데스크탑을 기준으로 한다. 최근 모바일 기기에 의한 웹 서핑이 잦아짐에 따라 대체로 "모바일 퍼스트"로 작성하는 추세이다.
