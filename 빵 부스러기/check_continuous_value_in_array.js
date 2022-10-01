function solution(arr) {
  let answer = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) answer.push(arr[i]); //앞 뒤 값이 다를 때만 그 요소를 추가해준다면, 결국 연속값은 제거된다.
  }

  return answer;
}

console.log(solution([1, 1, 1, 3, 3, 0, 1, 1, 2]));
