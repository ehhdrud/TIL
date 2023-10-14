1. 리액트에서 `innerHTML`을 사용하면 에러가 출력된다. Cross Site Scripting, 줄여서 XSS 공격을 막기 위함이다. XSS 보안 취약점이 생긴다면 관리자가 아닌 사람도 웹 페이지에 악성 스크립트를 삽입할 수 있다.
2. `innerHTML` 대신 `dangerouslySetInnerHTML`를 사용하면 에러 없이 잘 실행된다. 그러나 XSS 보안 취약점은 여전히 그대로이기 때문에 위험하다. 추가적인 조치가 필요하다.
3. 가장 일반적인 조치로 문자열을 필터링 해주는 것으로 위험을 방지하는 것이다. 이러한 조치는 Sanitize라고 불리는데, `dompurify` 라이브러리를 사용하면 이를 더 편리하게 가능하도록 해준다.

아래는 기존 코드로, `dangerouslySetInnerHTML`를 사용하여 HTML 요소를 렌더링하기 때문에 보안에 매우 좋지 않다.

```tsx
<PostDescription
    dangerouslySetInnerHTML={{
        __html: postContentsData.description.replace(
            /<img /g,
            '<img style="max-width: 100%; height: auto;" '
        ),
    }}
/>
```

아래와 같이 수정을 하여, XSS 공격 위험을 방지해야한다.

```bash
npm install dompurify @types/dompurify
```

```tsx
import Dompurify from 'dompurify';

...

<PostDescription
    dangerouslySetInnerHTML={{
        __html: Dompurify.sanitize(
            postContentsData.description.replace(
                /<img /g,
                '<img style="max-width: 100%; height: auto;" '
            )
        ),
    }}
/>
```
