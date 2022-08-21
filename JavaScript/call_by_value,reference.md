# Call by value: 값에 의한 복사

> 함수 내에서 매개 변수 값을 변경시켜도 영향을 미치지 않음  
> 원시형(number, string, boolian, null, undefined, symbol)을 매개 변수로 넘겼을 때 발생

```javascript
//Call by value
let a = 1;
let add = function (b) {
  b = b + 1;
}; //callee
add(a); //caller
console.log(a); //1 //b가 2가 되어도 a는 변하지 않음
```

# Call by reference: 주소에 의한 복사

> 함수 내에서 매개 변수 값을 변경시키면 원본 데이터에 영향을 받음  
> 참조형(object, array, function 등)을 매개 변수로 넘겼을 때 발생(주소값을 갖기 때문에)

```javascript
//Call by reference
var a = { v: 1 };
var add = function (b) {
  b.v = b.v + 1;
}; //callee
add(a); //caller
console.log(a); //2 //b_가 2가 되면 a_도 같이 변함
```
