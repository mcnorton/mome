const images = [
    "note.jpg",
    "forestroad.jpg",
    "deskclock.jpg",
    "orange.jpg",
    "laptop.jpg",
    "typewriter.jpg",
    "workspace.jpg",
];

const backgroundImage = images[Math.floor(Math.random()*images.length)];
const background = document.body;

background.style.backgroundImage = `linear-gradient( rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) ), url('img/${backgroundImage}')`;


