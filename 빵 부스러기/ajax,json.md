# AJAX(Asyncronous Javascript And XML)

JS와 XML(최근에는 대부분 _JSON_)을 이용한 **비동기적 정보 교환 통신**이다.

자바스크립트는 동기적 언어이기 때문에 **비동기적 작업**을 위해 필요하다.

HTTP는 서버와 데이터를 주고받으면서 화면이 새로고침(깜빡임)되는데, AJAX는 그런 과정이 없어 **화면을 유연하게 처리**한다.

> **📌JSON(JavaScript Object Notation)**
>
> 속성-값, 또는 키-값 쌍으로 이루어진 데이터 오브젝트를 전달하기 위해 인간이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포멧이다.  
> 비동기적 정보 교환 통신인 AJAX를 위해 넓게는 XML를 대체하는 주요 데이터 포맷이다.  
> 프론트엔드는 주로 JS를 사용하는데 백엔드 언어인 Java, python, Ruby, Go 등과 소통·가공하는데 도움을 준다.
>
> - `JSON.stringify`: 자바스크립트의 값·객체를 JSON 문자열로 변환(직렬화)한다. 서버로 데이터를 **보낼 때** 주로 사용한다.
> - `JSON.parse`: JSON 문자열을 자바스크립트의 값·객체로 변환(역직렬화)한다. 서버에서 데이터를 **가져올 때** 사용 주로 사용한다.

## 1. XHR(XMLHttpRequest)

서버와 상호작용을 위해 사용되는 객체이다.

전체 페이지의 새로고침없이도 URL로 부터 데이터를 받아올 수 있어서 사용자의 현재 작업을 방해하지 않으면서 페이지의 일부를 업데이트한다.

_Fetch_, *Axios*로 대체할 수 있어서 잘 쓰이진 않는다.

## 2. Fetch

XHR을 대체할 수 있는 새로운 API로, XHR에 비해 좀 더 강력하고 유연한 조직이 가능하다.

네트워크 통신을 포함한 리소스 취득을 위한 인터페이스가 정의되어 있다.

## 3. Axios

Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리이다. 즉 백엔드와 프론트엔드의 통신을 쉽게하기 위해 Ajax와 더불어 사용한다.

Fetch보다 간단해서 최근에 많이 사용되고, Fetch와 달리 설치가 필요하다.

> 📌서버에서 설치
>
> ```shell
> npm install axios
> ```
>
> 📌클라이언트에서 설치(jsDeliver / unpkg CDN 둘중 택)
>
> ```html
> <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
> ```
>
> ```html
> <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
> ```

### 3.1. Axios의 메서드

#### 3.1.1. axios.get(url)

입력한 url에 존재하는 자원에 요청한다. 서버에서 어떠한 데이터를 가져와서 보여주는 용도로 사용한다.

#### 3.1.2. axios.post(url, data)

새로운 리소스를 생성할 때 사용한다.

두 번째 인자는 본문으로 보낼 데이터를 첨부한다. 로그인/회원가입 등 사용자가 생성한 리소스를 서버에 업로드할 때 사용된다.

#### 3.1.3. axios.put(url, data)

REST 기반 API 프로그램에서 데이터베이스에 저장되어있는 내용을 갱신하는 목적으로 사용된다.

POST는 데이터를 "갱신"한다는 점에서, PUT과 용도의 차이를 확실하게 구분해야한다. PUT은 서버 내부적으로 GET -> POST 과정을 거치기 때문에 POST 메서드와 유사한 포멧을 가진다.

#### 3.1.4. axios.delete(url)

DELETE : REST 기반 API 프로그램에서 데이터베이스에 저장되어있는 내용을 삭제하는 목적으로 사용된다.

DELETE는 데이터 삭제를 주목적으로 하기 때문에 두 번째 인자를 따로 전달하지 않는다. DELETE 메서드가 서버에 요청되면, 삭제 process가 진행된다.
