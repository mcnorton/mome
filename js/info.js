const info = document.getElementById("readme");

info.addEventListener("click", onClickInfo);

function onClickInfo() {
    window.open("https://github.com/mcnorton/mome/blob/master/README.md", "mome_info");
}