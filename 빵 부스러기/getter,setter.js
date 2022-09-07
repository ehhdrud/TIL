/**
 * 프로퍼티 접근자: 본질은 함수인데 외부 코드에서는 함수가 아닌 일반적인 프로퍼티 처럼 보임
 * 자바스크립트 프로토타입에 직접 접근하는 것이 아니라, 접근 제어자를 통해 접근하도록 도와줌
 * 이를 실제 프로퍼티 값을 감싸는 래퍼(Wrapper)처럼 사용한다면, 프로퍼티 값을 통제하기에 유용함
 * getter:획득자, setter:설정자
 */
const person = {
  fname: "seo",
  lname: "dong-kyeong",

  //getter 메서드
  get firstName() {
    return this.fname.toUpperCase();
  },

  //setter 메서드
  set firstName(newFirstName) {
    if (newFirstName !== "string") {
      this.fname = "undifined first name";

      return;
    }
    this.fname = newFirstName;
  },

  //getter 메서드2
  get fullName() {
    return this.fname + ` ` + this.lname;
  },
};

console.log(person.firstName); //SEO
console.log(person.fullName); //seo dong-kyeong
