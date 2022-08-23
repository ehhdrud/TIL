# 생성자 함수 `new`

> 유사한 객체를 다중으로 만들 때 사용되는 함수(타 언어에서의 class 개념과 유사)  
> 일반적으로 생성자 함수의 첫 글자는 대문자로 시작

```javascript
//붕어빵 틀
function FishBread(flavor, price) {
  this.flavor = flavor;
  this.price = price;
  this.base = "flour";
}

//붕어빵 종류
let bread_1 = new FishBread("cream", 1200);
let bread_2 = new FishBread("redbean", 1000);
let bread_3 = new FishBread("milk", 1500);

console.log(bread_1); //FishBread { flavor: 'cream', price: 1200, base: 'flour' }
console.log(bread_2); //FishBread { flavor: 'redbean', price: 1000, base: 'flour' }
console.log(bread_3); //FishBread { flavor: 'milk', price: 1500, base: 'flour' }
```

- `new.target`: 객체 내부적으로 new가 없으면 undefiend 출력(이를 활용해 new를 추가해줄 수 있음)

```javascript
function User(name) {
  //if문을 통해 new 안 붙여도 정상 동작하도록 활용
  if (!new.target) {
    return new User(name);
  }
  this.name = name;
}

let result_1 = User("john");
console.log(result_1); //User { name: 'john' } //생성자 함수 new가 없어도 제대로 출력됨

let result_2 = new User("john");
console.log(result_2); //User { name: 'john' }
```
