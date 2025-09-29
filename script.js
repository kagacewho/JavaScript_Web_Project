let taskToAdd = document.getElementById('task-to-add');
let addButton = document.getElementById('addButton');
let tasksList = document.getElementById('tasks-list');

function addTask() {
    if (!taskToAdd.value.trim()) return;

    let task = document.createElement('div');
    task.className = 'task-item';

    let checkTask = document.createElement('input');
    checkTask.type = 'checkbox';
    checkTask.className = 'task-checkbox';

    let taskText = document.createElement('p');
    taskText.textContent = taskToAdd.value;
    taskText.className = 'task-text';

    let editTask = document.createElement('button');
    editTask.textContent = 'Edit';
    editTask.className = 'task-edit';

    let deleteTask = document.createElement('button');
    deleteTask.textContent = 'Delete';
    deleteTask.className = 'task-delete';

    task.append(checkTask, taskText, editTask, deleteTask);
    tasksList.appendChild(task);

    taskToAdd.value = '';
    saveData();
}

addButton.addEventListener('click', addTask);

tasksList.addEventListener('click', function (e) {
    let task = e.target.closest('.task-item');

    if (e.target.classList.contains('task-checkbox')) {
        task.classList.toggle('checked');
        saveData();
    }

    if (e.target.classList.contains('task-delete')) {
        task.remove();
        saveData();
    }

    if (e.target.classList.contains('task-edit')) {
        let taskText = task.querySelector('.task-text');
        let isEditing = taskText.contentEditable === 'true';

        if (!isEditing) {
            taskText.contentEditable = 'true';
            taskText.focus();
            e.target.textContent = 'Save';
            task.classList.add('editing');
        } else {
            taskText.contentEditable = 'false';
            e.target.textContent = 'Edit';
            task.classList.remove('editing');
            saveData();
        }
    }
});

function saveData() {
    localStorage.setItem('data', tasksList.innerHTML);
}

function showData() {
    tasksList.innerHTML = localStorage.getItem('data') || '';
}
showData();

let clearDataButton = document.createElement('button');
clearDataButton.textContent = 'Clear All';
clearDataButton.className = 'clear-button';
document.body.append(clearDataButton);

clearDataButton.addEventListener('click', function () {
    localStorage.clear();
    tasksList.innerHTML = '';
});
