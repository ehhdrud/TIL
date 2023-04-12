# 리액트의 이벤트 처리

DOM 이벤트 핸들러에서는 이벤트 핸들러가 이벤트를 처리하는 동안에만 액세스 할 수 있는 이벤트 객체가 있다. 이 이벤트 객체는 이벤트가 발생한 요소와 관련된 정보를 제공한다. 그러나 리액트에서는 '합성 이벤트(SyntheticEvent)' 객체를 사용하여 이벤트 핸들러에서 이벤트 객체의 역할을 대신한다. 합성 이벤트는 이벤트가 발생하는 DOM 요소에 직접 연결되지 않지만, 이벤트 객체와 마찬가지로 이벤트가 발생한 요소에 대한 정보, 이벤트의 타입, 이벤트가 발생한 위치 등의 정보를 포함한다.

리액트의 이벤트 핸들러에서는 `return false`를 입력해도 이벤트의 기본 동작을 막지 못한다. 대신 `e.preventDefault()` 또는 `e.stopPropagation()`와 같은 메서드를 호출하는 방식으로 기본 동작을 방지할 수 있다.

```js
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

위 코드에서 `e`는 합성 이벤트 객체이다. 따라서 `e.preventDefault()` 또는 `e.stopPropagation()`와 같은 메서드를 사용할 수 있게 된다.

## 클래스 컴포넌트의 이벤트 처리

함수 컴포넌트와 달리, 클래스의 컴포넌트에서 이벤트를 처리 할 때는 조금 다른 방식으로 작성해야 한다.
