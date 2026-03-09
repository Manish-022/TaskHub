# TaskHub Backend API

A RESTful backend API for **TaskHub**, a task management application that allows users to create, manage, and organize tasks with secure authentication and role-based access control.

Built with **Node.js, Express, MongoDB, and JWT authentication**.

---

## 🚀 Features

* User Registration and Login
* JWT Authentication
* Password Hashing using bcrypt
* Create, Read, Update, Delete Tasks
* Role-Based Authorization (Admin / User)
* Protected Routes using Middleware
* Admin Panel APIs
* MongoDB Database with Mongoose
* RESTful API Design

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (JSON Web Token)**
* **bcrypt.js**
* **dotenv**
* **cors**

---

## 📂 Project Structure

```
TaskHub/
│
├── config/
│      db.js
│
├── controllers/
│      taskController.js
│
├── middlewares/
│      authMiddleware.js
│      checkAdmin.js
│
├── models/
│      User.js
│      Task.js
│
├── routes/
│      authRoutes.js
│      taskRoutes.js
│      adminRoutes.js
│
├── server.js
├── .env
└── package.json
```

---

## ⚙️ Installation

Clone the repository:

```
git clone https://github.com/yourusername/taskhub-backend.git
```

Navigate into the project folder:

```
cd taskhub-backend
```

Install dependencies:

```
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## ▶️ Run the Server

Start the server:

```
node server.js
```

Server will run at:

```
http://localhost:5001
```

---

## 📌 API Endpoints

### Authentication

#### Register User

```
POST /api/auth/register
```

#### Login User

```
POST /api/auth/login
```

---

### Tasks

#### Create Task

```
POST /api/tasks
```

#### Get All Tasks

```
GET /api/tasks
```

#### Update Task

```
PUT /api/tasks/:id
```

#### Delete Task

```
DELETE /api/tasks/:id
```

---

### Admin Routes

#### Get All Users

```
GET /api/admin/users
```

#### Delete User

```
DELETE /api/admin/users/:id
```

---

## 🔐 Authentication

Protected routes require a JWT token.

Example header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code)
* cURL

---

## 📈 Future Improvements

* Task filtering & pagination
* Task categories
* Rate limiting
* Logging system
* API documentation with Swagger

---

## 👨‍💻 Author

**Manish Kumar**

Electronics & Communication Engineering
NIT Patna

Interests:

* Backend Development
* Web Development
* AI / ML

---

## 📄 License

This project is open source and available under the **MIT License**.
