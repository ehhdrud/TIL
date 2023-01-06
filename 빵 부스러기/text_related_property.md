# 텍스트 관련 프로퍼티

## 1. HTMLElement의 프로퍼티

### 1.1. `innerText`

Element에서 *사용자에게 보여지는 텍스트*를 나타낸다. 즉 `<script>`와 `<style>` 등의 숨겨진 요소의 텍스트는 나타내지 않는다.(이를 읽어오려면 `Node.textContent`를 활용!)

### 1.2. `innerHTML(text)`

Elemnet에 포함된 *HTML 또는 XML*을 가져오거나 설정한다.

*요소(Element)의 내용을 변경하고자 할 때 주로 사용*한다. 불필요한 파싱 작업이 있을 수 있으므로 단순 텍스트 삽입 시에는 사용하지 않는 것이 좋다.(이럴 때는 textContent를 활용하는 것이 좋다!)

### 1.3. `Element.insertAdjacentHTML(position, text)`

insertAdjacentHTML() 메서드는 HTML 또는 XML 같은 특정 텍스트를 파싱하고, 특정 위치에 DOM tree 안에 원하는 node들을 추가한다. 이미 사용중인 element 는 다시 파싱하지 않는다. 그러므로 element 안에 존재하는 element를 건드리지 않는다.(innerHTML과는 좀 다름!)

**HTML을 문서(document)에 삽입하고자 할 때 주로 사용한다.**

이미 사용중인 Element는 다시 파싱하지 않으므로, innerHTML보다 작업량이 적어서 빠르다.

> **📌position의 키워드**
>
> `"beforebegin"`: element 앞에
>
> `"afterbegin"`: element 안에 가장 첫번째 child
>
> `"beforeend"`: element 안에 가장 마지막 child
>
> `"afterend"`: element 뒤에

## 2. Node의 프로퍼티

### 2.1. `Node.textContent`

innetText와는 달리 `<script>`나 `<style>` 태그와 상관없이 해상 노드가 가지고 있는 텍스트 값을 그대로 읽어온다.

### 2.2. `Node.nodeValue`

# 3. Document의 프로퍼티

### 3.1. `createTextNode`
