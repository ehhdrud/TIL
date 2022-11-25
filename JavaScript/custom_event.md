# `CustomEvent()`

`CustomEvent()`를 통해 자바스크립트가 기본적으로 제공하지 않는 커스텀 이벤트를 생성할 수 있다.

`new CustomEvent([evntName], ([options]))` 문법을 가진다.

# `dispatchEvent()`

커스텀 이벤트를 발생시키는 메서드이다.

실제로 이벤트를 발생시키는 요소에서 `dispatchEvent()`를 호출한다.

> 📌예시
>
> ```js
> let change = new CustomEvent("rating-change", {
>   detail: currentRating,
> });
>
> Element.dispatchEvent(change);
> ```
