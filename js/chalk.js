const chalk = document.getElementById('chalk');
const chalkbody = document.getElementById('chalk-body');
const chalkmsg = document.getElementById('chalk-msg');
const chalkedit = document.getElementById('chalk-edit');
const chalkrightmenu = document.getElementById('right');
const chalkgreeting = document.getElementById('greeting');

const chalkicon = document.createElement('ion-icon');
    chalkicon.setAttribute('name', 'chatbubble-ellipses-outline');
    chalkbody.appendChild(chalkicon);

let chalkeditflag = true;

chalkmsg.setAttribute('rows', '1');

window.addEventListener("resize", onChalkBoardResize);

document.getElementById("chalk-open").addEventListener("click", function() {
    chalk.style.display = "inherit";
    chalkrightmenu.style.visibility = "hidden";
    chalkgreeting.style.visibility = "hidden";
    onChalkBoardResize();
});

document.getElementById("chalk-close").addEventListener('click', function() {
    if (chalkeditflag == false) {
        chalkedit.click();
    }
    chalkrightmenu.style.visibility = "visible";
    chalkgreeting.style.visibility = "visible";
    chalk.style.display = "none";
});


chalkedit.addEventListener('click', function() {
    if (chalkeditflag == true) {
        chalkmsg.readOnly = false;
        chalkmsg.focus();
        chalkedit.style.opacity = "100%";
        chalkicon.style.display = "none";
        chalkeditflag = false;
    } else {
        chalkmsg.readOnly = true;
        chalkedit.style.opacity = "30%";
        if (chalkmsg.value == "") {
            chalkicon.style.display = "inherit";
        }
        chalkeditflag = true;
    }
});

chalkmsg.addEventListener('input', onChalkBoardResize);

chalkmsg.addEventListener('onfocus', function() {
    chalkicon.style.display = "none";
});

function onChalkBoardResize() {
    chalkmsg.style.height = "auto";
    if (Math.floor(chalkmsg.scrollHeight) >= Math.floor(chalkbody.offsetHeight)) {
        chalkmsg.style.height = "100%";
    } else {
        chalkmsg.style.height = (chalkmsg.scrollHeight) + "px";
    }
}