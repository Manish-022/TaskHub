# 📌 Backend Authentication API
📅 Day 1
A secure backend authentication system built using **Node.js, Express, MongoDB, JWT, and bcrypt**.

This project implements user registration, login, password hashing, JWT authentication, and protected routes following MVC architecture.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- bcryptjs
- jsonwebtoken (JWT)
- dotenv
- cors

---

## 📂 Project Structure

/config
/models
/controllers
/routes
/middleware
server.js


---

## 🏗 Why MVC Architecture?

### 🔹 Separation of Concerns

- **Models** → Database structure  
- **Controllers** → Business logic  
- **Routes** → API endpoints  
- **Middleware** → Reusable request logic  

### 🔹 Benefits

- Clean and scalable structure  
- Easy debugging  
- Industry standard architecture  
- Maintainable codebase  

---

### 📅 Day 2 🔐 Authentication System

### 👤 User Model

Fields:

- name  
- email (unique)  
- password (hashed)  
- role (default: user)  

---

## 📝 Register API

**POST** `/api/auth/register`

### What happens:

- Check if user already exists  
- Hash password using bcrypt  
- Save user in MongoDB  
- Return success response  

---

## 🔑 Login API

**POST** `/api/auth/login`

### What happens:

- Verify email exists  
- Compare password using bcrypt  
- Generate JWT token  
- Return token + user data  

---

## 🛡 Auth Middleware

### Functionality:

- Extract token from header  
- Verify token using JWT_SECRET  
- Attach decoded user to `req.user`  
- Allow access to protected routes  

---

## 🔒 Protected Route Example

**GET** `/api/auth/profile`

### Header:

Authorization: Bearer <token>


If token valid → Access granted  
If token invalid → 401 Unauthorized  

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


---

## ▶️ How to Run Locally

### 1️⃣ Clone Repository

git clone <repo-url>
cd project-folder


### 2️⃣ Install Dependencies

npm install


### 3️⃣ Create `.env` file

Add your MongoDB URI and JWT secret.

### 4️⃣ Run Server

node server.js


Server runs on:

http://localhost:5000


---

## 🧠 What This Project Demonstrates

- REST API development  
- Secure password hashing  
- Stateless authentication using JWT  
- Middleware usage  
- MongoDB integration  
- Environment variable handling  
- Backend debugging skills  

---

## 📈 Learning Outcome

After completing this project, I understand:

- How authentication works internally  
- Difference between authentication & authorization  
- How JWT enables stateless APIs  
- How to structure backend like production-level applications  

---

## 🏆 Status

- ✅ Backend Setup Complete  
- ✅ MongoDB Connected  
- ✅ Register & Login Working  
- ✅ JWT Authentication Working  
- ✅ Protected Routes Working  

# 📅 Day 3 – Task CRUD with Authentication & Ownership

## 🚀 Overview

On Day 4, I implemented a complete Task Management CRUD system with:

- JWT Authentication
- Protected Routes
- User-based Ownership Logic
- Reference relationship between User and Task
- Authorization checks for update & delete

This ensures that users can only access and modify their own tasks securely.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

---

## 📂 Folder Structure

```
/models
    User.js
    Task.js

/controllers
    userController.js
    taskController.js

/routes
    userRoutes.js
    taskRoutes.js

/middleware
    authMiddleware.js

server.js
```

---

## 📌 Task Model Structure

- `title` → String (required)
- `description` → String
- `status` → Enum ("pending", "completed")
- `user` → ObjectId (Reference to User)
- `timestamps` → enabled

### Reference Example

```js
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
```

This creates a relationship between Task and User collections.

---

## 🔐 Authentication Flow

1. User logs in
2. JWT token is generated
3. Token is sent in request headers:

```
Authorization: Bearer <TOKEN>
```

4. `protect` middleware verifies the token
5. `req.user` is attached
6. Controller performs action

---

## 🟢 Implemented Routes

### ➤ Create Task
```
POST /api/tasks
```
Creates a new task for the logged-in user.

---

### ➤ Get All User Tasks
```
GET /api/tasks
```
Returns only tasks that belong to the authenticated user.

---

### ➤ Update Task
```
PUT /api/tasks/:id
```
Updates a task only if the user owns it.

---

### ➤ Delete Task
```
DELETE /api/tasks/:id
```
Deletes a task only if the user owns it.

---

## 🔒 Ownership Logic

Before updating or deleting:

```js
if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
}
```

This prevents users from modifying other users' tasks.

---

## 🧠 Concepts Learned

- Authentication vs Authorization
- Protected Routes
- Middleware usage
- MongoDB Reference Relationship
- Ownership Validation
- MVC Architecture
- Secure API Design

---

## 📬 Testing

All APIs were tested using Postman with JWT in Authorization header.

---

## 🎯 Key Takeaway

Implemented secure, user-specific CRUD operations using JWT authentication and ownership validation — a core backend development concept.

---

## 🚀 Next Improvements

- Pagination
- Task filtering (completed / pending)
- Role-based access (Admin)
- Frontend integration (React)
