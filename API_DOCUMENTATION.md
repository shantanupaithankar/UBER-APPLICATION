# API Documentation - Ride Sharing Application

## Table of Contents

1. [Overview](#overview)
2. [Backend APIs](#backend-apis)
3. [Frontend Components](#frontend-components)
4. [Data Models](#data-models)
5. [Authentication](#authentication)
6. [Setup Instructions](#setup-instructions)
7. [Examples](#examples)

## Overview

This is a full-stack ride-sharing application built with Node.js/Express.js backend and React frontend. The application supports two types of users:
- **Users**: Customers who request rides
- **Captains**: Drivers who provide rides

### Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- express-validator for input validation

**Frontend:**
- React 19
- React Router DOM
- Tailwind CSS
- Vite as build tool

---

## Backend APIs

### Base URL
```
http://localhost:3000
```

### User APIs

#### 1. User Registration
**Endpoint:** `POST /user/register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Must be a valid email address
- `fullname.firstname`: Minimum 5 characters
- `password`: Minimum 5 characters

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8b1c2d3e4f5a6b7c8d9e0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors or user already exists
- `500 Internal Server Error`: Server error

#### 2. User Login
**Endpoint:** `POST /user/login`

**Description:** Authenticate user and return JWT token

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Must be a valid email address
- `password`: Minimum 5 characters

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8b1c2d3e4f5a6b7c8d9e0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Headers Set:**
- Sets `token` cookie with JWT token

**Error Responses:**
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Validation errors

#### 3. Get User Profile
**Endpoint:** `GET /user/profile`

**Description:** Get authenticated user's profile

**Headers Required:**
```
Authorization: Bearer <token>
```
or token in cookies

**Response:**
```json
{
  "_id": "64f8b1c2d3e4f5a6b7c8d9e0",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": "socket123"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token

#### 4. User Logout
**Endpoint:** `GET /user/logout`

**Description:** Logout user and blacklist token

**Headers Required:**
```
Authorization: Bearer <token>
```
or token in cookies

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

**Actions:**
- Clears token cookie
- Adds token to blacklist

---

### Captain APIs

#### 1. Captain Registration
**Endpoint:** `POST /captain/register`

**Description:** Register a new captain (driver) account

**Request Body:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Validation Rules:**
- `email`: Must be a valid email address
- `fullname.firstname`: Minimum 5 characters
- `password`: Minimum 5 characters
- `vehicle.color`: Minimum 3 characters
- `vehicle.plate`: Minimum 3 characters
- `vehicle.capacity`: Minimum 1
- `vehicle.vehicleType`: Must be one of: 'car', 'motorcycle', 'auto'

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f8b1c2d3e4f5a6b7c8d9e1",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### 2. Captain Login
**Endpoint:** `POST /captain/login`

**Description:** Authenticate captain and return JWT token

**Request Body:**
```json
{
  "email": "jane.smith@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Must be a valid email address
- `password`: Minimum 6 characters

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f8b1c2d3e4f5a6b7c8d9e1",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### 3. Get Captain Profile
**Endpoint:** `GET /captain/profile`

**Description:** Get authenticated captain's profile

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "captain": {
    "_id": "64f8b1c2d3e4f5a6b7c8d9e1",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "active",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  }
}
```

#### 4. Captain Logout
**Endpoint:** `GET /captain/logout`

**Description:** Logout captain and blacklist token

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Logout successfully"
}
```

---

## Frontend Components

### App Component
**File:** `frontend/src/App.jsx`

Main application component that handles routing.

**Routes:**
- `/` - Home page
- `/user-login` - User login page
- `/user-signup` - User registration page
- `/captain-login` - Captain login page
- `/captain-signup` - Captain registration page

**Usage:**
```jsx
import App from './App'
import { BrowserRouter } from 'react-router-dom'

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
```

### Page Components

#### Home Component
**File:** `frontend/src/pages/Home.jsx`
**Route:** `/`

Landing page component.

```jsx
import Home from './pages/Home'

// Usage in routes
<Route path="/" element={<Home />} />
```

#### UserLogin Component
**File:** `frontend/src/pages/UserLogin.jsx`
**Route:** `/user-login`

User login form component.

#### UserSignup Component
**File:** `frontend/src/pages/UserSignup.jsx`
**Route:** `/user-signup`

User registration form component.

#### CaptainLogin Component
**File:** `frontend/src/pages/CaptainLogin.jsx`
**Route:** `/captain-login`

Captain login form component.

#### CaptainSignup Component
**File:** `frontend/src/pages/CaptainSignup.jsx`
**Route:** `/captain-signup`

Captain registration form component.

---

## Data Models

### User Model
**File:** `Backend/models/user.model.js`

```javascript
{
  fullname: {
    firstname: String, // required, min: 5 characters
    lastname: String,  // min: 5 characters
  },
  email: String,       // required, unique, min: 6 characters
  password: String,    // required, hashed, not selected by default
  socketId: String     // for real-time communication
}
```

**Methods:**
- `generateAuthToken()`: Generate JWT token
- `comparePassword(password)`: Compare password with hash
- `hashPassword(password)`: Static method to hash password

### Captain Model
**File:** `Backend/models/captain.model.js`

```javascript
{
  fullname: {
    firstname: String, // required, min: 5 characters
    lastname: String,  // min: 5 characters
  },
  email: String,       // required, unique, lowercase
  password: String,    // required, hashed, not selected by default
  socketId: String,    // for real-time communication
  status: String,      // enum: ['active', 'inactive'], default: 'inactive'
  vehicle: {
    color: String,     // required, min: 3 characters
    plate: String,     // required, min: 3 characters
    capacity: Number,  // required, min: 1
    vehicleType: String // required, enum: ['car', 'motorcycle', 'auto']
  },
  location: {
    lat: Number,       // latitude
    lng: Number        // longitude
  }
}
```

**Methods:**
- `generateAuthToken()`: Generate JWT token
- `comparePassword(password)`: Compare password with hash
- `hashPassword(password)`: Static method to hash password

### BlacklistToken Model
**File:** `Backend/models/blacklistToken.model.js`

```javascript
{
  token: String,       // JWT token
  createdAt: Date      // automatically expires after 24 hours
}
```

---

## Authentication

### JWT Token Structure
- **Algorithm:** HS256
- **Expiration:** 24 hours
- **Payload:** `{ _id: user._id }`
- **Secret:** Stored in `process.env.JWT_SECRET`

### Authentication Middleware

#### authUser
**File:** `Backend/middleware/auth.middleware.js`

Middleware to authenticate users.

**Usage:**
```javascript
const authMiddleware = require('./middleware/auth.middleware')

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)
```

**Process:**
1. Extract token from cookie or Authorization header
2. Check if token is blacklisted
3. Verify token with JWT secret
4. Find user by decoded ID
5. Attach user to `req.user`

#### authCaptain
**File:** `Backend/middleware/auth.middleware.js`

Middleware to authenticate captains.

**Usage:**
```javascript
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)
```

**Process:**
1. Extract token from cookie or Authorization header
2. Check if token is blacklisted
3. Verify token with JWT secret
4. Find captain by decoded ID
5. Attach captain to `req.captain`

### Token Blacklisting
When users/captains logout, their tokens are added to a blacklist to prevent reuse.

---

## Setup Instructions

### Backend Setup

1. **Install Dependencies:**
```bash
cd Backend
npm install
```

2. **Environment Variables:**
Create `.env` file in Backend directory:
```env
JWT_SECRET=your-jwt-secret-key
MONGODB_URI=mongodb://localhost:27017/rideshare
PORT=3000
```

3. **Database Setup:**
Ensure MongoDB is running on your system.

4. **Start Server:**
```bash
npm start
```

### Frontend Setup

1. **Install Dependencies:**
```bash
cd frontend
npm install
```

2. **Start Development Server:**
```bash
npm run dev
```

3. **Build for Production:**
```bash
npm run build
```

---

## Examples

### User Registration Example

```javascript
// Frontend API call
const registerUser = async (userData) => {
  const response = await fetch('http://localhost:3000/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullname: {
        firstname: userData.firstname,
        lastname: userData.lastname
      },
      email: userData.email,
      password: userData.password
    })
  })
  
  const data = await response.json()
  
  if (response.ok) {
    // Store token in localStorage or cookies
    localStorage.setItem('token', data.token)
    return data.user
  } else {
    throw new Error(data.message || 'Registration failed')
  }
}
```

### Captain Login Example

```javascript
// Frontend API call
const loginCaptain = async (credentials) => {
  const response = await fetch('http://localhost:3000/captain/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  })
  
  const data = await response.json()
  
  if (response.ok) {
    localStorage.setItem('token', data.token)
    return data.captain
  } else {
    throw new Error(data.message || 'Login failed')
  }
}
```

### Authenticated API Request Example

```javascript
// Making authenticated request
const getUserProfile = async () => {
  const token = localStorage.getItem('token')
  
  const response = await fetch('http://localhost:3000/user/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
  
  if (response.ok) {
    return await response.json()
  } else {
    throw new Error('Failed to fetch profile')
  }
}
```

### React Component Example

```jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        navigate('/dashboard')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error occurred')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default UserLogin
```

---

## Error Handling

### Common Error Codes

- `400 Bad Request`: Validation errors, missing fields
- `401 Unauthorized`: Invalid credentials, missing/invalid token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side errors

### Error Response Format

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

---

## Security Features

1. **Password Hashing**: bcrypt with salt rounds of 10
2. **JWT Tokens**: Secure token-based authentication
3. **Token Blacklisting**: Prevents token reuse after logout
4. **Input Validation**: express-validator for request validation
5. **CORS Protection**: Configured for cross-origin requests
6. **Cookie Security**: HTTP-only cookies for token storage

---

## Additional Notes

1. **Database**: MongoDB with Mongoose ODM
2. **Real-time**: Socket.io preparation (socketId fields in models)
3. **Scalability**: Modular architecture with separate controllers, services, and models
4. **Validation**: Comprehensive input validation on both client and server
5. **Error Handling**: Consistent error response format
6. **Development**: Hot reload with nodemon (backend) and Vite (frontend)

This documentation covers all public APIs, data models, authentication mechanisms, and provides practical examples for integration.