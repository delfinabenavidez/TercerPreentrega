document.addEventListener("DOMContentLoaded", function () {
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    
    const taskList = document.getElementById('taskList');
    const completedTasksList = document.getElementById('completedTasks');
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const filterTasksInput = document.getElementById('filterTasks');

    function renderTasks() {
        taskList.innerHTML = '';
        completedTasksList.innerHTML = '';

       
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = task;

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Completar';
            completeButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
                updateLocalStorage();
            });

            listItem.appendChild(completeButton);
            taskList.appendChild(listItem);
        });

        const filterText = filterTasksInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task => task.toLowerCase().includes(filterText));

        filteredTasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = task;

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Completar';
            completeButton.addEventListener('click', () => {
                const index = tasks.indexOf(task);
                tasks.splice(index, 1);
                renderTasks();
                updateLocalStorage();
            });

            listItem.appendChild(completeButton);
            taskList.appendChild(listItem);
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', () => {
        const newTask = taskInput.value;
        if (newTask) {
            tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
            updateLocalStorage();
        }
    });

    filterTasksInput.addEventListener('input', () => {
        renderTasks();
    });

    renderTasks();
});