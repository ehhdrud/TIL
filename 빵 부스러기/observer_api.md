# Intersection Observer API

Intersection Observer API는 타겟 요소와 상위요소 또는 최상위 document의 viewport 사이의 intersection 내의 변화를 비동기적으로 관찰하는 방법이다.

무한 스크롤 등을 구현할 때 용이하다.

📌사용 방법

1. `new IntersectionObserver(callback, option)`로 관찰자 객체를 생성한다.

```js
const io = new IntersectionObserver(callback, option);
```

> **✨callback 함수의 특징**
>
> 콜백함수는 entries와 io를 매개변수로 갖는다. entries는 관찰중인 모든 대상을 담은 배열이며, 요소 각각을 참조하기 위해서는 forEach를 이용해 개별적으로 접근해야 한다. io는 관찰하고 있는 관찰자 객체를 말한다.

> **✨설정 가능한 옵션**
>
> 1.  `root`: 관찰 대상이 화면에 들어왔음을 감지하는 영역으로 기본값은 null(Viewport)이다. 이는 객체의 조상 요소여야 한다.
> 2.  `rootMargin`: 관찰 대상을 root가 가진 여백(margin)까지 확장한다. 기본값은 상우하좌 순으로 '0px 0px 0px 0px'이며, 옵션값을 지정할 때는 문자열로 단위와 함께 작성해야 한다. 이 값은 퍼센티지가 될 수 있다.
> 3.  `threshold`: 관찰 대상이 화면 내에 얼마나 들어 왔을 때 콜백 함수를 호출할 지 결정하는 값으로 기본값은 0(0%)이다. 최대 1(100%)까지 지정 가능하며, 0.6이라 하면 대상이 화면에 60% 이상 보이기 시작할 때 콜백 함수를 호출한다.

2. `observe`, `unobserve`를 통해 요소를 감지·관찰하거나 감지·관찰하던 요소를 더이상 감지·관찰하지 않는다.

```js
io.observe(감지·관찰할 요소);
io.unobserve(감지·관찰을 해지할 요소);
```
