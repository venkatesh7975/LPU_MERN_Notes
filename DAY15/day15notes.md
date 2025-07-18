# DAY 15 - Advanced Backend Concepts & Dashboard Development

## Table of Contents
1. [Token Generation](#token-generation)
2. [Middleware](#middleware)
3. [Login Validation](#login-validation)
4. [User Dashboard](#user-dashboard)
5. [Admin Dashboard](#admin-dashboard)
6. [Feedback Form CRUD Operations](#feedback-form-crud-operations)

---

## Token Generation

### What are Tokens?
Tokens are secure, encrypted strings that represent user authentication and authorization information. They are commonly used in web applications for session management and API security.

### Types of Tokens

#### 1. JWT (JSON Web Tokens)
```javascript
// JWT Structure: Header.Payload.Signature
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId, userRole) => {
  const payload = {
    userId: userId,
    role: userRole,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256' });
};

// Verify JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
```

#### 2. Session Tokens
```javascript
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
```

### Token Best Practices
- **Expiration**: Set reasonable expiration times
- **Refresh Tokens**: Implement refresh token mechanism
- **Secure Storage**: Store tokens securely (HttpOnly cookies, secure headers)
- **HTTPS**: Always use HTTPS in production
- **Secret Management**: Use environment variables for secrets

---

## Middleware

### What is Middleware?
Middleware functions are functions that have access to the request object (req), response object (res), and the next middleware function in the application's request-response cycle.

### Types of Middleware

#### 1. Authentication Middleware
```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
```

#### 2. Authorization Middleware
```javascript
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

// Usage
app.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
  // Admin only route
});
```

#### 3. Error Handling Middleware
```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      message: 'Validation Error', 
      errors: err.errors 
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  res.status(500).json({ message: 'Internal Server Error' });
};
```

#### 4. Logging Middleware
```javascript
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url} - ${req.ip}`);
  next();
};
```

### Middleware Order
```javascript
app.use(logger);           // 1. Logging
app.use(express.json());   // 2. Body parsing
app.use(cors());          // 3. CORS
app.use('/api', routes);  // 4. Routes
app.use(errorHandler);    // 5. Error handling (last)
```

---

## Login Validation

### Input Validation
```javascript
const { body, validationResult } = require('express-validator');

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors: errors.array() 
    });
  }
  next();
};
```

### Login Route Implementation
```javascript
app.post('/login', loginValidation, validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user._id, user.role);
    
    // Send response
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});
```

### Security Best Practices
- **Rate Limiting**: Prevent brute force attacks
- **Password Hashing**: Use bcrypt or similar
- **HTTPS**: Always use secure connections
- **Session Management**: Implement proper session handling
- **Input Sanitization**: Clean user inputs

---

## User Dashboard

### Dashboard Structure
```javascript
// User Dashboard Routes
app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const userFeedbacks = await Feedback.find({ userId: req.user.userId });
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      feedbacks: userFeedbacks,
      stats: {
        totalFeedbacks: userFeedbacks.length,
        pendingFeedbacks: userFeedbacks.filter(f => f.status === 'pending').length
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});
```

### Frontend Dashboard Component (React)
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(response.data.user);
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {userData?.name}</h1>
      
      <div className="stats">
        <div className="stat-card">
          <h3>Total Feedbacks</h3>
          <p>{feedbacks.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{feedbacks.filter(f => f.status === 'pending').length}</p>
        </div>
      </div>

      <div className="feedbacks-list">
        <h2>My Feedbacks</h2>
        {feedbacks.map(feedback => (
          <div key={feedback._id} className="feedback-item">
            <h4>{feedback.title}</h4>
            <p>{feedback.description}</p>
            <span className={`status ${feedback.status}`}>
              {feedback.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
```

---

## Admin Dashboard

### Admin Dashboard Routes
```javascript
// Admin Dashboard Routes
app.get('/admin/dashboard', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFeedbacks = await Feedback.countDocuments();
    const pendingFeedbacks = await Feedback.countDocuments({ status: 'pending' });
    const recentFeedbacks = await Feedback.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        totalUsers,
        totalFeedbacks,
        pendingFeedbacks,
        resolvedFeedbacks: totalFeedbacks - pendingFeedbacks
      },
      recentFeedbacks
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin dashboard data' });
  }
});
```

