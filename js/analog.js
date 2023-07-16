const clockbelt = document.getElementById("clockbelt");
const digitalclock = document.getElementById("clock");
const analogclock = document.getElementById("analogclock");

const anhrs = document.querySelector(".anhrs");
const anmin = document.querySelector(".anmin");
const ansec = document.querySelector(".ansec");

let anaclockID = null;
digitalclock.addEventListener("click", openAnalogClock);
analogclock.addEventListener("click", openDigitalClock);

analogClockFace();
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
    /* 시계 배경을 무작위로 바꿀 수 있도록? */
    analogclock.style.backgroundImage = `url('img/_clockface.svg')`;

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