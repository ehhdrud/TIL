# `<picture>`

`<picture>`태그는 `<img>`태그의 다중 이미지 리소스(multiple image resources)를 위한 컨테이너를 정의할 때 사용한다. 반응형 이미지를 정의할 때 용이하다.

> **📌예제 1**
>
> ```html
> <picture>
>   <source
>     media="(min-width: 700px)"
>     srcset="/examples/images/people_960.jpg"
>   />
>   <source
>     media="(min-width: 400px)"
>     srcset="/examples/images/people_575.jpg"
>   />
>   <img src="/examples/images/people_200.jpg" alt="People" />
> </picture>
> <!-- 여러개의 source 태그를 순차적으로 탐색하여 조건에 맞는 사이즈의 이미지를 가져온다. 모든 조건을 충족하지 않는다면 img 태그의 이미지를 가져온다. -->
> ```
>
> **📌예제 2**
>
> ```html
> <picture>
>   <source srcset="/assets/logo/logo.webp" type="image/webp" />
>   <img src="/assets/logo/logo.png" alt="logo" />
> </picture>
> <!-- source 태그 내 조건을 만족하면 source 태그의 webp 이미지를, 그렇지 않으면 img 태그의 png 이미지를 가져온다. -->
> ```
