# 논리 연산자

## 1. AND 연산자

AND 연산자는 `&&`로 표현되며 앞 뒤로 한 개의 피연산자를 가진다. 두 피연산자가 모두 `true`인 경우에만 `true`를 반환하고, 그렇지 않은 모든 경우에 `false`를 반환한다.

한편, `true && expression`일 때 `expression`으로 평가되고, `false && expression`일 때 `false`로 평가된다. 이는 조건문으로 활용할 수 있다.

즉, 첫 번째 피연산자가 `true`라면 두 번째 피연산자가 반환되고, `false`라면 첫 번째 피연산자가 반환되는 것이다.

```js
true && 1; // 1
true && "hello"; // "hello"
false && 1; // false
false && "hello"; // false
```

## 2. OR 연산자

OR 연산자는 `||`로 표현되며 앞 뒤로 한 개의 피연산자를 가진다. 두 피연산자가 모두 `false`인 경우에만 `false`를 반환하고, 그렇지 않은 모든 경우에 `true`를 반환한다.

한편, `true || expression`일 때 `true`으로 평가되고, `false || expression`일 때 `expression`로 평가된다. 이는 조건문으로 활용할 수 있다.

즉, 첫 번째 피연산자가 `true`라면 첫 번째 피연산자가 반환되고, `false`라면 두 번째 피연산자가 반환되는 것이다.

```js
true || 1; // true
true || "hello"; // true
false || 1; // 1
false || "hello"; // "hello"
```

## 3. NOT 연산자

NOT 연산자는 `!`로 표현되며 뒤에 하나의 피연산자를 가진다. 피연산자가 `true`일 경우 `false`를, `false`인 경우 `true`를 반환한다.

---

> **📌 AND, OR, NOT을 활용한 예제**
>
> ```js
> const age = 20;
> const genderType = "GIRL";
>
> const isAdult = age > 19;
> const isMAN = genderType === "MAN";
>
> if (isAdult && isMAN) console.log("나는 성인 남성이다.");
> if (!isAdult) console.log("나는 성인이 아니다");
>
> function getName(firstName, lastName) {
> /_
> const fName = firstName === undefined ? "홍" : firstName;
> const lName = lastName === undefined ? "길동" : lastName;
> _/
> const fName = firstName || "홍";
> const lName = lastName || "길동";
>
> return "저는 " + fName + lName + "입니다.";
> }
>
> console.log(getName(undefined, "동경"));
>
> ```
