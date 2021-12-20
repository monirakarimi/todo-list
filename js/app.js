//define UI
const form = document.querySelector('#form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.list-group');
const addbtn = document.querySelector('#addbtn');
const clearbtn = document.querySelector('#clear');

addbtn.addEventListener('click',addTasks);

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
  //clear input
  taskInput.value = '';
  }
  
  e.preventDefault();
}

// Clear All The Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

clearbtn.addEventListener('click',clearTasks);

//Remove Items
function removeItems(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    if (confirm('Are you sure that want to delete?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}
taskList.addEventListener('click',removeItems)