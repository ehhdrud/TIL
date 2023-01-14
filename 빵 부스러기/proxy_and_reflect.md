# 1. `Proxy(target, handler)`

자바스크립트의 기본적인 명령에 대한 동작을 사용자 정의가 가능하도록 하는 매서드를 제공해주는 내장 객체이다. 즉 특정 동작이 일어나면 그 동작을 가로채서 사용자가 정의한 명령을 수행할 수 있다.

`new`를 통해 생성자를 호출하여 사용한다.

두개의 파라미터를 가진다. 첫 번째 매개변수에는 프록시할 원본 객체를 넣어주고 두번째 매개변수에는 가로채는 작업을 수행하는 핸들러 객체를 넣어준다.

핸들러의 `get`, `set` 등의 *내장 매서드*를 사용해 가로채는 작업인 '트랩'을 활성화시킬 타이밍을 결정한다. 핸들러 객체에 `[매서드 이름] : [사용자 정의 함수]`를 넣어 사용할 수 있다.

> **📌내장 매서드란?**
>
> 객체에 어떤 작업을 수행하면 자바스크립트 명세서의 정의된 내장 메서드(Internal Method)가 깊숙한 곳에서 관여하게 된다. 객체 내 프로퍼티를 읽을 땐 [[Get]] 이라는 내장 메서드가, 프로퍼티에 값을 쓸 땐 [Set] 이라는 내장 메서드가 관여하게 되는 것이다. 이런 내장 메서드들은 명세서에만 정의되어 있기 때문에 개발자가 직접 코드를 사용해 호출할 수는 없고 프록시의 트랩으로 이러한 내장 메서드의 호출을 가로챌 수 있다.

## 1.1. `handler.get(target, property [, receiver])`

**프로퍼티를 읽을 때 작동**하는 메서드이다.

> **📌`get` 핸들러의 인자**
>
> 1. target: new Proxy의 첫번째 인자로 주었던 target 객체
> 2. property: 조회한 property
> 3. receiver: getter가 호출될 때 this. 기본적으로는 객체 자신을 호출하지만 상속받은 객체일 경우에는 상속한 객체가 this가 된다.

## 1.2. `handler.set(target, property, value [, receiver])`

**프로퍼티에 값을 할당할 때 작동**하는 메서드이다.

> **📌`set` 핸들러의 인자**
>
> 1. target: new Proxy의 첫번째 인자로 주었던 target 객체
> 2. property: 작성한 property 이름
> 3. value: 작성한 property 값
> 4. receiver: get의 receiver와 유사하게 동작하는 객체

# 2. Reflect

Reflect는 프록시 생성을 단순화하는 내장 객체이다.

내장 메서드는 사용자가 직접 호출할 수는 없고 Proxy의 트랩을 사용해 호출해야 하는데 Reflect는 프록시에서 트랩할 수 있는 모든 내부 메서드와 동일한 내장 메서드를 가지고 있기 때문에 내장 메서드를 직접 사용할 수 있게 된다.

## 2.1. Reflect.get(target, property [, receiver])

객체(target)의 프로퍼티(property)를 반환한다.

## 2.2. Reflect.set(target, property, value [, receiver])

객체(target)의 프로퍼티(property)에 값(value)을 할당한다. 성공 시 true, 실패 시 false를 반환한다.
