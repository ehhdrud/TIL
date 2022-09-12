# 1. DOM(Document Object Model)

> HTML은 문서이므로 자바스크립트로 조작이 불가능.  
> 이를 가능하도록 하기 위해 HTML을 자바스크립트의 객체로 모델링해서 조작.  
> DOM은 Node로 이루어져 있고 이 Node는 Tree 형태로 구성.  
> Node 안에는 수많은 property와 method를 가짐.

## 1.1. DOM 선택

> JS에서 특정 HTML Element를 가져오는 방법.

### 1.1.1. ~~`document.getElementById('[id]')`~~(구형)

> id를 통해 가져오는 방법.

### 1.1.2. ~~`document.getElementsByClassName('[class name]')`~~(구형)

> class name을 통해 가져오는 방법.  
> 주어진 class의 모든 child element의 HTMLCollection을 반환.

### 1.1.3. ~~`document.getElementsByTagName('[tag name]')`~~(구형)

> tag name을 통해 가져오는 방법.  
> 주어진 tag name을 가지는 유효한 element의 HTMLCollection을 반환.

**※ HTML Collection**

> `arguments`같은 유사 배열 객체를 나타내며 속성과 메서드를 가지고 있음.  
> 배열로 바꿔줘야 배열 메서드를 사용할 수 있음.

### 1.1.4. `document.querySelector('')` (최신)

> 처음으로 마주친 유효한 식별자를 하나만 가져옴.  
> id(#), class name(.), tag name 구분없이 사용 가능.

```javascript
//DOM을 JS로 뽑아내는 방법: document.querySelector('')
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
 * //...Some Code
 *
```

```javascript
//활용법
const nav = document.querySelector("#nav-access"); //id: nav-access인 것들만 뽑아내서 nav에 할당
nav.querySelector("li"); //문서 전체에서 찾지 않고 id: nav-access인 것 중에서 li 태그를 찾음
```

### 1.1.5. `document.querySelectorAll('')` (최신)

> 유효한 식별자 모두를 Nodelist 형태로 가져옴.  
> id(#), class name(.), tag name 구분없이 사용 가능.

**※ NodeList**

> HTMLCollection와 마찬가지로, 배열이 아니므로 배열로 바꿔주는 과정이 필요.

## 1.2. DOM 조작

```javascript
//DOM 조작 예시1
const searchButten = document.querySelector("gNO89b");
searchButten.classList.add("seo-dong-kyeong"); //class: gNO89b seo-dong-kyeong
searchButten.classList.remove("gNO89b"); //class: seo-dong-kyeong
searchButten.classList.contains("seo-dong-kyeong"); //true
```

```javascript
//DOM 조작 예시2
const linkDirect = document.querySelector(".link_direct");
linkDirect.textContent; //'연예'
linkDirect.textContent = "seodongkyeong"; //'seodongkyeong'으로 변경
```

```javascript
//DOM 조작 예시3
const partnerBox = document.querySelector(".partner_box");
const ele = document.querySelector(".link_partner");
partnerBox.removeChild(ele); //'크리에이터' 삭제

const ele2 = document.querySelector("div"); //div 태그 생성
ele2.textContent = "seo-dong-kyeong";
partnerBox.appendChild(ele2); //뒤쪽에 'seodongkyeong' 추가

partnerBox.innerHTML = `<h3 class="title">SEO-DONG-KYEONG</h3>`; //innerHTML을 통해 DOM을 생성하는 과정없이 타이틀을 'SEO-DONG-KYEONG'으로 변경
```

# 2. 이벤트(Event)

> 이벤트란 웹페이지에서 발생하는 키보드 입력, 마우스 입력 등의 사용자의 동작을 의미.  
> 이벤트 객체란 이벤트 정보를 담은 객체, DOM의 Node가 이벤트 객체를 가지고 있음.  
> 이벤트 객체에는 property와 method가 담겨 있음.  
> 이벤트 핸들러란 이벤트가 발생했을 때 실행되는 함수.  
> 이벤트 핸들러 선언 시, 첫번째 매개변수에 이벤트 객체를 명시적으로 선언해야 함.

```javascript
const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", function () {
  alert("안녕하세요");
}); //"click"이라는 이벤트 타입이 감지되면 함수를 실행

resetButton.addEventListener("click", function (event) {
  console.dir(event);
}); //"click"할 때마다 이벤트 객체 목록을 보여주는 이벤트 핸들러
```

## 2.1. 이벤트 전파

> 어떤 element에서 발생한 이벤트는 부모 혹은 자식에게 전파됨.  
> 전파 방향에 따라 버블링(Bubbling),캡처링(Capturing)이라고 불림.  
> 현재 이벤트의 전파를 막으려면 해당 이벤트에 `event.stopPropagation()`메서드를 사용.

### 2.1.1. 이벤트 버블링(Bubbling)

> 이벤트가 발생한 element부터 *상위*로 전파되는 현상.

### 2.1.2. 이벤트 캡처링(Capturing)

> 이벤트가 발생한 element부터 *하위*로 전파되는 현상.

- `addEventListener()` 메서드의 세 번째 인자(기본값은 `false`)에 `true`를 넣으면, 버블링이 아닌 캡처링이 일어남.
- `addEventListener()` 메서드의 객체에 `capture: true`를 넣을 시, 버블링이 아닌 캡처링이 일어남.

## 2.1.3. 이벤트 위임

> 하위 요소마다 이벤트를 붙이지 않고, 상위 요소에서 하위 요소의 이벤트를 제어하는 방식.  
> 각 요소마다 이벤트 핸들러를 추가한다면 메모리 측면에서 효율이 떨어짐.

## 3. 이벤트 다루기

## 3.1. debounce

> 이벤트를 그룹화하여 특정 시간이 지난 후, 마지막 이벤트만 발생하도록 하는 기술.  
> 매개변수는 *실행시킬 함수*와 _지연시킬 밀리세컨드_.  
> 이벤트가 실행되었을 때 일정 시간을 기다렸다가 이벤트를 수행하도록 만들고, 일정 시간 내에 같은 이벤트가 또 들어오면 이전 요청을 취소하는 방식으로 구현.

## 3.2. throttle

> 일정 시간동안 일어난 이벤트를 차단하고 단 한 번만 실행하는 기술.  
> 매개변수는 *실행시킬 함수*와 _차단시킬 밀리세컨드_.  
> 타이머가 없을 경우 타이머를 설정하고, 타이머가 있을 경우 아무런 동작도 하지 않도록 하여 일정 시간 이후에 이벤트가 1번 실행되도록 구현.
