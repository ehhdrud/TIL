let members = ["엄마", "아빠", "누나", "동경"];

let result = members.findIndex(function (member) {
  return member === "동경";
});
console.log(result);
