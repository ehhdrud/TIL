# 셀렉터(Selector)

## 1. 기본 선택자

### 1.1. 유형 선택자(Type Selector)

태그에 대한 스타일 지정 방법으로, 해당 태그명을 가진 모든 요소에 적용된다.

CSS 파일 상단부에 작성하는 것이 권장된다.

### 1.2. 아이디 선택자(ID Selector)

HTML 전역 속성인 id를 이용한 스타일 지정 방법이다. 해당 id를 가진 모든 요소에 적용된다.

CSS에서 id는 `#`으로 표현한다.

### 1.3. 클래스 선택자(Class Selector)

HTML 전역 속성인 class를 이용한 스타일 지정 방법이다. 해당 class를 가진 모든 요소에 적용된다.

CSS에서 class는 `.`으로 표현한다.

### 1.4. 속성 선택자(Attribute Selector)

#### 1.4.1. `[attr]`, `[attr = value]`

해당 속성, 혹은 속성 값을 가진 모든 요소에 적용된다.

#### 1.4.2. `[attr^]`, `[attr$]`, `[attr*]`

- `[attr^=value]`: 해당 value로 시작하는 속성값을 가진 속성에 적용한다.
- `[attr$=value]`: 해당 value로 끝나는 속성값을 가진 속성에 적용한다.
- `[attr*=value]`: 해당 value를 포함하는 속성값을 가진 속성에 적용한다.

## 2. 가상 선택자(Pseudo Selector)

### 2.1. 가상 클래스 선택자

`:`를 이용해 아래 조건을 붙여서 특정 조건의 요소에 적용한다.

#### 2.1.1. `first-child`, `last-child`, `nth-child()`

`first-child`: 첫 번째 *자식*에 적용한다.

`last-child`: 마지막 *자식*에 적용한다.

`nth-child()`: 특정 *자식*에 적용한다. 자연수를 넣을 수도 있고, 홀수는 '2n-1', 'odd'등, 짝수는 '2n', 'even'등을 입력할 수 있다.

> **📌주의사항**
>
> '자식'의 기준은 부모 태그이므로, 만약 `first-child`를 사용할 때 선택자가 부모 태그의 첫 번째 자식을 포함하고 있지 않다면 스타일링이 적용되지 않는다.  
> 아래 `first-of-type`, `last-of-type`, `nth-of-type`을 사용하면 위 문제를 해결할 수 있다. 에러를 줄이기 위해서 더 권장되는 방식이다.
>
> ```html
> <section>
>   <div class="movie">Toy Story</div>
>   <p class="movie">Zootopia</p>
>   <p class="movie">Inside Out</p>
>   <div class="movie">Coco</div>
>   <span class="movie">Finding Nemo</span>
> </section>
> ```
>
> ```css
> p: first-child {
>   color: red;
> }
> /* p태그는 section의 첫번째 자식을 포함하고 있지 않기 때문에 스타일링이 적용되지 않는다. */
> ```

#### 2.1.2. `first-of-type`, `last-of-type`, `nth-of-type`

`first-of-type`: 첫 번째 타입에 적용한다.

`last-of-type`: 마지막 타입에 적용한다.

`nth-of-type()`: 특정 타입에 적용한다. 자연수를 넣을 수도 있고, 홀수는 '2n-1', 'odd'등, 짝수는 '2n', 'even'등을 입력할 수 있다.

> **📌주의사항**
>
> 형제 태그 중 여러 태그가 섞여있을 경우, `first-of-type`을 사용한다면 각각의 태그 모두의 첫번째 요소에 스타일링이 적용될 수 있다.
> 위 `first-child`, `last-child`, `nth-child()`을 사용하면 위 문제를 해결할 수 있다.
>
> ```html
> <section>
>   <div class="movie">Toy Story</div>
>   <p class="movie">Zootopia</p>
>   <p class="movie">Inside Out</p>
>   <div class="movie">Coco</div>
>   <span class="movie">Finding Nemo</span>
> </section>
> ```
>
> ```css
> .movie:first-of-type {
>   color: blue;
> }
> /* Toy Story, Zootopia, Finding Nemo 모두 스타일링이 적용되어 버린다. */
> ```

#### 2.1.3. `not`

#### 2.1.4. `link`, `visited`

#### 2.1.5. `hover`, `active`, `focus`

#### 2.1.6. `enabled`, `disabled`, `checked`

### 가상 요소 선택자

## 선택자 결합

## 형제 선택자

## 범용 선택자

## 상속 제어하기
