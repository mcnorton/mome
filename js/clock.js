const clock = document.querySelector("#clock span:nth-child(1)");
const secnd = document.querySelector("#clock span:nth-child(2)");

function printClock() {
    const date = new Date();

    const hours = String((date.getHours() % 12 || 12)).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");

    clock.innerText = `${hours}:${minutes}`;
    secnd.innerText = seconds;
}

printClock();
setInterval(printClock, 1000);