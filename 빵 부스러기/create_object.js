//1. 싱글 리터럴 객체
const obj1 = {
  property: "value",
  method: function () {},
};

//2. new연산자를 통한 객체 생성
function NewObject(name) {
  this.name = name;
}
const obj2 = new NewObject("seo");

//3. Object.create([프로토타입],[객체서술자])를 통한 객체 생성: 만들 떄부터 자세하게 만들고 싶을 때
const obj3 = Object.create(Object.prototype, {
  name: {
    value: "seo",
    writable: true, //덮어쓸 수 있는지
    enumerable: true, //열거할 수 있는지
    configurable: true, //객체 서술자를 수정할 수 있는지
  },
});