### Admin Dashboard Component (React)
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStats(response.data.stats);
      setRecentFeedbacks(response.data.recentFeedbacks);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Feedbacks</h3>
          <p>{stats.totalFeedbacks}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Feedbacks</h3>
          <p>{stats.pendingFeedbacks}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved Feedbacks</h3>
          <p>{stats.resolvedFeedbacks}</p>
        </div>
      </div>

      <div className="recent-feedbacks">
        <h2>Recent Feedbacks</h2>
        {recentFeedbacks.map(feedback => (
          <div key={feedback._id} className="feedback-item">
            <div className="feedback-header">
              <h4>{feedback.title}</h4>
              <span className={`status ${feedback.status}`}>
                {feedback.status}
              </span>
            </div>
            <p>{feedback.description}</p>
            <small>By: {feedback.userId.name} ({feedback.userId.email})</small>
            <small>Date: {new Date(feedback.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
```

---

## Feedback Form CRUD Operations

### Database Schema
```javascript
// Feedback Model
const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['bug', 'feature', 'improvement', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  adminResponse: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});
```

### CRUD Operations

#### 1. Create (POST)
```javascript
// Create new feedback
app.post('/feedback', authenticateToken, async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    
    const feedback = new Feedback({
      userId: req.user.userId,
      title,
      description,
      category,
      priority
    });
    
    await feedback.save();
    
    res.status(201).json({
      message: 'Feedback created successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating feedback' });
  }
});
```

#### 2. Read (GET)
```javascript
// Get all feedbacks (admin only)
app.get('/admin/feedbacks', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    const feedbacks = await Feedback.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Feedback.countDocuments(filter);
    
    res.json({
      feedbacks,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
});

// Get user's feedbacks
app.get('/my-feedbacks', authenticateToken, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
});
```

#### 3. Update (PUT/PATCH)
```javascript
// Update feedback (admin only)
app.patch('/admin/feedback/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { status, adminResponse } = req.body;
    const { id } = req.params;
    
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status, adminResponse },
      { new: true }
    ).populate('userId', 'name email');
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({
      message: 'Feedback updated successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback' });
  }
});

// Update user's own feedback
app.patch('/feedback/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    const { id } = req.params;
    
    const feedback = await Feedback.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { title, description, category, priority },
      { new: true }
    );
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({
      message: 'Feedback updated successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback' });
  }
});
```

#### 4. Delete (DELETE)
```javascript
// Delete feedback (admin only)
app.delete('/admin/feedback/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    
    const feedback = await Feedback.findByIdAndDelete(id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback' });
  }
});

// Delete user's own feedback
app.delete('/feedback/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const feedback = await Feedback.findOneAndDelete({
      _id: id,
      userId: req.user.userId
    });
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback' });
  }
});
```

### Frontend CRUD Components

#### Feedback Form Component
```jsx
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    priority: 'medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/feedback', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      onSubmit(response.data.feedback);
      setFormData({ title: '', description: '', category: 'other', priority: 'medium' });
    } catch (error) {
      console.error('Error creating feedback:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h3>Submit Feedback</h3>
      
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Category:</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
          <option value="improvement">Improvement</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Priority:</label>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value})}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
```

---

## Complete Project Structure

```
feedback-system/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   └── feedback.js
│   ├── utils/
│   │   └── tokenGenerator.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   │   ├── UserDashboard.jsx
│   │   │   │   └── AdminDashboard.jsx
│   │   │   ├── Feedback/
│   │   │   │   ├── FeedbackForm.jsx
│   │   │   │   ├── FeedbackList.jsx
│   │   │   │   └── FeedbackItem.jsx
│   │   │   └── Auth/
│   │   │       ├── Login.jsx
│   │   │       └── Register.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
└── README.md
```

---

## Key Takeaways

1. **Token Generation**: Implement secure JWT tokens with proper expiration and refresh mechanisms
2. **Middleware**: Use middleware for authentication, authorization, validation, and error handling
3. **Login Validation**: Implement comprehensive input validation and security measures
4. **Dashboard Design**: Create separate user and admin dashboards with appropriate permissions
5. **CRUD Operations**: Implement complete Create, Read, Update, Delete operations with proper authorization
6. **Security**: Always validate user permissions and sanitize inputs
7. **Error Handling**: Implement proper error handling throughout the application
8. **User Experience**: Design intuitive interfaces for both users and administrators

---

## Additional Resources

- [JWT Documentation](https://jwt.io/)
- [Express.js Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [MongoDB CRUD Operations](https://docs.mongodb.com/manual/crud/)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Axios Documentation](https://axios-http.com/docs/intro) 