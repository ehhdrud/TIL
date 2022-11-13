# selected 옵션의 색상 변경

![gray_selected_option](/img/gray_selected_option.PNG)

사진처럼, 선택된(`selected`) 옵션인 "전체" 문구의 색상을 회색으로 변경하려고 아래와 같이 시도해봤다.

> 👇HTML
>
> ```html
> <select>
>   <option value="" selected>전체</option>
> </select>
> ```
>
> 👇CSS
>
> ```css
> option {
>   color: var(--color-gray-700);
> }
> ```

하지만 드롭다운 메뉴를 들춰봐야 색상이 바뀔 뿐, 기본적으로 보이는 selected 옵션의 색상은 바뀌지 않고 검은색으로 유지됐다... 해결방법은 간단하다.

> 👇HTML
>
> ```html
> <select name="product" id="product">
>   <option value="" class="select-txt" selected>전체</option>
> </select>
> ```
>
> 👇CSS
>
> ```css
> select {
>   color: var(--color-gray-700);
> }
> ```

`<select>`태그에 색상을 입혀주면 된다. "전체"라는 문구가 `<option>`태그에 담겨있기 때문에 `<option>`태그에 너무 집중해버렸다ㅋ
