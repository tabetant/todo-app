var textBox = document.getElementById("textbox");
var list = document.querySelector("ul");
var addButton = document.getElementById("add");

function renderTasks(tasks) {
    list.innerHTML = "";
    tasks.forEach(task => {
        var listItem = document.createElement("li");
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });
        var doneButton = document.createElement("button");
        doneButton.textContent = "Done?";
        doneButton.addEventListener("click", () => doneTask(doneButton, task.id));
        listItem.appendChild(document.createTextNode(task.message + " "));
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        listItem.appendChild(doneButton);
        list.appendChild(listItem);
        if (task.done) {
            listItem.style.textDecoration = "line-through";
            doneButton.textContent = "✅ Done!";
        } else {
            doneButton.textContent = "Done?";
        }
    })
}

var addTask = textBox => {
    if (!textBox.value.trim()) {
        alert("Please enter a task.");
        return;
    }
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textBox.value })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Task submitted:", textBox.value);
            textBox.value = '';
            console.log("Server response:", data);
            return fetch('http://localhost:3000/tasks', {
                method: 'GET'
            });
        }
        )
        .then(response => response.json())
        .then(tasks => renderTasks(tasks))
        .catch(err => { console.error("Error:", err.message); });
}


var deleteTask = id => {
    fetch('http://localhost:3000/tasks/' + id, {
        method: 'DELETE',
    })
        .then(() => fetch('http://localhost:3000/tasks', { method: 'GET' }))
        .then(response => response.json())
        .then(tasks => renderTasks(tasks))
}

var doneTask = (doneButton, id) => {
    fetch('http://localhost:3000/tasks/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'done': true })
    })
        .then(() => {
            doneButton.textContent = "Great Job!";
        })
        .catch(err => console.error("Error:", err));
}

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    addTask(textBox);
});