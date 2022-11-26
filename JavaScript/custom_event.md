# `new CustomEvent()`

`new CustomEvent()`를 통해 자바스크립트가 기본적으로 제공하지 않는 커스텀 이벤트를 생성할 수 있다.

`new CustomEvent([eventName], ([options]))` 문법을 가진다.

`[options]` 항목에서 `detail` 속성을 통해 세부 속성값을 전달할 수 있다. 복수의 속성값을 전달하려면 속성값들을 객체 형식으로 detail 속성에 할당한다.

> **📌예시**
>
> > **✨단일 속성값 넣기**
> >
> > ```js
> > let custom_event = new CustomEvent("myEventName", {
> >   detail: "Workout Name: Squat",
> > });
> > ```
>
> > **✨복수 속성값 넣기**
> >
> > ```js
> > let custom_event = new CustomEvent("myEventName", {
> >   detail: {
> >     workoutName: "Squat",
> >     sets: 3,
> >     reps: 12,
> >   },
> > });
> > ```

# `dispatchEvent()`

커스텀 이벤트를 발생시키는 메서드이다.

실제로 이벤트를 발생시키는 요소에서 `dispatchEvent()`를 호출한다.

> **📌예시**
>
> ```js
> Element.dispatchEvent(custom_event);
> ```

<br>

## 👉`new CustomEvent()`를 통한 커스텀 이벤트 정의, `dispatchEvent()`를 통해 커스텀 이벤트 호출을 완료하면 `addEventLisener()`를 통해 "myEventName"이라는 이벤트 타입을 사용할 수 있다. 이 때, detail값을 가져올 때는 `e`를 매개변수로 사용하여 `e.detail` 형태로 가져온다.
