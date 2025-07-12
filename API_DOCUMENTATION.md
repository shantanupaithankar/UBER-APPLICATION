# Comprehensive API Documentation

## Table of Contents
1. [Backend API Documentation](#backend-api-documentation)
2. [Frontend Components Documentation](#frontend-components-documentation)
3. [Database Models Documentation](#database-models-documentation)
4. [Middleware Documentation](#middleware-documentation)
5. [Services Documentation](#services-documentation)
6. [Setup and Installation](#setup-and-installation)

---

## Backend API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### User API Endpoints

#### 1. User Registration
**POST** `/user/register`

Register a new user account.

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

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

**Error Response (400):**
```json
{
  "message": "User already exist"
}
```

#### 2. User Login
**POST** `/user/login`

Authenticate a user and receive a JWT token.

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

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

#### 3. Get User Profile
**GET** `/user/profile`

Retrieve the authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

#### 4. User Logout
**GET** `/user/logout`

Logout the authenticated user and blacklist their token.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### Captain API Endpoints

#### 1. Captain Registration
**POST** `/captain/register`

Register a new captain account with vehicle information.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "Captain",
    "lastname": "Smith"
  },
  "email": "captain.smith@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
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
- `vehicle.capacity`: Must be at least 1
- `vehicle.vehicleType`: Must be one of: 'car', 'motorcycle', 'auto'

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "Captain",
      "lastname": "Smith"
    },
    "email": "captain.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

#### 2. Captain Login
**POST** `/captain/login`

Authenticate a captain and receive a JWT token.

**Request Body:**
```json
{
  "email": "captain.smith@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Must be a valid email address
- `password`: Minimum 6 characters

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "Captain",
      "lastname": "Smith"
    },
    "email": "captain.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### 3. Get Captain Profile
**GET** `/captain/profile`

Retrieve the authenticated captain's profile information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "captain": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "Captain",
      "lastname": "Smith"
    },
    "email": "captain.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

#### 4. Captain Logout
**GET** `/captain/logout`

Logout the authenticated captain and blacklist their token.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "message": "Logout successfully"
}
```

---

## Frontend Components Documentation

### App Component
**File:** `frontend/src/App.jsx`

Main application component that handles routing.

**Props:** None

**Routes:**
- `/` - Home page
- `/user-signup` - User registration page
- `/user-login` - User login page
- `/captain-signup` - Captain registration page
- `/captain-login` - Captain login page

**Usage:**
```jsx
import App from './App';

// App is typically rendered in main.jsx
<App />
```

### Page Components

#### Home Component
**File:** `frontend/src/pages/Home.jsx`

Landing page component.

**Props:** None

**Usage:**
```jsx
import Home from './pages/Home';

<Home />
```

#### UserLogin Component
**File:** `frontend/src/pages/UserLogin.jsx`

User login page component.

**Props:** None

**Usage:**
```jsx
import UserLogin from './pages/UserLogin';

<UserLogin />
```

#### UserSignup Component
**File:** `frontend/src/pages/UserSignup.jsx`

User registration page component.

**Props:** None

**Usage:**
```jsx
import UserSignup from './pages/UserSignup';

<UserSignup />
```

#### CaptainLogin Component
**File:** `frontend/src/pages/CaptainLogin.jsx`

Captain login page component.

**Props:** None

**Usage:**
```jsx
import CaptainLogin from './pages/CaptainLogin';

<CaptainLogin />
```

#### CaptainSignup Component
**File:** `frontend/src/pages/CaptainSignup.jsx`

Captain registration page component.

**Props:** None

**Usage:**
```jsx
import CaptainSignup from './pages/CaptainSignup';

<CaptainSignup />
```

---

## Database Models Documentation

### User Model
**File:** `Backend/models/user.model.js`

Mongoose schema for user data.

**Schema Fields:**
```javascript
{
  fullname: {
    firstname: String (required, min 5 chars),
    lastname: String (min 5 chars)
  },
  email: String (required, unique, min 6 chars),
  password: String (required, select: false),
  socketId: String (optional)
}
```

**Methods:**
- `generateAuthToken()` - Generates JWT token for user
- `comparePassword(password)` - Compares password with hashed password

**Static Methods:**
- `hashPassword(password)` - Hashes password using bcrypt

**Usage:**
```javascript
const userModel = require('../models/user.model');

// Create new user
const user = await userModel.create({
  fullname: { firstname: 'John', lastname: 'Doe' },
  email: 'john@example.com',
  password: 'hashedPassword'
});

// Generate token
const token = user.generateAuthToken();

// Compare password
const isMatch = await user.comparePassword('password123');
```

### Captain Model
**File:** `Backend/models/captain.model.js`

Mongoose schema for captain data.

**Schema Fields:**
```javascript
{
  fullname: {
    firstname: String (required, min 5 chars),
    lastname: String (min 5 chars)
  },
  email: String (required, unique, lowercase, email validation),
  password: String (required, select: false),
  socketId: String (optional),
  status: String (enum: ['active', 'inactive'], default: 'inactive'),
  vehicle: {
    color: String (required, min 3 chars),
    plate: String (required, min 3 chars),
    capacity: Number (required, min 1),
    vehicleType: String (required, enum: ['car', 'motorcycle', 'auto'])
  },
  location: {
    lat: Number (optional),
    lng: Number (optional)
  }
}
```

**Methods:**
- `generateAuthToken()` - Generates JWT token for captain
- `comparePassword(password)` - Compares password with hashed password

**Static Methods:**
- `hashPassword(password)` - Hashes password using bcrypt

**Usage:**
```javascript
const captainModel = require('../models/captain.model');

// Create new captain
const captain = await captainModel.create({
  fullname: { firstname: 'Captain', lastname: 'Smith' },
  email: 'captain@example.com',
  password: 'hashedPassword',
  vehicle: {
    color: 'Red',
    plate: 'ABC123',
    capacity: 4,
    vehicleType: 'car'
  }
});

// Generate token
const token = captain.generateAuthToken();

// Compare password
const isMatch = await captain.comparePassword('password123');
```

### BlacklistToken Model
**File:** `Backend/models/blacklistToken.model.js`

Mongoose schema for blacklisted JWT tokens.

**Schema Fields:**
```javascript
{
  token: String (required)
}
```

**Usage:**
```javascript
const blacklistTokenModel = require('../models/blacklistToken.model');

// Blacklist a token
await blacklistTokenModel.create({ token: 'jwt-token-here' });

// Check if token is blacklisted
const isBlacklisted = await blacklistTokenModel.findOne({ token: 'jwt-token-here' });
```

---

## Middleware Documentation

### Authentication Middleware
**File:** `Backend/middleware/auth.middleware.js`

Middleware for protecting routes with JWT authentication.

#### authUser
Authenticates user requests.

**Usage:**
```javascript
const authMiddleware = require('../middleware/auth.middleware');

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
```

**Process:**
1. Extracts token from cookies or Authorization header
2. Checks if token is blacklisted
3. Verifies JWT token
4. Fetches user from database
5. Attaches user to request object

#### authCaptain
Authenticates captain requests.

**Usage:**
```javascript
const authMiddleware = require('../middleware/auth.middleware');

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
```

**Process:**
1. Extracts token from cookies or Authorization header
2. Checks if token is blacklisted
3. Verifies JWT token
4. Fetches captain from database
5. Attaches captain to request object

---

## Services Documentation

### User Service
**File:** `Backend/services/user.service.js`

Service layer for user-related business logic.

#### createUser
Creates a new user in the database.

**Parameters:**
```javascript
{
  firstname: String (required),
  lastname: String (required),
  email: String (required),
  password: String (required)
}
```

**Returns:** Promise<User>

**Usage:**
```javascript
const userService = require('../services/user.service');

const user = await userService.createUser({
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@example.com',
  password: 'hashedPassword'
});
```

### Captain Service
**File:** `Backend/services/captain.service.js`

Service layer for captain-related business logic.

#### createCaptain
Creates a new captain in the database.

**Parameters:**
```javascript
{
  firstname: String (required),
  lastname: String (required),
  email: String (required),
  password: String (required),
  color: String (required),
  plate: String (required),
  capacity: Number (required),
  vehicleType: String (required)
}
```

**Returns:** Promise<Captain>

**Usage:**
```javascript
const captainService = require('../services/captain.service');

const captain = await captainService.createCaptain({
  firstname: 'Captain',
  lastname: 'Smith',
  email: 'captain@example.com',
  password: 'hashedPassword',
  color: 'Red',
  plate: 'ABC123',
  capacity: 4,
  vehicleType: 'car'
});
```

---

## Setup and Installation

### Backend Setup

1. **Install Dependencies:**
```bash
cd Backend
npm install
```

2. **Environment Variables:**
Create a `.env` file in the Backend directory:
```env
PORT=3000
DB_CONNECT=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-secret-key-here
```

3. **Start Server:**
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

### Database Setup

1. **Install MongoDB** (if not already installed)
2. **Start MongoDB service**
3. **Update DB_CONNECT in .env file**

### API Testing Examples

#### Using cURL

**User Registration:**
```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
  }'
```

**User Login:**
```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get User Profile (with token):**
```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Using JavaScript/Fetch

**User Registration:**
```javascript
const response = await fetch('http://localhost:3000/user/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullname: {
      firstname: 'John',
      lastname: 'Doe'
    },
    email: 'john@example.com',
    password: 'password123'
  })
});

const data = await response.json();
console.log(data);
```

**User Login:**
```javascript
const response = await fetch('http://localhost:3000/user/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});

const data = await response.json();
const token = data.token;
```

**Get User Profile:**
```javascript
const response = await fetch('http://localhost:3000/user/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const userData = await response.json();
console.log(userData);
```

---

## Error Handling

### Common HTTP Status Codes

- **200** - Success
- **201** - Created (for registration)
- **400** - Bad Request (validation errors)
- **401** - Unauthorized (invalid token or credentials)
- **500** - Internal Server Error

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

1. **Password Hashing** - All passwords are hashed using bcrypt
2. **JWT Authentication** - Secure token-based authentication
3. **Token Blacklisting** - Logged out tokens are blacklisted
4. **Input Validation** - All inputs are validated using express-validator
5. **CORS Protection** - Cross-origin requests are handled securely

---

## Dependencies

### Backend Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express-validator` - Input validation
- `cors` - Cross-origin resource sharing
- `cookie-parser` - Cookie parsing
- `dotenv` - Environment variables

### Frontend Dependencies
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `vite` - Build tool
- `tailwindcss` - CSS framework

---

This documentation covers all public APIs, functions, and components in the codebase. For additional support or questions, please refer to the individual source files or contact the development team.