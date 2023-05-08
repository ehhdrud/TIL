# React Suspense

React Suspense는 데이터 로딩이나 코드 분할 등과 같이 지연되는 작업을 처리하는 데 사용된다. Suspense는 React에서 데이터 로딩 및 코드 분할과 같은 비동기 작업을 처리할 때, 사용자가 로딩 상태를 기다리는 동안 대기 시간을 보낼 필요 없이 쉽게 처리할 수 있도록 한다.

Suspense를 사용하지 않는다면 "워터풀"을 겪을 수 있다. 워터폴이란 비동기 작업이 이전 작업의 완료를 기다리는 동안 발생하는 지연 현상을 말한다. 예를 들어, 어떤 컴포넌트에서 첫 번째 비동기 작업이 완료되기 전까지 두 번째 비동기 작업이 시작되지 않는 경우 워터폴이 발생하므로, 성능 저하가 일어난다. 그렇다면 Promise.all 등을 활용하여 병렬로 여러 개의 비동기 작업을 수행하고, 모든 작업이 완료될 때까지 기다린 후에 결과를 반환하는 방식을 사용할 수 있다. 이방식은 워터풀 문제는 해결할 수 있지만, 모든 데이터를 불러온 후에야 화면을 렌더링할 수 있기 때문에 대기 시간이 짧은 비동기 작업 역시 뒤늦게 처리된다는 단점이 있다.

Suspense를 사용하면 기존의 'Start fetching - **Finish fetching** - **Start rendering**' 방식을 'Start fetching - **Start rendering** - **Finish fetching**' 방식으로 변경할 수 있다. 즉 응답이 오는 것을 기다리지 않아도 되기 때문에, 로딩이 완료되지 않아도 컴포넌트가 렌더링을 시작한다. 렌더링 중 아직 불러온 데이터가 없다면 이 컴포넌트는 "정지"되고, 리액트는 이 컴포넌트를 스킵한 후 다른 컴포넌트의 렌더링을 시도한다.

## 2. React-Query와 Suspense

React-Query는 Suspense를 이용한 개발을 지원하는 라이브러리이다. React-Query에서는 useQuery 훅을 사용하여 데이터를 불러올 수 있으며, 이 훅을 사용하면 데이터가 로딩 중인지, 성공적으로 로딩되었는지, 에러가 발생했는지 등의 상태를 손쉽게 다룰 수 있는데, 이와 함께 Suspense fallback 컴포넌트를 이용한다면 로딩 상태를 쉽게 핸들링할 수 있다.

아래 방식으로 React-Query에 Suspense를 세팅할 수 있다.

```js
// 전역 세팅
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
```

```js
// 개별 세팅
useQuery(queryKey, queryFn, { suspense: true });
```

Suspense Mode는 Suspense 컴포넌트를 사용하여 구현되며, Suspense 컴포넌트 내에서 비동기 작업을 처리한다. Suspense 컴포넌트의 fallback 속성은 로딩 상태를 처리한다. fallback 속성에는 일반적으로 로딩 상태를 보여주는 컴포넌트를 지정한다. 어떤 트리의 모든 컴포넌트를 렌더링해도 렌더링할 데이터를 찾지 못한다면, 해당 트리의 '위'에 존재하는 가장 가까운 Suspense 컴포넌트의 fallback 속성을 찾아 출력한다. 이렇게 위쪽에서 대체 컨텐츠를 찾는 특성은 컴포넌트 내부에서 처리할 코드를 줄여주는 장점이 있다.

```js
<QueryClientProvider client={queryClient}>
  <Suspense fallback={<span>Loading...</span>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  </Suspense>
</QueryClientProvider>
```

useQuery는 기본적으로 병렬적으로 동작하지만 Suspense Mode로 사용하면 useQuery는 병렬적으로 동작하지 않는다. 이를 해결하기 위해 useQuery말고 useQueries를 통해 병렬 처리를 구현한다.

```js
const results = useQueries([
  { queryKey: ["@getUser"], queryFn: getUser, staleTime: Infinity },
  { queryKey: ["@getPosts"], queryFn: getPosts, staleTime: Infinity },
]);
```
