// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('.clear-tasks');
const addBtn = document.querySelector('#add-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task event
    form.addEventListener('submit', addTask);
    // Clear Task event
    taskList.addEventListener('click', clearTask);
    // Remove Task event
    clearBtn.addEventListener('click', removeTask);
    // Filter Task event
    filter.addEventListener('keyup', filterTasks);
}

// Disabled button for empty text field
function disableBtn() {
    if(taskInput.value === "") {
        addBtn.disabled = true;
    } else {
        addBtn.disabled = false;
    }
}

// Get tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create new li element
    const li = document.createElement('li');
    // Add a class
    li.className = 'collection-item';
    // Append textNode to the LI
    li.appendChild(document.createTextNode(task));
    // Create new link
    const link = document.createElement('a');
    // Add a class to the link
    link.className = 'delete-item secondary-content';
    // Style link 
    link.style.cursor = 'pointer';
    // Enter 'x' icon into the link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to the LI
    li.appendChild(link);

    // Append LI to the UL
    taskList.appendChild(li);

    });
}

// Add Task
function addTask(e) {
    // Create new li element
    const li = document.createElement('li');
    // Add a class
    li.className = 'collection-item';
    // Append textNode to the LI
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link
    const link = document.createElement('a');
    // Add a class to the link
    link.className = 'delete-item secondary-content';
    // Style link 
    link.style.cursor = 'pointer';
    // Enter 'x' icon into the link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to the LI
    li.appendChild(link);

    // Append LI to the UL
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = '';
    
    e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task
function clearTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
        
        // Clear from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Clear from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask() {
    // taskList.innerHTML = '';

    // Faster way
    while(taskList.firstChild) {
        taskList.firstChild.remove();
    }

    // Remove from Local Storage
    clearTasksFromLocalStorage();
}

// Remove tasks from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}