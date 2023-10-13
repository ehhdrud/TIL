# Link 태그를 통한 컴포넌트 간 데이터 전송

컴포넌트 A에서는 아래와 같이 Link를 정의할 때 state 속성을 통해 데이터를 전달할 수 있다.

```tsx
import { Link } from 'react-router-dom';

<Link to={`/posts/${postId}/editpost`} state={{ dataForEdit }}>
```

컴포넌트 B에서는 아래처럼 데이터를 받아온다.

```tsx
const location = useLocation();

const dataForEdit = location.state.dataForEdit;
```
