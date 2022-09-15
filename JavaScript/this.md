# this

> this란 예약어다.  
> 주로 함수에서의 this는 전역 공간을 가르키고, 메서드에서의 this는 호출한 객체의 공간을 가르킨다.

```javascript
let user = {
  name: "SDK",
};

let admin = {
  name: "Seo",
};

//함수 내부 this값은 런타임에 결정된다
function hello_func() {
  console.log("hello" + this.name);
}

user.func = hello_func;
admin.func = hello_func;

user.func(); //helloSDK //this->user
admin.func(); //helloSEO //this->admin
```

## 바인딩

> this는 예측이 어렵게 동작하므로 명시적 바인딩, 즉 this의 객체를 명시적으로 지정해주는 과정이 필요하다.

- `function.call([this가 가르킬 객체],[function의 매개변수])`
- `function.apply([this가 가르킬 객체],[function의 매개변수를 배열로 넣어줌])` -> 매개변수로 배열을 넘기고 싶을 때 사용!
- `function.bind([this가 가르킬 객체])` -> 함수를 실행하지 않고 바인딩된 함수를 리턴하여 영구적인 지정이 가능!

```javascript
const me = {
  name: "동경",
  sayName: function () {
    return this.name + "입니다.";
  },
};

const mom = {
  name: "향자",
  sayName: function () {
    return this.name + "입니다.";
  },
};

function sayFullName(firstName) {
  return firstName + this.sayName();
}

const result1 = sayFullName.call(me, "서");
console.log(result1); //서동경입니다.

const result2 = sayFullName.apply(me, ["서"]);
console.log(result2); //서동경입니다.

const boundSay = sayFullName.bind(me);
const result3 = boundSay("서");
console.log(result3); //서동경입니다.
```
