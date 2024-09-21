// подключение к html, классы
const addTask = document.getElementById('add-task');
const inputTask = document.getElementById('task-input');
const allTasks = document.querySelector('.all-tasks');
const delAll = document.getElementById('delete-all-tasks')

let tasks = [];
let todoTasks = [];

function Task(task) {
  this.task = task;
  this.completed = false;
}

//функции
function createTask(description, index) {
  return `
        <div class="create-task ${description.completed ? 'checked' : ''}">
             <div class="task">${description.task}</div>
             <div class="action">           
                  <input onclick="completedTask(${index})" class="complete" type="checkbox" 
                        ${description.completed ? 'checked' : ''}>
                  <span onclick="editTask(${index})" class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></span>
                  <span onclick="deletedTask(${index})" class="delete"><i class="fa-solid fa-trash"></i></span>
             </div>
        </div>          
    `
}


// завершенные задачи
function filterTasks() {
  const activeTasks = tasks.length && tasks.filter(item => item.completed === false);
  const completedTasks = tasks.length && tasks.filter(item => item.completed === true);
  tasks = [...activeTasks, ...completedTasks];
}

// вывод задач
function showTasks() {
  allTasks.innerHTML = "";
  if (tasks.length === 0) {
    delAll.classList.add("hide");
  } else {
    delAll.classList.remove("hide");
  }
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      allTasks.innerHTML += createTask(item, index)
    });
    todoTasks = document.querySelectorAll('.create-task');

  }
}

showTasks();

//обращение к locale storage
function storage() {
}

//завершение задачи
function completedTask(index) {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoTasks[index].classList.add('checked')
    setTimeout(() => {
      alertify.success('Task done!')
    }, 150)
  } else {
    todoTasks[index].classList.remove('checked')
    setTimeout(() => {
      alertify.warning('Task not done!')
    }, 150)
  }
  storage();
  showTasks();
}


// удаление задач
function deletedTask(index) {
  todoTasks[index].classList.add('deleted')
  setTimeout(() => {
    tasks.splice(index, 1);
    storage();
    showTasks();
  }, 500)
  setTimeout(() => {
    alertify.success('Task deleted!')
  }, 550)

}

// Редактирование
function editTask(index) {
  let curTask = todoTasks[index]; // выбранная задача
  if(!curTask.classList.contains('edit')) { // редактирование
    curTask.classList.add('edit'); // Добавить класс 
    curTask.querySelector('.task').innerHTML = `<input type="test" value="${tasks[index].task}">`; // инпут с редактированием
  } else {
    let newTask = curTask.querySelector('.task > input').value;
    tasks[index].task = newTask;
    curTask.querySelector('.task').innerText = newTask;
    curTask.classList.remove('edit');
      }
}


//клик добавить новую задачу
addTask.addEventListener("click", () => {
  if (inputTask.value === '') {
    alertify.error('Enter a task!')
  } else {
    setTimeout(() => {
      alertify.success('Task added!')
    }, 100)
    tasks.push(new Task(inputTask.value));
  }
  storage();
  showTasks();
  inputTask.value = '';

});

// кнопка удалить все
delAll.addEventListener("click", () => {
  setTimeout(() => {
    alertify.success('All tasks deleted!')
  }, 100)
  tasks = [];
  storage();
  showTasks();
});