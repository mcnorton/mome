const infobelt = document.getElementById("info");
let savedPrompt = null;

window.addEventListener("beforeinstallprompt", beforeInstall);

function beforeInstall(event) {
    createInstallButton();
    event.preventDefault();
    savedPrompt = event;
}


function alreadyInstalled() {
    savedPrompt = null;
    console.log("Already Installed");
    install.hidden = true;
}


async function onClickInstall() {
    removeInstallButton();
    savedPrompt.prompt();

    const {outcome} = await savedPrompt.userChoice;

    if (outcome === 'accepted') {
        console.log('PWA Install Accepted');
    } else if (outcome === 'dismissed') {
        console.log('PWA Install Dismissed');
    }

    savedPrompt = null;

    /* Promise
    savedPrompt.userChoice.then(
    function(choiceAB){
        if (choiceAB.outcome === 'accepted') {
            install.hidden = true;
        } else {
            install.hidden = false;
        }
        savedPrompt = null;
    });
    */
}

function createInstallButton() {
    const button = document.createElement("button");
    const ionicon = document.createElement("ion-icon");

    button.innerHTML = "INSTALL Desktop App ";
    button.className = "install";
    button.id = "install";

    ionicon.setAttribute("name", "download");

    button.addEventListener('click', onClickInstall);
    infobelt.appendChild(button);
    button.appendChild(ionicon);
}

function removeInstallButton() {
    document.getElementById("install").remove();
}