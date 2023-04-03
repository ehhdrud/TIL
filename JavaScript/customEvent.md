# 커스텀 이벤트 (Custom Event)

## 📌 1. `new CustomEvent()`

`new CustomEvent()`를 통해 자바스크립트가 기본적으로 제공하지 않는 이벤트가 아닌, **원하는 때**에 이벤트를 발생시킬 수 있는 커스텀 이벤트를 생성할 수 있다.

`detail` 속성은 해당 이벤트 객체에 속성을 전달할 수 있는 영역이다. 복수의 속성을 전달하려면 복수의 속성을 가진 객체를 `detail` 속성에 할당한다.

`new CustomEvent([eventName], ([detail]))` 형태로 작성한다.

`CustomEvent()` 생성자 함수는 `Event()` 생성자 함수를 상속받기 때문에, `new Event()`라고 작성해도 커스텀 이벤트를 생성할 수 있지만, `detail` 속성을 사용할 수는 없다.

> **단일 속성값 넣기**
>
> > ```js
> > let custom_event = new CustomEvent("myEventName", {
> >   detail: "Workout Name: Squat",
> > });
> > ```
>
> **복수 속성값 넣기**
>
> > ```js
> > let custom_event = new CustomEvent("myEventName", {
> >   detail: {
> >     workoutName: "Squat",
> >     sets: 3,
> >     reps: 12,
> >   },
> > });
> > ```

## 2. `dispatchEvent()`

커스텀 이벤트를 발생시키는 메서드이다.

실제로 이벤트를 발생시키는 요소에서 `dispatchEvent()`를 호출한다.

> ```js
> Element.dispatchEvent(custom_event);
> ```

## 3. detail 값 가져오기

`new CustomEvent()`를 통한 커스텀 이벤트 정의와 `dispatchEvent()`를 통해 커스텀 이벤트 호출을 완료하면 `addEventLisener()`의 이벤트 타입으로 해당 커스텀 이벤트를 사용할 수 있다. 이 때, detail의 속성,속성값을 가져올 때는 `e` 혹은 `event`를 매개변수로 사용하여 `e.detail` 혹은 `event.detail` 형태로 가져온다.
