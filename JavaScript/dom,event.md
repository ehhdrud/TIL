# DOM

> HTML은 문서이므로 자바스크립트로 조작이 불가능  
> 이를 가능하도록 하기 위해 HTML을 자바스크립트의 객체로 모델링해서 조작  
> DOM은 Node로 이루어져 있고 이 Node는 Tree 형태로 구성  
> Node 안에는 수많은 property와 method를 가짐

## 1. DOM 선택

> JS에서 특정 HTML Element를 가져오는 방법

### 1.1. ~~`document.getElementById('[id]')`~~(고전)

> id를 통해 가져오는 방법

### 1.2. ~~`document.getElementsByClassName('[class name]')`~~(고전)

> class name을 통해 가져오는 방법  
> 주어진 class의 모든 child element의 HTMLCollection을 반환

### 1.3. ~~`document.getElementsByTagName('[tag name]')`~~(고전)

> tag name을 통해 가져오는 방법  
> 주어진 tag name을 가지는 유효한 element의 HTMLCollection을 반환

**※ HTML Collection**

> `arguments`같은 유사 배열 객체를 나타내며 속성과 메서드를 가지고 있음  
> 배열로 바꿔줘야 배열 메서드를 사용할 수 있음

### 1.4. `document.querySelector('')` (최신)

> 처음으로 마주친 유효한 식별자를 하나만 가져옴  
> id(#), class name(.), tag name 구분없이 사용 가능

```javascript
//DOM을 JS로 뽑아내는 방법: document.querySelector('')
const li = document.querySelector("li");
```

```javascript
//뽑아왔을 때 내부구조
const li = {
    accessKey: ""
    ariaAtomic: null
    ariaAutoComplete: null
    ariaBusy: null
    ariaChecked: null
    ariaColCount: null
    ariaColIndex: null
    //...Some Code
}
```

```javascript
//활용법
const nav = document.querySelector("#nav-access"); //id: nav-access인 것들만 뽑아내서 nav에 할당
nav.querySelector("li"); //문서 전체에서 찾지 않고 id: nav-access인 것 중에서 li 태그를 찾음
```

### 1.5. `document.querySelectorAll('')` (최신)

> 유효한 식별자 모두를 Nodelist 형태로 가져옴
> id(#), class name(.), tag name 구분없이 사용 가능

**※ NodeList**

> HTMLCollection와 마찬가지로, 배열이 아니므로 배열로 바꿔주는 과정이 필요

## 2. DOM 조작

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

# Event

> 이벤트란 웹페이지에서 발생하는 키보드 입력, 마우스 입력 등의 사용자의 동작을 의미
> 이벤트 객체란 이벤트 정보를 담은 객체, DOM의 Node가 이벤트 객체를 가지고 있음  
> 이벤트 객체에는 property와 method가 담겨 있음
> 이벤트 핸들러란 이벤트가 발생했을 때 실행되는 함수, 이벤트 핸들러 선언 시 첫번째 매개변수에 이벤트 객체를 명시적으로 선언해야 함

```javascript
const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", function () {
  alert("안녕하세요");
}); //"click"이라는 이벤트가 감지되면 함수를 실행

resetButton.addEventListener("click", function (event) {
  console.dir(event);
}); //"click"할 때마다 이벤트 객체 목록을 보여주는 이벤트 핸들러
```