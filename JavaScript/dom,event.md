# 1. DOM(Document Object Model)

Document는 HTML 요소로, 자바스크립트로 조작이 불가능하다. 이를 가능하도록 하기 위해 **DOM**을 통해서 **원래는 조작이 불가능한 HTML을 자바스크립트의 객체로 모델링하여 조작**한다. 한편, 같은 목적으로 CSS를 자바스크립트로 조작하기 위한 모델을 CSSOM이라고 한다. DOM과 CSSOM이 합쳐져 렌더트리(Render Tree)를 구성하게 되고 이 렌더트리를 토대로 웹 페이지가 빌드된다.

DOM은 Node로 이루어져 있고, Node는 루트에서부터 여러 Node들이 가지를 치며 나오는 트리 형태로 구성되어 있다. 즉 `<html>` element부터 여러 element들이 뻗어나오며 최하단 Node에는 각 element의 content가 위치한다.

HTML 문서를 제어하기 위한 수많은 프로퍼티와 메서드를 제공한다.

## 1.1. DOM의 객체

DOM은 최상위 객체로 Node가 존재하고 그 하위에 많은 객체들이 존재한다. 대표적인 하위 객체로 Element, Document가 있다.
![](https://velog.velcdn.com/images/ehhdrud/post/3eb3ee32-d255-4a57-816b-90e1a7e4ab3e/image.PNG)

### 1.1.1. Node

Node는 DOM 객체 가운데 **최상위 객체**(**루트 객체**)이자 모든 하위 Node 객체들이 상속받는 객체이다. 태그는 물론 주석이나 단순 텍스트 등도 Node에 포함된다.

Node에 접근하는 기능, Node를 추가·삭제하는 기능, nodeType을 확인하는 기능 등을 하는 프로퍼티를 가진다.

> **💫접근 관련 주요 프로퍼티**
>
> - **`Node.NodeName`**  
>   : 현재 Node의 이름을 반환 또는 설정한다.
> - **`Node.NodeValue`**  
>   : 현재 Node의 값·콘텐츠를 반환 또는 설정한다.
> - **`Node.childNodes`**  
>   : 현재 요소의 자식 Node가 포함된 NodeList를 반환한다. 이 NodeList에는 element 뿐만 아니라 text, content Node를 포함한다.
> - **`Node.hasChildNodes()`**  
>   : 주어진 Node를 자식 Node로 가지고 있는지, 없는지에 대한 Boolian 값을 반환한다.
> - **`Node.firstChild`**  
>   : 첫번째 자식 Node를 읽어온다.
> - **`Node.lastChild`**  
>   : 마지막 자식 Node를 읽어온다.
> - **`Node.parentNode`**  
>   : 현재 Node의 부모 Node를 반환합니다.
> - **`Node.contains()`**  
>   : 주어진 인자가 Node의 자손인지, 아닌지에 대한 Boolean 값을 반환한다.
> - **`Node.textContent`**  
>   : `<script>`나 `<style>` 태그와 상관없이 해상 Node가 가지고 있는 텍스트 값을 그대로 읽어온다.

> **💫추가, 삭제 관련 주요 프로퍼티**
>
> - **`Node.appendChild()`**  
>   : 한 Node를 특정 부모 Node의 자식 Node 리스트 중 마지막 자식으로 붙인다.
> - **`Node.removeChild()`**  
>   : 자식 Node를 제거하고 제거된 Node를 반환한다.
> - **`Node.replaceChild(param1, param2)`**  
>   : 기존의 자식 Node(param1)를 새로운 Node(param2)로 대체한다

> **💫nodeType 관련 프로퍼티**
>
> - **`Node.nodeType`**  
>   : nodeType을 상수로 반환받는다.
>
> |     | nodeType                    | 예시                                             |
> | --- | --------------------------- | ------------------------------------------------ |
> | 1   | ELEMENT_Node                | `<body>`, `<div>`, `<p>`                         |
> | 3   | TEXT_Node                   | HTML 문서 내 텍스트로 줄바꿈, 공백 등을 포함한다 |
> | 7   | PROCESSING_INSTRUCTION_Node |                                                  |
> | 8   | COMENT_Node                 | <--! 주석! -->                                   |
> | 9   | DOCUMENT_Node               | document                                         |
> | 10  | DOCUMENT_TYPE_Node          | `<!DOCTYPE html>`                                |
> | 11  | DOCUMENT_FRAGMENT_Node      |                                                  |

### 1.1.2. Element

coment, text를 제외한 태그로 표현된 Node로, nodeType은 1이다. 하위 객체로 HTMLElemnt가 존재한다.

태그 이름을 확인하는 기능, 프로퍼티 제거 기능, 속성값을 구하고 설정하는 기능, 이벤트와 관련된 기능 등을 하는 프로퍼티를 갖고, Node의 프로퍼티를 상속한다.

> **💫주요 프로퍼티**
>
> - **`Element.classList`**  
>   : element의 클래스 목록을 DOMTokenList 형태로 반환하는 읽기 전용 프로퍼티이다.
>   - **`Element.classList.add()`**  
>     : 지정한 클래스 값을 추가한다. 만약 추가하려는 클래스가 엘리먼트의 class 속성에 이미 존재한다면 무시한다.
>   - **`Element.classList.remove()`**  
>     : 지정한 클래스 값을 제거한다.
>   - **`Element.classList.item()`**  
>     : 콜렉션의 인덱스를 이용하여 클래스 값을 반환한다.
>   - **`Element.classList.toggle()`**  
>     : 클래스 값을 토글링한다. 하나의 파라미터만 있을 때, 해당 파라미터의 클래스가 존재한다면 제거하고 false를 반환하고, 존재하지 않으면 추가하고 true를 반환한다. 두 개의 파라미터가 있을 때, 두 번째 파라미터가 true면 지정한 클래스 값을 추가하고, false면 제거한다.
>   - **`Element.classList.contains()`**  
>     : 지정한 클래스 값이 엘리먼트의 class 속성에 존재하는지 확인한다. 존재한다면 true, 존재하지 않는다면 false를 반환한다.
>   - **`Element.classList.replace(param1, param2)`**  
>     : 존재하는 클래스(param1)를 새로운 클래스(param2)로 교체한다.
> - **`Element.removeAttribute()`**  
>   : 프로퍼티를 제거한다
> - **`Element.getAttribute()`**  
>   : 프로퍼티의 속성값을 반환한다.
> - **`Element.setAttribute(param1, param2)`**  
>   : 프로퍼티(param1)의 속성값(param2)을 설정한다.
> - **`Element.replaceWith()`**  
>   : element를 다른 요소로 대체하고 DOM에서 제거한다.
> - **`Element.insertAdjacentElement(position, param)`**  
>   : 호출한 요소의 위치 키워드(posistion)에 따른 지정된 위치에 element(param)를 삽입한다.
> - **`Element.insertAdjacentHTML(position, param)`**  
>   : HTML 또는 XML 같은 특정 텍스트(param)를 파싱하고, 위치 키워드(posistion)에 따른 지정된 위치에 추가한다. 이미 사용중인 element는 다시 파싱하지 않으므로 element 안에 존재하는 element는 건드리지 않는다.(innerHTML과의 차이점!)
> - **`Element.innerHTML()`**  
>   : element에 포함된 HTML 또는 XML을 가져오거나 설정한다. element의 내용을 변경하고자 할 때 주로 사용한다. 불필요한 파싱 작업이 있을 수 있으므로 단순 텍스트 삽입 시에는 사용하지 않는 것이 좋다.(이럴 때는 textContent를 활용하는 것이 좋음!)

#### 1.1.2.1. HTMLElement

Element의 생성자이자 하위 객체로, Node, Element 객체의 프로퍼티를 상속받는다.

> **💫주요 프로퍼티**
>
> - **`HTMLElement.dataset`**  
>   : `HTMLElement.dataset.HTML에서정의한속성명` 또는 `HTMLElement.dataset[HTML에서정의한속성명]` 형식으로 작성한다. Javascript에서 `data-` 사용자 정의 속성값에 쉽게 다가가기 위해 만들어진 속성이다. HTML에 정의한 `data-`뒤에 속성명을 가져올 때, 하나의 단어일 경우에는 그대로 가져오지만 복수의 단어를 가져올 때는 `-`로 구분한 HTML과 다르게 카멜표기법을 이용해 정의한다.
> - **`HTMLElement.innerText`**  
>   : element에서 사용자에게 보여지는 텍스트를 나타낸다. 즉 `<script>`와 `<style>` 등의 숨겨진 요소의 텍스트는 나타내지 않는다.(이를 읽어오려면 `Node.textContent`를 활용!)

### 1.1.3. Document

HTML 문서 및 XML 문서의 루트 객체로, nodeType은 9이다. 하위 객체로 HTMLDocument가 존재한다.

특정 Node를 찾는 기능, Node를 생성하는 기능, 이벤트를 생성하는 기능, 이벤트 모델 기능 등을 하는 프로퍼티를 갖고, Node의 프로퍼티를 상속한다.

> **💫주요 프로퍼티**
>
> - **`document.querySelector()`**  
>   : 처음으로 마주친 유효한 식별자를 한 개를 반환하여 자바스크립트로 가져온다.
> - **`document.querySelectorAll()`**  
>   : 유효한 식별자 모두를 Nodelist 형태로 반환하여 자바스크립트로 가져온다.
> - **`document.createElement()`**  
>   : 지정한 태그명의 HTML 요소를 만들어 반환한다.
> - **`document.createTextNode()`**  
>   : 텍스트 Node를 만들어 반환한다.
>   > **📌ES6 이후 잘 안 쓰이는 메서드**
>   >
>   > - ❌`document.getElementsByTagName('tagName')`  
>   >   : tagName을 통해 HTMLCollection 형태로 반환한다.
>   > - ❌`document.getElementById('id')`  
>   >   : id를 통해 HTMLElement 형태로 반환한다.
>   > - ❌`document.getElementsByClassName('className')`  
>   >   : className를 통해 HTMLCollection 형태로 반환한다.
>   >
>   > 👉실행결과가 하나인 경우는 HTMLElement를, 복수인 경우는 HTMLCollection을 반환한다.
>   > 👉ES6 이후 `document.querySelector()`, `document.querySelectorAll()`를 통해 tag-Name, id(`#`), class(`.`)를 모두 가져올 수 있기 때문에 잘 쓰이지 않는다.

#### 1.1.3.1. HTMLDocument

Document의 생성자이자 하위 객체로, Node, Document 객체의 프로퍼티를 상속받는다.

## 1.2. DOM 접근 메서드

### 1.2.1. `document.querySelector("~")`

**처음으로 마주친 유효한 식별자를 한 개**를 반환하여 자바스크립트로 가져온다.

tag-Name(`"~"`), id(`"#~"`), class(`".~"`) 값을 모두 활용하여 가져올 수 있다.

> **📌`document.querySelector("~")` 활용**
>
> ```js
> const nav = document.querySelector("#nav-access"); //id: nav-access인 것들만 뽑아내서 자바스크립트 nav 변수에 할당
> nav.querySelector("li"); //문서 전체에서 찾지 않고 nav 변수에 할당한 #nav-access 중에서 li 태그를 찾음
> ```

### 1.2.2. `document.querySelectorAll("~")`

**유효한 식별자 모두**를 _Nodelist_ 형태로 반환하여 자바스크립트로 가져온다.

tag-Name(`"~"`), id(`"#~"`), class(`".~"`) 값을 모두 활용하여 가져올 수 있다.

<br>

> **📌ES6 이후 잘 안 쓰이는 메서드**
>
> ❌`document.getElementsByTagName('tagName')`: tagName을 통해 _HTMLCollection_ 형태로 반환한다.  
> ❌`document.getElementById('id')`: id를 통해 _HTMLElement_ 형태로 반환한다.  
> ❌`document.getElementsByClassName('className')`: className를 통해 _HTMLCollection_ 형태로 반환한다.  
> 👉실행결과가 하나인 경우는 *HTMLElement*를, 복수인 경우는 *HTMLCollection*을 반환한다.  
> 👉ES6 이후 `document.querySelector()`, `document.querySelectorAll()`를 통해 tag-Name, id(`#`), class(`.`)를 모두 가져올 수 있기 때문에 잘 쓰이지 않는다.

> **📌HTMLCollection과 NodeList의 공통점**
>
> 이터러블 특성을 가진 유사 배열 객체이다. (DOM에서 반환하는 배열, Map, arguments는 모두 이러한 특성을 가짐!)
> 이터러블 특성으로 인해 순회는 가능하지만 배열은 아니므로 배열 메서드를 사용하려면 배열로 바꿔줘야 한다.

## 1.3. DOM 조작 메서드

### 1.3.1. `document.createElement()`

지정한 태그명의 HTML 요소를 만들어 반환한다.

### 1.3.2. `document.createTextNode()`

텍스트 Node를 만들어 반환한다.

### 1.3.3. `Node.appendChild()`

괄호에 입력한 Node를 마지막 자식으로 추가한다.

만약 주어진 Node가 이미 문서에 존재한다면, 해당 위치에서 새로운 위치로 이동시킨다.

### 1.3.4. `Node.removeChild()`

지정한 자식 Node를 제거하고 제거된 Node를 반환한다.

여전히 메모리는 존재하지만 더이상 DOM의 일부가 아니다.

### 1.3.5. `Element.setAttribute(name, value)`

요소의 속성값을 설정한다. 첫 번째 요소에는 "속성"을 두 번째 요소에는 "속성값"을 기입한다.

### 1.3.6. `Element.getAttribute(name)`

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

지정한 클래스 값이 엘리먼트의 class 속성에 존재하는지 확인한다. 존재한다면 true, 존재하지 않는다면 false를 반환한다.

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

이벤트란 **웹페이지에서 발생하는 키보드 입력, 마우스 입력 등의 사용자의 동작**을 의미한다.

DOM의 Node는 이벤트의 정보를 담는 **이벤트 객체**를 가지고 있고, 이벤트 객체는 프로퍼티와 메서드를 가진다.

**이벤트 핸들러**란 이벤트가 발생했을 때 실행되는 함수를 말한다. 이벤트 핸들러에 전달되는 파라미터는 이벤트 객체뿐이다. 여기서 이벤트 객체는 `event` 혹은 `e`로 표기한다.

```js
const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", function () {
  alert("안녕하세요");
}); //"click"이라는 이벤트 타입이 감지되면 함수(이벤트 핸들러)를 실행한다.

resetButton.addEventListener("click", function (event) {
  console.dir(event);
}); //"click"할 때마다 이벤트 객체 목록을 보여주는 이벤트 핸들러를 실행한다.
```

## 2.1. `addEventListener("eventType", eventHandler)` 메서드

`addEventListener("eventType", eventHandler)`메서드는 지정한 유형의 이벤트를 대상이 수신할 때마다 호출할 함수를 설정한다.

이벤트 타입은 [이벤트 참조 - MDN](https://developer.mozilla.org/ko/docs/Web/Events) 참고!

## 2.2. 이벤트 전파

어떤 Element에서 발생한 이벤트는 부모 혹은 자식에게 전파된다.

전파 방향에 따라 버블링(Bubbling), 캡처링(Capturing)이라고 불린다.

이벤트 전파를 막고자 한다면 해당 이벤트에 `event.stopPropagation()`을 사용한다.

### 2.2.1. 이벤트 버블링(Bubbling)

브라우저의 기본적인 특성으로, 이벤트가 발생한 Element부터 *상위*로 전파(전달)되는 현상이다.

### 2.2.2. 이벤트 캡처링(Capturing)

이벤트가 발생한 Element부터 *하위*로 전파(탐색)되는 현상이다.

두 가지 방법으로 이벤트 캡처링을 발생시킬 수 있다. `addEventListener()` 메서드의 세 번째 인자에 `true`를 입력하거나, 이벤트 캡처링을 발생시키고자 하는 메서드의 객체에 `capture: true`를 입력한다.

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
> > **JavaScript**: 세 번째 리스트 추가
> >
> > ```js
> > let itemList = document.querySelector("ul");
> >
> > let li = document.createElement("li");
> > let input = document.createElement("input");
> > let label = document.createElement("label");
> > let labelText = document.createTextNode(" Leg Day");
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
> **JavaScript**
>
> ```js
> let inputs = document.querySelectorAll("input");
> inputs.forEach(function (input) {
>   input.addEventListener("click", function (event) {
>     alert("이벤트 위임 X");
>   });
> });
> ```
>
> 👉세 번째 리스트에는 `alert`가 동작하지 않는다...

> **📌이벤트 위임을 사용했을 때**
>
> **JavaScript**
>
> ```js
> let ul = document.querySelector("ul");
> ul.addEventListener("click", function () {
>   alert("이벤트 위임 O");
> });
> ```
>
> 👉세 번째 리스트에도 `alert` 동작!

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
