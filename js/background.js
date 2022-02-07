const images = [
    "art.jpg",
    "business.jpg",
    "clip.jpg",
    "coffee.jpg",
    "desk.jpg",
    "journey.jpg",
    "paint.jpg",
];

const backgroundImage = images[Math.floor(Math.random()*images.length)];
const background = document.body;

background.style.backgroundImage = `linear-gradient( rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) ), url('img/${backgroundImage}')`;


