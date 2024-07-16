const chalk = document.getElementById('chalk');
const chalkbody = document.getElementById('chalk-body');
const chalkmsg = document.getElementById('chalk-msg');
const chalkedit = document.getElementById('chalk-edit');
const chalkrightmenu = document.getElementById('right');
const chalkgreeting = document.getElementById('greeting');

/* 초크보드 중간에 버블 아이콘인데, 쓸모가 없어졌으나 참조코드로 남겨둠.
const chalkicon = document.createElement('ion-icon');
    chalkicon.setAttribute('name', 'chatbubble-ellipses-outline');
    chalkbody.appendChild(chalkicon);
    chalkicon.style.visibility = "hidden";
*/

let chalkeditflag = true;

chalkmsg.setAttribute('rows', '1');

window.addEventListener("resize", onChalkBoardResize);

document.getElementById("chalk-open").addEventListener("click", function() {
    chalk.style.display = "inherit";
    chalkrightmenu.style.visibility = "hidden";
    chalkgreeting.style.visibility = "hidden";
    onChalkBoardResize();

    if (chalkmsg.value == "") {
        chalkedit.click();
    }
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
        chalkeditflag = false;
    } else {
        chalkmsg.readOnly = true;
        chalkedit.style.opacity = "30%";
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