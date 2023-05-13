const info = document.querySelector("#info button");

info.addEventListener("click", onClickInfo);

function onClickInfo() {
    window.open("https://github.com/mcnorton/mome/blob/master/README.md", "mome_info");
}