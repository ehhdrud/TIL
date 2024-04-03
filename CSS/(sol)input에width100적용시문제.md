## input에 width:100% 적용 시 input이 컨테이너를 넘어가는 문제

> 240403, Vue로 회원가입 페이지 만들 때 접한 문제

- input 태그에 `width: 100%;`을 줬을 때 컨테이너를 벗어나는 현상?
- input의 padding으로 인한 문제...
- `box-sizing: border-box;`로 해결!
