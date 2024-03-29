# 섹션 콘텐츠(= 구획을 나타내는 태그)

## 1. 순수 컨테이너

아무것도 의미하지 않는 Non-Semantic 특성을 가진다. 보통 요소들을 묶어 스타일링을 용이하게 하는 용도로 쓰인다.

CSS로 꾸미기 전에는 콘텐츠나 레이아웃에 어떠한 영향도 주지 않는다.

### 1.1. `<div>`

플로우 콘텐츠를 위한 블록 레벨의 컨테이너이다.

문단을 구분하기 위한 `<p>`와는 달리, 기본적으로 설정된 margin이 없다.

### 1.2. `<span>`

구문 콘텐츠를 위한 인라인 레벨의 컨테이너이다.

## 2. 시멘틱 웹

Semantic이란 "의미론적인"이라는 의미로, 의미를 고려하여 작성한 웹을 뜻한다.

시멘틱 웹은 검색 엔진, 스크린 리더가 웹을 탐색하는데 도움을 주고, 코드의 유지보수나 협업에도 이점이 있다.

### 2.1. `<header>`

문서의 최상단에 위치하는 컨테이너를 의미한다.

제목, 로고, 검색창, 작성자 이름 등이 포함될 수 있다.

다른 `<header>` 또는 `<footer>`를 제외한 플로우 콘텐츠가 요소로 포함될 수 있다.

### 2.2. `<footer>`

문서의 최하단에 위치하는 컨테이너를 의미한다.

구획의 작성자, 저작권 정보, 관련 문서 및 사이트 등이 포함될 수 있다.

`<header>` 또는 다른 `<footer>`를 제외한 플로우 콘텐츠가 요소로 포함될 수 있다.

### 2.3. `<nav>`

문서 중 현재 페이지 내, 또는 다른페이지로 연결되는 링크를 포함하는 컨테이너이다

현재 페이지 기준으로 관련성을 고려한다. 전체 페이지를 아우를 수 있는 링크라면 `<footer>`에 포함시키는 것이 더 적절하다.

### 2.4. `<aside>`

문서의 주요 내용과 간접적으로 연관된 콘텐츠을 포함하는 컨테이너이다

어떠한 콘텐츠는 `<nav>`로 표현될 수도 있고 `<aside>`로 표현될 수도 있다.

### 2.5. `<main>`

문서 `<body>`의 주요 콘텐츠를 포함하는 컨테이너이다. 주요 콘텐츠란 문서의 핵심 주제나 앱의 핵심 기능에 직접적으로 연결됐거나 확장하는 콘텐츠로 이루어진다.

문서 당 하나의 `<main>`이 존재한다. 하나보다 많은 `<main>`을 사용한다면 `hidden` 속성을 사용해야 한다.

### 2.6. `<article>`

문서 안에서 독립적으로 구분해 배포하거나 재사용할 수 있고 단독 사용이 가능한 콘텐츠를 포함하는 컨테이너이다.

게시판, 블로그 글, 매거진, 뉴스 기사 등이 포함될 수 있다.

보통 각각의 `<article>`를 식별할 수 있는 제목을 작성한다.

`<article>` 안에 `<section>`이 들어갈 수 있고, 그 반대도 가능하다.

### 2.7. `<section>`

문서 안에서 독립적으로 구분해 배포하거나 재사용할 수 있지만 단독 사용은 불가능한 콘텐츠를 포함하는 컨테이너이다.

`<section>` 안에 `<article>`이 들어갈 수 있고, 그 반대도 가능하다.
