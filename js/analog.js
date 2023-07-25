const clockbelt = document.getElementById("clockbelt");
const digitalclock = document.getElementById("clock");
const analogclock = document.getElementById("analogclock");

const anhrs = document.querySelector(".anhrs");
const anmin = document.querySelector(".anmin");
const ansec = document.querySelector(".ansec");

let anaclockID = null;
let anaFace = 0;
const anaFaceCount = 3;

digitalclock.addEventListener("click", openAnalogClock);
analogclock.addEventListener("click", openDigitalClock);

openDigitalClock();



function analogClockDraw() {
    const d = new Date();

    const hr = d.getHours();
    const mn = d.getMinutes();
    const sc = d.getSeconds();
    const ms = d.getMilliseconds().toFixed(2);

    const dgH = (hr * (360 / 12)) + ((mn * (360 / 60)) / 12);
    const dgM = (mn * (360 / 60)) + ((sc * (360 / 60)) / 60);
    const dgS = (sc * (360 / 60)) + ((ms * (360 / 60)) / 1000);

    anhrs.style.transform = `translate(-50%,-85%) rotate(${dgH}deg)`;
    anmin.style.transform = `translate(-50%,-85%) rotate(${dgM}deg)`;
    ansec.style.transform = `translate(-50%,-85%) rotate(${dgS}deg)`;
}


function analogClockFace() {
    let i = anaFace % anaFaceCount;

    /* 시계 배경을 무작위로 바꿀 수 있도록? */
    analogclock.style.backgroundImage = `url('img/clockface${i}.svg')`;
    anaFace = i + 1;

    /* const cface = anface.cloneNode(true);
    for (i = 0; i < 12; i ++) {
        let dotface = analogclock.appendChild(cface);
        dotface.style.transform = 'rotate(30deg)';
        dotface.style.top = '90%';
        dotface.style.left = `${i}%`;
    }*/
}


function openAnalogClock() {
    anaclockID = setInterval(analogClockDraw, 100);
    analogClockFace();
    analogClockDraw();

    clockbelt.hidden = true;
    analogclock.hidden = false;
}

function openDigitalClock() {
    clearInterval(anaclockID);
    anaclockID = null;

    analogclock.hidden = true;
    clockbelt.hidden = false;
}