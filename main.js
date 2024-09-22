const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

loadTasks();

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    createTaskElement(task);
    taskInput.value = "";
    saveTasks();
  } else {
    alert("Enter something");
  }
}

addButton.addEventListener("click", addTask);

function createTaskElement(task, isDone = false) {
  const listItem = document.createElement("li");

  const taskTextSpan = document.createElement("span");
  taskTextSpan.textContent = task;

  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  doneButton.className = "doneTask";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "deleteTask";

  listItem.appendChild(taskTextSpan);
  listItem.appendChild(doneButton);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  if (isDone) {
    taskTextSpan.style.textDecoration = "line-through";
  }

  doneButton.addEventListener("click", function () {
    taskTextSpan.style.textDecoration =
      taskTextSpan.style.textDecoration === "line-through"
        ? "none"
        : "line-through";
    saveTasks();
  });

  deleteButton.addEventListener("click", function () {
    listItem.remove();
    saveTasks();
  });
}

function saveTasks() {
  let tasks = [];
  taskList.querySelectorAll("li").forEach(function (item) {
    const taskText = item.querySelector("span").textContent.trim();
    const isDone =
      item.querySelector("span").style.textDecoration === "line-through";
    tasks.push({ text: taskText, done: isDone });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(function (task) {
    createTaskElement(task.text, task.done);
  });
}
