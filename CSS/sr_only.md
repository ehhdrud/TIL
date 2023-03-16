# 스크린리더 전용 요소 만들기

일반 사용자에게는 보이지 않지만, 스크린 리더에게만 보이게 하려면 `position: absolute`와 `overflow: hidden`을 사용한다.

오버플로우를 발생시키기 위해 넓이와 높이를 1px로 설정한다.

```css
.sr-only {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
}
```
