# onClick={handleClick(param)} vs onClick={() => handleClick(param)}

## onClick={handleClick(param)}

이 방법을 사용하면 클릭할 때 함수가 실행되는 것이 아니라, 바로 실행된다. 이렇게 사용하면 안된다. 매개변수가 없다면 그냥 `onClick={handleSubmitChildReply}` 이런 식으로 작성하는 것은 가능.

## onClick={() => handleClick(param)}

이 방법이 올바른 방법. 대댓글 입력 버튼을 클릭했을 때, 화살표 함수를 통해 즉시 handleSubmitChildReply 함수가 호출되도록 만든다. 매개 변수가 있다면 무조건 이렇게!!
