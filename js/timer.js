const timerModal = document.getElementById("timer-modal");
const timerGraph = document.getElementById("timer-circle");
const timerDisplay = document.querySelector("#timer-time > span");
const timerClose = document.getElementById("timer-close-button");
const timesupPopup = document.getElementById("timer-timeup-dialog");
const timesupSound = document.getElementById("timesup-sound");
const timerBGSound = document.getElementById("timer-bgsound");
const timerTitle = document.querySelector("#timer-title > input");
const timerAlarms = document.getElementById("timer-alarms");

const DAY = 24;
const HUR = 60;
const MIN = 60;
const SEC = 60;
const MIS = 1000;

const PerSec = 0.1; // 1 = 1sec, 0.1 = 1/10 sec
const OneSec = MIS;
const GraphFps = PerSec * MIS; // Framerate 10fps (1/10sec) : smoothly
const KEY_TIMER = "timer"; // Localstorage key name
const FINISH_SOUND_PATH = "snd/"; // SOUND PATH, FREE BGMusic from Pixabay
const BGM_SOUND = "snd/hawaii-five-o.mp3"; // Free BGM : https://archive.org/details/tvtunes_18715
const DEFAULT_TIME = 10; // (minutes) 기본시간값 10분
const DEFAULT_SOUND = 1; // Default Sound
const MAX_TIME = 99; // (minutes) 최대시간값 99분

const timesup = [
  "",
  "goodmorning.mp3",
  "befunny.mp3",
  "bach.mp3",
  "behappy.mp3",
  "christmas.mp3",
  "coffeetime.mp3",
  "epic.mp3"
];

let savedTime = DEFAULT_TIME;
let finishTime = Date.now(); // finish time

let SetMtime = Math.floor(savedTime); // 분단위로 타이머를 설정합니다.
let NowSec = 0;
let CntSec = 0;
let IntvID = null;
let defaultTimerTitle = timerTitle.placeholder;
let setTimerSound = DEFAULT_SOUND;

document.getElementById("timer-open").addEventListener("click", onClickTimerOpen);
document.querySelector("#timer-timeup-dialog > button").addEventListener("click", onClickTimerReset);
document.getElementById("timer-close-button").addEventListener("click", onClickTimerClose);
document.getElementById("timer-1min-plus").addEventListener("click", onClickTimerCtrlP1);
document.getElementById("timer-1min-minus").addEventListener("click", onClickTimerCtrlM1);
document.getElementById("timer-5min-plus").addEventListener("click", onClickTimerCtrlP5);
document.getElementById("timer-5min-minus").addEventListener("click", onClickTimerCtrlM5);
document.getElementById("timer-pause").addEventListener("click", onClickTimerPause);
document.getElementById("timer-reset").addEventListener("click", onClickTimerReset);
document.getElementById("timer-bgm").addEventListener("click", onClickTimerBGM);

timerTitle.addEventListener("focus", function() {
  if (this.value == "") { 
    this.placeholder = "";
  } 
});

timerTitle.addEventListener("blur", function() {
  if (this.value == "") {
    this.placeholder = defaultTimerTitle;
  }
});

getSavedTimeData();
drawTimer();

// timesup[] 갯수만큼 * 표시 버튼을 생성합니다
timesup.forEach(timesupButton);

function timesupButton(sndList) {
  const button = document.createElement("button");
  const span = document.createElement("span");
  const ionicon = document.createElement("ion-icon");

  if (sndList == "") {
    ionicon.setAttribute("name", "volume-mute");
    button.classList.add("timer-alarm-mute");
  } else {
    ionicon.setAttribute("name", "ellipse");
    button.classList.add("timer-alarm");
  }

  button.value = timesup.indexOf(sndList);
  button.addEventListener("click", timesupSoundChange);

  span.appendChild(ionicon);
  button.appendChild(span);
  timerAlarms.appendChild(button);
}

function timesupSoundOff() {
  if (timesupSound.paused == false) {
    timesupSound.pause();
    timesupSound.currentTime = 0;
  }
}

function timesupSoundOn() {
  if (setTimerSound != 0) {
    timesupSound.currentTime = 0;
    timesupSound.play();
    setTimeout(timesupSoundOff, 60000);
  }
}

function timesupSoundChange(event) {
  const clickButton = event.target;

  setTimerSound = Math.floor(clickButton.value);
  
  if (setTimerSound != 0) { // 0 = Mute
    timesupSound.src = FINISH_SOUND_PATH + timesup[setTimerSound];
    timesupSound.currentTime = 0;
    timesupSound.play();
    setTimeout(timesupSoundOff, 2000);
  }
}

function onClickTimerOpen() {
  timerModal.style.display = "inherit";
  document.getElementById("right").style.visibility = 'hidden'; // 반투명 모드에서 할일 목록 감추기
  document.getElementById("greeting").style.visibility = 'hidden'; // 인사말, 이름 감추기
  getSavedTimeData();
  onClickTimerReset();
}

function onClickTimerBGM() {
  const bgmbutton = document.getElementById("timer-bgm");
  if (timerBGSound.paused) {
    bgmbutton.style.color = "red";
    timerBGSound.play();
  } else {
    bgmbutton.style.color = "black";
    timerBGSound.pause();
  }
}

function timerBGMoff() {
  timerBGSound.pause();
  timerBGSound.currentTime = 0;
}

