# 예외 처리(Exception Handling)

코드 실행 중 에러가 발생했을 때, 코드 실행의 흐름을 복구할 수 있는 기능을 추가해야 한다.

## `try`-`catch`-`finally`

- `try`: 실행될 구문을 정의한다.
- `catch`: 에러가 발생되면 실행되는 구문을 정의한다.
- `fanally`: 언제나 실행되는 구문을 정의한다.

```javascript
try {
  x();
} catch (err) {
  console.error(err); //ReferenceError: x is not defined at ...
  console.error("에러발생"); //에러 발생
} finally {
}
```

## `throw`

예외를 강제로 발생시켜야 할 경우에 사용한다.

```javascript
function login(id, pw) {
  if (id === "zero" && pw === 0000) {
    return true;
  }

  throw new Error("로그인 실패"); //개발자가 에러를 정의한다.
}

try {
  login("one", 1234);
} catch (err) {
  console.error(err); //Error: 로그인 실패 at ...
  console.error("에러 발생"); //에러 발생
} finally {
  console.log("로그인 시도 시간: " + new Date());
}
```

## `stack`

에러를 추적하고자 할 때 사용한다.

```javascript
function x() {
  a();
}
try {
  a();
} catch (err) {
  console.error(err.stack); //ReferenceError: a is not defined at ... //스택 형식으로 에러가 쌓인다.(❗)
}
```

## 커스텀 에러

에러 객체에서 확장한 *커스텀 에러 객체*를 정의하여 더 많은 에러를 다룰 수 있다.

```javascript
//❗
class LoginError extends Error {
  constructor(message) {
    super(message);

    this.name = "Login Error";
  }
}
function login(id, pw) {
  if (id === "zero" && pw === 0000) {
    return true;
  }
  if (id !== "zero") {
    throw new LoginError("아이디 불일치");
  }
  if (pw !== 0000) {
    throw new LoginError("패스워드 불일치");
  }

  throw new Error("로그인 실패"); //개발자가 에러를 정의한다.
}

try {
  login("one", 1111);
} catch (err) {
  console.error(err); //Error: 로그인 실패 at ...
  if (err instanceof LoginError) {
    console.error("로그인 에러가 발생했습니다");
  }
  console.error("에러 발생"); //에러 발생
} finally {
  console.log("로그인 시도 시간: " + new Date());
}
```
