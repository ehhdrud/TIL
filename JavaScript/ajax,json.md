# AJAX(Asyncronous Javascript And XML)

AJAX는 "Asyncronous Javsscript And XML"의 약자로, 해석하면 "자바스크립트와 XML을 이용한 비동기적 데이터 처리"이다. 이 개념이 소개될 당시 클라이언트와 서버간 통신은 주로 XML을 통해 이루어졌기 때문에 이러한 이름을 갖게 되었고 요즘엔 주로 JSON을 사용한다. 그러므로 현 상황에서 AJAX는 "자바스크립트와 XML을 이용한 비동기적 데이터 처리"보다는 "클라이언트와 서버의 비동기적 데이터 교환 기술" 정도의 용어로 사용하는 것이 더 적합하다. 이러한 데이터 교환은 HTTP 프로토콜을 기반의 요청·응답을 통해 이루어진다.

> **📌JSON(JavaScript Object Notation)**
>
> 그럼 요즘에 사용한다는 JSON은 무엇일까? JSON은 "JavaScript Object Notation"의 약자로, 해석하면 "자바스크립트 객체 표기법"이다. 이름에서 알 수 있듯이 JSON은 자바스크립트에서 객체를 나타내는 표기법인 이름-값 쌍의 집합으로 이루어져 있는 데이터 교환을 위한 형식이다. 또한 일반 텍스트를 기반으로 하고 있기 때문에 다른 언어 간 데이터 교환에 매우 효율적이다. 한편 자바스크립트의 내장 함수를 통해 JSON 형식을 쉽게 다를 수 있다.
>
> - `JSON.stringify`: 자바스크립트의 값·객체를 JSON 문자열로 변환(직렬화)한다. 서버로 데이터를 **보낼 때** 주로 사용한다.
> - `JSON.parse`: JSON 문자열을 자바스크립트의 값·객체로 변환(역직렬화)한다. 서버에서 데이터를 **가져올 때** 사용 주로 사용한다.

## 1. XHR(XMLHttpRequest)

자바스크립트의 내장 객체 중 하나로, 서버와 비동기적으로 데이터를 주고 받을 수 있는 기능을 제공한다. 이를 이용하여 웹페이지를 새로 고치지 않고 동적으로 데이터를 불러올 수 있다.

XHR은 XMLHttpRequest의 약자로, "XML 형식과 HTTP 프로토콜을 이용하여 서버와 통신한다"는 의미를 가지고 있다. JSON 이름의 기원과 마찬가지로 당시 서버와의 통신에 XML이 사용됐기때문에 이러한 이름으로 불리게 되었다. 역시나 현재에는 JSON 형식의 데이터를 주고 받는 것이 일반화되었다.

## 2. Fetch

Fetch API는 브라우저에서 제공하는 클라이언트와 서버가 데이터를 주고 받기 위한 API이다. Fetch는 XHR에 비해 직관적이므로 쉽게 네트워크 요청과 응답을 처리할 수 있다.

Fetch 함수는 Promise를 반환하며, Promise가 이행될 때 Response 객체를 반환한다. 즉, Fetch는 Promise를 기반으로 비동기적으로 데이트를 주고받기 때문에 콜백 지옥을 방지하여 코드의 가독성을 높일 수 있고, Response 객체를 활용하여 보다 쉽게 데이터를 처리할 수 있다.

`fetch()` 함수는 Promise를 반환하고, Promise가 이행될 때 Response 객체를 반환한다. 이후에 반환된 Response 객체에서 `Response.json()` 메서드를 호출하면, 이 또한 Promise를 반환하고 이행될 때 JSON 형식으로 파싱된 데이터가 포함된 JavaScript 객체를 반환하므로 데이터를 추출할 수 있다.

> **📌 사용법**
>
> ```js
> // 'https://example.com/data'에 GET 요청을 보내고, 응답을 반환받아 Promise 객체를 반환
> fetch("https://example.com/data")
>   // 응답(Response) 객체의 body를 JSON으로 변환하여 Promise 객체를 반환
>   .then((response) => response.json())
>   // JSON으로 변환된 데이터를 콘솔에 출력
>   .then((data) => console.log(data))
>   // 에러가 발생하면 에러 메시지를 콘솔에 출력
>   .catch((error) => console.error(error));
> ```

> **📌 예시**
>
> ```js
> // ...some codes
>
> useEffect(() => {
>   async function fetchData() {
>     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
>     const result = await res.json();
>     return result;
>   }
>
>   fetchData().then((res) => {
>     setDocs(res);
>   });
> }, []);
>
> // ...some codes
> ```

## 3. Axios

Axios는 Fetch와 마찬가지로 클라이언트와 서버간의 HTTP 요청을 보내고 받기 위한 Promise 기반의 Http 클라이언트 라이브러리이다. 그러나 Fetch는 JSON 데이터를 자동으로 파싱하지 않으므로, 수동으로 파싱해야 하며, 요청과 응답을 인터셉트하는 기능을 제공하지 않는다. 반면 Axios는 JSON 데이터를 자동으로 파싱하는 기능을 제공하고, 요청과 응답을 인터셉트하는 기능을 제공한다. IE와 같은 오래된 브라우저와의 호환도 가능하고 API 자체가 간단하고 직관적이라는 점도 Fetch보다 장점이다.

- `axios.get(url)`  
  : 입력한 url에 존재하는 자원에 요청한다. 서버에서 어떠한 데이터를 가져와서 보여주는 용도로 사용한다.

- `axios.post(url, data)`  
  : 새로운 리소스를 생성할 때 사용한다.  
  : 두 번째 인자 date는 본문으로 보낼 데이터를 첨부한다.  
  : 로그인/회원가입 등 사용자가 생성한 리소스를 서버에 업로드할 때 사용된다.

Axios는 설치가 필요하다.

> **📌서버**
>
> ```bash
> npm install axios
> ```
>
> **📌클라이언트(jsDeliver / unpkg CDN 둘 중 택)**
>
> ```html
> <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
> ```
>
> ```html
> <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
> ```

> **📌 사용법**
>
> ```js
> // 'https://example.com/data'에 GET 요청을 보내고, 응답을 반환받아 Promise 객체를 반환
> axios
>   .get("https://example.com/data")
>   // 서버에서 반환한 응답(Response) 데이터 중에서 'data' 속성을 콘솔에 출력
>   .then((response) => console.log(response.data))
>   // 에러가 발생하면 에러 메시지를 콘솔에 출력
>   .catch((error) => console.error(error));
> ```

> **📌 예시**
>
> ```js
> // ...some codes
>
> useEffect(() => {
>   async function fetchData() {
>     const result = await axios.get(
>       "https://jsonplaceholder.typicode.com/posts"
>     );
>     console.log(result.data);
>
>     return result.data;
>   }
>
>   fetchData().then((res) => {
>     setDocs(res);
>   });
> }, []);
>
> // ...some codes
> ```

### 3.2. `axios.interceptors`

axios.interceptors는 Axios에서 제공하는 HTTP 요청과 응답을 가로채고 처리하는 기능을 제공한다.

예를 들어, HTTP 요청에 대한 인증 토큰을 추가하거나, HTTP 응답을 가공하거나, 오류를 처리할 수 있다.

axios.interceptors 객체는 request와 response 프로퍼티를 가진다. 각각의 프로퍼티는 use 메서드를 가지며, 이를 이용해 각각의 인터셉터를 등록할 수 있다.
