const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const KEY_TODOS = "todos";
let toDos = [];

const savedToDos = localStorage.getItem(KEY_TODOS);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(printToDo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);


function handleToDoSubmit(event) {
    event.preventDefault();

    const newTodo = toDoInput.value;
    toDoInput.value = "";

    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    printToDo(newTodoObj);
    saveToDos();
}

function printToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;

    const span = document.createElement("span");
    span.innerText = newTodo.text;

    const button = document.createElement("button");
    button.innerText = "";
    button.addEventListener("click", deleteToDo);

    li.appendChild(button);
    li.appendChild(span);
    toDoList.appendChild(li);
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();

    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(KEY_TODOS, JSON.stringify(toDos));
}


