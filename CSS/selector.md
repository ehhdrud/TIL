# 선택자(Selector)

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

실제로 존재하지 않는 상태에 따라서 그 상태에 이름을 붙여서 스타일을 적용한다.

`:`를 이용해 아래 조건을 붙여서 특정 조건의 요소에 적용한다.

#### 2.1.1. `:first-child`, `:last-child`, `:nth-child()`

- `first-child`: 첫 번째 *자식*에 적용한다.
- `last-child`: 마지막 *자식*에 적용한다.
- `nth-child()`: 특정 *자식*에 적용한다. 자연수를 넣을 수도 있고, 홀수는 '2n-1', 'odd'등, 짝수는 '2n', 'even'등을 입력할 수 있다.

> **📌주의사항**
>
> '자식'의 기준은 부모 태그이므로, 만약 `first-child`를 사용할 때 선택자가 부모 태그의 첫 번째 자식을 포함하고 있지 않다면 스타일이 적용되지 않는다.  
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
> /* p태그는 section의 첫번째 자식을 포함하고 있지 않기 때문에 스타일이 적용되지 않는다. */
> ```

#### 2.1.2. `:first-of-type`, `:last-of-type`, `:nth-of-type`

- `first-of-type`: 첫 번째 *타입*에 적용한다.
- `last-of-type`: 마지막 *타입*에 적용한다.
- `nth-of-type()`: 특정 *타입*에 적용한다. 자연수를 넣을 수도 있고, 홀수는 '2n-1', 'odd'등, 짝수는 '2n', 'even'등을 입력할 수 있다.

> **📌주의사항**
>
> 형제 태그 중 여러 태그가 섞여있을 경우, `first-of-type`을 사용한다면 각각의 태그 모두의 첫번째 요소에 스타일이 적용될 수 있다.  
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
> /* Toy Story, Zootopia, Finding Nemo 모두 스타일이 적용되어 버린다. */
> ```

#### 2.1.3. `:not()`

선택자를 넣어 특정 요소를 제외하고 스타일을 적용한다.

속성을 기준으로 제외하고 싶을 때는 `[attr]`,`[attr = value]`형식으로 넣어준다.

#### 2.1.4. 동적 가상 클래스

##### 2.1.4.1. `:link`, `:visited`

- `link`: 아직 방문하지 않은 요소에 스타일을 적용한다.
- `visited`: 방문한 요소에 스타일을 적용한다.

##### 2.1.4.2. `:hover`, `:active`, `:focus`

- `hover`: 마우스를 올렸을 때 상호작용 중인 요소에 스타일을 적용한다.
- `active`: 마우스를 눌렀을 때 상호작용 중인 요소에 스타일을 적용한다.
- `focus`: 포커싱이 됐을 때 상호작용 중인 요소에 스타일을 적용한다.

##### 2.1.4.3. `:enabled`, `:disabled`, `:checked`

- `enabled`: 활성화되어 있는 요소에 스타일을 적용한다.
- `disabled`: 활성화되지 않은(`disabled`속성이 포함된) 요소에 스타일을 적용한다.
- `checked`: 체크된(`checked`속성이 포함되거나 사용자가 체크한) 요소에 스타일을 적용한다.

### 2.2. 가상 요소 선택자

실제로 존재하지 않는 요소를 만들어서 스타일을 적용한다.

`::`를 이용해 아래 조건을 붙여서 특정 조건의 요소에 적용한다.

가상 요소는 HTML이 아닌 CSS로 만들어낸, 꾸밈을 위한 요소이기 때문에 브라우저에서 선택(드래그, 복사 등)되지 않는다.

#### 2.2.1. `::before`, `::after`

선언 블록에 `content`속성을 사용한다.

- `before`: `content`속성에 정의된 문자열을 *앞*에 추가하여 스타일을 적용한다.
- `after`: `content`속성에 정의된 문자열을 *뒤*에 추가하여 스타일을 적용한다.

#### 2.2.2. `::first-letter`, `::first-line`, `::selection`

- `first-letter`: 첫 번째 글자에만 스타일을 적용한다. 만약 `before`와 같이 쓰인다면 `before`의 `content`속성에 정의된 문자열의 첫 번째 글자에 적용한다.
- `first-line`: 첫 번째 줄에만 스타일을 적용한다.
- `selection`: 선택영역(드래그 등)에만 스타일을 적용한다.

## 3. 선택자 결합

### 3.1. 그룹화

`,`를 이용해 둘 이상의 선택자를 그룹화할 수 있다.

### 3.2. 하위 선택자 결합

`spacing`을 이용해 둘 이상의 선택자를 결합하여 정의한다.

하위의 모든 선택자에 스타일을 적용한다. 자식의 자식 태그도 포함된다.

### 3.3. 자식 선택자 결합

`>`를 이용해 둘 이상의 선택자를 결합하여 정의한다.

하위의 모든 선택자가 아니라 바로 아래 자식 태그에만 스타일을 적용한다.

### 3.4. 형제 선택자 결합

아래쪽에 있는 선택자에 스타일이 적용되므로 첫번째 선택자는 두번째 선택자보다 위쪽에 위치해야 한다.

#### 3.4.1. 일반 형제 선택자 결합

`~`를 이용해 첫 번째 선택자와 형제 관계에 있는, 아래 쪽의 선택자에 스타일을 적용한다.

#### 3.4.2. 인접 형제 선택자 결합

`+`를 이용해 첫 번째 선택자와 형제 관계에 있는, 바로 아래 쪽에 인접한 선택자에 스타일을 적용한다.

<br>

> **📌범용 선택자(Universal Selector)**
>
> `*`를 이용해 모든 요소를 선택자로 사용할 수 있다.  
> 선택자 결합 시 유용하게 사용된다.

## 4. 상속을 제어하는 키워드

`all`속성과 사용하면 모든 속성을 제어할 수 있다

### 4.1. `initial` 키워드

부모로부터의 상속을 무시하고 초기 상태를 유지한다.

### 4.2. `inherit` 키워드

부모로부터의 상속값을 유지한다.

### 4.3. `unset` 키워드

부모로부터 상속받을 값이 있다면 `inherit`으로 동작하고, 부모로부터 상속받을 값이 없다면 `initial`로 동작한다.
