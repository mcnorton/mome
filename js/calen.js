const calen = document.getElementById("calen");
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function printDate() {
    const date = new Date();

    let year = date.getFullYear();
    let month = (date.getMonth() + 1);
    let today = date.getDate();
    let week = weekday[date.getDay()];

    calen.innerText = `${year}. ${month}. ${today}. ${week}`;
    secnd.innerText = seconds;
}

printDate();
setInterval(printDate, 1000);