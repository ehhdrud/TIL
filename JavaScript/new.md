# `new` 연산자

> 유사한 객체를 다중으로 만들 때 주로 사용된다.  
> `new`를 통해 만들어지는 생성자 함수의 첫 글자는 대문자로 시작한다.  
> ES6에서 Class 개념의 등장으로 대체가 가능해졌다.

```javascript
//붕어빵 틀
function FishBread(flavor, price) {
  this.flavor = flavor;
  this.price = price;
  this.base = "flour";
}

//붕어빵 종류
let bread1 = new FishBread("cream", 1200);
let bread2 = new FishBread("redbean", 1000);
let bread3 = new FishBread("milk", 1500);

console.log(bread1); //FishBread { flavor: 'cream', price: 1200, base: 'flour' }
console.log(bread2); //FishBread { flavor: 'redbean', price: 1000, base: 'flour' }
console.log(bread3); //FishBread { flavor: 'milk', price: 1500, base: 'flour' }
```

- `new.target`: 객체 내부적으로 new가 없으면 undefiend 출력한다. 이를 활용해 자동으로 new를 추가하는 코드를 작성할 수 있다.

```javascript
function User(name) {
  //자동으로 new를 추가하는 코드!
  if (!new.target) {
    return new User(name);
  }
  this.name = name;
}

let result_1 = User("john");
console.log(result_1); //User { name: 'john' } //생성자 함수 new가 없어도 제대로 출력된다.

let result_2 = new User("john");
console.log(result_2); //User { name: 'john' }
```
