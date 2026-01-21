# 🚀 AI Finance Manager Backend API

**Secure Finance Management Backend built with Node.js, Express & MongoDB**

AI Finance Manager Backend is a **production-ready REST API** for managing **income, expenses, and financial analytics**.  
It supports **JWT authentication**, **dashboard insights**, and **Excel exports**, and is fully **Vercel serverless–ready**.

---

## 🔍 GitHub SEO Keywords

Finance Management API · Expense Tracker Backend · Income Tracker API ·  
Node.js Finance API · MongoDB Expense Manager · JWT Authentication API ·  
Excel Export API · Vercel Serverless Backend · REST API · Express.js

---

## ✨ Features

- 🔐 JWT Authentication (HTTP-only cookies)
- 👤 User Registration, Login & Logout
- 💰 Income Management (CRUD)
- 💸 Expense Management (CRUD)
- 📊 Dashboard Analytics
  - Total balance
  - Total income & expenses
  - Last 30 days expenses
  - Last 60 days income
  - Recent transactions
- 📥 Excel Export (Income / Expense / All Transactions)
- ☁️ Vercel Serverless Deployment Ready
- 🧩 MongoDB Connection Caching (Serverless optimized)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcrypt / bcryptjs
- xlsx
- dotenv
- cors
- cookie-parser

---

## 📁 Project Structure

```
.
├── api/
│ └── api.js
├── src/
│ ├── config/
│ │ └── connectDB.js
│ ├── controllers/
│ │ ├── user.js
│ │ ├── income.js
│ │ ├── expense.js
│ │ └── dashboard.js
│ ├── middlewares/
│ │ ├── auth.js
│ │ └── errorHandler.js
│ ├── models/
│ │ ├── user.js
│ │ ├── income.js
│ │ └── expense.js
│ ├── routes/
│ │ ├── user.js
│ │ ├── income.js
│ │ ├── expense.js
│ │ └── dashboard.js
│ └── utils/
│ └── createToken.js
├── index.js
├── package.json
├── vercel.json
└── README.md
```

---

## 🌐 Base URL

URL: `https://your-vercel-domain.vercel.app`

---

## 🔐 Authentication

- JWT stored in **HTTP-only cookies**
- Token expiry: **1 hour**
- Cookie expiry: **1 day**
- Protected routes secured via `authMiddleware`

---

## 📌 API Endpoints

### 👤 User

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/user/register` | Register user |
| POST   | `/api/user/login`    | Login user    |
| POST   | `/api/user/logout`   | Logout user   |

---

### 💰 Income (Protected)

| Method | Endpoint                    | Description           |
| ------ | --------------------------- | --------------------- |
| POST   | `/api/income/add`           | Add income            |
| GET    | `/api/income/get`           | Get all incomes       |
| DELETE | `/api/income/:id`           | Delete income         |
| GET    | `/api/income/downloadexcel` | Download income Excel |

---

### 💸 Expense (Protected)

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| POST   | `/api/expense/add`           | Add expense            |
| GET    | `/api/expense/get`           | Get all expenses       |
| DELETE | `/api/expense/:id`           | Delete expense         |
| GET    | `/api/expense/downloadexcel` | Download expense Excel |

---

### 📊 Dashboard (Protected)

| Method | Endpoint                       | Description               |
| ------ | ------------------------------ | ------------------------- |
| GET    | `/api/dashboard`               | Dashboard analytics       |
| GET    | `/api/dashboard/downloadexcel` | Download all transactions |

---

## 📥 API Request Examples

### 🔐 Authentication

---

### ➕ Register User

#### POST /api/user/register

##### Request

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"password": "StrongPassword123"
}
```

##### Response

```json
{
	"user": {
		"_id": "65a1...",
		"name": "John Doe",
		"email": "john@example.com"
	},
	"message": "User created successfully."
}
```

### 🔑 Login User

#### POST /api/user/login

##### Request

```json
{
	"email": "john@example.com",
	"password": "StrongPassword123"
}
```

##### Response

```json
{
	"user": {
		"_id": "65a1...",
		"name": "John Doe",
		"email": "john@example.com"
	},
	"message": "User logged-in successfully."
}
```

### 💰 Income APIs (Protected)

---
### ➕ Add Income
#### POST /api/income/add
##### Request

```json
Header: {Authorization: Bearer <JWT_TOKEN>}

{
  "source": "Salary",
  "amount": 5000,
  "date": "2025-01-10",
  "description": "January Salary"
}
```
##### Response
```json
{
  "income": {
    "_id": "65b2...",
    "source": "Salary",
    "amount": 5000
  },
  "message": "Income added successfully"
}
```

### 💸 Expense APIs (Protected)
---

### ➕ Add Expense
####POST /api/expense/add
##### Request

```json
Header: Authorization: Bearer <JWT_TOKEN>

{
  "category": "Food",
  "amount": 250,
  "date": "2025-01-12",
  "description": "Lunch"
}
```

## 📊 Dashboard API
### 📈 Get Dashboard Data
#### GET /api/dashboard
##### Request

```json
{
	"data": {
		"totalBalance": 4750,
		"totalIncome": 5000,
		"totalExpense": 250,
		"recentTransaction": []
	},
	"message": "Data retrieved"
}
```

## Swagger / OpenAPI

### Create swagger.yml

```json
openapi: 3.0.0
info:
  title: AI Finance Manager API
  version: 1.0.0
  description: Finance management backend API

servers:
  - url: https://your-vercel-domain.vercel.app

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - bearerAuth: []

paths:
  /api/user/login:
    post:
      summary: Login user
      responses:
        200:
          description: Login success

  /api/income/add:
    post:
      summary: Add income
      security:
        - bearerAuth: []
      responses:
        200:
          description: Income added
```

## ⚙️ Environment Variables
### Create .env:
PORT=8080\
MONGO_URI=your_mongodb_uri\
JWT_SECRET=your_jwt_secret\
JWT_REFRESH_TOKEN=your_refresh_secret\
NODE_ENV=production\

## ▶️ Run Locally
```json
pnpm install
pnpm start
```

## ☁️ Vercel Deployment

### vercel.json
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}

```

## 🔒 Security Notes
-> Passwords hashed with bcrypt\
-> JWT stored in HTTP-only cookies\
-> CORS with credentials enabled\
-> MongoDB connection caching for serverless\

###⭐ Author

AI Finance Manager Backend
Built for scalability, security, and modern serverless deployment 🚀