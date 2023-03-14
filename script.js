let plusBtn = document.getElementsByClassName("plus");
let minusBtn = document.getElementsByClassName("minus");
let result_kind = document.getElementById("result_kind"); // 유치원
let result_ele = document.getElementById("result_ele"); //초등학생
let result_mid = document.getElementById("result_mid"); //중학생
let result_high = document.getElementById("result_high"); //고등학생
let result_adult = document.getElementById("result_adult"); //성인
let result_sum = document.getElementById("result_sum"); //합계

function plus(button) {
  let result = document.getElementById(button);
  Number(result.value);
  result.value++;
  sum();
}

function minus(button) {
  let result = document.getElementById(button);
  Number(result.value);
  result.value--;
  if (result.value < 0) {
    result.value = 0;
  }
  sum();
}

function sum() {
  result_sum.value =
    Number(result_kind.value) +
    Number(result_ele.value) +
    Number(result_mid.value) +
    Number(result_high.value) +
    Number(result_adult.value);
}

function reset() {
  result_kind.value = 0;
  result_ele.value = 0;
  result_mid.value = 0;
  result_high.value = 0;
  result_adult.value = 0;
  sum();
}
