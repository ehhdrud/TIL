# Date

표준 Bulit-in 객체로써 날짜와 시간을 위한 속성과 메서드를 제공하는 객체이다.

Date 객체는 1970년 1월1일 UTC(협정 세계시) 자정과의 시간 차이를 밀리초로 나타내는 정수 값으로 표현된다.

## 대표 속성 및 메서드

### 1. 날짜 얻기

- `new Date()`: Date _객체_ 생성자
- `Date()`: 현재 시간 기준 _문자열_

```javascript
console.log(new Date()); //2022-08-17T11:28:20.384Z
console.log(Date()); //Wed Aug 17 2022 20:28:20 GMT+0900 (대한민국 표준시)
console.log(typeof new Date()); //object
console.log(typeof Date()); //string

console.log(new Date(0)); //1970-01-01T00:00:00.000Z
console.log(new Date(1000 * 3600 * 24); //1970-01-02T00:00:00.000Z //1일 추가

console.log(new Date("1995-12-29")); //1995-12-29T00:00:00.000Z

console.log(new Date(2021, 0, 1)); //2020-12-31T15:00:00.000Z //month:1월(0)~12월(11) //UTC 미보정값
console.log(Date.UTC(2021, 0, 1)); //2021-01-01T00:00:00.000Z //UTC 메서드를 통한 보정값
```

#### 2. 세부 정보 얻기

- ~~`Date.getYear()`~~(비표준), `Date.getFullYear()`, `Date.getMonth()`, `Date.getDate()`, `Date.getDay()`: 년/월/일/요일
- `Date.getHours()`, `Date.getMinutes()`, `Date.getSeconds()`, `Date.getMilliseconds()`: 시/분/초/ms

```javascript
let date = new Date(Date.UTC(1995, 11, 29));
console.log(date); //1995-12-29T00:00:00.000Z

//year, month, day:0(sun)~6(sat)
console.log(date.getFullYear()); //1995
console.log(date.getMonth()); //11
console.log(date.getDate()); //29
console.log(date.getDay()); //5

//hours, minutes, seconds, milliseconds
console.log(date.getHours()); //9
console.log(date.getUTCHours()); //0 //UTC 보정값
console.log(date.getMinutes()); //0
console.log(date.getSeconds()); //0
console.log(date.getMilliseconds()); //0
```

#### 3. 세부 정보 설정

- `Date.setFullYear()`, `Date.setMonth()`, `Date.setDate()`: 년/월/일
- `Date.setHours()`, `Date.setMinutes()`, `Date.setSeconds()`, `Date.setMilliseconds()`: 시/분/초/ms

```javascript
let date = new Date();
console.log(date); //2022-08-17T11:34:41.802Z

//set year
let ms_year = date.setFullYear(1995, 11, 29);
console.log(date); //1995-12-29T11:35:22.871Z
console.log(ms_year); //820236922871
console.log(new Date(ms_year)); //1995-12-29T11:35:22.871Z

//set date
date.setDate(1);
console.log(date); //1995-12-01T11:35:22.871Z
date.setDate(0); //1일보다 하루 전 날이니, 전 달의 말일로 설정된다.
console.log(date); //1995-11-30T11:35:22.871Z

//set hours
date.setHours(date.getHours() + 2);
console.log(date); //1995-11-30T13:35:22.871Z
```

#### 4. 그 외 날짜 정보 얻기

- `Date.getTime`: 계산을 위한 ms단위의 시간 정보(now-date(0)) milliseconds)
- `Date.getTimezoneOffset()`: UTC와의 시간 차이(UTC+0 - currentZone)

```javascript
let date = new Date(Date.UTC(1995, 11, 29));

console.log(date); //1995-12-29T00:00:00.000Z

console.log(date.getTime()); //820195200000
console.log(date.getTimezoneOffset()); //-540
```

#### 5. 그 외 날짜 정보 설정

- `Date.parse("YYYY-MM-DDTHH:mm:ss.sssZ")`: 문자열 기반 날짜 정보 설정. Z는 미설정할 경우 현재 로컬 기준 UTC로, 설정할 경우 UTC+0 기준으로 출력된다.

```javascript
let ms_parse = Date.parse("2022-08-17T22:00:00.000Z");
console.log(ms_parse); //1660773600000
console.log(new Date(ms_parse)); //2022-08-17T22:00:00.000Z
```
