# CSS 개요

CSS란 Cascading Style Sheet의 약어로, HTML로 만들어진 콘텐츠에 HTML과 분리해 레이아웃과 디자인 요소를 정의하는 기술이다.

## 1. CSS는 어떻게 생겼을까

CSS는 룰 기반(Rule-based)언어이다.

CSS를 통해 특정 요소, 혹은 특정 요소들의 집합의 스타일 규칙을 적용할 수 있다.

선택자를 통해 어떤 요소 혹은 집합을 선택할지 결정하고, 중괄호로 나타나는 선언 블록에 한 개 이상의 선언을 한다.

## 2. CSS를 적용하는 방법

### 2.1. 내부(embedded) 스타일

HTML 문서의 `<head>` 안에 `<style>`을 통해 선택자와 선언 블록를 이용해 스타일링 한다.

### 2.2. 인라인(inline) 스타일

HTML 문서의 요소에 `style` 속성을 추가해 하나의 요소를 스타일링한다.

### 2.3. 외부(external) 스타일

HTML 문서 외부에 작성된 CSS 파일을 `<link>`를 사용하여 가져온다. CSS파일이 여러 개라면 하나의 `<link>`에 작성하는 것이 아니라 여러 개의 `<link>`를 사용하여 작성한다.

`href` 속성에 경로를 기입해서 CSS 파일로 연결할 수 있는 링크를 정의하고, `rel` 속성에 `stylesheet`를 기입한다.

내부 스타일, 인라인 스타일보다 코드의 유지보수에 더 적합하기 때문에 권장되는 방식이다.

## 3. 케스케이딩 원칙

### 3.1. 스타일 적용 우선순위

-   **출처**
    1. 제작자
    2. 사용자
    3. 브라우저
-   **명시도**: 적용 범위가 적을 수록, 즉 명시도가 클수록 우선시 된다. 명시도에 차이가 있다면 코드 위치는 상관하지 않는다.
    1. `!important`
    2. Inline
    3. ID
    4. Class/Attribute/Psuedo Class
    5. Tag
    6. `*`
    7. `inherited`
-   **코드 위치**  
    : 선언이 중복되면 뒤 선언으로 덮어쓴다.

### 3.2. 스타일 상속

부모 요소의 속성은 자식 요소에 전달된다. 자식 요소에서 재정의 할 경우, 부모의 스타일을 덮어쓴다.

상속되지 않는 속성도 있다.

> **📌 상속되지 않는 속성**
>
> -   대부분의 박스 모델 속성들: width, height, margin, padding, border, box-sizing 등
> -   배경(background) 속성들: background-color, background-image, background-repeat, background-position, background-size 등
> -   위치(position) 속성들: position, top, bottom, left, right 등
> -   부동 속성(floating)들: float, clear 등
> -   보이는 여부(visibility)와 투명도(opacity) 속성들: visibility, opacity 등
> -   기타 다양한 속성들: display, cursor, z-index, table-layout, transform, animation
