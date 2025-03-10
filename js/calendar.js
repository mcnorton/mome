const calmodal = document.getElementById("calendar");
const calbody = document.getElementById("cal-body");
      calbody.setAttribute("id", "cal-body");
const calday = document.querySelector(".cal-head div:nth-child(3) button");
const calpre = document.querySelector(".cal-head div:nth-child(2) button");
const calfwd = document.querySelector(".cal-head div:nth-child(4) button");
const calopen = document.getElementById("calendar-open");
const calclose = document.querySelector(".cal-head div:nth-child(5) button");

const CAL_WEEK = 7;
const CAL_ROW = 6;
const callabel = [["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]];

let calnow = new Date();
let caltoday = new Date();
let dtxt = 0;
let calflag = false; // 아직 안그렸어요. False
let calswlabel = 0;

calpre.addEventListener("click", function() { dispCalendar(-1); });
calfwd.addEventListener("click", function() { dispCalendar(1); });
calday.addEventListener("click", function() { dispCalendar(0); });
calopen.addEventListener("click", onClickCalOpen);
calclose.addEventListener("click", onClickCalClose);

dispHeader();
dispCalendar(0);

function dispHeader() {
    const calic = document.createElement("ion-icon");
        calic.setAttribute("name", "close-circle-outline");
        calclose.appendChild(calic);

    const calip = document.createElement("ion-icon");
        calip.setAttribute("name", "chevron-back-outline");
        calpre.appendChild(calip);

    const calif = document.createElement("ion-icon");
        calif.setAttribute("name", "chevron-forward-outline");
        calfwd.appendChild(calif);
}

function dispCalendar(m) {
    
    if (m == 0) {
        calnow = new Date();
        dispChangeLabel();
    } else {
        calnow.setMonth(calnow.getMonth() + m);
    }
    const calgetday = new Date(calnow.getFullYear(), calnow.getMonth(), 1, 0, 0, 0, 0);
    const calgetdate = new Date(calnow.getFullYear(), calnow.getMonth() + 1, 0, 0, 0, 0, 0);

    let calwday = calgetday.getDay();
    let calzday = calgetdate.getDate();

    document.querySelector(".cal-head div:nth-child(1) span").innerText = calnow.getFullYear();
    document.querySelector(".cal-head div:nth-child(3) button").innerText = calnow.getMonth() + 1;

    if (calflag == false) {

        for (let w = 0; w < CAL_WEEK; w++) {
            const th = document.createElement("div");
                th.setAttribute("class", "cal-label");
                th.innerText = callabel[calswlabel][w];
                
            if ((w % CAL_WEEK) == 6) {
                th.style.color = "blue";
                th.style.backgroundColor = "#b6c5fe";
            }
            if ((w % CAL_WEEK) == 0) {
                th.style.color = "red";
                th.style.backgroundColor = "#fbbaba";

            }
            calbody.appendChild(th);
        }

        for (let d = 0; d < (CAL_WEEK * CAL_ROW); d++) {

            if (calwday <= d) {
                dtxt = dtxt + 1;
            }
            if (calzday + calwday <= d) {
                dtxt = 0;
            }

            const td = document.createElement("div");
                td.setAttribute("class", "cal-grid");
                td.setAttribute("id", "cal-grid");

            if (dtxt == 0) { 
                td.innerText = "\u00a0";
                td.style.borderColor = "#ECECEC";
                td.style.borderWidth = "1px";
            } else  {
                td.innerText = dtxt.toString();
                td.style.borderColor = "gray";
                td.style.borderWidth = "1px";

                if ((d % CAL_WEEK) == 6) {
                    td.style.borderColor = "#326deb";
                    td.style.color = "blue";
                }
                if ((d % CAL_WEEK) == 0) {
                    td.style.borderColor = "#fb4343";
                    td.style.color = "red";
                }
                if ((dtxt == caltoday.getDate()) && (caltoday.getFullYear() == calnow.getFullYear()) && (caltoday.getMonth() == calnow.getMonth())) {
                    td.style.borderColor = "black";
                    td.style.borderWidth = "5px";
                }
            }

            calbody.appendChild(td);
        }

        calflag = true; // 달력이 그려졌나요? True
        calswlabel = 1;

    } else {

        const tg = document.querySelectorAll(".cal-grid");

        for (let d = 0; d < (CAL_WEEK * CAL_ROW); d++) {
            if (calwday <= d) {
                dtxt = dtxt + 1;
            }
            if (calzday + calwday <= d) {
                dtxt = 0;
            }

            if (dtxt == 0) { 
                tg[d].innerText = "\u00a0";
                tg[d].style.borderColor = "#ECECEC";
                tg[d].style.borderWidth = "1px";
            } else {
                tg[d].innerText = dtxt.toString();
                tg[d].style.borderColor = "gray";
                tg[d].style.borderWidth = "1px";

                if ((d % CAL_WEEK) == 6) {
                    tg[d].style.borderColor = "#326deb";
                    tg[d].style.color = "blue";
                }
                if ((d % CAL_WEEK) == 0) {
                    tg[d].style.borderColor = "#fb4343";
                    tg[d].style.color = "red";
                }
                if ((dtxt == caltoday.getDate()) && (caltoday.getFullYear() == calnow.getFullYear()) && (caltoday.getMonth() == calnow.getMonth())) {
                    tg[d].style.borderColor = "black";
                    tg[d].style.borderWidth = "5px";
                }
            }
        }
    }
}

function dispChangeLabel() {
    if (calflag) {
        const tw = document.querySelectorAll(".cal-label");

        for (let w = 0; w < CAL_WEEK; w++) {
                tw[w].innerText = callabel[calswlabel][w];
                
            if ((w % CAL_WEEK) == 6) {
                tw[w].style.color = "blue";
            }
            if ((w % CAL_WEEK) == 0) {
                tw[w].style.color = "red";
            }
        }

        if (calswlabel == 0) { 
            calswlabel = 1; 
        } else { 
            calswlabel = 0; 
        };
    }
}

function onClickCalOpen() {
    console.log (calmodal);
    calmodal.style.display = "inherit";
    document.getElementById("right").style.visibility = 'hidden'; // 반투명 모드에서 할일 목록 감추기
    document.getElementById("greeting").style.visibility = 'hidden'; // 인사말, 이름 감추기
}

function onClickCalClose() {
    document.getElementById("right").style.visibility = 'visible'; // 반투명 모드 : 타이머 종료시 할일 목록 표시
    document.getElementById("greeting").style.visibility = 'visible'; // 인사말, 이름 표시
    calmodal.style.display = "none";
}