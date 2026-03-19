
# 🏢 NextGenHR – HR Management System

![NextGenHR](https://img.shields.io/badge/Status-Active-green)
![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)
![Express](https://img.shields.io/badge/Express.js-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-green)
![License](https://img.shields.io/badge/License-MIT-blue)
## 
NextGenHR is a full-stack HR Management System built using Node.js, Express.js, and MongoDB.
It allows administrators to manage employee records securely with authentication and structured backend architecture.

NextGenHR Node.js Express MongoDB JWT License

A secure HR platform featuring employee management, JWT authentication, server-side pagination, and email automation using Nodemailer.

## 🚀 Features

- 🔐 User Authentication (Register / Login)
- 🛡 JWT Based Authorization
- 👨‍💼 Admin Dashboard
- ➕ Add New Employees
- ✏ Update Employee Details
- ❌ Delete Employee Records
- 🔍 Regex-Based Employee Search
- 📊 Server-Side Pagination (DataTables)
- 📧 Email Notifications using Nodemailer
- 🏗 MVC Architecture


## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer

### Frontend
- HTML
- CSS
- Bootstrap
- JavaScript
- jQuery DataTables


## 📂 Project Structure (MVC)

```
NEXTGENHR/
│
├── models/
├── controllers/
├── routes/
├── middlewares/
├── views/
├── public/
├── config/
├── server.js
└── package.json
```
## 🔐 Authentication Flow

- User registers  
- Password is hashed securely  
- JWT token generated on login  
- Token verified using middleware  
- Protected routes accessed using `req.user`  


## 👨‍💼 Employee Management Flow

- Admin logs in  
- Dashboard loads employee data  
- Add / Update / Delete operations performed  
- Server validates data  
- MongoDB stores updated records  
- DataTables handles server-side pagination  


## 📧 Email Automation Flow

- Form submission triggered  
- Nodemailer configured with SMTP  
- Email sent automatically  
- Credentials secured using environment variables  


## 📚 What I Learned

- JWT authentication & middleware protection  
- Building RESTful APIs with Express  
- MongoDB schema validation  
- Server-side DataTables integration  
- Regex-based search functionality  
- Email automation using SMTP  
- Structuring backend using MVC  


## ⚙ Installation

```bash
git clone <your-repo-link>
cd NextGenHR
npm install
npm start
```

### Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
