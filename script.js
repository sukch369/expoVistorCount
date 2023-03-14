let plusBtn = document.getElementsByClassName("plus");
let minusBtn = document.getElementsByClassName("minus");
let result_kind = document.getElementById("result_kind"); // 유치원
let result_ele = document.getElementById("result_ele"); //초등학생
let result_mid = document.getElementById("result_mid"); //중학생
let result_high = document.getElementById("result_high"); //고등학생
let result_adult = document.getElementById("result_adult"); //성인
let result_sum = document.getElementById("result_sum"); //합계
const inputURL =
  "https://script.google.com/macros/s/AKfycbwcr95sVJZHktpatokoXEM0jg_n4K1P0wl5aqczOVwjXbzGaGtnisBZkhSaJFZzm9c9/exec";

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

function confirmMessage() {
  let message = "".concat(
    "유치원   (",
    result_kind.value,
    "명)\n",
    "초등학생 (",
    result_ele.value,
    "명)\n",
    "중학생   (",
    result_mid.value,
    "명)\n",
    "고등학생 (",
    result_high.value,
    "명)\n",
    "성인     (",
    result_adult.value,
    "명)\n",
    "총 (",
    result_sum.value,
    "명) 이 맞습니까?"
  );
  let confirmflag = confirm(message);
  if (confirmflag) {
    console.log("OK");
    sendData();
    reset();
  } else {
    console.log("failed");
  }
}

function sendData() {
  let concatURL = "".concat(
    inputURL,
    "?kind=",
    result_kind.value,
    "&ele=",
    result_ele.value,
    "&mid=",
    result_mid.value,
    "&high=",
    result_high.value,
    "&adult=",
    result_adult.value,
    "&sum=",
    result_sum.value
  );
  let xhr = new XMLHttpRequest();
  xhr.open("GET", concatURL, true);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status == 200) {
      //success
      console.log(xhr.response);
    } else {
      //failed
      reset();
    }
  };
}
