# 애니메이션(Animation)

다수의 스타일을 트렌지션하는 애니메이션을 적용한다.

## 1. `@keyframss`

애니메이션 중간중간의 특정 지점들을 거칠 수 있는 키프레임들을 설정함으로써 CSS 애니메이션 과정의 중간 절차를 제어한다.

두 가지 과정만이 존재한다면 `from`, `to`를 사용하여 0%에서 100%까지 정의할 수 있고, 세 가지 이상의 과정이 존재한다면 `%`를 사용해 각 과정을 정의한다.

## 2. `animation-name` 속성

사용할 키프레임을 지정한다.

## 3. `animation-duration` 속성

애니메이션 시작 후 애니메이션 한 사이클이 완료될 때까지 걸리는 시간을 `time` 자료형을 통해 설정한다.

## 4. `animation-delay`속성

애니메이션이 시작할 시점을 `time` 자료형을 통해 설정한다. 음수 값을 넣으면 애니메이션이 일부 진행한 시점부터 시작하게 할 수 있다.

## 5. `animation-timing-function` 속성

애니메이션 과정을 조작한다.

`ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear` 등의 키워드를 사용할 수 있다.

## 6. `animation-iteration-count` 속성

애니메이션의 반복 횟수를 `number` 자료형 또는 `infinite` 키워드를 통해 조작한다.

## 7. `animation-direction` 속성

애니메이션이 앞으로, 뒤로, 또는 앞뒤로 번갈아 재생되도록 할 수 있다.

## 7.1. `animation-direction` 속성의 키워드

- `normal`: 정방향으로 재생된다.
- `reverse`: 역방향으로 재생된다.
- `alternate`: 매 사이클마다 각 주기의 방향을 뒤집는다.
- `alternate-reverse`: 매 사이클마다 각 주기의 방향을 뒤집으며, 첫 번째 사이클은 역방향으로 진행된다.

# 8. `animation-play-state` 속성

애니메이션이 재생될 것인지 중지될 것인지 설정한다. `running` 키워드를 사용 시 재생되고, `paused` 키워드를 사용 시 중지된다.

# 9. `animation-fill-mode` 속성

애니메이션 실행 전과 후에 대상에 스타일을 적용하는 방법을 설정한다.

## 9.1. `animation-fill-mode` 속성의 키워드

- `none`: 기본값으로, 애니메이션이 실행되지 않을 때 대상에 스타일을 적용하지 않고 기존 스타일을 유지한다.
- `forwards`: 실행된 애니메이션의 마지막 키프레임을 유지한다. 마지막 키프레임은 `animation-direction` 및 `animation-iteration-count`의 값에 따라 달라진다.
- `backwards`: 애니메이션은 대상에 적용되는 즉시 첫 번째 키프레임에 정의된 값을 적용하고 `animation-delay`기간동안 이 값을 유지한다. 첫 번째 키프레임은 `animation-direction`의 값에 따라 달라진다.
- `both`: `forwards`와 `backwards`가 모두 적용된다.

## 10. `animation` 속성

`animation-name`, `animation-duration`, `animation-delay`, `animation-timing-function`, `animation-iteration-count`, `animation-direction`, `animation-play-state`, `animation-fill-mode`의 단축 속성이다.

하나의 시간값을 입력한다면 `animation-duration`으로 적용된다. 두 개의 시간값을 입력했을 때는 앞 쪽에 있는 시간이 `animation-duration`, 뒤 쪽에 있는 시간이 `animation-delay`로 적용된다. 나머지 속성의 순서는 상관없고 `spacing`을 통해 구분한다.

> **📌 애니메이션 사용법**
>
> > 👉HTML 파일
> >
> > ```html
> > <div class="box">😊</div>
> > ```
>
> > 👉CSS 파일
> >
> > ```css
> > .box {
> >   width: 100px;
> >   height: 100px;
> >   border: 10px solid seagreen;
> >   background-color: rgb(204, 253, 225);
> >   border-radius: 30px;
> >
> >   animation: my-first-animation 2s infinite alternate;
> > }
> >
> > @keyframes my-first-animation {
> >   from {
> >     width: 100px;
> >   }
> >   to {
> >     width: 300px;
> >   }
> >   /* from, to 대신 n%를 활용하여 0%와 100%의 단계를 구분하여 작성할 수도 있다. */
> > }
> > ```
