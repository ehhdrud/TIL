//truthy(참 같은 값) => 굳이 boolean으로 변환하지 않아도 true.
if (true) {
  console.log("참입니다1");
}
if ({}) {
  console.log("참입니다2");
}
if ([]) {
  console.log("참입니다3");
}
if (-42) {
  console.log("참입니다4");
}
if ("false") {
  console.log("참입니다5");
}
if (new Date()) {
  console.log("참입니다6");
}
if (12n) {
  console.log("참입니다7");
}
if (Infinity) {
  console.log("참입니다8");
}

//falsy => 굳이 boolean으로 변환하지 않아도 false.
if (false) {
} else {
  console.log("참입니다1");
}
if (null) {
} else {
  console.log("참입니다2");
}
if (undefined) {
} else {
  console.log("참입니다3");
}
if (0) {
} else {
  console.log("참입니다4");
}
if (-0) {
} else {
  console.log("참입니다5");
}
if (0n) {
} else {
  console.log("참입니다6");
}
if (NaN) {
} else {
  console.log("참입니다7");
}
if ("") {
} else {
  console.log("참입니다8");
}
