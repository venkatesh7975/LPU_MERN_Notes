# DAY 16 - Fullstack Application Deployment & Production Management

## Table of Contents
1. [Hosting Fullstack Applications](#hosting-fullstack-applications)
2. [MongoDB Atlas Configuration](#mongodb-atlas-configuration)
3. [Backend Hosting on Render](#backend-hosting-on-render)
4. [Frontend Hosting on Vercel](#frontend-hosting-on-vercel)
5. [Solving Bugs in Production](#solving-bugs-in-production)

---

## Hosting Fullstack Applications

### What is Fullstack Hosting?
Fullstack hosting involves deploying both frontend and backend components of a web application to make it accessible on the internet. This includes the client-side application, server-side API, and database.

### Deployment Architecture
```
Internet
    ↓
Load Balancer/Proxy
    ↓
Frontend (Vercel/Netlify) ←→ Backend (Render/Railway)
    ↓
Database (MongoDB Atlas)
```

### Key Considerations for Fullstack Deployment

#### 1. Environment Configuration
```javascript
// .env files for different environments
// .env.development
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dev_db
JWT_SECRET=dev_secret_key
FRONTEND_URL=http://localhost:3000

// .env.production
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prod_db
JWT_SECRET=production_secret_key
FRONTEND_URL=https://your-app.vercel.app
```

#### 2. CORS Configuration
```javascript
// Backend CORS setup
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

#### 3. API Base URL Configuration
```javascript
// Frontend API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.onrender.com/api'
  : 'http://localhost:5000/api';

// Using axios with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database connection strings updated
- [ ] CORS settings configured
- [ ] API endpoints tested
- [ ] Static assets optimized
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Security headers set
- [ ] SSL certificates configured
- [ ] Domain names configured

---

## MongoDB Atlas Configuration

### What is MongoDB Atlas?
MongoDB Atlas is a cloud-based database service that provides MongoDB databases as a service. It offers automated deployment, scaling, and management of MongoDB clusters.

### Setting Up MongoDB Atlas

#### 1. Create Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

#### 2. Create Database Cluster
```javascript
// Cluster Configuration
Cluster Name: my-app-cluster
Cloud Provider: AWS/Google Cloud/Azure
Region: Choose closest to your users
Cluster Tier: M0 (Free) or higher for production
```

#### 3. Database Access Setup
```javascript
// Create Database User
Username: app_user
Password: strong_password_123
Database User Privileges: Read and write to any database
```

#### 4. Network Access Configuration
```javascript
// IP Access List
// For development: 0.0.0.0/0 (allows all IPs)
// For production: Specific IP ranges or VPC
IP Address: 0.0.0.0/0
Description: Allow access from anywhere
```

#### 5. Connection String Configuration
```javascript
// MongoDB Connection String Format
mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority

// Example connection string
const MONGODB_URI = "mongodb+srv://app_user:password123@cluster0.abc123.mongodb.net/myapp?retryWrites=true&w=majority";
```

### Database Connection Setup
```javascript
// Backend database connection
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
```

### Atlas Security Best Practices
1. **Strong Passwords**: Use complex passwords for database users
2. **IP Whitelisting**: Restrict access to specific IP addresses
3. **VPC Peering**: Use VPC for enhanced security
4. **Encryption**: Enable encryption at rest and in transit
5. **Audit Logging**: Enable audit logs for compliance
6. **Backup**: Configure automated backups

### Environment Variables Setup
```javascript
// .env file
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
MONGODB_DB_NAME=myapp
MONGODB_USER=app_user
MONGODB_PASSWORD=secure_password
```

---

## Backend Hosting on Render

### What is Render?
Render is a cloud platform that offers easy deployment of web services, static sites, and databases. It's particularly popular for Node.js applications.

### Setting Up Backend on Render

#### 1. Prepare Your Application
```javascript
// package.json
{
  "name": "my-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "npm install"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
```

#### 2. Server Configuration
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/feedbacks', require('./routes/feedbacks'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
```

#### 3. Render Deployment Steps
1. **Connect Repository**: Link your GitHub/GitLab repository
2. **Configure Service**:
   - Name: `my-backend-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free or paid

3. **Environment Variables**:
```javascript
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
```

#### 4. Custom Domain Setup (Optional)
```javascript
// Add custom domain in Render dashboard
Domain: api.yourdomain.com
SSL: Automatic (provided by Render)
```

### Render Configuration Files
```yaml
# render.yaml (optional)
services:
  - type: web
    name: my-backend-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
```

### Monitoring and Logs
```javascript
// Enhanced logging for production
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

---

## Frontend Hosting on Vercel

### What is Vercel?
Vercel is a cloud platform for static sites and serverless functions, optimized for frontend frameworks like React, Vue, and Angular.

### Setting Up Frontend on Vercel

#### 1. Prepare Your React Application
```javascript
// package.json
{
  "name": "my-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0"
  }
}
```

#### 2. Environment Configuration
```javascript
// .env.production
VITE_API_BASE_URL=https://your-backend.onrender.com/api
VITE_APP_NAME=My App
VITE_APP_VERSION=1.0.0

// .env.development
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=My App (Dev)
VITE_APP_VERSION=1.0.0
```

#### 3. API Configuration
```javascript
// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

#### 4. Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

#### 5. Vercel Deployment Steps
1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy from CLI**:
   ```bash
   vercel login
   vercel
   ```

3. **Or Deploy from GitHub**:
   - Connect GitHub repository to Vercel
   - Configure build settings
   - Set environment variables

#### 6. Environment Variables in Vercel
```javascript
// Vercel Dashboard → Project Settings → Environment Variables
VITE_API_BASE_URL=https://your-backend.onrender.com/api
VITE_APP_NAME=My Production App
```

### Custom Domain Setup
```javascript
// Add custom domain in Vercel dashboard
Domain: yourdomain.com
SSL: Automatic (provided by Vercel)
```

### Performance Optimization
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['axios', 'lodash']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

---

## Solving Bugs in Production

### Common Production Issues

#### 1. Environment Variable Issues
```javascript
// Debug environment variables
console.log('Environment:', process.env.NODE_ENV);
console.log('Database URI exists:', !!process.env.MONGODB_URI);
console.log('Frontend URL:', process.env.FRONTEND_URL);

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'FRONTEND_URL'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});
```

#### 2. Database Connection Issues
```javascript
// Enhanced database connection with retry logic
const connectDBWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('Database connected successfully');
      return;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed:`, error.message);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
    }
  }
};
```

#### 3. CORS Issues
```javascript
// Debug CORS issues
app.use((req, res, next) => {
  console.log('Request origin:', req.headers.origin);
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  next();
});

