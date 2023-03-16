const images = [
    "",
    "business.jpg",
    "clip.jpg",
    "desk.jpg",
    "board.jpg",
    "sky.jpg",
    "rain.jpg",
    "field.jpg",
];

const bglist = document.getElementById("bglist");
const background = document.body;
const KEY_BGNAME = "background";

let savedBGname = localStorage.getItem(KEY_BGNAME);
let bgImage;

// 이미 저장된 배경화면이 있으면, 우선 보여줍니다.
if (savedBGname === null || savedBGname == "") {
    bgImage = images[Math.floor(Math.random()*(images.length-1)+1)];
} else {
    bgImage = images[Math.floor(savedBGname)];
}

loadBG();

// images[] 갯수만큼 * 표시 버튼을 생성합니다
images.forEach(printBGbutton);

function printBGbutton(imgList) {
    const button = document.createElement("button");
    const span = document.createElement("span");
    const ionicon = document.createElement("ion-icon");

    if (imgList == "") {
        ionicon.setAttribute("name", "shuffle-outline");
        button.classList.add("bgShuffle");
        button.value = "";
    } else {
        ionicon.setAttribute("name", "ellipse");
        button.classList.add("bgButton");
        button.value = images.indexOf(imgList);
    }

    button.addEventListener("click", changeBG);
    span.appendChild(ionicon);
    button.appendChild(span);
    bglist.appendChild(button);
}

function loadBG() {
    background.style.backgroundImage = `linear-gradient( rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) ), url('img/${bgImage}')`;
}

function changeBG(event) {
    const clickButton = event.target;

    if (clickButton.value == "") {
        bgImage = images[Math.floor(Math.random()*(images.length-1)+1)];
        removeBG();
    } else {
        bgImage = images[Math.floor(clickButton.value)];
        savedBGname = clickButton.value;
        saveBG();
    }

    loadBG();
}


function saveBG() {
    localStorage.setItem(KEY_BGNAME, savedBGname);
}

function removeBG() {
    localStorage.removeItem(KEY_BGNAME);
}