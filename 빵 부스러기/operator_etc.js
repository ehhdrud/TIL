// 1. 쉼표: 우측 값을 리턴
let test = (123456, "ABC"); //혼란스럽기에 의도적으로 사용하는 것은 권장되지 않는다.
console.log(test); //ABC

// 2. void: undefined를 출력하는 연산자, 주로 표현식을 버릴 때 사용한다.
console.log(void 1); //undefined
console.log(void 0); //undefined
console.log(void (10 + 10)); //undefined
