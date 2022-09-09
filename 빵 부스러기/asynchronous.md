# 비동기(Asynchronous)

## 1. 동기(synchronous)와 비동기(Asynchronous)

## 1.1. 동기

> 자바스크립트는 동기적 언어.  
> 순서대로 한 번에 하나의 작업을 수행.  
> '단일(싱글) 스레드'라고도 부름(자바스크립트는 하나의 Call stack만을 가지고 있음을 의미).
> 이러한 동작은 Memory Heap과 Call Stack으로 이루어진 *자바스크립트 엔진*으로부터 비롯됨.

- 동작 원리

1. 코드가 실행되면 순서대로 Call Stack에 실행할 함수가 쌓인다.(push)
2. 쌓인 반대 순서로 함수가 실행된다.(LIFO)
3. 실행이 된 함수는 Call Stack에서 제거된다(pop)

## 2.1. 비동기

> 자바스크립트는 단일 스레드, 동기식으로 동작하지만 비동기적 작업이 필요함.  
> 특히 자바스크립트가 웹 사이트에서 동작하려면 빠른 반응을 위해 비동기적 작업이 필수적.  
> 이러한 동작은 *자바스크립트 실행환경(런타임)*으로부터 비롯됨(자바스크립트 실행환경에서는 DOM, AJAX같은 비동기적 처리를 위한 Web API를 제공함).

- 동작원리

1. Call Stack에서 비동기 함수가 호출되면 Call Stack에 먼저 쌓였다가 Web API(백그라운드)로 이동한 후 해당 함수가 등록되고 Call Stack에서 사라진다.
2. Web API에서 비동기 함수의 이벤트가 발생하면, 해당 콜백 함수는 Callback Queue에 push(이동)된다.
3. 이제 Call Stack이 비어있는지 이벤트 루프(Event Loop)가 확인을 하는데 만약 비어있으면, Call Stack에 Callback Queue에 있는 콜백 함수를 넘겨준다(push).
4. Call Stack에 들어온 함수는 실행이 되고 실행이 끝나면 Call Stack에서 사라진다.
