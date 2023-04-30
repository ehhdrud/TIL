# 리액트에서의 비동기 처리

리액트에서도 자바스크립트와 마찬가지로 Promise, async/await는 비동기 처리를 위한 기본적인 도구이다. 또한 서버와 통신을 위한 HTTP 클라이언트 라이브러리로 Fetch 또는 axios와 같은 API를 사용할 수 있다.

리액트에서는 비동기 작업에 관련된 로직을 컴포넌트의 생명 주기 메서드 중 하나인 useEffect 함수 안에 넣어서 처리한다. 이렇게 함으로써, 컴포넌트가 마운트된 후에 비동기 작업을 수행하고, 상태 관리 라이브러리를 사용하여 상태를 업데이트 할 수 있다. 이는 코드의 가독성과 유지 보수성을 높이고, 개발자가 비동기 처리와 상태 업데이트를 보다 쉽게 처리할 수 있도록 준다. 여기서 추가로 커스텀 훅을 사용한다면 비동기 처리 로직을 컴포넌트와 분리하여 관리할 수 있어, 코드가 더욱 깔끔하고 모듈화된 형태를 유지할 수 있다.

또한 swr을 통해 API 요청 결과를 캐싱하여 중복 요청을 방지하고, React-Query를 통해 데이터 요청, 캐싱, 리프레싱 등을 간편하게 처리할 수 있는 기능을 제공받을 수 있다.

## 1. 커스텀 훅(Custom Hook)

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

API 호출을 간편하게 처리할 수 있도록 도와주는 기능을 하는 훅이 대표적인 커스텀 훅으로, 통상 'useFetch'라는 이름으로 사용한다. 아래는 Fetch 함수를 이용해 useFetch 커스텀 훅을 작성한 예시이다.

```js
import { useState, useEffect } from "react";

function useFetch(url) {
  // data, error, loading 상태 값을 useState Hook을 사용하여 정의한다.
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect Hook을 사용하여, URL 값이 변경될 때마다 API 호출을 수행하고, 결과를 상태 값으로 업데이트한다.
  useEffect(() => {
    // fetchData 함수를 async 함수로 정의한다.
    async function fetchData() {
      try {
        // fetch 함수를 사용하여 URL에 대한 API 호출을 수행한다.
        const response = await fetch(url);
        // API 호출 결과를 JSON 형태로 반환한다.
        const json = await response.json();
        // JSON 데이터를 상태 값으로 설정한다.
        setData(json);
        // 로딩 상태를 false로 설정한다.
        setLoading(false);
      } catch (error) {
        // 에러가 발생하면, 에러 객체를 상태 값으로 설정하고, 로딩 상태를 false로 설정한다.
        setError(error);
        setLoading(false);
      }
    }

    // fetchData 함수를 호출한다.
    fetchData();
  }, [url]);

  // data, error, loading 상태 값을 반환한다.
  return { data, error, loading };
}

export default useFetch;
```

## 2. swr과 React-Query
