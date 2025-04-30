# 🚀 Task Manager App - Node.js, JWT Authentication & MongoDB

Welcome to **Task Manager**, a robust and secure application built using **Node.js**, **Express.js**, **MongoDB**, **JWT Authentication**, and **EJS**. Manage your tasks, track your projects, and stay organized with this full-stack web application.

---

## ✨ Features

- ✅ User Registration & Login with JWT
- 🔐 Authenticated Routes via Middleware
- 🗃️ Task Management (CRUD)
- 📁 Project Management
- 🍪 Secure Cookie Handling
- 📄 Dynamic Page Rendering (EJS)
- 💻 MongoDB Integration

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS Templates, Bootstrap
- **Authentication**: JWT (JSON Web Token), bcrypt
- **Database**: MongoDB
- **Other**: Mongoose, Cookie-Parser

---

## 📝 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (or use **MongoDB Atlas** for cloud database)
- **npm** (Node Package Manager)

### Steps to Set Up

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/task-manager-app.git
   cd task-manager-app
   ```
2. **Install dependencies**:

  ```
  npm install
  ```
3. **Configure your environment variables**:

  - **Create a .env file in the root directory and add the following**:
  ```
  JWT_SECRET=your_jwt_secret
  MONGO_URI=your_mongo_database_uri
  ```
  - Replace your_jwt_secret with a random string for JWT token signing, and your_mongo_database_uri with your MongoDB URI.
4. **Run the application**:

    ```
    npm start
    ```
---

## 📸 Screenshots

| Page | Screenshot |
|:-----|:-----------|
| **Register Page** | ![image](https://github.com/user-attachments/assets/7e4bc74c-9637-4bd8-9f1f-f85b8505e17d) |
| **Login Page** | ![image](https://github.com/user-attachments/assets/ccade9fe-e6d7-4a35-949c-2b1a0b133147) |
| **Home Page** | ![image](https://github.com/user-attachments/assets/d3308307-ef84-42a3-9c78-c4f343de80de) |
| **Creat Task Form Page** | ![image](https://github.com/user-attachments/assets/64956cc9-8475-425d-9a0e-83c45e4d4797) |
| **View Task Page** | ![image](https://github.com/user-attachments/assets/cab9c9c7-2fd0-4515-a8c3-6db794a673fe) |
| **Create Project Form Page** | ![image](https://github.com/user-attachments/assets/5c4bcbb4-a4ec-4c20-b9a2-f36d97d71be6) |

---

## 🚀 Live Demo

🌎 **Live Project**: [Task-Tracker-Application](https://task-tracker-application-eozz.onrender.com)

## 🔑 API Endpoints

### 🧑‍💻 User Authentication

```http
POST /register
POST /login
```

### ✅ Task Management

```http
## POST /tasks
- Create a new task (Authentication required).
## GET /tasks
- Get all tasks for the logged-in user (Authentication required).
## PUT /tasks/:id
- Update an existing task (Authentication required).
## DELETE /tasks/:id
- Delete a task (Authentication required).
```

### 📂 Project Management

```http
## POST /projects
- Create a new project (Authentication required).
## GET /projects
- Get all projects for the logged-in user (Authentication required).
## DELETE /projects/:id
- Delete a project (Authentication required).
```

## 📂 Project Structure

```
task-tracker/
├── controllers/
│   └── mainController.js         # All route logic (auth, task, project handling)
│
├── middleware/
│   └── authMiddleware.js         # JWT token verification middleware
│
├── models/
│   ├── userModel.js              # Mongoose model for User
│   ├── taskModel.js              # Mongoose model for Task
│   └── projectModel.js           # Mongoose model for Project
│
├── routes/
│   └── mainRoutes.js             # Express route definitions
│
├── views/
│   ├── index.ejs                 # Homepage showing user tasks
│   └── admin/
│       ├── registerForm.ejs      # Registration page
│       ├── loginForm.ejs         # Login page
│       ├── taskForm.ejs          # Task creation form
│       ├── editTaskForm.ejs      # Task editing form
│       ├── viewTasks.ejs         # View all tasks
│       └── project.ejs           # Project listing and create form
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│       └── (Optional static assets for UI)
│
├── .env                          # Environment variables (JWT_SECRET, DB_URI, etc.)
├── .gitignore                    # Ignore node_modules, .env, etc.
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Lockfile for exact dependency versions
├── app.js                        # Main Express app entry point
└── README.md                     # Project overview and documentation
```

## 🎯 How It Works

1. **User Registration & Authentication**:
   - Users can register with their username, email, and password. The password is encrypted using bcrypt before storing it in the database. Once logged in, the user receives a JWT token for subsequent authenticated requests.
2. **Task & Project Management**:
   - Authenticated users can create, view, update, and delete tasks. Tasks can be grouped under different projects to help users stay organized.
3. **Protected Routes**:
   - Routes that require authentication (such as task management and project management) are protected by JWT authentication middleware to ensure that only logged-in users can access them.
  
## 💬 Contact

**Developer**: Jainam Pokal
<br>
**Email**: jainampokal@gmail.com

   

