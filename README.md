# 📌 Backend Authentication API

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

## 🔐 Authentication System

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