## Date

- 표준 Bulit-in 객체로써 날짜와 시간을 위한 속성과 메서드를 제공하는 객체
- Date 객체는 1970년 1월1일 UTC(협정 세계시) 자정과의 시간 차이를 밀리초로 나타내는 정수 값으로 표현
- 생성자 및 대표 메서드(method)
  - Date _객체_ 생성자: `new Date()`
  - 현재 시간 기준 _문자열_: `Date()`
  - 날짜 정보 얻기(년/월/일): `~~Date.getYear()~~`(비표준이라서 안 씀), `Date.getFullYear()`, `Date.getMonth()`, `Date.getDate()`
  - 날짜 정보 얻기(시/분/초/ms): `Date.getHours()`, `Date.getMinutes()`, `Date.getSeconds()`
  - 날짜 정보 설정(년/월/일): `Date.setFullYear()`, `Date.setMonth()`, `Date.setDate()`
  - 날짜 정보 설정(시/분/초/ms):`Date.setHours()`, `Date.setMinutes()`, `Date.setSeconds()`
  - 그 외 날짜 정보 얻기: `Date.getDay()`, `Date.getTime()`, `Date.getTimezoneOffset()`
  - 그 외 날짜 정보 설정
    `Date.parse("YYYY-MM-DDTHH:mm:ss.sssZ")`
    : 문자열 기반 날짜 정보 설정
    : Z는 미설정할 경우 현재 로컬 기준 UTC로, 설정할 경우 UTC+0 기준으로 시간 설정
