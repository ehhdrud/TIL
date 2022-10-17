## length 단위

## 1. 절대길이

출력 수단의 크기를 알 수 있을 때의 물리적 측정 거리를 나타내는 고정값이다.

주로 `px`을 사용한다

절대길이로 스타일을 적용하면 브라우저에서 크기를 조절하더라도 크기가 변하지 않는다.

## 2. 상대길이

어떤 다른 거리와의 상대적 비율을 나타낸다.

### 2.1. 글꼴 관련 상대길이

- `em`: 부모의 폰트 사이즈를 기준으로 한 계산값
  - 부모의 `font-size`를 `em`으로 설정할 때는 브라우저의 폰트 사이즈 값을 기준으로 한다.
  - `%`는 부모의 값을 기준으로 한 계산값으로 `em`과 유사하지만 length 단위는 아니다.
- `rem`: root의 폰트 사이즈를 기준으로 한 계산값

### 2.2. 뷰포트 관련 상대길이

`vmin`, `vmax`는 주로 가로 모드, 세로 모드에 대응하기 위해 사용한다.

- `vh`: 뷰포트의 초기 컨테이닝 블록 높이 1%
- `vw`: 뷰포트의 초기 컨테이닝 블록 너비 1%
- `vmin`: vw와 vh 중 작은 것
- `vmax`: vw와 vh 중 큰 것

## 3. 함수 표기법

반응형 웹사이트를 구성하고자 할 때 유용하다.

IE 환경에서는 사용할 수 없음을 주의한다.

- `calc()`: CSS 속성의 값으로 산칙연산이 가능한 계산식을 지정할 수 있다. 연산자 좌우에는 공백을 작성해야 한다.
- `min()`: `,`로 구분된 나열값에서 가장 작은 값. 나열값에 변동이 있으면 최소값도 변한다.
- `max()`: `,`로 구분된 나열값에서 가장 큰 값. 나열값에 변동이 있으면 최대값도 변한다.