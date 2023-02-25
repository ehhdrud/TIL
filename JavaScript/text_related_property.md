# 텍스트 관련 프로퍼티·메소드

### `Node.textContent`

`HTMLElement.innerText`와는 달리 `<script>`나 `<style>` 태그와 상관없이 해상 노드가 가지고 있는 텍스트 값을 그대로 읽어온다.

(23.02.24) 문자열을 할당하는 방식으로 사용해도 됨. [ex] StarRating 프로젝트의 `$currentRatings[i].textContent = rating;` (rating 에는 문자열이 할당되어 있음)

### `Node.nodeValue`

현재 노드의 값·콘텐츠를 반환 또는 설정한다.
` Element.setAttribute("","")``Element.getAttribute("")``Element.classList``Element.replaceWith()``Element.insertAdjacentHTML(position, text) `

### `Element.insertAdjacentHTML(position, text)`

insertAdjacentHTML() 메서드는 HTML 또는 XML 같은 특정 텍스트를 파싱하고, 특정 위치에 DOM tree 안에 원하는 node들을 추가한다. 이미 사용중인 Element는 다시 파싱하지 않는다. 그러므로 Element 안에 존재하는 Element는 건드리지 않는다.(innerHTML과는 좀 다름!)

**HTML을 문서(document)에 삽입하고자 할 때 주로 사용한다.**

이미 사용중인 Element는 다시 파싱하지 않으므로, innerHTML보다 작업량이 적어서 빠르다.

> **📌position의 키워드**
>
> `"beforebegin"`: 요소 그 자체의 앞에 삽입
>
> `"afterbegin"`: 요소 안에 가장 첫번째 child에 위치
>
> `"afterend"`: 요소 그 자체의 뒤에 삽입
>
> `"beforeend"`: 요소 안에 가장 마지막 child에 위치

### `Element.innerHTML(text)`

Elemnet에 포함된 *HTML 또는 XML*을 가져오거나 설정한다.

*요소(Element)의 내용을 변경하고자 할 때 주로 사용*한다. 불필요한 파싱 작업이 있을 수 있으므로 단순 텍스트 삽입 시에는 사용하지 않는 것이 좋다.(이럴 때는 textContent를 활용하는 것이 좋다!)

### `HTMLElement.innerText`

Element에서 *사용자에게 보여지는 텍스트*를 나타낸다. 즉 `<script>`와 `<style>` 등의 숨겨진 요소의 텍스트는 나타내지 않는다.(이를 읽어오려면 `Node.textContent`를 활용!)

(23.02.22) 문자열을 할당하는 방식으로 사용해도 됨. [ex] AnalogClock 프로젝트의 `time[i].innerText = "|";`
(23.02.24) [ex] Calendar 프로젝트의 `div.innerText = i + 1;`

### `document.createTextNode("")`

텍스트 Node를 만들어 반환한다.
