const KEY_API = "-------";
const KEY_LOCA = "myloca";

const button = document.querySelector("#weather button");
button.addEventListener ("click", refreshGeo);

let memLoca = localStorage.getItem(KEY_LOCA);

if (memLoca === null) {
    refreshGeo();
} else {
    getWeather(JSON.parse(memLoca));
}


function getWeather(memLoca) {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${memLoca.lat}&lon=${memLoca.lng}&appid=${KEY_API}&units=metric`;
    const stat = document.querySelector("#weather span:nth-child(1)");
    const city = document.querySelector("#weather span:nth-child(3)");

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            stat.innerText = `${data.weather[0].main} / ${Math.round(data.main.temp)}℃`;
            city.innerText = `${data.name}, ${data.sys.country}`;
        });
    
}

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const geoLoca = {
        lat: lat,
        lng: lng,
    }
    localStorage.setItem(KEY_LOCA, JSON.stringify(geoLoca));
    memLoca = localStorage.getItem(KEY_LOCA);
}

function onGeoError() {
    alert("Can't find you.");
}

function refreshGeo() {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    getWeather(JSON.parse(memLoca));
}


