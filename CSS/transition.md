# 트렌지션(Transition)

사용자가 특정 행위를 할 때 일어나는 요소의 두 가지 상태 사이에 변화를 줄 수 있다.

`transform`과 함께 활용하면 다양한 효과를 다이나믹하게 구현할 수 있다.

## 1. `transition-property` 속성

트렌지션 효과를 줄 속성을 지정한다.

`,`를 통해 여러 속성을 나열할 수 있다.

`all` 키워드를 사용하면 모든 속성을 지정할 수 있다.

## 2. `transition-duration` 속성

트렌지션 시작 후 트렌지션 효과가 완료될 때까지 걸리는 시간을 `time` 자료형을 통해 설정한다.

## 3. `transition-delay` 속성

속성이 트렌지션 요청을 받은 후 실제로 트렌지션하기까지의 시간을 `time` 자료형을 사용해 설정한다.

여러 요소를 차례대로 트렌지션하도록 할 때 유용하게 사용된다.

## 4. `transition-timing-function` 속성

트렌지션 과정을 조작한다.

`ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear` 등의 키워드를 사용할 수 있다.

> 📌transition 관련 속성 사용법
>
> HTML 파일
>
> > ```html
> > <div class="box">Hover Me!😊</div>
> > ```
>
> CSS 파일
>
> > ```css
> > .box {
> >   width: 300px;
> >   height: 80px;
> >   border: 2px dashed teal;
> >   background-color: darkslategray;
> >   font-size: 50px;
> >   color: white;
> >
> >   transition-property: all;
> >   transition-duration: 3s;
> >   transition-delay: 1s;
> >   transition-timing-function: ease-in-out;
> > }
> >
> > .box:hover {
> >   background-color: indianred;
> >   /* trasition관련 속성을 이쪽에 입력한다면 마우스를 올릴 때만 transition 발생 */
> > }
> > ```

## 5. `trasition` 단축 속성

`transition-property`, `transition-duration`, `transition-delay`, `transition-timing-function` 의 단축 속성이다.

하나의 시간값을 입력한다면 `transition-duration`으로 적용된다. 두 개의 시간값을 입력했을 때는 앞 쪽에 있는 시간이 `transition-duration`, 뒤 쪽에 있는 시간이 `transition-delay`로 적용된다. 나머지 속성의 순서는 상관없고 `spacing`을 통해 구분한다.

> 📌`transition` 단축 속성 사용법
>
> HTML 파일
>
> > ```html
> > <div class="box">Hover Me!😊</div>
> > ```
>
> CSS 파일
>
> > ```css
> > .box {
> >   width: 300px;
> >   height: 80px;
> >   border: 2px dashed teal;
> >   background-color: darkslategray;
> >   font-size: 50px;
> >   color: white;
> >
> >   transition: all 3s ease-in-out 1s;
> > }
> >
> > .box:hover {
> >   background-color: indianred;
> >   /* trasition관련 속성을 이쪽에 입력한다면 마우스를 올릴 때만 transition 발생 */
> > }
> > ```
