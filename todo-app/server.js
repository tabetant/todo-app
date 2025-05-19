const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const path = require('path');

const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/tasks', (req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }
        let tasks = [];
        try {
            tasks = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).json({ message: 'Error parsing JSON' });
        }
        res.json(tasks);
    });
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }
        let tasks = [];
        try {
            tasks = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).json({ message: 'Error parsing JSON' });
        }
        let nextId = 1;
        if (tasks.length > 0) {
            const maxId = Math.max(...tasks.map(task => task.id));
            nextId = maxId + 1;
        }
        newTask.id = nextId;
        newTask.done = false;
        tasks.push(newTask);
        fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' });
            }
            res.status(201).json({ message: 'Saved', data: newTask });
        })
    })
})

app.delete('/tasks/:id', (req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }
        let tasks = [];
        try {
            tasks = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).json({ message: 'Error parsing JSON' });
        }
        const id = Number(req.params.id);
        const updatedTasks = tasks.filter(task => task.id != id);
        fs.writeFile('tasks.json', JSON.stringify(updatedTasks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' });
            }
            res.status(200).json({ message: 'Task deleted' });
        });
    })
})

app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }
        let tasks = [];
        try {
            tasks = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).json({ message: 'Error parsing JSON' });
        }
        const completedTask = tasks.find(task => task.id == id);
        if (completedTask == undefined) {
            return res.status(404).json({ message: 'Task not found' });
        }
        completedTask["done"] = true;
        fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' });
            }
            res.status(200).json({ message: 'Task done' });
        });
    })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

