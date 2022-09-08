function sum(num1) {
  return function (num2) {
    return function (num3) {
      return num1 + num2 + num3;
    };
  };
}
//화살표 함수로 간단하게 표현 가능
//const sum = (num1) => (num2) => (num3) => num1 + num2 + num3;

const sum5 = sum(5);
const sum10 = sum(10);

console.log(sum5(20)(20)); //45
console.log(sum10(20)(20)); //50
