# `<table>`

## 1. `<th>`,`<td>`: 셀

`<th>`(헤더 셀, 굵은 글씨), `<td>`(일반 셀, 보통 글씨)로 표현한 행의 구성요소들을 `<tr>`로 묶어 하나의 행을 만들고, 전체를 `<table>`로 감싸 표를 나타낸다.

`<th>`의 `scope` 속성을 통해 해당 값이 행을 대표한다면 `row`, 열을 대표한다면 `col`을 입력해줄 수 있다. 외관 상의 변화는 없다.

`<th>`,`<td>`의 `rowspan`, `colspan` 속성을 통해 행,열의 길이를 늘릴 수 있다.

```html
<table>
  <tr>
    <th>나라이름</th>
    <td>인구</td>
  </tr>

  <tr>
    <th>한국</th>
    <td>5100만</td>
  </tr>

  <tr>
    <th>미국</th>
    <td>3억</td>
  </tr>

  <tr>
    <th>태국</th>
    <td>6900만</td>
  </tr>
</table>
```

## 2.2. `<thead>`, `<tbody>`, `<tfoot>`: 머릿글, 본문, 바닥글

외관 상의 변화 없이 `<thead>`로 머릿글, `<tbody>`로 본문, `<tfoot>`로 바닥글을 구분한다.

```html
<table>
  <thead>
    <tr>
      <th>나라이름</th>
      <td>인구</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>한국</th>
      <td>5100만</td>
    </tr>

    <tr>
      <th>미국</th>
      <td>3억</td>
    </tr>

    <tr>
      <th>태국</th>
      <td>6900만</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>Total</th>
      <td>4억2000만</td>
    </tr>
  </tfoot>
</table>
```

## 2.3. `<caption>`

표의 설명 또는 제목을 나타낸다. 가운데 정렬로 표현된다.

`<table>`의 첫 번째 자식이어야 한다. 설명을 아래에 넣고싶다면 CSS를 이용한다.

`<table>`이 독립적이라서 `<figure>`로 감싸져있다면, `<caption>`말고 `<figcaption>`을 사용한다.

```html
<table>
  <caption>
    나라 별 인구
  </caption>
  <tr>
    <th>나라이름</th>
    <td>인구</td>
  </tr>

  <tr>
    <th>한국</th>
    <td>5100만</td>
  </tr>

  <tr>
    <th>미국</th>
    <td>3억</td>
  </tr>

  <tr>
    <th>태국</th>
    <td>6900만</td>
  </tr>
</table>
```
