const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('btn');
const todoList = document.getElementById('todo-list');

document.addEventListener("DOMContentLoaded", loadTodos);

function loadTodos(){
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        createTodoElement(todo.text);
    });
}

function saveTodos(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(){
    const tasktext = todoInput.value.trim();
    if(tasktext==='') return;

    createTodoElement(tasktext);

    // Save the todo to local storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({text: tasktext });
    saveTodos(todos);

    todoInput.value = "";
}
 
function createTodoElement(taskText){
    const li = document.createElement('li');
    li.className = "p-3 mt-2 bg-gray-600 text-white justify-between flex rounded-xl";

    const span = document.createElement('span');
    span.className = "mt-1";
    span.textContent = taskText;

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
    editBtn.className = 'bg-slate-200 text-slate-500 pl-2 pr-2 pt-[4px] pb-[3px] rounded-full';
    editBtn.addEventListener('click',() => {
            editTodo(li,span, span_1);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML ='<ion-icon name="trash-outline"></ion-icon>';
    deleteBtn.className = 'bg-slate-200 text-slate-500 pl-2 pr-2 pt-[4px] pb-[3px] rounded-full';
    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(li);
        removeTodoFromStorage(taskText);
    });


    const span_1 = document.createElement('span');
    span_1.className = 'space-x-2';

    span_1.appendChild(editBtn);
    span_1.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(span_1);

    todoList.appendChild(li);
}

function editTodo(li, span, span_1){
    const currentText = span.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'text-black -m-[4px] py-[8px] grow pl-2 focus:outline-none rounded';
    span.textContent = '';


    const AddBtn = document.createElement('button');
    AddBtn.className = 'pl-10 pr-5 font-semibold';
    AddBtn.textContent = "Save";
    AddBtn.addEventListener('click', saveEdit );
    input.addEventListener('keypress', (e) => 
    {
        if(e.key === 'Enter'){
            saveEdit();
        }
    })

    const div = document.createElement('div');
    div.className = 'w-full flex bg-gray-600  rounded-xl justify-between';
    div.appendChild(input);
    div.appendChild(AddBtn);

    li.innerHTML = '';
    li.appendChild(div);
    input.focus();


    function saveEdit(){
        const newText = input.value.trim();
        if(newText===""){
            span.textContent = currentText;
        }else{
            span.textContent = newText;
            updateTodoInStorage(currentText,newText);
        }

        li.innerHTML = '';
        li.appendChild(span);
        li.appendChild(span_1);
    }


}

function removeTodoFromStorage(taskText){
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo.text!==taskText);
    saveTodos(todos);
}

function updateTodoInStorage(oldText,newText){
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let todoIndex = todos.findIndex(todo => todo.text === oldText);
    todos[todoIndex].text = newText;
    saveTodos(todos);
}

addBtn.addEventListener('click',addTodo);

todoInput.addEventListener('keypress', (e) =>
{
    if(e.key === 'Enter'){
            addTodo();
    }

});

