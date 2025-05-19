# ✅ To-Do App

A full-stack to-do list application where users can add tasks, mark them as complete, and delete them. Built with vanilla JavaScript and Node.js, using a local JSON file for persistent task storage.

## 🔧 Features
- Add new tasks
- Mark tasks as done ✅
- Delete tasks 🗑️
- Strikethrough visual for completed tasks
- Realtime updates after every action
- Data stored in `tasks.json`

## 💻 Technologies Used
- HTML, CSS, JavaScript (Vanilla)
- Node.js + Express
- `fs` module for local storage
- CORS for frontend-backend communication

## 📂 Project Structure
todo-app/
├── public/
│ ├── index.html
│ ├── script.js
│ └── style.css (optional)
├── tasks.json
└── server.js


## 🚀 Getting Started

1. Clone the repository
2. Run:
   ```bash
   npm install express cors
3. start the server:
   node server.js
4. Open index.html with Live Server (VSCode) or host with Python, etc.

5. 🔐 CORS Info

The server allows requests from http://127.0.0.1:5500 by default — make sure you're serving your HTML from there when testing.

✨ Future Ideas

Edit task message
Sort by done/undone
Add task categories or due dates
User authentication + MongoDB

Make sure tasks.json is initialized with: []

Tasks will not persist across different computers unless synced
