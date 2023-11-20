# Link 태그를 통한 컴포넌트 간 데이터 전송

```tsx
// 데이터를 전송하려는 컴포넌트
import { Link } from 'react-router-dom';

<Link to={`/posts/${postId}/editpost`} state={{ dataForEdit }}>
```

```tsx
// 데이터를 받는 컴포넌트
const location = useLocation();

const dataForEdit = location.state.dataForEdit;
```
