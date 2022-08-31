//매개변수는 순서가 중요해 그에 따른 문제가 발생함
function func1(p1, p2, p3, p4) {
  console.log(p1); //undefined
  console.log(p2); //2
  console.log(p3); //undefined
  console.log(p4); //4
}

let result1 = func(undefined, 2, undefined, 4); //이런식으로 넘겨줄 수 밖에 없음

//매개변수로 객체를 사용하면 해결 가능
function func2(objP) {
  const p1 = objP.p1;
  const p2 = objP.p2;
  const p3 = objP.p3;
  const p4 = objP.p4;
}

let result2 = func({
  p2: 2,
  p4: 4,
});
