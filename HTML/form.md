# `<form>`

정보를 제출하기 위한 대화형 컨트롤을 포함하는 문서를 나타낸다.

## 1. 속성

### 1.1. `action`속성

정보를 전송·처리할 목적지를 정의한다.

### 1.2. `method`속성

양식을 제출할 때 사용할 HTTP 메서드를 정의한다.

- `post`메서드: 양식 데이터를 숨겨서 서버에 요청한다. 즉 양식 데이터가 노출되지 않으므로, 보안과 관련된 정보들을 처리할 때 주로 사용한다.
- `get`메서드: 양식 데이터를 *URL의 ?구분자 뒤*에 이어 붙여서 전송한다. 즉 양식 데이터가 URL에 노출되므로, 보안과 관련없는 정보들을 처리할 때 주로 사용한다.

## 2. `<label>`

사용자에게 기입할 항목의 설명을 나타낸다.  
`for`속성에 `<label>`의 형제 요소인 `<input>`의 `id`값을 넣어야한다. 한편 `<label>`의 자식 요소로 `<input>`을 넣어준다면 `for`,`id`를 사용하지 않고 동일한 결과를 얻을 수 있다.  
`<label>`의`for`값과 `<input>`의 `id`값만 일치하면 `<label>`과 `<input>`의 순서는 상관이 없다.
`<label>`,`<input>`을 블록 요소로 바꾸려면 `<div>`로 감싸준다.

```html
<form action="" method="get">
  <div>
    <label for="foodID">음식:</label>
    <input type="text" name="food" id="foodID" />
  </div>

  <div>
    <label
      >색깔:
      <input type="text" name="color" />
    </label>
  </div>
  <button type="summit">제출</button>
</form>
<!-- 실제 코드 작성 시에는 <label>과 <input>의 양식을 통일해주는 것이 좋다. -->
```

**※ `name`과 `id`**  
`name`값은 같은 `<form>`내에서 중복되면 안되지만, 다른 `<form>`이라면 한 문서에서 중복 가능하다.  
`id`의 값은 한 문서에서 중복되면 안된다.

## 3. `<fieldset>`, `<legend>`

`<fieldset>`으로 감싸서 웹 양식의 하나 이상의 컨트롤을 묶는다.  
`<filedset>`의 첫 번째 자식 요소인 `<legend>`를 통해 묶은 컨텐츠에 설명을 붙일 수 있다.  
`<input>`의 속성으로 `disabled`를 넣어 입력 컨트롤을 막을 수 있는데, 이 `disabled`를 `<fieldset>`의 속성으로 넣어 해당 fieldset의 모든 자손 입력창을 막을 수 있다.  
`<fieldset>`도 블록 요소이므로 하나의 컨트롤을 `<div>`와 중복으로 사용할 필요는 없다.

```html
<form action="" method="get">
  <fieldset>
    <legend>범례1</legend>
    <div>
      <label for="foodID">음식:</label>
      <input type="text" name="food" id="foodID" />
    </div>
    <div>
      <label for="colorID">색깔:</label>
      <input type="text" name="color" id="colorID" />
    </div>
  </fieldset>

  <fieldset>
    <legend>범례2</legend>
    <div>
      <label for="foodID">음식:</label>
      <input type="text" name="food" id="foodID" />
    </div>
    <div>
      <label for="colorID">색깔:</label>
      <input type="text" name="color" id="colorID" />
    </div>
  </fieldset>
  <button type="summit">제출</button>
</form>
```

## 4. `<input>`

### 4.1. `type`

#### 4.1.1. `type="text"`

한 줄의 문자열을 입력받는다.  
`minlength`와 `maxlength`를 통해 입력받을 문자열의 길이를 조작할 수 있다.

#### 4.1.2. `type="password"`

마스킹 처리된 한 줄의 문자열을 입력받는다.  
`minlength`와 `maxlength`를 통해 입력받을 문자열의 길이를 조작할 수 있다.

#### 4.1.3. `type="email"`

'@'를 포함한 이메일 주소를 입력받는다.  
모바일 브라우저에서 자동으로 영문 키보드를 보여준다.

#### 4.1.4. `type="tel"`

전화번호를 입력받는다.  
모바일 브라우저에서 자동으로 숫자 키보드를 보여준다.  
입력값이 전화번호 양식에 맞지 않아도 저장되는 단점이 있다.

#### 4.1.5. `type="number"`

숫자를 입력받는다. 숫자를 컨트롤하기 위한 스피너도 제공한다.

#### 4.1.6. `type="range"`

값이 가려진 숫자를 범위 위젯으로 입력받는다.

#### 4.1.7. `type="date"`, `type="month"`, `type="week"`, `type="time"`

시간과 관련된 정보를 입력받는다.  
브라우저가 지원하는 경우 달력이나 시계 등을 제공한다.

- `type="date"`: 연,월,일을 지정할 수 있는 컨트롤을 제공한다.
- `type="month"`: 연과 월을 지정할 수 있는 컨트롤을 제공한다.
- `type="week"`: 주를 지정할 수 있는 컨트롤을 제공한다.
- `type="time"`: 시간을 지정할 수 있는 컨트롤을 제공한다.

#### 4.1.8. `type="submit"`

"제출"버튼을 생성한다. 누르면 값을 제출한다.
`value`속성을 통해 버튼위의 문자열을 변경할 수 있다.

#### 4.1.9. `type="reset"`

"초기화"버튼을 생성한다. 누르면 폼 내부에 있는 모든 데이터를 초기화한다.
`value`속성을 통해 버튼위의 문자열을 변경할 수 있다.

#### 4.1.10. `type="butten"`

버튼을 생성한다. 눌러도 아무런 동작을 하지 않는다. 자바스크립트 등으로 추가 기능을 넣을 수 있다.  
`value`속성을 통해 버튼위의 문자열 만들 수 있다.

#### 4.1.11. `type="checkbox"`

`name`값을 다르게 하여 중복 선택이 가능한 체크박스를 생성한다.  
체크를 하면 체크박스의 `name`이 "on"으로 전송된다.
`checked`속성을 넣으면 해당 체크박스는 체크가 된 상태로 생성된다.

#### 4.1.12. `type="radio"`

`name`값을 동일하게 하여 중복 선택이 불가능한 라디오 버튼을 생성한다.
어떤 라디오 버튼이 "on"인지 확인하기 위해서는 서로 다른 `value`속성을 기입한다.
`checked`속성을 넣으면 해당 라디오 박스는 체크가 된 상태로 생성된다.

### 4.2. 모든 타입에 적용 가능한 속성

#### 4.2.1. `name`
