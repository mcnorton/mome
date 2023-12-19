const chalk = document.getElementById('chalk');
const chalkbody = document.getElementById('chalk-body');
const chalkmsg = document.getElementById('chalk-msg');
const chalkclose = document.getElementById('chalk-close');
const chalkrightmenu = document.getElementById('right');
const chalkgreeting = document.getElementById('greeting');

const chalkicon = document.createElement('ion-icon');
    chalkicon.setAttribute('name', 'create-outline');
    chalkbody.appendChild(chalkicon);

let prechalkMsgSize = 0;

chalkmsg.setAttribute('rows', '1');

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

chalkmsg.addEventListener('dblclick', function() {
    this.readOnly = false;
    chalkicon.style.display = "none";
});

chalkmsg.addEventListener('blur', function() {
    this.readOnly = true;
    if (this.value == "") {
        chalkicon.style.display = "inherit";
    }
});

chalkmsg.addEventListener('input', function () {
    if (Math.floor(chalkmsg.scrollHeight) < Math.floor(chalk.scrollHeight)) {
        chalkmsg.style.height = "auto";
        chalkmsg.style.height = chalkmsg.scrollHeight + "px";
    } else {
        chalkmsg.style.height = chalk.style.height + "px";
    }
});

chalkmsg.addEventListener('onfocus', function() {
    chalkicon.style.display = "none";
});