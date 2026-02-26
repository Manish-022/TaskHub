# 🚀 Task Manager API (Days 1–7)

A production-ready backend Task Manager API built using Node.js, Express, and MongoDB.

This project demonstrates authentication, authorization, ownership-based access control, CRUD operations, and centralized error handling following clean architecture principles.

---

## 📌 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Role-Based Access Control (RBAC)

---

# 🟢 Days 1–2: Authentication System

### Features Implemented

- User Registration
- User Login
- Password Hashing (bcrypt)
- JWT Token Generation
- Protected Routes Middleware

### Concepts Learned

- JWT Authentication Flow
- Token-based Authorization
- Middleware chaining in Express
- Secure password storage

---

# 🟢 Days 3–4: Task CRUD + Ownership Logic

### Task Model

- title
- description
- status
- user (ObjectId reference)

### Features Implemented

- Create Task
- Get All User Tasks
- Update Task
- Delete Task
- Ownership validation (users can only modify their own tasks)

### Concepts Learned

- MongoDB Relationships (ref + populate)
- Authorization vs Authentication
- Resource ownership logic
- Protected CRUD routes

---

# 🟢 Day 5: Role-Based Access Control (RBAC)

### Roles

- Admin
- User

### Features Implemented

- Admin-only routes
- Role-check middleware
- Prevent admin self-deletion

### Concepts Learned

- Role-based middleware
- Authorization layers
- Multi-level access control
- Secure route management

---

# 🟢 Days 6–7: Error Handling + Clean Architecture

### Features Implemented

- Centralized Error Middleware
- Custom ApiError Class
- Async Handler Utility
- Clean Response Format
- Structured Folder Organization

### Clean Folder Structure


project/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
│ ├── ApiError.js
│ └── asyncHandler.js
│
├── app.js
└── server.js


---

## 📦 API Response Format

### ✅ Success Response

```json
{
  "status": "success",
  "data": {}
}
❌ Error Response
{
  "status": "fail",
  "message": "Error message"
}
🧠 Key Backend Concepts Mastered

Authentication (JWT)

Authorization (RBAC)

Ownership-based Access Control

Middleware Chaining

Centralized Error Handling

Clean Code Architecture

RESTful API Design

MongoDB Relationships

🎯 Project Highlights

Secure authentication system

Role-based protected routes

Ownership validation logic

Centralized error management

Production-ready backend structure

🚀 Outcome

The backend is now:

Scalable

Secure

Structured

Production-ready

Interview-ready