# onClick={handleClick(param)} vs onClick={() => handleClick(param)}

리액트에서 onClick으로 매개변수를 포함한 함수를 실행하고자 할 때 문제 상황 발생

## 1. `onClick={funcName(param)}`

이 방법을 사용하면 클릭할 때 함수가 실행되는 것이 아니라, 바로 실행된다. 이렇게 사용하면 리액트는 화면이 Render 되면서 계속해서 이벤트가 발생되기 때문에 우리가 원하는 특정 이벤트일 때 결과를 얻는 이벤트는 적용할 수 없다. 매개변수가 없다면 `onClick={funcName}`로 작성해도 정상 동작한다.

## `onClick={() => funcName(param)}`

매개변수가 있다면 이렇게 화살표 함수를 사용하는 방법이 올바른 방법이다.
