const inputbox = document.getElementById("input");
const add = document.querySelector(".icon-link");
const todolist = document.querySelector(".itemlist");
const pendingTasks = document.querySelector(".pendingTasks");

inputbox.addEventListener("keyup", () => {
  // Check if the input field has any content
  if (inputbox.value.trim() !== "") {
    // If it has content, show the button
    add.style.display = "block";
  } else {
    // If it's empty, hide the button
    add.style.display = "none";
  }
});

var item = [];
// Onclick Event is used to add task in array
add.onclick = () => {
  const taskText = inputbox.value.trim();
  if (taskText !== "") {
    item.push({ text: taskText, completed: false }); // Add task as an object
    showcase(); // showcase call for adding <li> elements in HTML
  }
};

function showcase() {
  let ListTag = "";
  item.forEach((task, index) => {
    ListTag += `<li>
                <label class="box">
                    <input class="checkinput" style="margin: 0 5px" type="checkbox" onchange="toggleTaskCompletion(${index})" ${
      task.completed ? "checked" : ""
    }>
                    <span class="checkmark ${
                      task.completed ? "completed-task" : ""
                    }">${task.text}</span>
                </label>
                <span class="icon">
                    <i class="del fa-solid fa-xmark" onclick="deleteTask(${index})"></i>
                <span>
            </li>`;
  });

  todolist.innerHTML = ListTag; //adding new li tag inside ul tag
  inputbox.value = ""; //once task added the input field blank
  add.style.display = "none"; //Add button hide
  updatePendingTaskCount(); // Update the count of pending tasks
}

function updatePendingTaskCount() {
  const pendingCount = item.filter((task) => !task.completed).length;
  pendingTasks.textContent = pendingCount; // Update the count of pending tasks
}

const clearall = document.querySelector(".clearall");
clearall.onclick = () => {
  item.length = 0; // Clear all tasks by emptying the tasks array
  showcase();
};

document.querySelector(".clearcomtask").onclick = () => {
  item = item.filter((task) => !task.completed);
  showcase();
};

function deleteTask(index) {
  item.splice(index, 1); //remove element from array
  showcase();
}

function toggleTaskCompletion(index) {
  const task = item[index];
  task.completed = !task.completed; // Toggle the completion status of the task
  updatePendingTaskCount(); // Update the count of pending tasks
  showcase(); // Update the display
}
