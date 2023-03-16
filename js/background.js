const images = [
    "art.jpg",
    "business.jpg",
    "clip.jpg",
    "coffee.jpg",
    "desk.jpg",
    "journey.jpg",
    "paint.jpg",
];

const bglist = document.getElementById("bglist");
const background = document.body;
const KEY_BGNAME = "background";

const savedBGnumber = 1;
// const savedBGnumber = localStorage.getItem(KEY_BGNAME);
let backgroundImage;

console.log(bglist);


if (savedBGnumber === null) {
    backgroundImage = images[Math.floor(Math.random()*images.length)];
} else {
    backgroundImage = images[Math.floor(savedBGnumber)];
}

images.forEach(printBGbutton);

function printBGbutton() {
    const button = document.createElement("button");
    button.innerText = "*";
    button.classList.add("bgBtn");
    button.addEventListener("click", changeBG);

    bglist.appendChild(button);
}


function changeBG(event){
    const btnDiv = [ ... event.target.parentElement.children];
    const clkIndex = btnDiv.indexOf(event.target);
    backgroundImage = images[Math.floor(clkButton.index)];
    console.log(clkIndex);
    saveBGnumber();

    background.style.backgroundImage = `linear-gradient( rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) ), url('img/${backgroundImage}')`;
}


function saveBGnumber() {
    localStorage.setItem(KEY_BGNAME, savedBGnumber);
}