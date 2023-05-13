const fullscreenBtn = document.querySelector("#screen button");
const fullscreenBtnF = document.getElementById("screen-full");
const fullscreenBtnC = document.getElementById("screen-cntr");

document.addEventListener("fullscreenchange", onChangeFullScreen);
fullscreenBtn.addEventListener("click", onClickFullScreenToggle);
onChangeFullScreen();

function onClickFullScreenToggle() {

    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();        
    }
    onChangeFullScreen();

}

function onChangeFullScreen() {
    removeIcon();
    const toggleIcon = document.createElement("ion-icon");

    if (document.fullscreenElement) {
        toggleIcon.setAttribute("name", "albums-outline");
    } else {
        toggleIcon.setAttribute("name", "scan-outline");
    }
    fullscreenBtn.appendChild(toggleIcon);
}

function removeIcon() {
    if (fullscreenBtn.hasChildNodes()) {
        fullscreenBtn.removeChild(fullscreenBtn.firstChild);
    }
}