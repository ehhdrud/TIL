# 1. DOM(Document Object Model)

HTML은 문서이므로 자바스크립트로 조작이 불가능하다. 이를 가능하도록 하기 위해 DOM을 통해 HTML을 자바스크립트의 객체로 모델링하여 조작한다.

DOM은 Node로 이루어져 있고 이 Node는 Tree 형태로 구성되어 있다. Node는 수많은 Property와 Method를 가지고 있다.

## 1.1. DOM의 객체

### 1.1.1. Node

Node 객체는 DOM 객체 가운데 가장 최상위 객체이자 모든 하위 노드 객체들이 상속받는 객체이다.

### 1.1.2. Element

주석 및 텍스트 Node 를 제외한 Node이다.

### 1.1.3. HTMLElement

HTML 문서에만 존재하는 Node이다.

### 1.1.4. Document

Node 객체의 하위 객체로써 HTML 문서 및 XML 문서의 루트 객체이다.

### 1.1.5. HTMLDocument

HTML 문서 전용 Document 객체입니다.

## 1.2. JS에서 특정 HTML Element를 가져오는 방법

### 1.2.1. `document.querySelector("")`

**처음으로 마주친 유효한 식별자를 한 개**를 반환한다. 즉 자바스크립트로 가져온다.

tag name(""), id("#"), class name(".")을 모두 활용하여 가져올 수 있다.

```js
const li = document.querySelector("li");
/**
 * 뽑아왔을 때 내부구조:
 * const li = {
 * accessKey: ""
 * ariaAtomic: null
 * ariaAutoComplete: null
 * ariaBusy: null
 * ariaChecked: null
 * ariaColCount: null
 * ariaColIndex: null
 * ...Some Code...
 *
```

```js
//활용법
const nav = document.querySelector("#nav-access"); //id: nav-access인 것들만 뽑아내서 자바스크립트 nav 변수에 할당
nav.querySelector("li"); //문서 전체에서 찾지 않고 nav 변수에 할당한 #nav-access 중에서 li 태그를 찾음
```

### 1.2.2. `document.querySelectorAll("")`

**유효한 식별자 모두**를 _Nodelist_ 형태로 반환한다. 즉 자바스크립트로 가져온다.

tag name(""), id("#"), class name(".")을 모두 활용하여 가져올 수 있다.

> **📌현재는 안쓰이는 문법들**
>
> ❌`document.getElementById('id')`: id를 통해 _HTMLElement_ 형태로 반환한다.  
> ❌`document.getElementsByClassName('class name')`: class name을 통해 _HTMLCollection_ 형태로 반환한다.  
> ❌`document.getElementsByTagName('tag name')`: tag name을 통해 _HTMLCollection_ 형태로 반환한다.
>
> 👉실행결과가 하나인 경우는 HTMLElement를, 복수인 경우는 HTMLCollection을 리턴!

> **📌HTMLCollection과 NodeList의 공통점**
>
> 이터러블 특성을 가진 **유사 배열 객체**로, Property와 Method를 가지고 있다.  
> 유사 배열 객체는 배열이 아니므로 배열 메서드를 사용하려면 배열로 바꿔줘야 한다.

## 1.3. DOM 조작

### 1.3.1. `document.createElement("")`

지정한 태그명의 HTML 요소를 만들어 반환한다.

### 1.3.2. `document.createTextNode("")`

텍스트 노드를 만들어 반환한다.

### 1.3.3. `Node.appendChild()`

괄호에 입력한 노드를 마지막 자식으로 추가한다.

만약 주어진 노드가 이미 문서에 존재한다면, 해당 위치에서 새로운 위치로 이동시킨다.

### 1.3.4. `Node.removeChild()`

지정한 자식 노드를 제거하고 제거된 노드를 반환한다.

여전히 메모리는 존재하지만 더이상 DOM의 일부가 아니다.

### 1.3.5. `Element.setAttribute("","")`

요소의 속성값을 설정한다. 첫 번째 요소에는 "속성"을 두 번째 요소에는 "속성값"을 기입한다.

### 1.3.6. `Element.getAttribute("")`

요소의 속성값을 반환한다.

