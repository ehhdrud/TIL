1. 상위 컴포넌트에서 `useRef()`를 이용해 자식 컴포넌트의 DOM에 접근
2. 자식 컴포넌트는 `forwardRef()`를 이용해 감싼다
3. 자식 컴포넌트에 `useImperativeHandle`을 이용해 상위 컴포넌트에 노출될 인스턴스를 객체안에 정의 (첫번째 인자는 ref)

> **"Component definition is missing display name react/display-name" 에러가 발생할 경우**
>
> > 해당 컴포넌트의 displayName을 설정
> > `ComponentName.displayName = "ComponentName";`
