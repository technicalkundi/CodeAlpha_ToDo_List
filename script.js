document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterAllBtn = document.getElementById('filter-all');
    const filterCompletedBtn = document.getElementById('filter-completed');
    const filterPendingBtn = document.getElementById('filter-pending');
    const clearAllBtn = document.getElementById('clear-all-btn');
    let currentFilter = 'all';

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText, false);
            taskInput.value = '';
            updateFilter();
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const taskItem = event.target.parentElement.parentElement;
            const action = event.target.className;

            if (action === 'delete') {
                taskList.removeChild(taskItem);
                updateFilter();
            } else if (action === 'complete') {
                taskItem.classList.toggle('completed');
                updateFilter();
            } else if (action === 'edit') {
                const newTaskText = prompt('Edit your task', taskItem.firstChild.textContent);
                if (newTaskText !== null && newTaskText.trim() !== '') {
                    taskItem.firstChild.textContent = newTaskText.trim();
                }
            }
        }
    });

    filterAllBtn.addEventListener('click', () => {
        currentFilter = 'all';
        updateFilter();
        updateActiveButton(filterAllBtn);
    });

    filterCompletedBtn.addEventListener('click', () => {
        currentFilter = 'completed';
        updateFilter();
        updateActiveButton(filterCompletedBtn);
    });

    filterPendingBtn.addEventListener('click', () => {
        currentFilter = 'pending';
        updateFilter();
        updateActiveButton(filterPendingBtn);
    });

    clearAllBtn.addEventListener('click', () => {
        taskList.innerHTML = '';
    });

    function addTask(taskText, completed) {
        const taskItem = document.createElement('li');
        const taskTextNode = document.createTextNode(taskText);
        taskItem.appendChild(taskTextNode);

        if (completed) {
            taskItem.classList.add('completed');
        }

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.className = 'complete';
        buttonsDiv.appendChild(completeBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        buttonsDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        buttonsDiv.appendChild(deleteBtn);

        taskItem.appendChild(buttonsDiv);
        taskList.appendChild(taskItem);
    }

    function updateFilter() {
        const tasks = taskList.getElementsByTagName('li');

        for (let task of tasks) {
            const isCompleted = task.classList.contains('completed');

            switch (currentFilter) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'completed':
                    task.style.display = isCompleted ? 'flex' : 'none';
                    break;
                case 'pending':
                    task.style.display = !isCompleted ? 'flex' : 'none';
                    break;
                default:
                    task.style.display = 'flex';
            }
        }
    }

    function updateActiveButton(activeButton) {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
});
