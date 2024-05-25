const scoreboard = document.getElementById("score");
const teamwhite = document.getElementById("teamwhite");
const teamblack = document.getElementById("teamblack");
const tbscore = document.getElementById('tbscore');
const twscore = document.getElementById('twscore');
const tbtitle = document.getElementById('tbtitle');
const twtitle = document.getElementById('twtitle');


// #init Board position, window status, sound source
let setchange = 0;
let sbfullscreenflag = false;
let defTbTitle = tbtitle.placeholder;
let defTwTitle = twtitle.placeholder;

const SCOREBOARD_SOUND = "snd/whistle.mp3";
teamblack.style.left = "0px";
teamwhite.style.right = "0px";
// document.getElementById("sbreset").setAttribute("title", "** Double Click");

// #define Sound obj.
let referee = new Audio(SCOREBOARD_SOUND);


document.getElementById("score-open").addEventListener("click", onClickScoreOpen);
document.getElementById("tbup").addEventListener('click', tbup);
document.getElementById("tbdn").addEventListener('click', tbdn);
document.getElementById("twup").addEventListener('click', twup);
document.getElementById("twdn").addEventListener('click', twdn);
document.getElementById("sbreset").addEventListener('dblclick', function() {
    tbscore.innerText = "00";
    twscore.innerText = "00";
});
document.getElementById("sbchange").addEventListener('click', function() {
    if (setchange % 2) {
        teamwhite.style.removeProperty("left");
        teamblack.style.removeProperty("right");
        teamwhite.style.right = "0px";
        teamblack.style.left = "0px";
    } else {
        teamwhite.style.removeProperty("right");
        teamblack.style.removeProperty("left");
        teamwhite.style.left = "0px";
        teamblack.style.right = "0px";
    }
    setchange = ((setchange + 1) % 2);
});
document.getElementById("sbwhistle").addEventListener('click', function() {
    referee.pause();
    referee.currentTime = 0;
    referee.play();
});
document.getElementById("sbclose").addEventListener('click', function() {
    //scoreboard.style.display = "none";
    scoreboard.style.display = "none";

    if (sbfullscreenflag == true) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

tbtitle.addEventListener('dblclick', function() {
    this.readOnly = false;
    if (this.value == "") { 
        this.placeholder = "";
    }
});

tbtitle.addEventListener('blur', function() {
    this.readOnly = true;
    if (this.value == "") {
        this.placeholder = defTbTitle;
    }
});

tbtitle.addEventListener('click', function() {
    this.readOnly = true;
});

twtitle.addEventListener('dblclick', function() {
    this.readOnly = false;
    if (this.value == "") { 
        this.placeholder = "";
    }
});

twtitle.addEventListener('blur', function() {
    this.readOnly = true;
    if (this.value == "") {
        this.placeholder = defTwTitle;
    }
});

twtitle.addEventListener('click', function() {
    this.readOnly = true;
});




function onClickScoreOpen() {
    scoreboard.style.display = "inherit";

    // 스코어보드가 실행되기 전 상태를 보관합니다.
    if (document.fullscreenElement === null) {
        sbfullscreenflag = false;
    } else {
        sbfullscreenflag = true;
    }
    document.documentElement.requestFullscreen();
}

function tbup() {
    let tbsc = Math.floor(tbscore.innerText);
    if (tbsc < 99) {
        tbscore.innerText = String(tbsc + 1).padStart(2,"0");
    }
}

function tbdn() {
    let tbsc = Math.floor(tbscore.innerText);
    if (tbsc > 0) {
        tbscore.innerText = String(tbsc - 1).padStart(2,"0");
    }
}

function twup() {
    let twsc = Math.floor(twscore.innerText);
    if (twsc < 99) {
        twscore.innerText = String(twsc + 1).padStart(2,"0");
    }                
}

function twdn() {
    let twsc = Math.floor(twscore.innerText);
    if (twsc > 0) {
        twscore.innerText = String(twsc - 1).padStart(2,"0");
    }                
}