document.querySelector("input").addEventListener(
  "keyup",
  debounce(() => {
    i = i + 1;
    console.log(i);
  }, 500)
);
