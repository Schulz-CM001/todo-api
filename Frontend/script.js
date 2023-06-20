"use strict";

const ul = document.getElementById("todo-list");
const addBTN = document.getElementById("add-button");
const divFilter = document.getElementById("div-filter");
const removeBTN = document.getElementById("remove-button");
const inputfield = document.getElementById("input-field");

addBTN.addEventListener("click", () => {
getDataFromAPI("POST", 0, "", inputfield.value);
getDataFromAPI();
inputfield.value = "";
});

divFilter.addEventListener("click", () => {
if (document.getElementById("input-all").checked) {
    getDataFromAPI();
}
if (document.getElementById("input-open").checked) {
    getDataFromAPI(0, 0, 0, 0, "open");
}
if (document.getElementById("input-done").checked) {
    getDataFromAPI(0, 0, 0, 0, "done");
}
});

removeBTN.addEventListener("click", () => {
for (const child of ul.children) {
    if (child.children[0].checked) {
    getDataFromAPI("DELETE", child.id);
    getDataFromAPI();
    }
}
});

ul.addEventListener("change", (event) => {
const todo = {
    id: event.target.nextSibling.parentElement.id,
    description: event.target.nextSibling.data,
    done: event.target.checked,
};
getDataFromAPI("PUT", event.target.nextSibling.parentElement.id, todo);
});

function renderTodos(todos) {
ul.innerHTML = "";

todos.forEach((todo) => {
    const li = document.createElement("li");
    const checkBox = document.createElement("input");

    checkBox.type = "checkbox";
    checkBox.checked = todo.done;

    li.appendChild(checkBox);
    li.appendChild(document.createTextNode(todo.description));
    li.setAttribute("id", todo.id);
    ul.appendChild(li);
});
}

function getDataFromAPI(HttpMethod, id, updateTODO, newTodo, filter) {
const URL = "http://localhost:4730/todos";

if (HttpMethod === "POST") {
    const todo = { description: newTodo, done: false };
    fetch(URL, {
    method: HttpMethod,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
    })
    .then((req) => req.json())
    .then((todos) => {
        renderTodos(todos);
    });
} else if (HttpMethod === "PUT") {
    fetch(URL + "/" + id, {
    method: HttpMethod,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(updateTODO),
    })
    .then((req) => req.json())
    .then((todos) => {
        renderTodos(todos);
    });
} else if (HttpMethod === "DELETE") {
    fetch(URL + "/" + id, {
    method: HttpMethod,
    })
    .then((res) => res.json())
    .then(() => {});
} else {
    if (filter === "open") {
    fetch(URL)
        .then((req) => req.json())
        .then((todos) => {
        const filteredArray = todos.filter((todos) => todos.done === false);
        renderTodos(filteredArray);
        });
    } else if (filter === "done") {
    fetch(URL)
        .then((req) => req.json())
        .then((todos) => {
        const filteredArray = todos.filter((todos) => todos.done === true);
        renderTodos(filteredArray);
        });
    } else {
    fetch(URL)
        .then((req) => req.json())
        .then((todos) => {
        renderTodos(todos);
        });
    }
}
}

getDataFromAPI();