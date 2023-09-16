
// This script handles the adding, deleting, and updating of tasks.

var tasks = document.querySelector(".tasks");
var addTaskInput = document.querySelector(".add-task input");
var addTaskButton = document.querySelector(".add-task button");

addTaskButton.onclick = function() {
  var taskName = addTaskInput.value;
  var task = document.createElement("li");
  task.innerHTML = `
    <input type="checkbox">
    <span class="task-name">${taskName}</span>
    <span class="task-status">Ready</span>
  `;
  tasks.appendChild(task);
};

// This function updates the status of a task.

function updateTaskStatus(task, newStatus) {
  task.querySelector(".task-status").innerHTML = newStatus;
}


