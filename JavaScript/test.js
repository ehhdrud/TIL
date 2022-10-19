function solution(n) {
  let max1 = 0;
  let max2 = 0;
  let index1 = 0;
  let index2 = 0;
  let gap = 0;

  while (n.length > 1) {
    max1 = Math.max.apply(null, n);
    index1 = n.indexOf(max1);
    n.splice(index1, 1);

    max2 = Math.max.apply(null, n);
    index2 = n.indexOf(max2);
    n.splice(index2, 1);

    if (max1 - max2 > 0) {
      gap = max1 - max2;
      n.push(gap);
    }
  }

  if (n.length > 0) {
    return n[0];
  } else return 0;
}

console.log(solution([1, 2, 3]));