function onClickTimerReset() {
  if (IntvID !== null) {
    //clearInterval(IntvID);
    clearTimeout(IntvID);
    IntvID = null;
  }
  
  timesupSoundOff();
  timerBGMoff();
  timesupPopup.style.visibility = "hidden";

  document.querySelector("#timer-pause > ion-icon").name = "play";
  // SetMtime = savedTime;
  NowSec = 0;
  CntSec = 0;

  setLocalTimer(SetMtime); // save Timer data
  drawTimer();
}


function onClickTimerPause() {
  const pauseIcon = document.querySelector("#timer-pause > ion-icon");

  if (IntvID !== null) {
    //clearInterval(IntvID);
    clearTimeout(IntvID);
    IntvID = null;
    pauseIcon.name = "play";
    //timerBGSound.pause();
  } else {
    IntvID = setInterval(drawTimer, GraphFps);
    pauseIcon.name = "pause";
    //timerBGSound.play();
    /*IntvID = setTimeout( function runTimer() {
      drawTimer();
      IntvID = setTimeout(runTimer, GraphFps);
    }, 0);*/
  }
  setLocalTimer(SetMtime); // save Timer data
}


function onClickTimerClose() {

  if (IntvID !== null) {
    clearInterval(IntvID);
    //clearTimeout(IntvID);
    IntvID = null;
  }
  setLocalTimer(SetMtime); // save Timer data
  onClickTimerReset();
  timerBGMoff();

  document.getElementById("right").style.visibility = 'visible'; // 반투명 모드 : 타이머 종료시 할일 목록 표시
  document.getElementById("greeting").style.visibility = 'visible'; // 인사말, 이름 표시
  timerModal.style.display = "none";
  timesupPopup.style.visibility = "hidden";
}


function onClickTimerCtrlP1() {
  const t = 1;
  const n = NowSec--;

  if (SetMtime < (100 - t)) { // 99분까지 시간 추가 
    SetMtime = Math.floor(SetMtime) + Math.floor(t);
  }

  drawTimer();
  NowSec = n;
}

function onClickTimerCtrlM1() {
  const t = 1;
  const n = NowSec--;

  if ((SetMtime - t) > 0) { // 남은 시간이 1분 보다 클 때만 시간을 줄임
    SetMtime = SetMtime - Math.floor(t);
  }

  drawTimer();
  NowSec = n;
}

function onClickTimerCtrlP5() {
  const t = 5;
  const n = NowSec--;

  if (SetMtime < (100 - t)) {
    SetMtime = SetMtime + Math.floor(t);
  }

  drawTimer();
  NowSec = n;
}

function onClickTimerCtrlM5() {
  const t = 5;
  const n = NowSec--;

  if (SetMtime > (t + 1) ) { // 6분 보다 클 때
    SetMtime = SetMtime - Math.floor(t);
  }

  drawTimer();
  NowSec = n;
}

function drawTimer() {
  let s = Math.floor(SetMtime); // 세팅된 시간의 처음 값을 기억해 둡니다.

    CntSec = (SetMtime * 60 * 10) - NowSec;
    timerDisplay.innerHTML = secToTime(CntSec);

    // background: conic-gradient(red 70%, white 30%);
    
    /* AntiClockwise
    percent = (CntSec / (SetMtime * 60 * 10) * 100);
    timerGraph.style.background = `conic-gradient(red ${percent}%, white ${percent}%)`; 
    */

    // Clockwise
    percent = 100 - (CntSec / (SetMtime * 60 * 10) * 100);
    timerGraph.style.background = `conic-gradient(white ${percent}%, #bb0000 ${percent}%)`;

    if (CntSec <= 0) { 
      clearInterval(IntvID);
      // clearTimeout(IntvID);
      openTimesUp();
    } else {
      NowSec++;
    }
}

function secToTime(s) {
  s = Math.floor(s * 0.1);
  let mm = String(Math.floor((s % (60 * 100)) / 60)).padStart(2,"0");
  const ss = String(Math.floor(s % 60)).padStart(2,"0");
  return `${mm}:${ss}`;
}


function setLocalTimer(s) {
  const setTime = Math.floor(s);

  const objTimer = {
    time: setTime,
    sound: setTimerSound,
  };

  localStorage.setItem(KEY_TIMER, JSON.stringify(objTimer));

}


function openTimesUp() {
  timerBGMoff();
  timesupSoundOn();
  timerGraph.style.background = "conic-gradient(#eeeeee 100%, white 100%)";
  timerDisplay.innerHTML = secToTime(SetMtime * 60 * 10);
  timesupPopup.style.visibility = "visible";
}


function getSavedTimeData() {
  let gt = localStorage.getItem(KEY_TIMER);

  if (gt === null) {
      savedTime = DEFAULT_TIME;
      setTimerSound = DEFAULT_SOUND;
      timesupSound.src = FINISH_SOUND_PATH + timesup[1];
      timerBGSound.src = BGM_SOUND;

    } else {
      let savedata = JSON.parse(gt);

      savedTime = Math.floor(savedata.time);
      if ((savedTime <= 0) || (savedTime > MAX_TIME)) {
        savedTime = DEFAULT_TIME;
      }
      setTimerSound = savedata.sound;
      if (setTimerSound > (timesup.length - 1)) {
        setTimerSound = DEFAULT_SOUND;
      }

      // console.log(setTimerSound, timesup.length);
      
      timesupSound.src = FINISH_SOUND_PATH + timesup[setTimerSound];
      timerBGSound.src = BGM_SOUND;
    }
}