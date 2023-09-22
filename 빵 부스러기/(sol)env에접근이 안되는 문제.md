# env에 접근이 안되는 문제

Next.js 프로젝트 중 api키를 직접 입력했을 때는 firebase가 잘 작동했지만, 보안을 위해 env를 거쳐 적용했더니 작동을 안함.

알고보니 env의 변수명도 신경을 써줘야했음.

```
// ❌
FB_API_KEY
FB_AUTH_DOMAIN
FB_PROJECT_ID
FB_STORAGE_BUCKET
FB_MESSAGE_ID
FB_APP_ID
FB_MEASUREMENT_ID
```

기존 변수명을 이렇게 설정했는데, 이게 문제였음.

```
// ✅
NEXT_PUBLIC_FB_API_KEY
NEXT_PUBLIC_FB_AUTH_DOMAIN
NEXT_PUBLIC_FB_PROJECT_ID
NEXT_PUBLIC_FB_STORAGE_BUCKET
NEXT_PUBLIC_FB_MESSAGE_ID
NEXT_PUBLIC_FB_APP_ID
NEXT_PUBLIC_FB_MEASUREMENT_ID
```

`NEXT_PUBLIC`이라는 접두사를 사용해야 클라이언트 컴포넌트에서 환경변수에 접근하는 것을 허용함.

마찬가지로, 만약 CRA 프로젝트라면 `REACT_APP`로 시작해야됨.
