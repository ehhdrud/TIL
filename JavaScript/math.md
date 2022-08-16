### Math

- 표준 bulit-in 객체로써 수학적인 연산을 위한 속성값과 메서드를 제공하는 객체
- Math는 생성자 함수가 아니며, 모든 속성과 메서드는 정적이기에 Math.function()으로 언제든 호출 가능
- 대표 속성(property) 및 메서드(method)
  - 오일러 상수: `Math E`
  - PI(3.14…): `Math.PI`
  - 절대값: `Math.abs(x)`
  - 최대값: `Math.max(x)`
    최소값: `Math.min(x)`
    : 배열을 인수로 받아 최대, 최소로 산출하려면 함수 혹은 스프레드 문법 사용 필요
  - 랜덤 난수 값: `Math.random()`
  - 제곱과 제곱근: `~~Math.pow(x,y)~~`(ES6부터는 그냥 ‘\*\*’ 쓰면 됨), `Math.sqrt(x)`
  - 소수점 처리
    `Math.round(x)`: 소수점 이하 반올림
    `Math.ceil(x)`: 소수점 이하 올림
    `Math.floor(x)`: 소수점 이하 내림
