# 타입 종류

## Boolean

참(true), 거짓(false) 값이다.

## Number

Javascipt의 number 자료형을 그대로 사용한다.

## String

작은따옴표('), 큰따옴표(")는 물론 템플릿 문자열(`)까지 포함된다.

## Array

배열 타입은 [] 혹은 Array<> 두 가지 방법으로 쓸 수 있다.

```ts
let fruitsA: string[] = ['Apple', 'Banana', 'Mango'];
let fruitsB: Array<string> = ['Apple', 'Banana', 'Mango'];
```

## Tuple

튜플은 배열의 서브타입으로, 크기와 타입이 고정된 배열이다. 이를 밀집 배열이라고도 한다.

```ts
let x: [string, number];
```

타입 뿐만 아니라 값 자체를 고정시킬 수도 있다. 이를 강한 타입이라고 한다.

```ts
let tuple: [1, number];
```

할당에 국한 된다. 즉 push(), splice() 등을 통해 값을 넣는 행위는 막을 수 없다.

```ts
let tuple: [string, number];
tuple = ['a', 1];
tuple = ['b', 2];

tuple.push(3);
console.log(tuple); // ['b', 2, 3];

tuple.push(true); // Error - 그렇다고 해서 튜플에 정의되지 않는 타입을 넣을수는 없다.
```

## Enum

특정 값(상수)들의 집합을 의미한다.

튜플 타입이 특정 타입이나 값을 고정하는 배열이라면, Enum은 특정 값을 고정하는 또다른 독립된 자료형이다.

```ts
// 상수 집합
enum Avengers {
    SpiderMan,
    IronMan,
    Thor,
    Hulk,
}

let hero: Avengers = Avengers.SpiderMan; // 0
```

enum은 인덱스 번호로도 접근할 수 있다.

```ts
enum Avengers {
    SpiderMan,
    IronMan,
    Thor,
    Hulk,
}

let hero: Avengers = Avengers[0];
```

## Object

typeof 연산자가 "object"로 반환하는 모든 타입으로, 객체, 배열, 함수 등이 대표적이다. 원시 타입을 제외한 나머지 전부를 의미한다.

여러 타입의 상위 타입으로 인식되기 때문에 타입스크립트에서 object를 그대로 타입으로 쓰기에는 애로사항이 있다.

```ts
let obj: object = {};
let arr: object = [];
let func: object = function () {};
let nullValue: object = null;
let date: object = new Date();
```

object 타입에 값을 주고 조회해보면 에러가 나버린다.

```ts
const player: object = { name: 'nico' };
player.name; // Error
```

따라서 정말 객체에 타입을 지정해주고 싶다면 다음과 같이 객체 속성(Properties)들에 대한 타입을 개별적으로 지정하는 식으로 사용한다.

```ts
let userA: { name: string; age: number };
userA = {
    name: 'HEROPY',
    age: 123,
};

let userB: { name: string; age: number };
userB = {
    name: 'inpa',
    age: false, // Error
    email: 'inpa@naver.com', // Error
};
```

가독성을 위해 type 리터럴이라고 불리우는 alias 기능과 interface 라는 문법을 추가했다.

```ts
type UserType = {
    name: string;
    age: number;
};

interface UserInterface {
    name: string;
    age: number;
}
```

## Any

any 타입은 단어 의미 그대로 모든 타입에 대해서 허용한다는 의미이다.

자바스크립트에서 사용하던 변수의 타입이 사실 any라고 봐도 무방하다.

```ts
const a: any[] = [1, 2, 3, 4];
const b: any = true;

a + b; // 배열과 불리언을 더했는데 컴파일이 허용하고 있다
```

## Unknown

Unknown은 알 수 없는 타입을 의미하며, any와 같이 모든 데이터 타입을 받을 수 있다.

그러나 할당된 값이 어떤 타입인지 모르기 때문에 함부로 연산을 할 수 없다.

```ts
let valueNum: unknown = 10;
let valueStr: unknown = 'Test';

console.log(valueNum.length); // 문제 발생
console.log(valueStr.length); // 문제 발생
```

## Null / Undefined

자바스크립트에서도 undefined가 하나의 자료형이자 값이었던 것 처럼, 타입스크립트에서도 null과 undefined 타입이 있다.

```ts
let nullable: null = null;
let undefinedable: undefined = undefined;
```

기본적으로 null 과 undefined는 다른 모든 타입의 하위 타입으로 치부된다.즉, null과 undefined를 아무 여러 타입에 할당할 수 있다는 것을 의미한다.

```ts
/* strick 모드가 아닐경우에만 대입이 가능함 */
let num: number = undefined;
let str: string = null;
let obj: { a: 1; b: false } = undefined;
let arr: any[] = null;
let und: undefined = null;
let nul: null = undefined;
let voi: void = null;
```

## Never

never 타입은 어떠한 자료형 값을 담기 위한 타입이 아니다.

never 타입은 타입스크립트에서 잘못된 것을 알려주기 위한 키워드로써, 단어 그대로 절대 발생할 수 없는 타입을 나타낸다

예를 들어 빈 배열을 타입으로 잘못 선언한 경우, never를 볼 수 있다.

```ts
const never: [] = [];
never.push(3); // 'number' 형식의 인수는 'never' 형식의 매개 변수에 할당될 수 없습니다.
```

## Void

함수에서 반환 값이 없을 때 반환 타입을 표현하기 위해 쓰인다.

```ts
function hello(n: number): void {
    let sum: number = n + 1;
}

const hi: void = hello(1); // 값을 반환하지 않는 함수는 실제로는 undefined를 반환
console.log(hi); // undefined
```

## Literal

문자열과 숫자에 한해서 직접 값 자체를 타입으로도 선언이 가능하다.

### 숫자 리터럴(Numeric Literal Types)

숫자 값을 정확하게 지정할 때 사용된다.

```ts
const numA: 3 = 3;
const numB = 3; // const는 값이 바뀔 수가 없으니 타입 생략 가능,
```

```ts
// 1 ~ 6 까지 주사위 숫자를 반환 하는 함수
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
}
```

### 문자열 리터럴(String Literal Types)

문자값을 정확하게 지정할 때 사용된다.

```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

function animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
        // ...
    } else if (easing === 'ease-out') {
    } else if (easing === 'ease-in-out') {
    } else {
        // null이나 undefined를 전달하면 필터링 실행
    }
}

animate(0, 0, 'ease-in');
```

## Union

유니언은 2개 이상의 타입을 허용하는 경우 사용하고 '|'를 통해 타입을 구분한다.

```ts
let union: string | number;
union = 'Hello type!';
union = 123;
union = false; // Error

// 배열에 문자열과 넘버만을 허용
// 튜플과 달리 자유로움
let array: (string | number)[] = ['Apple', 1, 2, 'Banana', 'Mango', 3];
let array: Array<string | number> = ['Apple', 1, 2, 'Banana', 'Mango', 3];
```

## Intersection

2개 이상의 타입을 조합하는 경우 사용된다.

유니언을 마치 OR로 이해한다면, 인터섹션은 AND로 보면 된다.

interface의 extends 기능을 Type Alias에서 사용할 수 있다.

```ts
type Person = {
    name: string;
    age: number;
};
type Developer = {
    name: string;
    skill: number;
};

// 두 타입을 합쳐 하나의 { name: string, age: number, skill: number } 이라는 타입을 구성한다.
const neo: Person & Developer = {
    name: 'Neo',
    age: 85,
    skill: 11,
};
```

## Type Alias

Type Alias는 사용자가 정의하는 타입 변수이다.

```ts
type Operation = {
    version: string;
    el: (selector: string) => void;
    css: (prop: string) => void;
};

let Dom: Operation = {
    version: '0.0.1',
    el() {},
    css() {},
};
```

## Interface

Type Alias처럼 사용자가 정의하는 타입 변수이다. 타입 지정 뿐만 아니라 estends를 통한 확장이 가능하다.

```ts
interface Person {
    name: string;
    age: number;
}

interface Developer extends Person {
    // 인터페이스 상속
    skill: string;
}

function logUser(obj: Developer) {
    console.log(obj.name);
    console.log(obj.age);
    console.log(obj.skill);
}

let person = {
    name: 'Capt',
    age: 28,
    skill: 'typescript, javascript',
};

logUser(person);
```

또한 동일한 변수명을 선언하면 자동으로 확장된다. (Type Alias는 에러 발생)

```ts
interface Person {
    name: string;
    age: number;
}

interface Person {
    name: string;
    skill: string;
}

function logUser(obj: Developer) {
    console.log(obj.name);
    console.log(obj.age);
    console.log(obj.skill);
}

let person = {
    name: 'Capt',
    age: 28,
    skill: 'typescript, javascript',
};

logUser(person);
```

## Generic

타입을 파라미터화한 타입으로, 코드의 재사용성을 높일 수 있다. 식별자 뒤에 `<T>`를 붙여서 정의한다. 호출 시 명시적으로 지정할 수도 있고, 지정하지 않아도 타입 추론을 통해 자동으로 타입이 지정된다.

어떤 타입이 들어올지 모를 때, 혹은 들어올 수 있는 타입의 종류가 많을 때 주로 사용할 수 있다.

```ts
function identity<T>(arg: T): T {
    return arg;
}

// 숫자를 전달할 때
let outputNumberOne = identity(5); // 타입 추론을 통해 outputNumberOne 타입은 number
let outputNumberTwo = identity<number>(5); // 명시적으로 작성해도 된다.

// 문자열을 전달할 때
let outputStringOne = identity("Hello"); // 타입 추론을 통해 outputString 타입은 string
let outputStringTwo Two= identity<string>("Hello"); // 명시적으로 작성해도 된다.
```

> **🙏 참고 자료**
>
> [인파 블로그](https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%83%80%EC%9E%85-%EC%84%A0%EC%96%B8-%EC%A2%85%EB%A5%98-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC#%ED%83%80%EC%9E%85_-_array '인파 블로그')
