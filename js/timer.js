const timerModal = document.getElementById("timer-modal");
const timerGraph = document.getElementById("timer-circle");
const timerDisplay = document.querySelector("#timer-time > span");
const timerClose = document.getElementById("timer-close-button");
const timesupPopup = document.getElementById("timer-timeup-dialog");
const timesupSound = document.getElementById("timesup-sound");

const PerSec = 0.1; // 1 = 1sec, 0.1 = 1/10 sec
const OneSec = 1000;
const GraphFps = OneSec * PerSec;
const KEY_TIMER = "timer";

let savedTime = Math.floor(localStorage.getItem(KEY_TIMER));

if (savedTime === null || savedTime <= 0) {
  savedTime = 10; // 기본값을 10분으로 설정
  localStorage.setItem(KEY_TIMER, savedTime);
}

if (savedTime >= 99) {
  savedTime = 99; // 저장된 값이 99분을 넘는다면, 99분으로 고정 (예방차원에서)
  localStorage.setItem(KEY_TIMER, savedTime);
}

let SetMtime = Math.floor(savedTime); // 분단위로 타이머를 설정합니다.
let NowSec = 0;
let CntSec = 0;
let IntvID = null;

document.getElementById("timer-open").addEventListener("click", onClickTimerOpen);
document.querySelector("#timer-timeup-dialog > button").addEventListener("click", onClickTimerReset);
document.getElementById("timer-close-button").addEventListener("click", onClickTimerClose);
document.getElementById("timer-1min-plus").addEventListener("click", onClickTimerCtrlP1);
document.getElementById("timer-1min-minus").addEventListener("click", onClickTimerCtrlM1);
document.getElementById("timer-5min-plus").addEventListener("click", onClickTimerCtrlP5);
document.getElementById("timer-5min-minus").addEventListener("click", onClickTimerCtrlM5);
document.getElementById("timer-pause").addEventListener("click", onClickTimerPause);
document.getElementById("timer-reset").addEventListener("click", onClickTimerReset);

timesupSound.src = "snd/cuckoo12.mp3";
wTimer();

function timesupSoundOff() {
  timesupSound.pause();
  timesupSound.currentTime = 0;
}

function timesupSoundOn() {
  timesupSound.currentTime = 0;
  timesupSound.play();
}

function onClickTimerOpen() {
  timerModal.style.display = "inherit";
  onClickTimerReset();
}


function onClickTimerReset() {
  if (IntvID !== null) {
    clearInterval(IntvID);
    IntvID = null;
  }

  timesupSoundOff();
  timesupPopup.style.visibility = "hidden";

  document.querySelector("#timer-pause > ion-icon").name = "play";
  SetMtime = Math.floor(localStorage.getItem(KEY_TIMER));
  NowSec = 0;
  CntSec = 0;

  drawTimer();
}


function onClickTimerPause() {
  const pauseIcon = document.querySelector("#timer-pause>ion-icon");

  if (IntvID !== null) {
    clearInterval(IntvID);
    IntvID = null;
    pauseIcon.name = "play";
  } else {
    IntvID = setInterval(drawTimer, GraphFps);
    pauseIcon.name = "pause";
  }
}


function onClickTimerClose() {
  if (IntvID !== null) {
    clearInterval(IntvID);
    IntvID = null;
  }
  onClickTimerReset();
  timerModal.style.display = "none";
  timesupPopup.style.visibility = "hidden";
}


function onClickTimerCtrlP1() {
  const t = 1;
  const n = NowSec--;

  if (SetMtime < (100 - t)) { // 60분이 넘지 않을 때
    SetMtime = Math.floor(SetMtime) + Math.floor(t);
  }
  setLocalTimer(SetMtime);

  drawTimer();
  NowSec = n;
}

function onClickTimerCtrlM1() {
  const t = 1;
  const n = NowSec--;

  if (SetMtime > (t)) { // 2분 보다 클 때
    SetMtime = SetMtime - Math.floor(t);
  }
  setLocalTimer(SetMtime);

  drawTimer();
  NowSec = n;
}

function onClickTimerCtrlP5() {
  const t = 5;
  const n = NowSec--;

  if (SetMtime < (100 - t)) {
    SetMtime = SetMtime + Math.floor(t);
  }
  setLocalTimer(SetMtime);

  drawTimer();
  NowSec = n;
}

function onClickTimerCtrlM5() {
  const t = 5;
  const n = NowSec--;

  if (SetMtime > (t + 1) ) { // 6분 보다 클 때
    SetMtime = SetMtime - Math.floor(t);
  }
  setLocalTimer(SetMtime);

  drawTimer();
  NowSec = n;
}


function drawTimer() {
  let s = Math.floor(SetMtime); // 세팅된 시간의 처음 값을 기억해 둡니다.

    if (SetMtime != s) { // 만약에 처음 설정된 시간 값이 변경된다면, 로컬스토리지의 마지막 시간을 저장합니다.
      setLocalTimer(SetMtime);
    }

    CntSec = (SetMtime * 60 * 10) - NowSec;
    timerDisplay.innerHTML = secToTime(CntSec);

    // background: conic-gradient(red 70%, white 30%);
    
    /* AntiClockwise
    percent = (CntSec / (SetMtime * 60 * 10) * 100);
    timerGraph.style.background = `conic-gradient(red ${percent}%, white ${percent}%)`; 
    */

    // Clockwise
    percent = 100 - (CntSec / (SetMtime * 60 * 10) * 100);
    timerGraph.style.background = `conic-gradient(white ${percent}%, red ${percent}%)`;

    if (CntSec <= 0) { 
      clearInterval(IntvID);
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
  const sm = Math.floor(s);

  if (sm != savedTime) {
    localStorage.setItem(KEY_TIMER, sm);
  }
}


function openTimesUp() {
  timesupSoundOn();
  timerGraph.style.background = "conic-gradient(red 100%, white 100%)";
  timerDisplay.innerHTML = secToTime(SetMtime * 60 * 10);
  timesupPopup.style.visibility = "visible";
}

