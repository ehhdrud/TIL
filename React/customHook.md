# 커스텀 훅(Custom Hook)

커스텀 훅은 리액트 함수 컴포넌트에서 로직을 재사용하기 위해 만들어진 기능이다. 함수 컴포넌트에서 반복적으로 사용되는 로직을 추출하여 커스텀 훅으로 만들면 코드를 더욱 간결하고 유지보수하기 쉽게 만들 수 있다.

커스텀 훅은 리액트에서 사용되는 다른 훅들과 마찬가지로 규칙에 따라야 하는데, 예를 들면, 커스텀 훅은 리액트의 기본 훅인 useState, useEffect, useContext 등과 마찬가지로 훅 안에서, 또는 함수 컴포넌트 내부에서 사용되어야 하고, 단독으로 함수처럼 사용할 수는 없다. 또한 커스텀 훅의 이름은 "use"로 시작해야 하며, 커스텀 훅 안에서는 조건문, 반복문 등의 제어문을 사용할 수 없다.

```js
import { useState } from "react";

function useCustomHook() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return [count, increment];
}

const [count, increment] = useCustomHook(); // 이렇게 사용할 수 없음 !!
```

같은 훅을 사용하는 다른 컴포넌트는 같은 변수 이름을 사용해도 state를 공유하지 않는다. 사용자 Hook을 사용할 때마다 그 안의 state와 effect는 완전히 독립적이다. 커스텀 훅을 직접적으로 호출하기 때문에 React의 관점에서 이 컴포넌트는 useState 또는 useEffect를 호출한 것과 다름이 없다. 하나의 컴포넌트 안에서 useState와 useEffect를 여러 번 부를 수 있고 이들은 모두 완전히 독립적이기 때문에, 커스텀 훅도 마찬가지이다.

아래와 같이 훅에서 훅으로 정보를 전달하고 업데이트하는 것도 가능하다.

```js
const friendList = [
  { id: 1, name: "Phoebe" },
  { id: 2, name: "Rachel" },
  { id: 3, name: "Ross" },
];

function ChatRecipientPicker() {
  // useState를 사용하여 초기값 1로 설정한 recipientID 상태와, 이 상태를 업데이트하는 setRecipientID 함수를 생성한다.
  const [recipientID, setRecipientID] = useState(1);

  // useFriendStatus 커스텀훅을 사용하여, 현재 recipientID의 친구 상태를 가져온다.
  // recipientID가 업데이트되면 리렌더링이 발생되기 때문에 useFriendStatus(recipientID)를 통해 isRecipientOnline도 업데이트된다.
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? "green" : "red"} />
      {/* 사용자가 옵션을 선택하면 setRecipientID를 호출하여 recipientID를 업데이트한다. */}
      <select
        value={recipientID}
        onChange={(e) => setRecipientID(Number(e.target.value))}
      >
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```
