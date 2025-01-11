const todoinput = document.getElementById("todoInput"); // input alanı tanımlandı
const todoList = document.getElementById("todoList"); // liste alanı tanımlandı

const savedTodosJSON = localStorage.getItem("todos");// local storage'dan verileri çekmek için
const savedTodos = savedTodosJSON ? JSON.parse(savedTodosJSON) : [];// verileri çekip array'e dönüştürmek için

for (const todo of savedTodos) { // local storage'dan çekilen verileri listeye eklemek için
    addTodoList(todo);
}

function addTodo() { // input alanına girilen veriyi listeye eklemek için
    const todoText = todoinput.value.trim(); //input alanına girilen veriyi almak için trim() metodu kullanıldı boşlukları silmek için
    console.log(todoText);
    if (todoText === "") { // input alanına girilen veri boş ise uyarı vermek için
        alert("Lütfen bir görev giriniz");
        return;
    }

    const todo = {  // input alanına girilen veriyi obje olarak tanımlamak için
        id: Date.now(),
        text: todoText,
        completed: false,
    };
    savedTodos.push(todo);      // input alanına girilen veriyi array'e eklemek için
    localStorage.setItem("todos", JSON.stringify(savedTodos));  // input alanına girilen veriyi local storage'a eklemek için
    addTodoList(todo);
    todoinput.value = ""; // input alanını temizlemek için
}

function toggleComplete(id) { // tamamlanan görevleri işaretlemek için
    const todo = savedTodos.find(todo => todo.id === id); // id'ye göre görevi bulmak için
    todo.completed = !todo.completed; // tamamlanan görevleri işaretlemek için
    document.getElementById(id).classList.toggle("completed"); // tamamlanan görevleri işaretlemek için
    localStorage.setItem("todos", JSON.stringify(savedTodos)); // tamamlanan görevleri işaretlemek için
}

function editTodo(id) {     // görevleri düzenlemek için
    const todo = savedTodos.find(todo => todo.id === id);
    const newText = prompt("Yeni metni giriniz", todo.text);    // yeni metni girmek için prompt() metodu kullanıldı
    if (!newText) {
        return; // yeni metin girilmezse işlemi iptal etmek için
    }
    todo.text = newText;
    document.getElementById(id).querySelector("span").innerText = newText;
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function removeTodo(id) { // görevleri silmek için
    const todoElement = document.getElementById(id);
    todoElement.style.animation = "fadeOut 0.5s ease";
    setTimeout(() => {
        savedTodos.splice(savedTodos.findIndex(todo => todo.id === id), 1);
        localStorage.setItem("todos", JSON.stringify(savedTodos));
        todoElement.remove();
    }, 300);
}

function addTodoList(todo) { // listeye eklenen görevleri oluşturmak için
    const li = document.createElement("li"); // listeye eklenen görevleri oluşturmak için
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
