const me = {
  name: "동경",
  sayName: function () {
    return this.name + "입니다.";
  },
};

const you = {
  name: "현석",
  sayName: function () {
    return this.name + "입니다.";
  },
};

function sayFullName(firstName) {
  return firstName + this.sayName();
}

const result1 = sayFullName.call(me, "서");
console.log(result1);

const result2 = sayFullName.apply(me, ["서"]);
console.log(result2);

const boundSay = sayFullName.bind(me);
const result3 = boundSay("서");
console.log(result3);
