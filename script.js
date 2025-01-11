const todoinput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

const savedTodosJSON = localStorage.getItem("todos");
const savedTodos = savedTodosJSON ? JSON.parse(savedTodosJSON) : [];

for (const todo of savedTodos) {
    addTodoList(todo);
}

function addTodo() {
    const todoText = todoinput.value.trim();
    console.log(todoText);
    if (todoText === "") {
        alert("Lütfen bir görev giriniz");
        return;
    }

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
    };
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    addTodoList(todo);
    todoinput.value = "";
}

function toggleComplete(id) {
    const todo = savedTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    document.getElementById(id).classList.toggle("completed");
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function editTodo(id) {
    const todo = savedTodos.find(todo => todo.id === id);
    const newText = prompt("Yeni metni giriniz", todo.text);
    if (!newText) {
        return;
    }
    todo.text = newText;
    document.getElementById(id).querySelector("span").innerText = newText;
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function removeTodo(id) {
    const todoElement = document.getElementById(id);
    todoElement.style.animation = "fadeOut 0.5s ease";
    setTimeout(() => {
        savedTodos.splice(savedTodos.findIndex(todo => todo.id === id), 1);
        localStorage.setItem("todos", JSON.stringify(savedTodos));
        todoElement.remove();
    }, 300);
}

function addTodoList(todo) {
    const li = document.createElement("li");
    li.setAttribute("id", todo.id);
    li.innerHTML = `
        <span title="${todo.text}">${todo.text}</span>
        <button onClick="toggleComplete(${todo.id})"><i class="fa-solid fa-check"></i></button>
        <button onClick="removeTodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
        <button onClick="editTodo(${todo.id})"><i class="fa-regular fa-pen-to-square"></i></button>
    `;
    li.classList.toggle("completed", todo.completed);
    todoList.appendChild(li);
}