### 1.3.7. `Element.classList`

Element의 클래스 목록을 _DOMTokenList_ 형태로 반환하는 읽기 전용 프로퍼티이다.

#### 1.3.7.1. `Element.classList.add(String, ···)`

지정한 클래스 값을 추가한다. 만약 추가하려는 클래스가 엘리먼트의 class 속성에 이미 존재한다면 무시한다.

#### 1.3.7.2. `Element.classList.remove(String, ···)`

지정한 클래스 값을 제거한다.

#### 1.3.7.3. `Element.classList.item(Number)`

콜렉션의 인덱스를 이용하여 클래스 값을 반환한다.

#### 1.3.7.4. `Element.classList.toggle(String, (String))`

클래스 값을 토글링한다.

하나의 인수만 있을 때, 해당 인수의 클래스가 존재한다면 제거하고 false를 반환하고, 존재하지 않으면 추가하고 true를 반환한다.

두 개의 인수가 있을 때, 두 번째 인수가 true면 지정한 클래스 값을 추가하고, false면 제거한다.

#### 1.3.7.5 `Element.classList.contains(String)`

지정한 클래스 값이 엘리먼트의 class 속성에 존재하는지 확인한다.

#### 1.3.7.6. `Element.classList.replace(oldClass, newClass)`

존재하는 클래스를 새로운 클래스로 교체한다.

> 📌DOM 조작 예시
>
> > **✨예시 1**
> >
> > ```js
> > const searchButten = document.querySelector(".gNO89b");
> > searchButten.classList.add("seo-dong-kyeong"); //class: gNO89b seo-dong-kyeong
> > searchButten.classList.remove("gNO89b"); //class: seo-dong-kyeong
> > searchButten.classList.contains("seo-dong-kyeong"); //true
> > ```
>
> > **✨예시 2**
> >
> > ```js
> > const linkDirect = document.querySelector(".link_direct");
> > linkDirect.textContent; //'연예'
> > linkDirect.textContent = "seodongkyeong"; //'연예'가 'seodongkyeong'으로 변경된다.
> > ```
>
> > **✨예시 3**
> >
> > ```js
> > const partnerBox = document.querySelector(".partner_box");
> > const ele = document.querySelector(".link_partner");
> > partnerBox.removeChild(ele); //'크리에이터'가 삭제된다.
> >
> > const ele2 = document.querySelector("div"); //div 태그를 생성한다.
> > ele2.textContent = "seo-dong-kyeong";
> > partnerBox.appendChild(ele2); //끝쪽에 'seodongkyeong'이 추가된다.
> >
> > partnerBox.innerHTML = `<h3 class="title">SEO-DONG-KYEONG</h3>`; //DOM을 생성하는 과정없이 innerHTML을 통해 타이틀을 'SEO-DONG-KYEONG'으로 변경한다.
> > ```

# 2. 이벤트(Event)

이벤트란 웹페이지에서 발생하는 키보드 입력, 마우스 입력 등의 사용자의 동작을 의미한다.

DOM의 Node는 이벤트의 정보를 담는 **이벤트 객체**를 가지고 있고, 이벤트 객체에는 Property와 Method가 담겨있다.

**이벤트 핸들러**란 이벤트가 발생했을 때 실행되는 함수를 지칭한다. 이벤트 핸들러에 전달되는 매개변수는 이벤트 객체(`event` 혹은 `e`)뿐이다.

```js
const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", function () {
  alert("안녕하세요");
}); //"click"이라는 이벤트 타입이 감지되면 함수(이벤트 핸들러)를 실행한다.

resetButton.addEventListener("click", function (event) {
  console.dir(event);
}); //"click"할 때마다 이벤트 객체 목록을 보여주는 이벤트 핸들러를 실행한다.
```

## 2.1. `addEventListener`

`addEventListener("[eventType]", [eventHandler])`메서드는 지정한 유형의 이벤트를 대상이 수신할 때마다 호출할 함수를 설정합니다.

