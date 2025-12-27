# MERN Authentication System

A secure, production-ready authentication system using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **User Registration**: Username, Email, Password (hashed with bcrypt).
- **User Login**: JWT-based authentication.
- **Secure Sessions**: HttpOnly, Secure, SameSite cookies.
- **Protected Routes**: Middleware to verify JWT.
- **Rate Limiting**: Protection against brute-force and DDoS attacks using `express-rate-limit`.
- **Security**: Helmet for headers, CORS, Input Validation.
- **Frontend**: React with Context API for state management.

## Project Structure

```
project/
├── backend/            # Node/Express Backend
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers (Auth logic)
│   ├── middleware/     # Custom middleware (Auth, Error handling)
│   ├── models/         # Mongoose models (User)
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── frontend/           # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable components (Header, PrivateRoute)
│   │   ├── context/    # AuthContext (State Management)
│   │   ├── pages/      # Application Pages (Login, Register, Dashboard)
│   │   └── App.jsx     # Main App component with Routes
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (Running locally or MongoDB Atlas URI)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Update `MONGO_URI` if necessary.

4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`.

## usage

1. Open your browser to `http://localhost:5173`.
2. Click "Register" to create a new account.
3. Upon successful registration, you will be logged in and redirected to the Dashboard.
4. You can Logout and Login again.
5. The Dashboard is protected; if you try to access it while logged out, you will be redirected to Login.

## API Endpoints

- `POST /api/users/register`: Register a new user.
- `POST /api/users/auth`: Login user and get token (set in cookie).
- `POST /api/users/logout`: Logout user and clear cookie.
- `GET /api/users/profile`: Get current user profile (Protected).

