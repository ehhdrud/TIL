# 페이지 랜더링이 끝난 이후부터 `transition`함수가 동작하도록 구현하기

웹 페이지 상에 transition 동작이 존재할 때, 초기 랜더링 시에도 불필요한, 혹은 원치 않는 transition 동작이 발생하는 경우가 있다.

이를 해결하기 위해 다음을 참고한다.

1. CSS파일에 `.preload` 클래스를 만들어 `transition: none`을 통해 트렌지션이 일어나지 않도록 설정한다  
   범용 선택자 `*`를 사용해 모든 요소에 적용한다.  
   속성값 맨 뒤에 `!important`를 넣어 해당 속성을 최우선적으로 적용하도록 한다.

2. JS파일에 `addEventListener`를 통해 페이지 로드를 마칠 경우(`"load"`) 해당 속성을 제거해 transition이 원활하게 작동하도록 설정한다.

> 📌CSS
>
> ```css
> .preload * {
>   transition: none !important;
> }
> ```

> 📌JS
>
> ```js
> window.addEventListener("load", function () {
>   document.body.classList.remove("preload");
> });
> ```
