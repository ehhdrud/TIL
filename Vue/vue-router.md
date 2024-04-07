## vue-router (라이브러리)

### 사용 방법

1. router/index.ts에서 `createRouter`,`createWebHistory`를 통해 router 설정

- export할 `router` 변수 생성 후 `createRouter` 할당
- `createRouter`의 첫번째 인자에 `history: createWebHistory()` 전달
- `routes` 변수를 배열로 생성하여 `path`, `name`, `component` 등의 정보를 가진 객체를 담고, `createRouter`의 두번째 인자로 전달
- main.ts에서 app에 `use(router)` 체이닝

2. `<RouterLink to="">`, `<RouterView>`를 통해 라우팅 및 보여줄 컴포넌트 위치 설정

- `:to`와 `name`을 사용하여 path가 아닌 name을 이용한 경로 설정 가능
- `:` 키워드를 통한 동적 라우팅 설정 가능

### props

- `routes` 변수의 배열에 `props` 객체를 통해 props를 전달할 수 있다. 한편 `props`의 value에 `true`를 입력하여 동적 라우팅 경로에서의 props를 받아오는 작업 등을 할 수 있다.
