/*
// 1. arguments 객체
//매개변수를 선언하지 않아도 사용 가능하다.
//가변인자를 넘길 때 유용하다.
//화살표 함수에는 존재하지 않는다.

//활용1
function func1() {
  return arguments;
}

console.log(func1(1, 2, 3, 4, 5)); //[Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }

//활용2
function func2() {
  const converArr = Array.from(arguments);
  return converArr.reduce((prev, curr) => prev + curr);
} //Array.form을 통해 배열로 바꿔서 Array메서드를 이용할 수도 있다.

console.log(func2(1, 2, 3, 4, 5)); //15
*/

/*
// 2. rest parameter
//다른 매개변수도 활용해서 가변 인자를 다를 수 있다.
//화살표 함수에서도 사용 가능하다.
const func = (first, second, ...nums) => {
  console.log(first); //1
  console.log(second); //2
  console.log(...nums); //3 4 5

  return nums.reduce((prev, curr) => prev + curr);
};

console.log(func(1, 2, 3, 4, 5)); //12 //3+4+5 
*/
