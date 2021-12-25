//define UI
const form = document.querySelector('#form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.list-group');
const addbtn = document.querySelector('#addbtn');
const clearbtn = document.querySelector('#clear');

loadAllEventLinteners()

//Load All Events
function loadAllEventLinteners() {
  //Add Task
  addbtn.addEventListener('click',addTasks);

  //Clear All Tasks
  clearbtn.addEventListener('click',clearTasks);

  //Remove Tasks
  taskList.addEventListener('click',removeItems);

  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);

  //completed Tasks
  taskList.addEventListener('dblclick',completedTasks);
}


//Add Tasks
function addTasks(e) {
  if (taskInput.value === '') {
    alert("Add a task");
  }
  else{
  //Create Li Element
  const li = document.createElement('li');
  //Add Class To li
  li.classList.add('list-group-item');
  //Create Text Node and Append To Li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create Link Element
  const link = document.createElement('a');
  //Add Class
  link.className = 'float-end delete';
  //Add icon html
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  //Appent the link to li
  li.appendChild(link);
  //Append li to Ul
  taskList.appendChild(li);

  //Store In Local Storage
  storeTasksInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = '';
  }
  
  e.preventDefault();
}

//Store Tasks to Local Storage
function storeTasksInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Get All Tasks 
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
  //Create Li Element
  const li = document.createElement('li');
  //Add Class To li
  li.classList.add('list-group-item');
  //Create Text Node and Append To Li
  li.appendChild(document.createTextNode(task));
  //Create Link Element
  const link = document.createElement('a');
  //Add Class
  link.className = 'float-end delete';
  //Add icon html
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  //Appent the link to li
  li.appendChild(link);
  //Append li to Ul
  taskList.appendChild(li);

  });
}

//Remove Items
function removeItems(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    if (confirm('Are you sure that want to delete?')) {
      e.target.parentElement.parentElement.remove();

       //Remove From Local Storage
       removeTasksFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove From Local Storage
function removeTasksFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task , index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear All The Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear Tasks from Local Storage
  clearTasksFromLocalStorage();
}

//Clear Tasks from Local Storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Done Tasks
function completedTasks(e) {
  e.target.parentElement.parentElement.className = "text-decoration-line-through"
}
