const addTodoBtn = document.querySelector("#new-todo-btn");
const removeTodoBtn = document.querySelector("#remove-todo-btn");
const newTodoInput = document.querySelector("#new-todo");
const todoList = document.querySelector("#list");

let todos = [];

function loadTodos() {
    fetch("http://localhost:4730/todos")
    .then((res) => res.json())
    .then((todosFromAPI) => {
        todos = todosFromAPI;
        renderTodos();
    });
}

function renderTodos() {
todoList.innerHTML = "";
todos.forEach(todo => {
const newLi = document.createElement("li");
const text = document.createTextNode(todo.description);
newLi.appendChild(text);
todoList.appendChild(newLi);

});
}

addTodoBtn.addEventListener("click", () => {
    const newTodotext = newTodoInput.value;
    const newTodo = {
        description: newTodotext,
        done: false

    }
    fetch("http://localhost:4730/todos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    }) .then(res => res.json())
    .then(newTodoFromApi => {
        todos.push(newTodoFromApi)
        renderTodos();
    }) .catch((error) => {
console.error(error);
    });
});

removeTodoBtn.addEventListener("click", () => {
todoList.innerHTML = "";
});



loadTodos();

