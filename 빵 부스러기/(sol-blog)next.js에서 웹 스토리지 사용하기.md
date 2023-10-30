Next.js에서 클라이언트 측에 상태를 저장하기 위해 웹 스토리지를 사용할 때 발생한 문제를 정리해보았다.

## Error 1. window is not Fonund

Next.js 환경에서 세션 스토리지에 시크릿 코드를 저장하고 관리하기 위해 atoms.ts를 아래와 같이 작성하였다.

```ts
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage: window.sessionStorage,
});

export const isAcceptedAtom = atom<boolean>({
    key: 'isAcceptedAtom',
    default: false,
    effects_UNSTABLE: [persistAtom],
});
```

그러나 빌드 시 아래와 같은 에러가 출력되었다.

```
ReferenceError: window(document, sessionStorage, localStorage ...) is not defined
```

Next.js의 SSR 구조는 서버에서 미리 렌더링할 데이터를 만들어서 정적으로 내려줘야하는데, 페이지가 처음 렌더링하는 과정에서는 window, document 또는 웹 스토리지가 없다.

sessionStorage를 undefined로 선언해서 서버에서 window.sessionStorage 객체를 로드하지 않도록 처리해주기 위해 atoms.ts에 아래 코드를 추가해준다.

```ts
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 해당 코드 추가
const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage: window.sessionStorage,
});

export const isAcceptedAtom = atom<boolean>({
    key: 'isAcceptedAtom',
    default: false,
    effects_UNSTABLE: [persistAtom],
});
```

그럼 정상적으로 빌드되는 것을 확인할 수 있다.

## Error 2. Recoil에서 상태를 읽어올 때 발생하는 Hydration 에러

우선 Next.js에서 자주 등장하는 Hydration 에러는 서버 측 렌더링(SSR)과 클라이언트 측 렌더링(CSR)간의 데이터 불일치로 인해 발생한다. 즉, 서버 측에서 초기 렌더링되는 페이지와 클라이언트 측에서 렌더링되는 페이지 간에 데이터가 일치하지 않는 경우 Hydration이 발생한다. Next.js 13 기준 `'use client'`를 통해 CSR을 할 때 겪게되는 문제이다.

다른 컴포넌트에서 위 atoms.tsx의 `isAcceptedAtom`를 불러오는 경우를 생각해보자. 서버 측 렌더링 시, `isAcceptedAtom`의 초기 값을 undefined로 설정하고 해당 값을 초기 HTML과 함께 클라이언트로 전달한다. 그러나 클라이언트 측 렌더링 시 JavaScript 코드가 로드되고 실행되는데, recoil-persist가 세션 스토리지에서 `isAcceptedAtom`의 값을 가져온다. 이 때 불일치가 발생하고 Hyration 에러가 발생하는 것이다.

아래와 같이 컴포넌트에서 초기 렌더링 시 서버에서 값을 가져오지 않도록 설정하고, 이후에 useEffect Hook을 통해 atoms.tsx의 값을 가져오면 문제를 해결할 수 있다.

```js
const [isAccepted, setClientIsAccepted] = (useState < string) | (boolean > '');
const [recoilIsAccepted, setIsAccepted] = useRecoilState(isAcceptedAtom);

useEffect(() => {
    setClientIsAccepted(recoilIsAccepted);
}, [recoilIsAccepted]);

const handleFormSubmit = (e: any) => {
    if (secretCode === 'SECRETCODE') {
        setIsAccepted(true);
    }
};
```

`isAccepted`(useState의 state)는 기본적으로 빈 값이 들어가고, 서버에서도 빈 값으로 렌더링되므로 Hydration 에러가 발생하지 않는다. 그 이후 useEffect가 실행되면서 atoms로부터 세션 스토리지의 값을 가져와 할당된다. 만약 atoms에 넣을 값(세션 스토리지에 넣을 값)에 변경이 생길때는 `setIsAccepted`(useRecoilState의 setState)를 사용한다. useEffect의 의존성 배열로 인해 `recoilIsAccepted`(useRecoilState의 state)에 변경이 생기면 `setClientIsAccepted`(useState의 setState)가 실행되며 `isAccepted`에 새로운 값이 할당된다. 즉, Hydration 에러를 피하면서 atoms에서 세션 스토리지에 저장된 값을 가져올 수 있는 것이다.
