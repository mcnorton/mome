const chalk = document.getElementById('chalk');
const chalkbody = document.getElementById('chalk-body');
const chalkmsg = document.getElementById('chalk-msg');
const chalkedit = document.getElementById('chalk-edit');
const chalkrightmenu = document.getElementById('right');
const chalkgreeting = document.getElementById('greeting');

const chalkicon = document.createElement('ion-icon');
    chalkicon.setAttribute('name', 'chatbubble-ellipses-outline');
    chalkbody.appendChild(chalkicon);

let prechalkMsgSize = 0;

chalkmsg.setAttribute('rows', '1');

window.addEventListener("resize", onChalkBoardResize);

document.getElementById("chalk-open").addEventListener("click", function() {
    chalk.style.display = "inherit";
    chalkrightmenu.style.visibility = "hidden";
    chalkgreeting.style.visibility = "hidden";
});

document.getElementById("chalk-close").addEventListener('click', function() {
    chalk.style.display = "none";
    chalkrightmenu.style.visibility = "visible";
    chalkgreeting.style.visibility = "visible";
});

chalkedit.addEventListener('dblclick', function() {
    if (chalkmsg.readOnly == true) {
        chalkmsg.readOnly = false;
        chalkmsg.focus();
        chalkedit.style.opacity = "80%";
        chalkicon.style.display = "none";
    }
});

chalkedit.addEventListener('click', function() {
    chalkmsg.blur();
});

chalkmsg.addEventListener('blur', function() {
    this.readOnly = true;
    chalkedit.style.opacity = "30%";
    if (this.value == "") {
        chalkicon.style.display = "inherit";
    }
});

chalkmsg.addEventListener('input', onChalkBoardResize);

chalkmsg.addEventListener('onfocus', function() {
    chalkicon.style.display = "none";
});

function onChalkBoardResize() {
    chalkmsg.style.height = "auto";
    if (Math.floor(chalkmsg.scrollHeight) > Math.floor(chalkbody.offsetHeight)) {
        //chalkmsg.style.height = (chalkbody.offsetHeight) + "px";
        chalkmsg.style.height = "100%";
    } else {
        chalkmsg.style.height = (chalkmsg.scrollHeight) + "px";
    }
}