# Quick Reference Guide

## API Endpoints Quick Reference

### User Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/user/register` | Register new user | No |
| `POST` | `/user/login` | User login | No |
| `GET` | `/user/profile` | Get user profile | Yes |
| `GET` | `/user/logout` | User logout | Yes |

### Captain Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/captain/register` | Register new captain | No |
| `POST` | `/captain/login` | Captain login | No |
| `GET` | `/captain/profile` | Get captain profile | Yes |
| `GET` | `/captain/logout` | Captain logout | Yes |

## Request Examples

### User Registration
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

### Captain Registration
```bash
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

### Authenticated Request
```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer your-jwt-token"
```

## Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page |
| `/user-login` | UserLogin | User login form |
| `/user-signup` | UserSignup | User registration form |
| `/captain-login` | CaptainLogin | Captain login form |
| `/captain-signup` | CaptainSignup | Captain registration form |

## Data Models Summary

### User Model
```javascript
{
  fullname: { firstname: String, lastname: String },
  email: String,
  password: String,
  socketId: String
}
```

### Captain Model
```javascript
{
  fullname: { firstname: String, lastname: String },
  email: String,
  password: String,
  socketId: String,
  status: String, // 'active' | 'inactive'
  vehicle: {
    color: String,
    plate: String,
    capacity: Number,
    vehicleType: String // 'car' | 'motorcycle' | 'auto'
  },
  location: { lat: Number, lng: Number }
}
```

## Environment Variables

### Backend (.env)
```env
JWT_SECRET=your-jwt-secret-key
MONGODB_URI=mongodb://localhost:27017/rideshare
PORT=3000
```

## Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

## Setup Commands

### Backend
```bash
cd Backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Authentication

### JWT Token Format
```
Authorization: Bearer <token>
```

### Token Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

## Validation Rules

### User Registration
- `email`: Valid email format
- `fullname.firstname`: Min 5 characters
- `password`: Min 5 characters

### Captain Registration
- `email`: Valid email format
- `fullname.firstname`: Min 5 characters
- `password`: Min 5 characters
- `vehicle.color`: Min 3 characters
- `vehicle.plate`: Min 3 characters
- `vehicle.capacity`: Min 1
- `vehicle.vehicleType`: 'car' | 'motorcycle' | 'auto'

## Error Response Format
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

## Development Tips

1. **Authentication**: Always include JWT token in Authorization header for protected routes
2. **Error Handling**: Check response status and handle errors appropriately
3. **Validation**: Validate inputs on both client and server side
4. **Security**: Never expose JWT secret or store plain text passwords
5. **Testing**: Test all endpoints with different scenarios (valid/invalid data)