# 1. `Proxy(target, handler)`

"Proxy"란 "대리"라는 의미를 가진 단어이다. 단어처럼 Proxy는 특정 객체를 감싼 후, 해당 객체에서 일어나는 작업을 가로채고, 그 순간 어떤 동작을 할 지 정의할 수 있도록 하는 객체이다.

`new Proxy(target, handler)` 를 통해 프록시 객체를 생성한다. 두개의 파라미터를 가지는데, 첫 번째 매개변수(`target`)에는 대상인 객체를 넣어주고 두번째 매개변수(`handler`)에는 '내장 메서드'의 동작을 가로채 어떠한 작업을 수행하는 메서드(= '트랩')를 가진 객체를 넣어준다.

핸들러의 `get`, `set` 등의 매서드를 사용하여 트랩을 활성화시킬 타이밍을 결정할 수 있다. 핸들러 객체에 `[매서드 이름] : [사용자 정의 함수]`를 넣어 사용한다. 해당 메서드를 사용하면 `[[get]]`, `[[set]]` 등의 내장 메서드의 호출을 가로챌 수 있다.

프록시 객체의 `handler`에 트랩을 정의하고 프록시 객체에 어떠한 작업을 가했을 때, 트랩으로 인해 프록시 객체에서 해당 작업이 처리되며 트랩에 정의된 작업이 수행된다. 따라서 타겟 객체는 원래 상태를 그대로 유지하게 되며, 타겟 객체에도 동일한 작업이 처리되기를 원한다면 트랩에서 따로 정의해야 한다.

```js
// 타겟 객체에는 아무런 처리가 없는 코드
const targetObj = {
  name: "Alice",
  age: 25,
};

const proxyObj = new Proxy(targetObj, {
  set(target, key, value) {
    console.log(`Setting '${key}' to '${value}'`);
  },
});

proxyObj.name = "Bob"; // Setting 'name' to 'Bob'
console.log(targetObj.name); // Alice
```

```js
// 타겟 객체에서도 처리하도록 한 코드
const targetObj = {
  name: "Alice",
  age: 25,
};

const proxyObj = new Proxy(targetObj, {
  set(target, key, value) {
    console.log(`Setting '${key}' to '${value}'`);
    target[key] = value;
  },
});

proxyObj.name = "Bob"; // Setting 'name' to 'Bob'
console.log(targetObj.name); // Bob
```

한편, `handler`에 트랩을 넣지 않은 빈 객체를 할당하고 프록시 객체에 어떤 작업을 수행한다면, 타겟 객체에 그대로 작업이 처리된다. 즉, 이 경우 프록시 객체는 래퍼 객체의 역할만 수행한다.

```js
let targetObj = {};
let proxyObj = new Proxy(targetObj, {}); // 빈 핸들러 전달

proxyObj.name = "dongkyeong"; // 프록시 객체에 값을 설정
console.log(targetObj.name); // dongkyeong
```

> **📌 내장 매서드란?**
>
> 객체에 어떤 작업을 수행하면 자바스크립트 명세서의 정의된 내장 메서드가 깊숙한 곳에서 관여하게 된다. 예를 들면, 객체 내 프로퍼티를 읽을 땐 `[[Get]]`이라는 내장 메서드가, 프로퍼티에 값을 쓸 땐 `[[Set]]`이라는 내장 메서드가 관여하게 된다. 이런 내장 메서드들은 명세서에만 정의되어 있기 때문에, 개발자가 직접 코드를 사용해 호출할 수는 없고 프록시의 트랩을 사용해 이러한 내장 메서드의 호출을 가로챌 수 있다.

## 1.1. `handler.get(target, property [, receiver])`

프로퍼티를 읽을 때, 즉 [[Get]] 내장 메서드가 관여할 때 작동하는 메서드이다.

`get: [Function]` 형태로 `handler` 인자에 할당할 객체에 삽입한다.

> **📌 `get` 핸들러의 인자**
>
> 1. `target`: new Proxy의 첫번째 인자로 주었던 target 객체를 가르킨다.
> 2. `property`: 조회한 property
> 3. `receiver`: getter가 호출될 때 this. 기본적으로는 객체 자신을 호출하지만 상속받은 객체일 경우에는 상속한 객체가 this가 된다.

## 1.2. `handler.set(target, property, value [, receiver])`

프로퍼티에 값을 할당할 때, 즉 [[Set]] 내장 메서드가 관여할 때 작동하는 메서드이다.

`set: [Function]` 형태로 `handler` 인자에 할당할 객체에 삽입한다.

> **📌 `set` 핸들러의 인자**
>
> 1. `target`: new Proxy의 첫번째 인자로 주었던 target 객체
> 2. `property`: 작성한 property 이름
> 3. `value`: 작성한 property 값
> 4. `receiver`: setter가 호출될 때 this. 기본적으로는 객체 자신을 호출하지만 상속받은 객체일 경우에는 상속한 객체가 this가 된다.

# 2. Reflect

Reflect는 프록시 생성을 단순화하는 내장 객체이자, 프록시에서 트랩할 수 있는 모든 내부 메서드와 동일한 메서드를 가지고 있기 때문에, 다음과 같이 간단하게 내부 메서드의 기능을 구현할 수 있다.

```js
let targetObj = {};

Reflect.set(targetObj, "name", "dongkyeong");

console.log(targetObj.name); // dongkyeong
```

이러한 특성을 가진 Reflect는 프록시 내부에서 사용할 때 효과적이다. 프록시의 메서드와 동일한 메서드를 가진다는 것은 동일한 인자를 가진다는 것을 의미하기 때문에 호환성, 가독성에 유리하다. 특히 타겟 객체에 작업을 전달할 때, `target[key] = value`를 사용하면 속성값을 설정할 수 없을 때 예외가 발생하지만, `Reflect.set`는 성공하면 `true`, 실패하면 `false`를 반환하기 때문에 이를 이용하면 예외처리가 더 수월하다.

```js
const targetObj = {
  name: "dongkyeong",
  age: 25,
};

const proxyObj = new Proxy(targetObj, {
  set(target, key, value) {
    console.log(`Setting '${key}' to '${value}'`);
    Reflect.set(target, key, value);
  },
});

proxyObj.name = "seo"; // Setting 'name' to 'seo'
console.log(targetObj.name); // seo
```
