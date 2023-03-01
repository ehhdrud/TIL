# 텍스트 관련 프로퍼티·메소드

### `Node.textContent`

해당 노드가 가지고 있는 텍스트 값을 가져오거나 변경한다. `HTMLElement.innerText`와는 달리 `<script>`나 `<style>` 태그와 상관없이 존재하는 모든 텍스트를 가져온다.

(23.02.24) [ex] StarRating 프로젝트의 `$currentRatings[i].textContent = rating;` (rating 에는 문자열이 할당되어 있음)

### `Node.nodeValue`

현재 노드의 값·콘텐츠를 반환 또는 설정한다.

### `Element.insertAdjacentHTML(position, text)`

HTML 또는 XML 같은 특정 텍스트(param)를 파싱하고, 위치 키워드(posistion)에 따른 지정된 위치에 추가한다. 이미 사용중인 요소는 다시 파싱하지도 않고 존재하는 element는 그대로 유지되며 파싱하지도 않는다. 따라서 `innerHTML`보다 작업량이 적어서 빠르다.

(23.03.01) [ex] NewsViewer 프로젝트의 `newsItemSection.insertAdjacentHTML("beforeend", HTML요소);`

> **📌position의 키워드**
>
> `beforebegin`: 요소 그 자체의 앞에 삽입
>
> `afterbegin`: 요소 안에 가장 첫번째 child에 위치
>
> `afterend`: 요소 그 자체의 뒤에 삽입
>
> `beforeend`: 요소 안에 가장 마지막 child에 위치

### `Element.innerHTML(text)`

해당 요소의 내부 HTML 코드를 가져오거나 변경한다. 이 속성에 새로운 HTML 코드를 할당하면 해당 요소의 내용이 새로운 HTML 코드로 대체된다. 단순 텍스트 삽입 시에는 불필요한 파싱 작업이 있을 수 있으니, 이럴 때는 `textContent`를 사용하는 것이 유리하다.

(23.03.01) [ex] NewsViewer 프로젝트의 `NewcategoryListNav.innerHTML = HTML요소`;

### `HTMLElement.innerText`

Element에서 사용자에게 보여지는 텍스트를 가져오거나 변경한다. 즉 `<script>`와 `<style>` 등의 숨겨진 요소의 텍스트는 가져오지 않는다.

(23.02.22) [ex] AnalogClock 프로젝트의 `time[i].innerText = "|";`
(23.02.24) [ex] Calendar 프로젝트의 `div.innerText = i + 1;`

### `document.createTextNode("")`

텍스트 Node를 만들어 반환한다.
