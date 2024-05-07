const todoList = document.getElementById("todoList");
const newTaskInput = document.getElementById("newTaskInput");
const buttonNewTask = document.getElementById("buttonNewTask");
const inputOfSearch = document.getElementById("inputOfSearch");

let todos = [];

fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        todos = data.slice(0, 10);
        displayTodos(todos);
    })

buttonNewTask.addEventListener("click", () => {
    const title = newTaskInput.value.trim();
    if (title) {
        todos.push({
            userId: 1,
            id: todos.length + 1,
            title: title,
            completed: false
        });
        displayTodos(todos);
        newTaskInput.value = "";
    }
});

inputOfSearch.addEventListener("input", () => {
    const searchText = inputOfSearch.value.trim().toLowerCase();
    const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(searchText));
    displayTodos(filteredTodos);
});

function displayTodos(todos) {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = todo.title;
        li.appendChild(span);
        todoList.appendChild(li);
    });
}