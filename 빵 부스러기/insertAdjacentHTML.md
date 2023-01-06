# Element.insertAdjacentHTML(position, text);

insertAdjacentHTML() 메서드는 HTML or XML 같은 특정 텍스트를 파싱하고, 특정 위치에 DOM tree 안에 원하는 node들을 추가 한다. 이미 사용중인 element 는 다시 파싱하지 않는다. 그러므로 element 안에 존재하는 element를 건드리지 않는다. (innerHTML과는 좀 다름). innerHTML보다 작업이 덜 드므로 빠르다.

> 📌position의 키워드  
> `"beforebegin"`: element 앞에
>
> `"afterbegin"`: element 안에 가장 첫번째 child
>
> `"beforeend"`: element 안에 가장 마지막 child
>
> `"afterend"`: element 뒤에
