# Campus Resolve Portal - Backend

This is the backend API for the Campus Resolve Portal, built with Node.js, Express, and MongoDB.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👥 **User Management** - Student and admin user roles
- 🔒 **Password Hashing** - Secure password storage with bcrypt
- 🛡️ **Security** - Rate limiting, CORS, and input validation
- 📊 **MongoDB Integration** - Persistent data storage
- ✅ **Input Validation** - Express-validator for request validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `config.env` and update the values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/campus_resolve_portal
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas (cloud) and update the MONGODB_URI

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Admin Only
- `GET /api/auth/users` - Get all users
- `DELETE /api/auth/users/:id` - Delete user

### Health Check
- `GET /api/health` - API health status

## Default Admin User

The system automatically creates a default admin user:
- **Email:** smallelw@gitam.in
- **Password:** Smdmnd@009
- **Role:** admin

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['student', 'admin']),
  avatar: String (default),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **Password Hashing:** bcrypt with salt rounds of 12
- **JWT Tokens:** 24-hour expiration
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Input Validation:** Express-validator for all inputs
- **CORS:** Configured for frontend domains
- **Helmet:** Security headers

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- Rate limiting
- Invalid tokens

## Development

### Project Structure
```
backend/
├── models/
│   └── User.js          # User model
├── middleware/
│   └── auth.js          # Authentication middleware
├── routes/
│   └── auth.js          # Authentication routes
├── server.js            # Main server file
├── package.json         # Dependencies
└── config.env           # Environment variables
```

### Adding New Features

1. **Create new models** in the `models/` directory
2. **Add middleware** in the `middleware/` directory
3. **Create routes** in the `routes/` directory
4. **Update server.js** to include new routes

## Testing

Test the API endpoints using tools like:
- Postman
- Insomnia
- curl commands

### Example curl commands:

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"student"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Production Deployment

1. **Update environment variables** for production
2. **Use a strong JWT_SECRET**
3. **Set up MongoDB Atlas** or production MongoDB instance
4. **Configure CORS** for your frontend domain
5. **Set up SSL/TLS** certificates
6. **Use PM2** or similar process manager

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check MONGODB_URI in config.env
   - Verify network connectivity

2. **Port Already in Use:**
   - Change PORT in config.env
   - Kill existing process on port 5000

3. **JWT Token Issues:**
   - Check JWT_SECRET in config.env
   - Ensure token is being sent in Authorization header

### Logs

Check console output for detailed error messages and debugging information. 