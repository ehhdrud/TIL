# Next.js에서 웹 스토리지를 사용할 때 발생하는 문제

Next.js에서 웹 스토리지에 상태를 저장하기 위해 recoil, recoil-persist를 사용하여 atoms.ts를 아래와 같이 작성하였다.

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
const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;
```

그럼 정상적으로 빌드되는 것을 확인할 수 있다.
