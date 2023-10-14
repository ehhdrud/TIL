## 리액트에서 DOM 접근

리액트에서 DOM에 직접 접근하기 위해서는 id나 class를 통해 접근하는 DOM API를 사용하지 않는다. 대신 `useRef` 훅을 사용하여 접근해야 한다. 리액트는 가상 DOM을 사용하지만 DOM API를 사용하면 React의 가상 DOM과의 조화가 어려울 수 있으며, 성능 저하의 가능성이 높아진다. Ref를 사용하면 리액트의 가상 DOM과 조화롭게 동작하면서도 필요한 DOM 요소에 접근할 수 있다.

다음은 Ref의 장점이다.

-   컴포넌트 내부에서만 동작하므로, 전역적으로 동작하는 DOM API처럼 id, class 등이 중복되는 일이 없다.

-   컴포넌트가 하나가 아닌 여러개가 생성되는 경우, DOM 요소를 특정할 수 있도록 관심 영역을 특정 컴포넌트로 제한하는 역할을 Ref가 할 수 있다.

-   Ref는 컴포넌트 라이프 사이클 내에서 유지되는 변경이 가능한 변수이며, 변수가 변할 때 추가 렌더링이 없다는 점에서 State와 차이점이 있다. 즉 ref를 활용하면 전체 컴포넌트를 렌더링 시키지 않고, dom에만 접근하여 내가 원하는 효과를 주는게 가능해진다.

나는 아래와 같이 useRef를 사용하여 DOM에 접근하였다.

```js
import { useEffect, useRef } from 'react';
import MetaFox from '@metamask/logo';

const MetaFoxLogo = () => {
    const metaFoxRef = useRef(null);
    const isMetaFoxOn = useRef(false);

    useEffect(() => {
        if (window.document && !isMetaFoxOn.current) {
            const metaFoxInstance = MetaFox({
                pxNotRatio: true,
                width: 42.5,
                height: 42.5,
                followMouse: true,
            });

            const divMetaFox = metaFoxRef.current;

            if (divMetaFox) {
                divMetaFox.appendChild(metaFoxInstance.container);
            }

            isMetaFoxOn.current = true;
        }
    }, []);

    return <div ref={metaFoxRef} />;
};

export default MetaFoxLogo;
```

## useEffect의 cleanup 과정에서 ref.current 관련 에러

메모리 누수를 방지하기 위해 컴포넌트가 언마운트될 때 사용한 ref를 초기화해주는 것이 좋다.

`useEffect` hook에서 return문을 통해 cleanup 기능을 수행한다.

```js
useEffect(() => {
    ...

    return () => {
        delete metaFoxRef.current;
    };
}, []);
```

그러나 아래와 같은 경고가 출력된다.

> **에러 로그**
>
> The ref value 'metaFoxRef.current' will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy 'metaFoxRef.current' to a variable inside the effect, and use that variable in the cleanup function.

이 경고는 useEffect 함수 내에서 참조된 metaFoxRef.current가 정리 함수 내에서 다를 가능성이 있다는 것을 나타낸다.

리액트는 컴포넌트의 상태나 참조가 변경되면 해당 컴포넌트를 다시 렌더링할 수 있으므로, metaFoxRef.current가 변경될 수 있다. 이런 상황에서는 정리 함수에서 참조된 값이 예상대로 동작하지 않을 수 있으므로 이런 경고가 발생하는 것이다.

아래와 같이 metaFoxRef.current 값을 별도의 변수로 복사하여 사용하면 경고가 사라진다.

```js
useEffect(() => {
    let metaFoxRefCurrent = metaFoxRef.current;

    ...

    return () => {
        metaFoxRefCurrent = null;
    };
}, []);
```

그래서 최종 코드는 아래와 같이 작성되었다.

```js
import { useEffect, useRef } from 'react';
import MetaFox from '@metamask/logo';

const MetaFoxLogo = () => {
    const metaFoxRef = useRef(null);
    const isMetaFoxOn = useRef(false);

    useEffect(() => {
        let metaFoxRefCurrent = metaFoxRef.current;

        if (window.document && !isMetaFoxOn.current) {
            const metaFoxInstance = MetaFox({
                pxNotRatio: true,
                width: 42.5,
                height: 42.5,
                followMouse: true,
            });

            const divMetaFox = metaFoxRefCurrent;

            if (divMetaFox) {
                divMetaFox.appendChild(metaFoxInstance.container);
            }

            isMetaFoxOn.current = true;
        }

        return () => {
            metaFoxRefCurrent = null;
        };
    }, []);

    return <div ref={metaFoxRef} />;
};

export default MetaFoxLogo;
```
