// Autum 
/*
const images = [
    "",
    "spring.jpg",
    "rose.jpg",
    "ocean.jpg",
    "business.jpg",
    "rain.jpg",
    "field.jpg",
    "seoul.jpg",
    "flower.jpg",
    "geo.png"
]; */

// Winter
/* const images = [
    "",
    "enjoy.jpg",
    "candle.jpg",
    "chess.jpg",
    "cozypopcorn.jpg",
    "czech.jpg",
    "interior.jpg",
    "snowflake.jpg",
    "woodwall.jpg",
    "books.jpg",
    "fireplace.jpg"
]; */

// Spring
const images = [
    "",
    "leaves.jpg",
    "forest.jpg",
    "art.jpg",
    "aibook.jpg",
    "books.jpg",
    "aigrass.jpg",
    "tulips_y.jpg",
    "tulips_w.jpg",
    "enjoy.jpg",
    "geo.png",
    "bokeh.jpg",
    "dokdo.jpg"
]


const bglist = document.getElementById("bglist");
const background = document.body;
const KEY_BGNAME = "background";

let savedBGname = localStorage.getItem(KEY_BGNAME);
let bgImage;

// 배경 목록이 변경되어, 저장된 값보다 줄어들면 초기화합니다.
// 배경수가 늘어났다면 변동이 있더라도 그냥 둡니다. 
// 원치 않는 배경이미지가 보여게 되며, 무작위로 새로운 배경이미지를 소개할 수 있습니다.
if (Math.floor(savedBGname) > images.length-1) {
    savedBGname = "";
    removeBG();
}

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