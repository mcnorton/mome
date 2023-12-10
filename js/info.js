const inforeadme = document.getElementById("readme");
const inforeload = document.getElementById("reload");

inforeadme.addEventListener("click", function() {
    window.open("https://github.com/mcnorton/mome/blob/master/README.md", "mome_info");
});

inforeload.addEventListener("click", function() { 
    location.reload(true);
});
