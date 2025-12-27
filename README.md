# Wanderon Auth Assignment  
### Secure User Authentication System (MERN Stack)

A secure, production-ready **authentication system** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This project demonstrates user registration, login, JWT-based authentication using HTTP-only cookies, protected routes, and security best practices.

🔗 **Live Demo:** https://wanderon-auth-assignment.vercel.app/  
🔗 **GitHub Repository:** https://github.com/NakulJindal/wanderon-auth-assignment

---

## 📌 Overview

The objective of this assignment was to build a **secure and scalable authentication system** that follows industry best practices.  
The application supports:
- Secure user registration and login
- Stateless JWT-based authentication
- Cookie-based session handling
- Protection against common security vulnerabilities

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcrypt
- express-rate-limit
- helmet
- cookie-parser
- CORS

### Frontend
- React.js
- React Router
- Context API
- Axios

---

## ✨ Features

- User Registration with password hashing (bcrypt)
- User Login with JWT authentication
- JWT stored securely in **HTTP-only cookies**
- Protected dashboard route
- Logout functionality
- Rate limiting to prevent brute-force attacks
- Security headers and request sanitization
- Clean and modular code structure

---

## 🔐 Security Considerations

- **Password Hashing:** Passwords are never stored in plain text (bcrypt)
- **JWT + HttpOnly Cookies:** Prevents XSS attacks
- **Stateless Authentication:** Enables horizontal scalability
- **Rate Limiting:** Limits repeated login attempts
- **Secure Headers:** Using Helmet middleware
- **CORS with Credentials:** Ensures secure cookie sharing

---

## 📂 Project Structure

```
wanderon-auth-assignment/
 ├── backend/
 ├── frontend/
 └── README.md
```

---

## 🚀 Getting Started (Local Setup)

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/protected | Protected route |

---

## 👤 Author

**Nakul Jindal**
