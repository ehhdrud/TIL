# Date

> 표준 Bulit-in 객체로써 날짜와 시간을 위한 속성과 메서드를 제공하는 객체.  
> Date 객체는 1970년 1월1일 UTC(협정 세계시) 자정과의 시간 차이를 밀리초로 나타내는 정수 값으로 표현.

## 대표 속성 및 메서드

### 1. 날짜 얻기

- Date **객체** 생성자: `new Date()`
- 현재 시간 기준 **문자열**: `Date()`

```javascript
//default
let date_now = new Date();
let date_now_str = Date();

console.log(date_now); //2022-08-17T11:28:20.384Z
console.log(date_now_str); //Wed Aug 17 2022 20:28:20 GMT+0900 (대한민국 표준시)
console.log(typeof date_now); //object
console.log(typeof date_now_str); //string

//ms
let date_ms_1 = new Date(0);
console.log(date_ms_1); //1970-01-01T00:00:00.000Z
let date_ms_2 = new Date(1000 * 3600 * 24); //1일 추가 -> '()'의 값이 추가됨
console.log(date_ms_2); //1970-01-02T00:00:00.000Z

let date_string = new Date("1995-12-29"); //"YYYY-MM-DD" 양식 지켜야 출력됨
console.log(date_string); //1995-12-29T00:00:00.000Z

let date_params_1 = new Date(2021, 0, 1); //month:1월(0)~12월(11)
console.log(date_params_1); //2020-12-31T15:00:00.000Z //아직 UTC보정 안돼서 이상한 값 나옴
let date_params_2 = new Date(Date.UTC(2021, 0, 1)); //UTC 메서드를 통해 보정
console.log(date_params_2); //2021-01-01T00:00:00.000Z
```

#### 2. 세부 정보 얻기

- 년/월/일/요일: `~~Date.getYear()~~`(비표준이라서 안 씀), `Date.getFullYear()`, `Date.getMonth()`, `Date.getDate()`, `Date.getDay()`
- 시/분/초/ms: `Date.getHours()`, `Date.getMinutes()`, `Date.getSeconds()`

```javascript
let date = new Date(Date.UTC(1995, 11, 29)); //UTC보정값 //그냥 new Date();로 출력하면 조금 다르게 나옴

console.log(date); //1995-12-29T00:00:00.000Z

//year, month, day:0(sun)~6(sat)
console.log(date.getFullYear()); //1995
console.log(date.getMonth()); //11
console.log(date.getDate()); //29
console.log(date.getDay()); //5

//hours, minutes, seconds, milliseconds
console.log(date.getHours()); //9
console.log(date.getUTCHours()); //0 //UTC보정값
console.log(date.getMinutes()); //0
console.log(date.getSeconds()); //0
console.log(date.getMilliseconds()); //0

//getTime: (now-date(0)) milliseconds
//getTimezonOffset: (UTC+0 - currentZone) minutes
console.log(date.getTime()); //820195200000 //계산을 위해 ms단위로 시간값을 받음
console.log(date.getTimezoneOffset()); //-540 //UTC와 얼마나 차이나는지 보여줌
```

#### 3. 세부 정보 설정

- 년/월/일: `Date.setFullYear()`, `Date.setMonth()`, `Date.setDate()`
- 시/분/초/ms:`Date.setHours()`, `Date.setMinutes()`, `Date.setSeconds()`

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
date.setDate(0); //1일보다 하루 전 날이나까 전 달의 말일로 설정됨
console.log(date); //1995-11-30T11:35:22.871Z

//set hours
date.setHours(date.getHours() + 2);
console.log(date); //1995-11-30T13:35:22.871Z
```

#### 4. 그 외 날짜 정보 얻기

- `Date.getTime()`: 계산을 위한 ms단위 시간값을 받음
- `Date.getTimezoneOffset()`: UTC와 얼마나 차이나는지 보여줌

```javascript
let date = new Date(Date.UTC(1995, 11, 29));

console.log(date); //1995-12-29T00:00:00.000Z

//getTime: (now-date(0)) milliseconds
//getTimezonOffset: (UTC+0 - currentZone) minutes
console.log(date.getTime()); //820195200000
console.log(date.getTimezoneOffset()); //-540
```

#### 5. 그 외 날짜 정보 설정

- `Date.parse("YYYY-MM-DDTHH:mm:ss.sssZ")`: 문자열 기반 날짜 정보 설정, Z는 미설정할 경우 현재 로컬 기준 UTC로, 설정할 경우 UTC+0 기준으로 시간 설정

```javascript
let ms_parse = Date.parse("2022-08-17T22:00:00.000Z");
console.log(ms_parse); //1660773600000
console.log(new Date(ms_parse)); //2022-08-17T22:00:00.000Z
```
