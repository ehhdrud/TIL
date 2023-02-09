### ✨Excution Context 블로그나 유튜브 요약

```
<제로초 블로그>

GEC는 프로그램이 실행될 때 하나만 생기고, FEC는 함수 호출 시 마다 생긴다. 각 함수의 실행이 끝날 때 마다 FEC가 제거되고 모든 코드를 읽어들인뒤 GEC도 종료된다.
컨텍스트가 생성될 때 그 안에 변수 객체(arguments, variable), 스코프 체인, this가 생성된다. 함수는 변수 객체에서 변수를 찾고 없다면 스코프 체인을 뒤져서 찾는다.
this는? 기본적으로 암시적 바인딩을 따르고 new나 명시적 바인딩을 통해 바꿀 수 있다.
```

```
<우아한테크 유튜브>

EC에는 뭐 여러가지가 있지만 Lexical Environment에 있는 Environment Record(줄여서 Record)와 Outer Environment Reference(줄여서 Outer)를 중점적으로 보겠다. 자바스크립트 엔진은 프로그램이 실행되면 콜스택에 GEC를 넣는다. 전역에서 함수가 실행된다? 그 위에 FEC가 쌓인다. 함수가 종료되면 FEC도 스택에서 제거된다. 그러니까 위에서 봤을 때 보이는 실행 컨텍스트가 현재의 실행 컨텍스트이다.

1. Record로 호이스팅 이해하기
일단 호이스팅(hoiting)이 뭔지 알아야한다. 호이스팅이란 "선언문이 마치 최상단으로 끌어올려지는 현상"을 말한다. 그러므로 특정 변수의 값을 가져올 때 위에 선언문이 없어도 undefined로 출력되긴 하지만 에러는 뜨지 않는 것이다.

호이스팅은 두가지 종류가 있다. 변수 호이스팅과 함수 호이스팅이다.

1.1. 변수 호이스팅("var" vs "let, const")

1.1.1. var
생성단계(Creation Phase)에서 코드 전체를 쫙 훑으면서 선언문만을 실행하여 Environment Record에 미리 기록한다. var로 선언했으면 undefined로 초기화까지 이루어진다.
실행단계(Execution Phase)에서는 선언문 외 나머지 코드를 순차적으로 실행한다. Environment Record는 참조하거나 업데이트된다. 그러므로 (호이스팅 예제에서) undefined가 출력되는 것이다. 왜냐? 이 Environment Record에서 값을 가져오니깐 ! 그리고 다시 var workout = "Squat"을 만나면 선언은 아까 했으니 Environment Record에서 할당(업데이트)만 해준다. (그래서 안좋다)

1.1.2. let, const
위 과정 대신 let, const를 쓰면? 선언만 하고 초기화는 이뤄지지 않는다. 그러므로 미완성 상태... 선언문 윗단에서 const로 만든 식별자를 읽으려한다면 에러가 뜬다.
즉 let, const를 사용한다면 선언라인 이전에는 식별자를 참조할 수 없다. (그래서 좋다)

1.2. 함수 호이스팅

1.2.1. 함수 선언식

함수 선언식은 선언과 동시에 함수 생성되어 Environment Record에 초기화가 이뤄어진다. ('f {}' 이따위로 생긴 놈으로 들어감...) 그러므로 선언부 윗단에서도 함수를 실행시킬 수 있다. (그래서 안좋다)

1.2.2. 함수 표현식

결과부터 말하자면, 함수 표현식은 선언부 윗단에서 함수를 실행시킬 수 없다. (그래서 좋다)

1.2.2.1. var
만약 var로 만들어진 식별자에 함수를 할당하여 선언문이 아래쪽에 위치한 상태로 실행하면 Environment Record에는 변수 호이스팅과 마찬가지로 undefined가 담겨있기 때문에 함수가 실행되지 않고 Type Error.

1.2.2.2. let, const
let, const를 쓰면 역시 변수 호이스팅과 마찬가지로 초기화가 이뤄지지 않아 Reference Error.

2. Outer로 스코프 체인 이해하기

위에서 설명했듯이 각 실행 컨텍스트는 콜스택에 쌓이는데, 각 실행 컨택스트를 연결해주는 Outer라는 놈이 있다. 가장 위에 쌓인 (코드 상에서는 가장 안쪽의 영역) 실행 컨텍스트에서 변수를 찾을 때 본인의 스코프를 기준으로 Global Scope까지 Outer를 타고 찾아나간다. 그리고 처음으로 찾은 변수를 가져다 쓴다.
```

```
<큰틀의터전 유튜브>

실행 컨텍스트는 함수가 실행되는 환경을 뜻한다.
여기서 함수란 변수, 매개변수, 내장함수, this이다.

스코프 체인이란 실행 컨텍스트 체인과 같은 말이다. 스코프 체인은 Lexical Environment와 연관이 있다.
Lexical Environment는 Lexical Scope와 같은 말이다. 이 Lexical Environment에는 Environment Record와 Outer Environment Reference가 있다. 스코프체인과 연관이 있는 Lexical Environment는 "함수가 호출된 순서"가 아닌 "함수가 코드 상으로 쓰여진 순서"애 따라 결정된다. 즉 쌓인 순서는 관련 없고, 안쪽 스코프냐냐 바깥쪽 스코프냐가 관련이 있다.

GEC는 전역 객체(Global Object / GO)랑 같다. 여기에는 window object와 this object가 포함된다. "빌트인객체(Math, String)과 BOM, DOM, 전역변수"로 이루어진다.
FEC는 활성 객체(Activation Object / AO)랑 같다. "함수선언, 매개변수(arguments), 변수"로 이루어진다.
EEC는 신경쓰지 않아도 된다.

Creation Phase에서는 GO, AO, this가 형성된다. 값이 들어가있지 않은 초기값이 들어간다(var는 undefined로 초기화, let const는 선언만!)
스코프 체인이 형성된다. 이 때문에 호이스팅이 가능하다. 변수쉐도잉(가장 가까운 변수를 참조하기 때문에 그보다 상위 스코프의 변수는 사라지는것 같다는 의미)이 발생한다.

Excution Phase에서는 GO, AO, this에 값을 할당한다. this는 함수 호출 패턴, Lexical Scope에 따라 값이 정해진다.
```

```
<hoo00nn님 벨로그>

Creation Phase에서 두가지 컴포넌트가 생성된다. Variable Environment와 Lexical Environment이다

얘네는 모두 Environment Record, Outer Environment Reference, ThisBinding라는 프로퍼티를 가지고 있다.

기본적인 역할은
1. Environment Record: 현재 실행 컨텍스트의 식별자 정보(변수나 함수 등), 그리고 변수 객체(VO)를 담고 있다
2. Outer Environment Reference: 스코프 체인과 연관
3. ThisBinding: this 값을 결정

그럼 똑같은데? 뭐가 다른거지??

Variable Environment: Environment Record는 var, 함수선언문 등 호이스팅을 일으키는 놈들을 저장한다. Outer Environment Reference는 Lexical Environment을 참조한다.
Lexical Environment: Environment Record는 let, const, 함수표현식 등 호이스팅 안되는 놈들을 저장한다.  Outer Environment Reference는 Variable Environment을 참조한다.

Execution Phase에선 자바스크립트 엔진이 한줄 한줄 위에서 부터 코드를 읽으면서 코드를 실행하며 변수들에 값을 할당한다.
```

```
<yejineee님 벨로그>

```
