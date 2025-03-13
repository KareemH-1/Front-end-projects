document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    document.getElementById("taskInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
let ctTasks = 0;
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") return;

    let li = document.createElement("li");
    li.textContent = task;
    ctTasks++;
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
        li.remove();
        ctTasks--;
        saveTasks();
        displayRemoveAllButton();
    };

    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
    input.value = "";

    saveTasks();
    displayRemoveAllButton();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(function(li) {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    document.getElementById("taskList").innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        let li = document.createElement("li");

        let taskText = document.createTextNode(task);
        li.appendChild(taskText);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function () {
            li.remove();
            saveTasks();
        };

        li.appendChild(deleteBtn);
        document.getElementById("taskList").appendChild(li);
    });
}

function removeAll(){
    let deleteAllBtn = document.getElementById("removeAll");
    deleteAllBtn.onclick = function () {
        document.getElementById("taskList").innerHTML = "";
        localStorage.removeItem("tasks");
        ctTasks = 0;
        displayRemoveAllButton();
    };
    
}

function displayRemoveAllButton() {
    if (ctTasks >= 2) {
        document.getElementById("removeAll").style.display = "block";
    } else {
        document.getElementById("removeAll").style.display = "none";
    }
}