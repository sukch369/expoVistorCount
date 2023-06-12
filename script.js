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
let countData = document.getElementById("countData"); //인원수 통계
let fulldate = new Date();
//구글 링크
const DBinputURL =
  "https://script.google.com/macros/s/AKfycbwcr95sVJZHktpatokoXEM0jg_n4K1P0wl5aqczOVwjXbzGaGtnisBZkhSaJFZzm9c9/exec";
const DBoutputURL =
  "https://script.google.com/macros/s/AKfycbyS6sNVtQHeIJTzggJTK_yrb5rEAFTTAC3Ro3fgWyCTK5rBy-YjRzTPzECmZ17Lm6ZwMQ/exec?sheetName=count";

//보낼 날짜
let sendToday =
  fulldate.getFullYear() +
  "-" +
  Number(fulldate.getMonth() + 1) +
  "-" +
  fulldate.getDate();

//출력 날짜
const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
let today = document.getElementById("today");
function inputTime() {
  today.innerHTML =
    fulldate.getFullYear() +
    "년" +
    Number(fulldate.getMonth() + 1) +
    "월" +
    fulldate.getDate() +
    "일" +
    " (" +
    WEEKDAY[fulldate.getDay()] +
    ") ";
}
inputTime();

let stateCityList = new Object(); //시도 목록 객체
getData();
//인원수 통계
let countRaw;
let countParse = new Object();
//방문자 수 불러오기
function getData() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", DBoutputURL, true);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status == 200) {
      countRaw = xhr.response;
      countParse = JSON.parse(countRaw);
      countParse = countParse.data[0].today;
      countData.innerText = "오늘의 방문자: " + countParse + "명";
    } else {
      //failed
      console.log("실패");
    }
  };
}

const listURL = "stateCityList.json";

window.onload = function () {
  getStateCityList();
  getData();
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
    } else {
      console.log("falied");
      window.location.reload();
    }
  };
}
getStateCityList();

//시군구 불러오기
function loadCity(e) {
  if (e == "none") {
    city_list.innerHTML = '<option value="none">골라주세요</option>';
  } else {
    let h = [];

    for (let i = 0; i < Object.keys(stateCityList[e].city).length; i++) {
      if (i == 0) {
        h.push(
          '<option value="' +
            i +
            '"selected>' +
            stateCityList[e].city[i] +
            "</option>"
        );
      } else {
        h.push(
          '<option value="' + i + '">' + stateCityList[e].city[i] + "</option>"
        );
      }
    }
    city_list.innerHTML = h.join("");
  }
}

function plus(button, number) {
  let result = document.getElementById(button);
  Number(result.value);
  result.value = Number(result.value) + Number(number);
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
  state_list.value = "none";
  loadCity(state_list.value);
  result_kind.value = 0;
  result_ele.value = 0;
  result_mid.value = 0;
  result_high.value = 0;
  result_adult.value = 0;
  sum();
  getData();
}
//확인 함수
function confirmMessage() {
  if (state_list.value == "none" || city_list.value == "none") {
    alert("방문하신 지역을 골라주세요.");
    reset();
  } else {
    sum();
    let area1 = stateCityList[state_list.value].state;
    let area2 = stateCityList[state_list.value].city[city_list.value];
    let message = "".concat(
      area1,
      " ",
      area2,
      "\n",
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
      sendData();
      reset();
    } else {
      reset();
    }
  }
}

//데이터 전송 함수
function sendData() {
  let area1 = stateCityList[state_list.value].state;
  let area2 = stateCityList[state_list.value].city[city_list.value];
  let concatURL = "".concat(
    DBinputURL,
    "?area1=",
    area1,
    "&area2=",
    area2,
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
    result_sum.value,
    "&today=",
    sendToday
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
