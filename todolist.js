let inputEl = document.querySelector('.todo-name-js');
const addTodoBtn = document.querySelector('.add-todos-js');
let todoList = document.querySelector('.todo-list-js');
let clearAllBtn = document.querySelector('.clear-all-js');
let dueDateElement = document.querySelector('.input-date-js');

let todos =  JSON.parse(localStorage.getItem('todosArray')) || [
  {
    name: '',
    dueDate: '',
  },
];

renderTodos();

function renderTodos(){

  let todoListHTML = '';

  todos.forEach((todoObject, index) => {
  
    const { name, dueDate } = todoObject;
   
    let html = `
    <div class='todo-line'> 
      <div> ${name}, </div>
      <div>${dueDate}</div>
      <button class='resetButton js-reset-todo-button'>usuń
      </button>
    </div>
    `
    localStorage.setItem('todosArray', JSON.stringify(todos));
    todoListHTML += html; 
  });

todoList.innerHTML = todoListHTML;

document.querySelectorAll('.js-reset-todo-button').forEach((resetButton, index) => {
  resetButton.addEventListener('click', ()=>{
    todos.splice(index,1);
    renderTodos();
  });
});
}

function addTodo(){
  let name = inputEl.value;
  let dueDate = dueDateElement.value;

  if(!name){
    alert('Wpisz zadanie do wykonania we właściwym polu');
    return;
  }else{
    todos.push(
      {
        name,
        dueDate
      });
  }
  
  localStorage.setItem('todosArray', JSON.stringify(todos));
 
  inputEl.value = '';

  renderTodos()
}

addTodoBtn.addEventListener('click', addTodo );

function getTodos(event){
  if(event.key === "Enter"){
    addTodo();
  }
}

clearAllBtn.addEventListener('click', clearAll)

function clearAll(){
  localStorage.removeItem('todosArray');
  todos = [];
  todoList.innerHTML = ` <div> </div>`
}



