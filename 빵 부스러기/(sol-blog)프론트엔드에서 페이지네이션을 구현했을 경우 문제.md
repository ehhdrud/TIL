백엔드에서 다수의 게시글 데이터를 받아 이를 효율적으로 보여주기 위해 페이지네이션을 구현했다.

```js
// 프론트엔드에서 페이지네이션을 했을 때 컴포넌트 정의 (일부 코드 생략)
const PostList: React.FC = () => {
    const [postListData, setPostListData] = useState(postListDataState); // 게시글 데이터

    const [page, setPage] = useState < number > 1; // 현재 페이지
    const dataArrayLength: number = postListData ? postListData.length : 0; // 총 게시글 수
    const offset: number = (page - 1) * limit; // 각 페이지의 첫번째 PostlistItem의 Index
    const numPages: number = Math.ceil(dataArrayLength / limit); // 총 페이지 수
    const limit: number = 5; // 한 페이지에 담길 수 있는 최대 PostListItem
    const currentPageGroup: number = Math.ceil(page / 5); // 현재 페이지 그룹
    const startPage: number = (currentPageGroup - 1) * 5 + 1; // 현재 페이지 그룹에서 시작페이지
    const endPage: number = Math.min(currentPageGroup * 5, numPages); // 현재 페이지 그룹에서 마지막 페이지

    // 전체 게시글 데이터를 가져오는 함수 정의
    const getPostListData = async () => {
        try {
            const response = await axios.get('/api/posts/search');
            setPostListData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // 마운트 시 전체 게시글 데이터를 가져오는 함수 실행
    useEffect(() => {
        getPostListData();
    }, [getPostListData]);

    return (
        <PostListComponent>
            <PostListItems>
                {postListData ? (
                    postListData
                        .slice(offset, offset + limit)
                        .map((post) => <PostListItem key={post.postId} {...post} />)
                ) : (
                    <LoadingSpinner src={Spinner} alt="Loading" />
                )}
            </PostListItems>
            <ButtonGroup>
                <PaginationButtonArrow onClick={() => setPage(page - 1)} disabled={page === 1}>
                    &lt;
                </PaginationButtonArrow>
                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, index) => startPage + index
                ).map((item) => (
                    <PaginationButtonNumber
                        key={item}
                        onClick={() => setPage(item)}
                        css={item === page ? selectedButton : unselectedButton}
                    >
                        {item}
                    </PaginationButtonNumber>
                ))}
                <PaginationButtonArrow
                    onClick={() => setPage(page + 1)}
                    disabled={page === numPages}
                >
                    &gt;
                </PaginationButtonArrow>
            </ButtonGroup>
        </PostListComponent>
    );
};

export default PostList;
```

위와 같이 여러 변수를 상태로 관리하여 페이지네이션을 구현했고 잘 동작했다.

그러나 프론트엔드에서 구현한 페이지네이션은 처음에 모든 게시글 데이터를 가져와야 한다는 치명적인 단점이 존재하였다. 현재로서는 게시글의 수가 많지 않다보니 속도면에서 문제가 보이진 않았지만 규모가 커질수록 문제가 될 요인이었다. 필터링 기능도 추가된다면 이 단점은 더 부각될 것이다. 또한 데이터가 클라이언트 측으로 노출될 수도 있으니 보안 측면에서도 좋지 않다.

그래서 백엔드에서 페이지네이션을 진행해달라고 요청했고 코드를 새로 작성하였다. 결과물은 아래와 같다.

```js
// 백엔드에서 페이지네이션을 했을 때 컴포넌트 정의 (일부 코드 생략)
const PostList: React.FC = () => {
    const [postListData, setPostListData] = useRecoilState(postListDataState);
    const [totalPages, setTotalPages] = useRecoilState(totalPageState);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    const handlePaginationBtnClick = async (i: number) => {
        const navigate = useNavigate();
        const location = useLocation();

        setCurrentPage(i);
        navigate(`${location.pathname}?page=${i}`);
    };

    // 전체 게시글 데이터를 가져오는 함수 정의
    // 총 게시글 수에 대한 정보도 받아와서 총 페이지를 계산하여 상태에 저장
    const getPostListData = async () => {
        try {
            const response = await axios.get(`/api/posts/search?page=${currentPage - 1}&size=10`);
            const numPages: number = Math.ceil(response.data.totalPostCount / 10);
            setPostListData(response.data.postList);
            setTotalPages(numPages);
        } catch (error) {
            console.error(error);
        }
    };

    // 마운트 시 전체 게시글 데이터를 가져오는 함수 실행
    useEffect(() => {
        getPostListData();
    }, [getPostListData]);

    return (
        <PostListComponent>
            <PostListItems>
                {/* postListData가 null이 아니라면 postListData 배열의 정보를 토대로 PostListItem을 렌더링 */}
                {postListData ? (
                    postListData.map((post) => <PostListItem key={post.postId} {...post} />)
                ) : (
                    <LoadingSpinner src={Spinner} alt="Loading" />
                )}
            </PostListItems>
            <ButtonContainer>
                {totalPages > 0 && (
                    <PaginationButtonArrow
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                            navigate(`${location.pathname}?page=${currentPage - 1}`);
                        }}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </PaginationButtonArrow>
                )}
                {(() => {
                    const buttons = [];
                    for (let i = 1; i <= totalPages; i++) {
                        buttons.push(
                            <PaginationButtonNumber
                                key={i}
                                onClick={() => handlePaginationBtnClick(i)}
                                css={i === currentPage ? selectedButton : unselectedButton}
                            >
                                {i}
                            </PaginationButtonNumber>
                        );
                    }
                    return buttons;
                })()}
                {totalPages > 0 && (
                    <PaginationButtonArrow
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                            navigate(`${location.pathname}?page=${currentPage + 1}`);
                        }}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </PaginationButtonArrow>
                )}
            </ButtonContainer>
        </PostListComponent>
    );
};

export default PostList;
```

프론트엔드 측 페이지네이션과 다르게 페이지를 이동할 때마다 경로를 이동하였다. 해당 경로의 Query Parameter를 통해 백엔드에 각 페이지에 대한 게시글을 요청했고 이로인해 페이지를 계산하기 위해 많은 변수를 사용할 필요가 없어져 코드가 더 간결해진 모습이다.
