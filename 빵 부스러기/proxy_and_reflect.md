# 1. Proxy(target, handler)

JavaScript의 기본적인 명령에 대한 동작을 사용자 정의가 가능하도록 한다. 즉 특정 동작이 일어나면 그 동작을 가로채서 사용자가 정의한 명령을 수행할 수 있다.

프록시는 두개의 파라미터를 가진다. 첫 번째 매개변수에는 프록시할 원본 객체(target)를 넣어주고 두번째 매개변수에는 가로채는 작업을 수행하는 객체(handler)를 넣어준다.

## 1.1. get(target, name, (receiver))

'프로퍼티를 읽을 때 작동'하는 메서드로, 다음 세가지 인자를 받을 수 있다.

> 1.  target: new Proxy의 첫번째 인자로 주었던 target 객체
> 2.  name: 조회한 property
> 3.  receiver: getter가 호출될 때 this. 기본적으로는 객체 자신을 호출하지만 상속받은 객체일 경우에는 상속한 객체가 this가 된다.

## 1.2. set(target, name, value, (receiver))

'프로퍼티에 값을 할당할 때 작동'하는 메서드로, 다음 네가지 인자를 받을 수 있다.

> 1. target: new Proxy의 첫번째 인자로 주었던 target 객체
> 2. name: 작성한 property 이름
> 3. value: 작성한 property 값
> 4. receiver: get의 receiver와 유사하게 동작하는 객체

# 2. Reflect
