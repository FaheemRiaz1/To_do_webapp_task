# 📌 Full Stack To-Do Web App

A simple and elegant to-do list manager with full REST API integration and clean design, built using:

- ✅ Angular 17 (Frontend)
- ✅ Node.js + Express (Backend)
- ✅ MySQL (Database)
- ✅ Jest + Supertest (Backend Testing)

---

## 🌐 Features at a Glance

- 🗂 Manage multiple to-do lists
- 📝 Add, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- 📊 View total and completed task counts
- 📋 Task descriptions for detailed view
- 🎨 Responsive UI for desktop and mobile
- 💥 Error handling + clean component design
- 🧠 State management using `BehaviorSubject`
- 🗃 Data persists using both MySQL and localStorage
- ✅ Backend tested thoroughly using Jest

---

## 🧠 Application Flow

1. User creates a **List** (e.g. "Grocery Shopping")
2. Inside the list, user can:
   - ➕ Add tasks (with title & description)
   - ✅ Mark tasks as completed
   - 🗑 Delete tasks
3. Each list shows:
   - 📌 Title
   - 📊 Summary (total/completed tasks)
4. Selecting a list opens detailed view of its tasks.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd To_do_webapp_task
```

---

## ⚙️ Backend Setup (Node.js + Express)

### 📁 Navigate to backend folder

```bash
cd backend
```

### 📦 Install Dependencies

```bash
npm install
```

### ⚙️ Create `.env` File

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=tododb
PORT=3000
```

> ✅ MySQL must be running locally  
> ✅ Tables (`lists`, `todos`) are auto-created if not exist

### ▶️ Start Backend Server

```bash
npx tsx index.ts
```

- Server runs at: `http://localhost:3000`

---

### 🧪 Run Backend Tests

```bash
npm test
```

- Covers:
  - ✅ Task creation
  - ✅ Deletion
  - ✅ Status updates
  - ✅ Error handling

---

## 🌍 Frontend Setup (Angular 17)

### 📁 Navigate to Angular folder

```bash
cd todo-app
```

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Run Angular App

```bash
ng serve
```

- App runs at: `http://localhost:4200`

---

## ✅ Working Demo Flow

1. Start backend → `npx tsx index.ts`
2. Start frontend → `ng serve`
3. Open browser → [http://localhost:4200](http://localhost:4200)
4. Create a list
5. Add tasks under that list
6. Mark tasks as done or delete them
7. View task stats on each list card

---

## 📂 Directory Structure

```
To_do_webapp_task/
├── backend/
│   ├── controller/
│   ├── routes/
│   ├── database/
│   ├── test/
│   └── index.ts
└── todo-app/
    └── src/
        └── app/
            ├── components/
            ├── services/
            ├── pages/
            └── models/
```

---

## 🧩 Tech Stack

| Layer     | Technology       |
|-----------|------------------|
| Frontend  | Angular 17       |
| Styling   | CSS              |
| Backend   | Express + Node.js|
| Database  | MySQL            |
| State     | BehaviorSubject  |
| Testing   | Jest + Supertest |

---

## 🔧 Technical Requirements – Fully Implemented ✅

### ✔ Functionality

- Display and manage multiple to-do lists.
- Show summary of tasks in each list (total + completed).
- View detailed task info: title, description, and status.
- Add lists and tasks dynamically.
- Mark tasks as complete or delete them.

### ✔ Frontend (Angular)

- Built using Angular 17 with TypeScript.
- Modular structure with reusable components.
- Responsive UI (tested on mobile & desktop).
- Optionally styled using native CSS and icon libraries.

### ✔ Backend (REST API)

- RESTful endpoints using Node.js + Express.
- MySQL integration with auto schema creation.
- Endpoints for creating, reading, updating, and deleting tasks/lists.
- Custom error handling responses.

### ✔ State Management

- Implemented with `BehaviorSubject` in services for reactivity.

### ✔ Local Storage

- Data is also cached in localStorage to ensure persistence on page reload.

### ✔ Testing

- Unit tests for key backend APIs using Jest & Supertest.
- Frontend tested with Angular tools (unit tests where applicable).

### ✔ Code Quality

- Well-commented, clean, modular code.
- Followed Angular and TypeScript best practices.
- Used ESLint & Prettier for formatting and linting.

---

## 🛠 Future Improvements

- 👤 Add user authentication
- 📅 Due date support & reminders
- 🧲 Drag-and-drop task ordering
- 🧹 Task filtering & sorting
- ☁️ Deployment on Vercel (frontend) & Railway (backend)

---

## 👤 Author

**Faheem Riaz**  
> Passionate about building clean, scalable full-stack web apps.

---

## 📜 License

This project is licensed under the **MIT License**.
