const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const logout = document.querySelector("#greeting button");

const greeting = document.querySelector("#greeting");
const sayhello = document.querySelector("#greeting h4");
const sayname = document.querySelector("#greeting h3");

const HIDDEN_CLASSNAME = "hidden";
const GREETING_CLASSNAME = "greeting";
const KEY_USERNAME = "username";

const savedUsername = localStorage.getItem(KEY_USERNAME)
const question = [
    "What's your name?",
    "What's your goal for today?"
];

let t_seq = 0;

    if (savedUsername === null) {
        loginForm.classList.remove(HIDDEN_CLASSNAME);
    } else {
        printGreeting(savedUsername);
    }

    let todayquestion = question[Math.floor(Math.random() * (question.length))];
    loginInput.placeholder = todayquestion;
    console.log("Question: " + todayquestion);

loginForm.addEventListener("submit", onLoginSubmit);
logout.addEventListener ("click", onLogoutSubmit);

setInterval(printSayhello, 1000 * 60 * 30);

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(KEY_USERNAME, username);
    loginForm.classList.add(HIDDEN_CLASSNAME);
    printGreeting(username);
}

function onLogoutSubmit(event) {
    event.preventDefault();
    loginInput.value = "";
    localStorage.removeItem(KEY_USERNAME);
    greeting.classList.remove(GREETING_CLASSNAME);
    greeting.classList.add(HIDDEN_CLASSNAME);
    loginForm.classList.remove(HIDDEN_CLASSNAME);
}

function printGreeting(username) {

    printSayhello();

    sayname.innerText = username;
    greeting.classList.add(GREETING_CLASSNAME)
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

function printSayhello() {
    const date = new Date();
    const hour = Number(date.getHours());
    let say = "Good Afternoon";

    if ( hour < 12 ) {
        say = "Good Morning";
    } else if ( hour >= 18 ) {
        say = "Good Evening";
    }

    sayhello.innerText = say;
}