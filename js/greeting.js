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

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
} else {
    printGreeting(savedUsername);
}

loginForm.addEventListener("submit", onLoginSubmit);
logout.addEventListener ("click", onLogoutSubmit);



function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(KEY_USERNAME, username);
    loginForm.classList.add(HIDDEN_CLASSNAME);
    printGreeting(username);
}

function onLogoutSubmit(event) {
    event.preventDefault();
    localStorage.removeItem(KEY_USERNAME);
    greeting.classList.remove(GREETING_CLASSNAME);
    greeting.classList.add(HIDDEN_CLASSNAME);
    loginForm.classList.remove(HIDDEN_CLASSNAME);
}

function printGreeting(username) {
    const date = new Date();
    const hour = Number(date.getHours());
    let say = "Good afternoon";

    if ( hour < 12 ) {
        say = "Good Morning";
    } else if ( hour >= 18 ) {
        say = "Good Evening";
    }

    sayhello.innerText = say;
    sayname.innerText = username;
    greeting.classList.add(GREETING_CLASSNAME)
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

