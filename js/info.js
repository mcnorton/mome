const info = document.querySelector("#info button");

info.addEventListener ("click", onInfoClick);

function onInfoClick(){
    window.open("https://github.com/mcnorton/mome/blob/master/README.md", "mome_info");
}