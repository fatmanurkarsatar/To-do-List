const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todolar");

let todosArray = sessionStorage.getItem('todo') ?  // Başlangıçta storage'da tanımlanmış veri var mı ona bakar
  JSON.parse(sessionStorage.getItem('todo')) : []; // 'todo' ile saklanan veri yoksa boş array oluşturur

sessionStorage.setItem('todo', JSON.stringify(todosArray));
const data = JSON.parse(sessionStorage.getItem('todo')); // getItem değeri okur

// Mevcut todoları listeye ekler
data.forEach(item => createTodoElement(item));

function ekle() {
  if (todoInput.value === "") {
    alert("Bir todo girin");
  } else {
    const newTodo = todoInput.value;
    todosArray.push(newTodo);
    sessionStorage.setItem('todo', JSON.stringify(todosArray));
    createTodoElement(newTodo);
    todoInput.value = "";  // Input alanını temizle
  }
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.innerHTML = todo;

  const deleteButton = document.createElement("button");
  deleteButton.id = "delete";
  deleteButton.innerHTML = '<i class="fa-solid fa-x"></i>';

  const editButton = document.createElement("button");
  editButton.id = "edit";
  editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(editButton);
  li.appendChild(buttonContainer);

  todoList.appendChild(li);

  // Silme işlemi 
  deleteButton.addEventListener("click", function (e) {
      li.remove();
      todosArray = todosArray.filter(item => item !== todo);
      sessionStorage.setItem('todo', JSON.stringify(todosArray));
    }
  );

  // Düzenleme işlemi
  editButton.addEventListener("click", function(e){
      const editInput = prompt("Todo'yu düzenleyin:", li.firstChild.textContent.trim());
      
      if (editInput !== null && editInput !== "") {
        li.firstChild.textContent = editInput;
        const index = todosArray.indexOf(todo);
        
        if (index !== -1) { // Array'in olup olmadığını anlamak için
          todosArray[index] = editInput;
          sessionStorage.setItem('todo', JSON.stringify(todosArray));
        }
      }
    }
  );
}

// Todo'nun üzerini çizme
todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
});
