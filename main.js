const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", function (event) {
  alert("안녕하세요");
}); //이벤트핸들러를 통해 클릭이 감지되면 함수를 실행

resetButton.removeEventListener("click", function (event) {
  console.dir(event);
}); //이벤트핸들러를 통해 이벤트 제거
