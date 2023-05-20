# Q

```jsx
<div className="art-img-container">
  <img className="art-img" src={art.path} alt={`${art.artist}'s artwork`} />
</div>
```

이 요소에서 사진 밑에 약간의 공백이 생기는데 이게 도대체 뭔지 모르겠어.

# A

공백이 생기는 이유는 일반적으로 <img> 태그는 inline 요소로 간주되기 때문입니다. inline 요소는 자체적으로 줄바꿈이나 공백 처리 규칙이 있어서 약간의 공백이 발생할 수 있습니다.

해결하기 위해 두 가지 방법이 있습니다:

vertical-align 속성 사용: .art-img 클래스에 vertical-align: middle;을 추가하여 이미지를 수직으로 중앙에 정렬합니다.

```css
.art-img {
  vertical-align: middle;
}
```

display 속성 변경: .art-img 요소를 block이나 inline-block으로 변경하여 공백을 제거할 수 있습니다.

```css
.art-img {
  display: block; /* 또는 inline-block */
}
```
