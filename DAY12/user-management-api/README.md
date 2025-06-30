# User Management API — Documentation

---

## Table of Contents

- [User Management API — Documentation](#user-management-api--documentation)
  - [Table of Contents](#table-of-contents)
  - [1. Project Overview](#1-project-overview)
  - [2. Features](#2-features)
  - [3. Prerequisites](#3-prerequisites)
  - [4. Installation and Setup](#4-installation-and-setup)
  - [5. Project Structure](#5-project-structure)
  - [6. Environment Variables](#6-environment-variables)
  - [7. How to Run](#7-how-to-run)
  - [8. API Endpoints](#8-api-endpoints)
    - [8.1 Get All Users](#81-get-all-users)
    - [8.2 Get User By ID](#82-get-user-by-id)
    - [8.3 Create User](#83-create-user)
    - [8.4 Update User](#84-update-user)
    - [8.5 Delete User](#85-delete-user)
  - [9. Middleware Explanation](#9-middleware-explanation)
    - [9.1 Authentication Middleware (`middleware/auth.js`)](#91-authentication-middleware-middlewareauthjs)
    - [9.2 Error Handling Middleware (`middleware/errorHandler.js`)](#92-error-handling-middleware-middlewareerrorhandlerjs)
  - [10. Error Handling](#10-error-handling)
  - [11. Modules and Utilities](#11-modules-and-utilities)
    - [11.1 Custom Logger (`utils/logger.js`)](#111-custom-logger-utilsloggerjs)
  - [12. Security](#12-security)
  - [13. Future Enhancements](#13-future-enhancements)
- [Summary](#summary)

---

## 1. Project Overview

**User Management API** is a simple RESTful API built with Node.js, Express, and MongoDB (using Mongoose). It demonstrates key backend concepts such as:

- Event-driven architecture in Node.js
- Modular code structure
- File system operations
- Express routing and middleware
- Serving static files
- MongoDB integration with schema and CRUD
- Environment variable configuration
- Error handling and validation
- Basic token-based authentication middleware

This API allows you to create, read, update, and delete user data stored in MongoDB.

---

## 2. Features

- User CRUD operations: Create, Read, Update, Delete
- Data validation using Mongoose schemas
- Environment-based configuration with `.env`
- Basic token authentication on protected routes
- Custom logger utility
- Reads application configuration from JSON file
- Express middleware for auth and error handling
- Serves static files from `public` folder

---

## 3. Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v12+) installed
- [MongoDB](https://www.mongodb.com/try/download/community) running locally or a MongoDB Atlas connection string
- Basic knowledge of JavaScript and REST APIs
- Optional: Postman or curl for testing API endpoints

---

## 4. Installation and Setup

1. Clone or download the project.
2. Navigate to the project directory:

```bash
cd user-management-api
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory with these variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/userdb
API_TOKEN=mysecrettoken123
```

Replace `MONGO_URI` with your MongoDB connection string if not running locally.

---

## 5. Project Structure

```
user-management-api/
├── config/
│   └── appConfig.json         # App metadata config file
├── middleware/
│   ├── auth.js               # Authentication middleware
│   └── errorHandler.js       # Error handling middleware
├── models/
│   └── User.js               # Mongoose User schema & model
├── routes/
│   └── users.js              # Express routes for /users endpoint
├── utils/
│   └── logger.js             # Custom logger utility
├── .env                      # Environment variables
├── app.js                    # Main application entry point
└── package.json              # npm dependencies and scripts
```

---

## 6. Environment Variables

| Variable    | Description                         | Example                            |
| ----------- | ----------------------------------- | ---------------------------------- |
| `PORT`      | Port number for Express server      | `5000`                             |
| `MONGO_URI` | MongoDB connection string           | `mongodb://localhost:27017/userdb` |
| `API_TOKEN` | Secret token for API authentication | `mysecrettoken123`                 |

---

## 7. How to Run

Start MongoDB server locally or ensure your cloud MongoDB URI is working.

Run the application:

```bash
node app.js
```

Server will start on `http://localhost:5000` (or the port specified in `.env`).

---

## 8. API Endpoints

All endpoints under `/users` require **Authorization header**:

```
Authorization: Bearer mysecrettoken123
```

### 8.1 Get All Users

- **URL:** `/users`
- **Method:** GET
- **Response:** Array of all user objects

### 8.2 Get User By ID

- **URL:** `/users/:id`
- **Method:** GET
- **Response:** User object or 404 if not found

### 8.3 Create User

- **URL:** `/users`
- **Method:** POST
- **Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

- **Response:** Created user object (201 Created)

### 8.4 Update User

- **URL:** `/users/:id`
- **Method:** PUT
- **Body:** Fields to update (any subset of name, email, age)
- **Response:** Updated user object or 404 if not found

### 8.5 Delete User

- **URL:** `/users/:id`
- **Method:** DELETE
- **Response:** 204 No Content or 404 if not found

---

## 9. Middleware Explanation

### 9.1 Authentication Middleware (`middleware/auth.js`)

- Checks for `Authorization` header with format:
  `Bearer <token>`
- Verifies token matches the one in `.env`
- Returns 401 Unauthorized if invalid or missing

### 9.2 Error Handling Middleware (`middleware/errorHandler.js`)

- Catches errors passed via `next(err)`
- Logs error stack to console
- Sends JSON error response with 500 status code

---

## 10. Error Handling

- Mongoose schema validates inputs (required fields, formats, min values)
- Routes wrap logic in try-catch blocks, passing errors to middleware
- 404 responses when resource not found
- Validation errors returned by Mongoose are forwarded as 500 with details

---

## 11. Modules and Utilities

### 11.1 Custom Logger (`utils/logger.js`)

Simple utility that logs messages with timestamps:

```js
function log(message) {
  console.log(`[${new Date().toISOString()}] - ${message}`);
}
```

Used in `app.js` to log startup messages.

---

## 12. Security

- API routes are protected with simple token authentication
- Tokens passed in `Authorization` header with `Bearer` prefix
- Prevents unauthorized access to user data
- For production, consider JWT or OAuth tokens with HTTPS

---

## 13. Future Enhancements

- Add password field with hashed storage for real user authentication
- Implement user roles and permissions
- Add pagination and filtering to GET users endpoint
- Use HTTPS and helmet middleware for security headers
- Deploy with Docker and CI/CD pipeline
- Add unit/integration tests

---

# Summary

This project provides a **simple, extensible foundation** to learn Node.js backend development, MongoDB integration, and REST API best practices, all organized with clean modular code and environment-based configuration.

---

If you want, I can also generate a **Postman collection** or a **Swagger/OpenAPI spec** for easy API testing and documentation.

---
