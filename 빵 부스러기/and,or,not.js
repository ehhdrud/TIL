/**
 * AND - &&(그리고)
 * OR - ||(또는)
 * Not - !(부정)
 * Boolian() - !!(부정을 두번하면 원래의 값인데 자료형은 불리언 값으로 출력되는 것을 이용)
 */

//AND, NOT 활용 예제
const age = 20;
const genderType = "GIRL";

const isAdult = age > 19;
const isMAN = genderType === "MAN";

if (isAdult && isMAN) console.log("나는 성인 남성이다.");
if (!isAdult) console.log("나는 성인이 아니다");

//OR 활용 예제
function getName(firstName, lastName) {
  /*
  const fName = firstName === undefined ? "홍" : firstName;
  const lName = lastName === undefined ? "길동" : lastName;
  */
  const fName = firstName || "홍"; //firstName 미입력 시 OR문은 자동으로 true값인 "홍"을 리턴 //입력 시 firstName으로 들어온 값(우선값)을 리턴
  const lName = lastName || "길동"; //lastName 미입력 시 OR문은 자동으로 true값인 "길동"을 리턴 //입력 시 lastName으로 들어온 값(우선값)을 리턴

  return "저는 " + fName + lName + "입니다.";
}

console.log(getName(undefined, "동경"));
