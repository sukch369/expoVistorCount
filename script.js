let plusBtn = document.getElementsByClassName("plus");
let minusBtn = document.getElementsByClassName("minus");
let state_list = document.getElementById("state_list"); //시도 선택
let city_list = document.getElementById("city_list"); //시군구 선택
let result_kind = document.getElementById("result_kind"); // 유치원 인원수
let result_ele = document.getElementById("result_ele"); //초등학생 인원수
let result_mid = document.getElementById("result_mid"); //중학생 인원수
let result_high = document.getElementById("result_high"); //고등학생 인원수
let result_adult = document.getElementById("result_adult"); //성인 인원수
let result_sum = document.getElementById("result_sum"); //합계 인원수
let stateCityList = new Object();
const inputURL =
  "https://script.google.com/macros/s/AKfycbwcr95sVJZHktpatokoXEM0jg_n4K1P0wl5aqczOVwjXbzGaGtnisBZkhSaJFZzm9c9/exec";
const listURL = "stateCityList.json";
window.onload = function () {
  loadState();
};

//지역 불러오기 from json
function getStateCityList() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", listURL);
  xhr.responseType = "json";
  xhr.send();
  xhr.onload = () => {
    if ((xhr.status = 200)) {
      stateCityList = xhr.response;
    }
  };
}
getStateCityList();

//시도 불러오기
function loadState() {
  let h = [];

  for (let i = 0; i < Object.keys(stateCityList).length; i++) {
    if (stateCityList[i].state == "경기") {
      h.push(
        '<option value="' +
          i +
          '"selected>' +
          stateCityList[i].state +
          "</option>"
      );
    } else {
      h.push(
        '<option value="' + i + '">' + stateCityList[i].state + "</option>"
      );
    }
  }
  state_list.innerHTML = h.join("");
}

//더하기
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
  loadState();
}
//확인 함수
function confirmMessage() {
  sum();
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

//데이터 전송 함수
function sendData() {
  let area1 = stateCityList[state_list.value].state;
  let concatURL = "".concat(
    inputURL,
    "?area1=",
    area1,
    "&kind=",
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
