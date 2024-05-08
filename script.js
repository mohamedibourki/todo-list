const todoList = document.getElementById("todoList");
const newTaskInput = document.getElementById("newTaskInput");
const buttonNewTask = document.getElementById("buttonNewTask");
const inputOfSearch = document.getElementById("inputOfSearch");
const buttonDeleteAll = document.getElementById("buttonDeleteAll");

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function displayTodos(todos) {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = todo.title;
        li.appendChild(span);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos(todos);
        });
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    });
}

buttonNewTask.addEventListener("click", () => {
    const title = newTaskInput.value.trim();
    if (title) {
        todos.push({
            userId: 1,
            id: todos.length + 1,
            title: title,
            completed: false
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos(todos);
        newTaskInput.value = "";
    }
});

inputOfSearch.addEventListener("input", () => {
    const searchText = inputOfSearch.value.trim().toLowerCase();
    const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(searchText));
    displayTodos(filteredTodos);
});

buttonDeleteAll.addEventListener("click", () => {
    localStorage.removeItem('todos');
    todos = [];
    displayTodos(todos);
});

if (todos.length === 0) {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response => response.json())
        .then(data => {
            todos = data.slice(0, 10);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos(todos);
        });
} else {
    displayTodos(todos);
}