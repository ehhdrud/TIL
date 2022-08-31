//문자열 병합 시 주의사항
function hi(name) {
  console.log("안녕하세요\n" + (name ? name : "알 수 없음") + "님 반갑습니다");
} //우선순위를 고려하여 괄호를 통해 삼항연산자를 감싸야 함

hi("Seo");

//템플릿 리터럴을 이용한 문자열 병햡
function hi2(name) {
  console.log(`안녕하세요
${name}님 반갑습니다`);
}

hi2("Seo");
