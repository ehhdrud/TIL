# onClick={() => handleSubmitChildReply(reply.replyId)}와 onClick={handleSubmitChildReply(reply.replyId)}의 차이점

() => handleSubmitChildReply(reply.replyId): 이 방법은 대댓글 입력 버튼을 클릭했을 때, 화살표 함수를 통해 즉시 handleSubmitChildReply 함수가 호출되도록 만드는 것입니다. 즉, 이 방법은 클릭 이벤트가 발생하면 화살표 함수가 실행되고, 화살표 함수 안에서 handleSubmitChildReply(reply.replyId)가 호출되는 방식으로 동작합니다.

handleSubmitChildReply(reply.replyId): 이 방법은 대댓글 입력 버튼을 클릭했을 때, handleSubmitChildReply 함수를 클릭 이벤트 핸들러로 설정하는 것입니다. 즉, 클릭 이벤트가 발생하면 handleSubmitChildReply(reply.replyId) 함수가 호출되도록 만드는 것입니다.

첫 번째 방법에서는 화살표 함수를 통해 함수를 즉시 호출하기 때문에, handleSubmitChildReply(reply.replyId)가 실행되고 반환하는 값이 실제로 클릭 이벤트 핸들러로 사용되게 됩니다. 따라서 이 방법으로 대댓글 입력 버튼을 클릭하면 handleSubmitChildReply 함수가 실행되며, 원하는 동작이 수행될 수 있게 됩니다.

반면에 두 번째 방법에서는 handleSubmitChildReply(reply.replyId) 자체가 클릭 이벤트 핸들러로 설정되기 때문에, 대댓글 입력 버튼을 클릭했을 때만 함수가 실행됩니다.

두 방법 모두 동일한 결과를 얻을 수 있지만, 첫 번째 방법은 더 간결하고 인라인으로 함수를 호출하는 방식이므로 일반적으로 더 많이 사용됩니다.