이벤트 유형은 [이벤트 참조 - MDN](https://developer.mozilla.org/ko/docs/Web/Events) 참고!

## 2.2. 이벤트 전파

어떤 element에서 발생한 이벤트는 부모 혹은 자식에게 전파된다.

전파 방향에 따라 버블링(Bubbling), 캡처링(Capturing)이라고 불린다.

이벤트 전파를 막고자 한다면 해당 이벤트에 `event.stopPropagation()`을 사용한다.

### 2.2.1. 이벤트 버블링(Bubbling)

브라우저의 기본적인 특성으로, 이벤트가 발생한 element부터 *상위*로 전파(전달)되는 현상이다.

### 2.2.2. 이벤트 캡처링(Capturing)

이벤트가 발생한 element부터 *하위*로 전파(탐색)되는 현상이다.

두 가지 방법으로 이벤트 캡처링을 발생시킬 수 있다.

- `addEventListener()` 메서드의 세 번째 인자에 `true`를 넣는다.
- 해당 메서드의 객체에 `capture: true`를 넣는다 버블링이 아닌 캡처링이 일어난다.

### 2.2.3. 이벤트 위임(Delegation)

각 요소마다 이벤트 리스너를 추가한다면 메모리 측면에서 효율이 떨어지므로, 하위 요소마다 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트를 제어하는 방식이다.

이벤트 버블링 효과를 이용하여 상위 요소에 이벤트 리스너를 달아서 하위에서 발생한 이벤트를 감지한다.

#### 2.1.3.1 이벤트 위임 예제

> **📌페이지 구성**
>
> > **HTML**: 리스트 1,2를 갖는 `<ul>`
> >
> > ```html
> > <ul>
> >   Workout Log
> >   <li>
> >     <input type="checkbox" id="item1" />
> >     <label for="item1">Push Day</label>
> >   </li>
> >   <li>
> >     <input type="checkbox" id="item2" />
> >     <label for="item2">Pull Day</label>
> >   </li>
> > </ul>
> > ```
>
> > **JavaScript**: 리스트 3 추가
> >
> > ```js
> > var itemList = document.querySelector("ul");
> >
> > var li = document.createElement("li");
> > var input = document.createElement("input");
> > var label = document.createElement("label");
> > var labelText = document.createTextNode(" Leg Day");
> >
> > input.setAttribute("type", "checkbox");
> > input.setAttribute("id", "item3");
> > label.setAttribute("for", "item3");
> > label.appendChild(labelText);
> > li.appendChild(input);
> > li.appendChild(label);
> > itemList.appendChild(li);
> > ```

> **📌이벤트 위임을 사용하지 않았을 때**
>
> **js**
>
> ```js
> var inputs = document.querySelectorAll("input");
> inputs.forEach(function (input) {
>   input.addEventListener("click", function (event) {
>     alert("이벤트 위임 X");
>   });
> });
> ```
>
> 👉리스트 3에는 `alert`가 동작하지 않는다...

> **📌이벤트 위임을 사용했을 때**
>
> **js**
>
> ```js
> var itemList = document.querySelector("ul");
> itemList.addEventListener("click", function () {
>   alert("이벤트 위임 O");
> });
> ```
>
> 👉리스트 3에도 `alert` 동작!

## 2.3. 이벤트 조작

클로저 개념을 활용하여 이벤트를 조작할 수 있다.

### 2.3.1. debounce(지연)

이벤트를 그룹화하여 특정 시간이 지난 후, 마지막 이벤트만 발생하도록 하는 기술이다.

매개변수는 *실행시킬 함수*와 *지연시킬 밀리세컨드*이다.

이벤트가 실행되었을 때 일정 시간을 기다렸다가 이벤트를 수행하도록 만들고, 일정 시간 내에 같은 이벤트가 또 들어오면 이전 요청을 취소하는 방식으로 구현한다.

### 2.3.2. throttle(차단)

일정 시간동안 일어난 이벤트를 차단하고 단 한 번만 실행하는 기술이다.

매개변수는 *실행시킬 함수*와 *차단시킬 밀리세컨드*이다.

타이머가 없을 경우 타이머를 설정하고, 타이머가 있을 경우 아무런 동작도 하지 않도록 하여 일정 시간 이후에 이벤트가 1번 실행되도록 구현한다.
