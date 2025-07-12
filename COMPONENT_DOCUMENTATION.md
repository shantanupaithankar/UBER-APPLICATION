# Component Documentation

## Frontend Components Reference

### App Component

**File:** `frontend/src/App.jsx`

Main application component that sets up routing for the entire application.

**Props:** None

**Dependencies:**
- `react`
- `react-router-dom`
- Page components (Home, UserLogin, UserSignup, CaptainLogin, CaptainSignup)

**Routes:**
- `/` → Home component
- `/user-login` → UserLogin component
- `/user-signup` → UserSignup component
- `/captain-login` → CaptainLogin component
- `/captain-signup` → CaptainSignup component

**Usage:**
```jsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default Root
```

### Page Components

#### Home Component

**File:** `frontend/src/pages/Home.jsx`

Landing page component for the application.

**Props:** None

**Features:**
- Basic landing page structure
- Entry point for users

**Usage:**
```jsx
import Home from './pages/Home'

// In routing
<Route path="/" element={<Home />} />
```

**Example Implementation:**
```jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome to RideShare
        </h1>
        
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Choose Your Role</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">User</h3>
                <p className="text-sm text-blue-600 mb-3">Request rides</p>
                <Link 
                  to="/user-login"
                  className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-center"
                >
                  Login
                </Link>
                <Link 
                  to="/user-signup"
                  className="block w-full mt-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded text-center"
                >
                  Sign Up
                </Link>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Captain</h3>
                <p className="text-sm text-green-600 mb-3">Provide rides</p>
                <Link 
                  to="/captain-login"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded text-center"
                >
                  Login
                </Link>
                <Link 
                  to="/captain-signup"
                  className="block w-full mt-2 bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
```

#### UserLogin Component

**File:** `frontend/src/pages/UserLogin.jsx`

User authentication component for login functionality.

**Props:** None

**State:**
- Form data (email, password)
- Loading state
- Error messages

**Features:**
- User login form
- Email and password validation
- Error handling
- JWT token storage
- Redirect after successful login

**API Integration:**
- `POST /user/login`

**Example Implementation:**
```jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
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
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          User Login
        </h2>

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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/user-signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-gray-600 mt-2">
            <Link to="/" className="text-blue-500 hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
```

#### UserSignup Component

**File:** `frontend/src/pages/UserSignup.jsx`

User registration component for creating new user accounts.

**Props:** None

**State:**
- Form data (firstname, lastname, email, password, confirmPassword)
- Loading state
- Error messages

**Features:**
- User registration form
- Form validation
- Password confirmation
- Error handling
- JWT token storage
- Redirect after successful registration

**API Integration:**
- `POST /user/register`

**Example Implementation:**
```jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const UserSignup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: {
            firstname: formData.firstname,
            lastname: formData.lastname
          },
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          User Registration
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/user-login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
          <p className="text-gray-600 mt-2">
            <Link to="/" className="text-blue-500 hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
```

#### CaptainLogin Component

**File:** `frontend/src/pages/CaptainLogin.jsx`

Captain authentication component for driver login.

**Props:** None

**State:**
- Form data (email, password)
- Loading state
- Error messages

**Features:**
- Captain login form
- Email and password validation
- Error handling
- JWT token storage
- Redirect after successful login

**API Integration:**
- `POST /captain/login`

**Similar implementation to UserLogin but for captains**

#### CaptainSignup Component

**File:** `frontend/src/pages/CaptainSignup.jsx`

Captain registration component for creating new driver accounts.

**Props:** None

**State:**
- Form data (firstname, lastname, email, password, vehicle details)
- Loading state
- Error messages

**Features:**
- Captain registration form
- Vehicle information collection
- Form validation
- Error handling
- JWT token storage
- Redirect after successful registration

**API Integration:**
- `POST /captain/register`

**Additional Fields:**
- Vehicle color
- License plate
- Vehicle capacity
- Vehicle type (car, motorcycle, auto)

## Common Patterns

### Form Handling Pattern
```jsx
const [formData, setFormData] = useState({
  // form fields
})

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}
```

### API Call Pattern
```jsx
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  try {
    const response = await fetch('endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (response.ok) {
      // Success handling
    } else {
      setError(result.message || 'Operation failed')
    }
  } catch (err) {
    setError('Network error occurred')
  } finally {
    setLoading(false)
  }
}
```

### Error Display Pattern
```jsx
{error && (
  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
    {error}
  </div>
)}
```

## Styling

The application uses Tailwind CSS for styling. Common classes:

- **Forms**: `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`
- **Buttons**: `w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`
- **Cards**: `max-w-md w-full bg-white rounded-lg shadow-md p-8`
- **Error Messages**: `mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded`

## Component Testing

Example test structure for components:

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import UserLogin from './UserLogin'

const LoginWithRouter = () => (
  <BrowserRouter>
    <UserLogin />
  </BrowserRouter>
)

describe('UserLogin', () => {
  it('renders login form', () => {
    render(<LoginWithRouter />)
    expect(screen.getByText('User Login')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  it('shows error for invalid credentials', async () => {
    render(<LoginWithRouter />)
    
    // Mock API call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' })
      })
    )

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrongpassword' }
    })
    fireEvent.click(screen.getByText('Login'))

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })
})
```

## Best Practices

1. **State Management**: Use appropriate state management for form data
2. **Error Handling**: Always handle both network errors and API errors
3. **Loading States**: Show loading indicators during API calls
4. **Validation**: Validate forms on client-side before API calls
5. **Security**: Store tokens securely and handle token expiration
6. **Accessibility**: Use proper labels and ARIA attributes
7. **Responsive Design**: Ensure components work on different screen sizes
8. **Code Reusability**: Extract common patterns into reusable components or hooks