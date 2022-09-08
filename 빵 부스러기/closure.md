# 클로저(closure)

> 클로저 함수는 특정 데이터를 스코프 안에 가둔 채로 계속 사용할 수 있도록 하는 폐쇠성을 가짐.  
> 클로저 함수를 각각의 변수에 할당하면 각자 독립적으로 사용하고 값을 보존할 수 있기 때문에 데이터와 메서드를 묶어 모듈화하기에 용이.

```javascript
//클로저 예제1
function returnChar1(x) {
  let outerChar = x;

  return function returnChar2(y) {
    let innerChar = y;

    return outerChar + innerChar;
  };
}

const x = returnChar1("x"); //실행이 보류되고 'x'를 저장

//매개변수 2개를 모두 받아야 실행
const xy = x("y");
const xz = x("z");

console.log(xy); //xy
console.log(xz); //xz
```

```javascript
//클로저 예제2
function sum(num1) {
  return function (num2) {
    return function (num3) {
      return num1 + num2 + num3;
    };
  };
}
//위 선언식을 화살표 함수로 간단하게 표현 가능
//const sum = (num1) => (num2) => (num3) => num1 + num2 + num3;

const sum5 = sum(5);
const sum10 = sum(10);

console.log(sum5(20)(20)); //45
console.log(sum10(20)(20)); //50
```
