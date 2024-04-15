## BEM 방법론

- Block, Element, Modifier를 구분하여 CSS 클래스 이름을 짓는 방법론이다. `Block__Element--Modifier` 형식으로 작명한다.
  - **Block**: _재사용 가능한 기능적으로 독립적인 컴포넌트_
    - [ex]`tab`
  - **Element**: _블럭을 구성하는 단위_
    - [ex]`tab__item`
  - **Modifier**: _블럭이나 엘리먼트의 속성_
    - [ex]`tab__item--focused`
- 기본적으로 ID를 사용하지 않으며, class만을 사용한다.
- '어떻게 보이는가'가 아니라 '어떤 목적인가'에 따라 이름을 짓는다.
- 클래스네임에 캐스케이딩을 여러번 표시할 필요가 없다.

> **현 회사의 BEM 커스텀**
>
> - camelCase 허용
> - dash와 underbar는 한 개씩만 사용