// Flexible CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-app.vercel.app',
  'https://yourdomain.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

#### 4. API Endpoint Issues
```javascript
// Health check endpoint for debugging
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Detailed error logging
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });
  
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});
```

### Debugging Tools and Techniques

#### 1. Logging Strategy
```javascript
// Structured logging
const log = {
  info: (message, data = {}) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...data
    }));
  },
  error: (message, error = {}) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack
    }));
  },
  warn: (message, data = {}) => {
    console.warn(JSON.stringify({
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      ...data
    }));
  }
};
```

#### 2. Request/Response Monitoring
```javascript
// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    log.info('Request processed', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent')
    });
  });
  
  next();
});
```

#### 3. Database Query Monitoring
```javascript
// Monitor database queries
mongoose.set('debug', process.env.NODE_ENV === 'development');

// Custom query logging
const originalExec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = function() {
  const query = this.getQuery();
  const collection = this.mongooseCollection.name;
  
  console.log(`DB Query: ${collection}`, query);
  
  return originalExec.apply(this, arguments);
};
```

### Production Monitoring

#### 1. Application Metrics
```javascript
// Basic metrics collection
const metrics = {
  requests: 0,
  errors: 0,
  startTime: Date.now()
};

app.use((req, res, next) => {
  metrics.requests++;
  next();
});

app.get('/metrics', (req, res) => {
  res.json({
    uptime: Date.now() - metrics.startTime,
    requests: metrics.requests,
    errors: metrics.errors,
    errorRate: metrics.requests > 0 ? (metrics.errors / metrics.requests * 100).toFixed(2) : 0
  });
});
```

#### 2. Error Tracking
```javascript
// Global error handler
process.on('uncaughtException', (error) => {
  log.error('Uncaught Exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log.error('Unhandled Rejection', { reason, promise });
  process.exit(1);
});
```

### Deployment Troubleshooting Checklist

#### Pre-deployment
- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] API endpoints tested locally
- [ ] Build process successful
- [ ] Dependencies properly installed

#### Post-deployment
- [ ] Health check endpoint responding
- [ ] Database connection established
- [ ] CORS configuration working
- [ ] API endpoints accessible
- [ ] Frontend can connect to backend
- [ ] Error logs monitored
- [ ] Performance metrics tracked

#### Common Solutions
1. **Restart Services**: Often resolves temporary issues
2. **Check Logs**: Review application and platform logs
3. **Verify Environment Variables**: Ensure all required variables are set
4. **Test Database Connection**: Verify database connectivity
5. **Check CORS Settings**: Ensure frontend can access backend
6. **Monitor Resource Usage**: Check CPU, memory, and disk usage
7. **Update Dependencies**: Ensure all packages are up to date

---

## Best Practices Summary

### Security
- Use environment variables for sensitive data
- Implement proper CORS configuration
- Use HTTPS in production
- Regular security updates
- Input validation and sanitization

### Performance
- Optimize database queries
- Implement caching strategies
- Use CDN for static assets
- Monitor application performance
- Implement proper error handling

### Monitoring
- Set up logging and monitoring
- Implement health checks
- Track application metrics
- Monitor error rates
- Set up alerts for critical issues

### Deployment
- Use CI/CD pipelines
- Implement blue-green deployments
- Test in staging environment
- Have rollback strategies
- Document deployment procedures

---

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practices-security.html) 