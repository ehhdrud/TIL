## vue-router (라이브러리)

### 사용 방법

1. router/index.ts에서 `createRouter`,`createWebHistory`를 통해 router 설정

- export할 `router` 변수 생성 후 `createRouter` 할당
- `createRouter`의 첫번째 인자에 `history: createWebHistory()` 전달
- `routes` 변수를 배열로 생성하여 `path`, `name`, `component` 등의 정보를 가진 객체를 담고, `createRouter`의 두번째 인자로 전달
- main.ts에서 app에 `use(router)` 체이닝

2. `<RouterLink to="">`, `<RouterView>`를 통해 라우팅 및 보여줄 컴포넌트 위치 설정

- `:to`와 `name`을 사용하여 path가 아닌 name을 이용한 경로 설정 가능. 또한 params 전달 가능(`router`에서 `props: true`로 설정해야 params를 props로 받아올 수 있음).
- `:` 키워드를 통한 동적 라우팅 설정 가능

### props

- `routes` 변수의 배열에 `props` 객체를 통해 props를 전달할 수 있다. 한편 `props`의 value에 `true`를 입력하여 동적 라우팅 경로에서의 props를 받아오는 작업 등을 할 수 있다.

### useRouter, useRouter

- useRouter는 라우터 인스턴스를, useRoute는 현재 라우트 위치 정보를 반환한다.
- `useRouter`의 `push`를 사용하면 클릭 시 페이지 이동 구현이 용이하다. `RouterLink`처럼 params 전달이 가능한데, 이 때는 항상 name을 이용한 경로를 설정해야 한다.
- `useRoute`를 사용하여 `params`, `query`, `fullPath`, `name` 등의 정보에 손쉽게 접근할 수 있다.

---

window.open(url, '\_self')와 router.push는 웹 애플리케이션에서 페이지 이동을 처리하는 두 가지 다른 방식입니다. 각각의 특징과 차이점을 설명해드리겠습니다.

window.open(url, '\_self'):

브라우저 API의 일부로, 순수한 JavaScript 함수입니다.
새 URL로 전체 페이지를 다시 로드합니다.
서버에 새로운 요청을 보냅니다.
페이지 전체가 리프레시되므로 현재 애플리케이션의 상태가 모두 초기화됩니다.
브라우저 히스토리에 새 항목을 추가합니다.

router.push (Vue Router의 경우):

Vue Router 라이브러리의 메서드입니다.
단일 페이지 애플리케이션(SPA)에서 클라이언트 사이드 라우팅을 수행합니다.
페이지 전체를 다시 로드하지 않고, 필요한 컴포넌트만 변경합니다.
서버에 새로운 요청을 보내지 않습니다 (필요한 데이터만 비동기적으로 가져올 수 있음).
애플리케이션의 현재 상태를 유지할 수 있습니다.
브라우저 히스토리에 새 항목을 추가하지만, 실제 페이지 로드 없이 URL만 변경합니다.

주요 차이점:

페이지 로드:

window.open: 전체 페이지를 다시 로드합니다.
router.push: 페이지를 다시 로드하지 않고 필요한 부분만 업데이트합니다.

애플리케이션 상태:

window.open: 애플리케이션 상태가 초기화됩니다.
router.push: 애플리케이션 상태를 유지할 수 있습니다.

성능:

window.open: 전체 페이지를 로드하므로 상대적으로 느립니다.
router.push: 필요한 부분만 업데이트하므로 일반적으로 더 빠릅니다.

사용자 경험:

window.open: 페이지 전환 시 깜빡임이 발생할 수 있습니다.
router.push: 부드러운 페이지 전환이 가능합니다.

SEO:

window.open: 각 페이지가 고유한 URL을 가지므로 SEO에 유리할 수 있습니다.
router.push: 적절한 설정 없이는 SEO에 불리할 수 있습니다 (하지만 Vue Router는 SEO 최적화 방법을 제공합니다).

일반적으로 현대적인 SPA에서는 router.push를 사용하는 것이 더 좋은 사용자 경험을 제공하고 성능상의 이점이 있습니다. 하지만 특정 상황(예: 완전히 다른 도메인으로 이동하거나, 전체 페이지 리로드가 필요한 경우)에서는 window.open이 더 적합할 수 있습니다.
