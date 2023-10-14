리액트와 타입스크립트를 사용하는 환경에서 QuillEditor를 이용해 게시판 에디터를 구현했다.

우선 아래 명령어를 통해 react-quill을 설치하고 import시킨다.

```bash
npm install react-quill @types/quill
```

```ts
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
```

포멧을 정의하고, 사용하고 싶은 옵션을 정의한다. 나열되었으면 하는 순서대로 나열한다

```ts
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
];

const modules = {
    toolbar: {
        container: [
            ['link', 'image', 'video'],
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ],
    },
};
```

formats, modules 통해 Quill Editor를 렌더링하기 전에 한가지 더 확인해야할 것이 있다. 바로 이미지 처리에 관한 것이다.

Quill Editor를 통해 이미지를 첨부하면 base-64 방식으로 인코딩된다. 이렇게 변환된 이미지는 너무 길어서 서버에 저장되지 않는다.

때문에 이를 변환해주는 작업이 필요했는데, 이 작업을 프론트 측에서 할 지 백엔드 측에서 할 지를 논의하여 백엔드 측에 진행하기로 하였다.

1. 이미지 첨부 버튼을 누를 때 base-64로 인코딩된 첨부 파일을 서버로 보내고 응답값을 URL로 돌려받는다.
2. 응답값인 URL을 돌려받아 사진을 렌더링하고, 게시글 저장 시 사진을 따로 백엔드로 전송하기 위해 배열 형태로 상태 저장한다.
3. 게시글 작성 시 문자열 형태인 HTML 파일과 함께 이미지 URL을 모아놓은 배열을 함께 전송한다. 이때 db에 이미지가 저장된다.

그리고 10MB 이상의 이미지는 에러로 처리하기 위해 백엔드의 application.properties에 아래 코드를 추가했다.

```
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

그렇다면 프론트엔드 측 결과물은 아래와 같다.

```js
const QuillEditor: React.FC<DataForQuillEditorComp | {}> = (props) => {
    const [title, setTitle] = useRecoilState(titleState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const setImages = useSetRecoilState(imagesUrlListState);
    const quillRef = useRef<ReactQuill>(null);

    useEffect(() => {
        // 이미지를 처리하기 위한 함수 (API: uploadImage)
        // base64 인코딩 방식은 너무 길기 때문에 부적합
        const handleImage = () => {
            const input = document.createElement('input'); // 새로운 파일 업로드 input 요소를 생성
            input.setAttribute('type', 'file'); // type 속성 file로 설정
            input.setAttribute('accept', 'image/*'); // 모든 이미지 파일만 허용
            input.click(); // 파일 선택 대화 상자를 열기 위해 <input> 요소를 클릭
            // 대화 상자에서 이미지 선택이 완료되면 실행되는 함수
            input.onchange = async () => {
                // input.files과 Quill 편집기(quillRef.current)가 존재하는지 확인
                // 하나라도 존재하지 않으면 함수 종료
                if (!input.files || !quillRef.current) return;

                // 선택된 파일을 변수에 file 변수에 넣어줌
                const file = input.files[0];

                // HTTP 요청 body를 위한 FormData 객체를 생성하여 file 추가
                const formData = new FormData();
                formData.append('image', file);

                // 이미지 업로드 버튼을 눌렀을 때의 위치를 정의하여 range 변수에 할당
                const range = quillRef.current.getEditor().getSelection(true);

                try {
                    // 서버에 post 요청을 보내 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현
                    const response = await axios.post('/api/upload', formData);

                    // 백엔드에 등록, 수정 요청 시 필요한 데이터를 따로 저장
                    setImages((prevImagesUrlList) => [...prevImagesUrlList, response.data[0]]);

                    // 에디터의 커서 위치에 이미지 삽입
                    quillRef.current
                        .getEditor()
                        .insertEmbed(range.index, 'image', response.data[0]);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        // 10MB 이상 데이터 업로드 시 에러 처리
                        if (error.message === 'Network Error') {
                            alert('이미지 크기(10MB)를 초과하였습니다.');
                        }
                    } else {
                        console.error(error);
                    }
                }
            };
        };

        // 툴바에 handleImage 함수 등록
        if (quillRef.current) {
            const toolbar = quillRef.current.getEditor().getModule('toolbar');
            toolbar.addHandler('image', handleImage);
        }

        // '게시글 수정' 시 에디터의 초기값 설정
        if ('savedTitle' in props) setTitle(props.savedTitle as string);
        if ('savedDescription' in props) setDescription(props.savedDescription as string);
        if ('savedImages' in props) setImages(props.savedImages as string[]);
        // props가 전달되지 않았다면 '게시글 작성'이므로 초기값으로 설정
        else {
            setTitle('');
            setDescription('');
            setImages([]);
        }
    }, []);

    return (
        <EditorComponent>
            <TitleComponet
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder=" title"
            />
            <Quill>
                <ReactQuillComponent
                    ref={quillRef}
                    placeholder="contents..."
                    value={description}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    onChange={setDescription}
                />
            </Quill>
        </EditorComponent>
    );
};
```
