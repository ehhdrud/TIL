# 1. DOM(Document Object Model)

HTML은 문서이므로 자바스크립트로 조작이 불가능하다. 이를 가능하도록 하기 위해 DOM을 통해 HTML을 자바스크립트의 객체로 모델링하여 조작한다.

DOM은 Node로 이루어져 있고 이 Node는 Tree 형태로 구성되어 있다. Node는 수많은 Property와 Method를 가지고 있다.

## 1.1. JS에서 특정 HTML Element를 가져오는 방법

### 1.1.1. `document.querySelector("")`

처음으로 마주친 유효한 식별자를 한 개를 반환한다. 즉 자바스크립트로 가져온다.

tag name(""), id("#"), class name(".")을 모두 활용하여 가져올 수 있다.

```javascript
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
const nav = document.querySelector("#nav-access"); //id: nav-access인 것들만 뽑아내서 자바스크립트 nav 변수에 할당
nav.querySelector("li"); //문서 전체에서 찾지 않고 nav 변수에 할당한 #nav-access 중에서 li 태그를 찾음
```

### 1.1.2. `document.querySelectorAll("")`

유효한 식별자 모두를 _Nodelist_ 형태로 반환한다. 즉 자바스크립트로 가져온다.

tag name(""), id("#"), class name(".")을 모두 활용하여 가져올 수 있다.

> **📌현재는 안쓰이는 문법들**
>
> ❌`document.getElementById('id')`: id를 통해 _HTMLElement_ 형태로 반환한다.  
> ❌`document.getElementsByClassName('class name')`: class name을 통해 _HTMLCollection_ 형태로 반환한다.  
> ❌`document.getElementsByTagName('tag name')`: tag name을 통해 _HTMLCollection_ 형태로 반환한다.
>
> > 실행결과가 하나인 경우는 HTMLElement , 복수인 경우는 HTMLCollection 을 리턴!

> **📌HTMLCollection과 NodeList의 공통점**
>
> 이터러블 특성을 가진 **유사 배열 객체**로, Property와 Method를 가지고 있다.  
> 유사 배열 객체는 배열이 아니므로 배열 메서드를 사용하려면 배열로 바꿔줘야 한다.

## 1.2. DOM 조작

```javascript
//DOM 조작 예시1
const searchButten = document.querySelector(".gNO89b");
searchButten.classList.add("seo-dong-kyeong"); //class: gNO89b seo-dong-kyeong
searchButten.classList.remove("gNO89b"); //class: seo-dong-kyeong
searchButten.classList.contains("seo-dong-kyeong"); //true
```

```javascript
//DOM 조작 예시2
const linkDirect = document.querySelector(".link_direct");
linkDirect.textContent; //'연예'
linkDirect.textContent = "seodongkyeong"; //'연예'가 'seodongkyeong'으로 변경된다.
```

```javascript
//DOM 조작 예시3
const partnerBox = document.querySelector(".partner_box");
const ele = document.querySelector(".link_partner");
partnerBox.removeChild(ele); //'크리에이터'가 삭제된다.

const ele2 = document.querySelector("div"); //div 태그를 생성한다.
ele2.textContent = "seo-dong-kyeong";
partnerBox.appendChild(ele2); //끝쪽에 'seodongkyeong'이 추가된다.

partnerBox.innerHTML = `<h3 class="title">SEO-DONG-KYEONG</h3>`; //DOM을 생성하는 과정없이 innerHTML을 통해 타이틀을 'SEO-DONG-KYEONG'으로 변경한다.
```

# 2. 이벤트(Event)

이벤트란 웹페이지에서 발생하는 키보드 입력, 마우스 입력 등의 사용자의 동작을 의미한다.

DOM의 Node는 이벤트의 정보를 담고 있는 **이벤트 객체**를 가지고 있고, 이벤트 객체에는 Property와 Method가 담겨있다.

**이벤트 핸들러**란 이벤트가 발생했을 때 실행되는 함수를 지칭한다. 이벤트 핸들러 선언 시, 첫번째 매개변수에 이벤트 객체를 명시적으로 선언해야 한다.

```javascript
const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", function () {
  alert("안녕하세요");
}); //"click"이라는 이벤트 타입이 감지되면 함수를 실행한다.

resetButton.addEventListener("click", function (event) {
  console.dir(event);
}); //"click"할 때마다 이벤트 객체 목록을 보여주는 이벤트 핸들러를 실행한다.
```

## 2.1. 이벤트 전파

어떤 element에서 발생한 이벤트는 부모 혹은 자식에게 전파된다.

전파 방향에 따라 버블링(Bubbling),캡처링(Capturing)이라고 불린다.

현재 이벤트의 전파를 막으려면 해당 이벤트에 `event.stopPropagation()`을 사용한다.

### 2.1.1. 이벤트 버블링(Bubbling)

이벤트가 발생한 element부터 *상위*로 전파되는 현상이다.

### 2.1.2. 이벤트 캡처링(Capturing)

이벤트가 발생한 element부터 *하위*로 전파되는 현상이다.

`addEventListener()` 메서드의 세 번째 인자에 `true`를 넣거나 해당 메서드의 객체에 `capture: true`를 넣을 시, 버블링이 아닌 캡처링이 일어난다.

### 2.1.3. 이벤트 위임

각 요소마다 이벤트 핸들러를 추가한다면 메모리 측면에서 효율이 떨어지므로, 하위 요소마다 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트를 제어하는 방식이다.

## 3. 이벤트 조작

클로저 개념을 활용하여 이벤트를 조작할 수 있다.

### 3.1. debounce

이벤트를 그룹화하여 특정 시간이 지난 후, 마지막 이벤트만 발생하도록 하는 기술이다.

매개변수는 *실행시킬 함수*와 *지연시킬 밀리세컨드*이다.

이벤트가 실행되었을 때 일정 시간을 기다렸다가 이벤트를 수행하도록 만들고, 일정 시간 내에 같은 이벤트가 또 들어오면 이전 요청을 취소하는 방식으로 구현한다.

### 3.2. throttle

일정 시간동안 일어난 이벤트를 차단하고 단 한 번만 실행하는 기술이다.

매개변수는 *실행시킬 함수*와 *차단시킬 밀리세컨드*이다.

타이머가 없을 경우 타이머를 설정하고, 타이머가 있을 경우 아무런 동작도 하지 않도록 하여 일정 시간 이후에 이벤트가 1번 실행되도록 구현한다.
