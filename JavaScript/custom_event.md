# `CustomEvent()`

`CustomEvent()`를 통해 자바스크립트가 기본적으로 제공하지 않는 커스텀 이벤트를 생성할 수 있다.

`new CustomEvent([eventName], ([options]))` 문법을 가진다.

`[options]` 항목에서 `detail` 속성을 통해 세부 속성값을 전달할 수 있다. 복수의 속성값을 전달하려면 속성값들을 객체 형식으로 detail 속성에 할당한다.

> 📌예시
>
> > ```js
> > let custom_event = new CustomEvent("myEventName", {
> >   detail: workout,
> > });
> > ```
>
> > ```js
> > let custom_event = new CustomEvent("myEventName",
> >   {
> > detail: {
> >       workoutName: "Squat",
> >       sets: 3,
> >       reps: 12
> >     }
> > ```

# `dispatchEvent()`

커스텀 이벤트를 발생시키는 메서드이다.

실제로 이벤트를 발생시키는 요소에서 `dispatchEvent()`를 호출한다.

> 📌예시
>
> ```js
> Element.dispatchEvent(custom_event);
> ```
