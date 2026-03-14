# BlueKod Backend API

Node.js + Express + MongoDB REST API for the BlueKod contact form.

---

## 🗂 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                  ← MongoDB connection (Mongoose)
│   ├── controllers/
│   │   └── contact.controller.js  ← All CRUD logic
│   ├── middleware/
│   │   ├── validate.js            ← express-validator rules
│   │   └── errorHandler.js        ← Global 404 + error handler
│   ├── models/
│   │   └── Contact.js             ← Mongoose schema & model
│   ├── routes/
│   │   └── contact.routes.js      ← Express router + rate limiting
│   ├── app.js                     ← Express app setup (CORS, Helmet, etc.)
│   └── server.js                  ← Entry point
├── tests/
│   └── api.test.js                ← Integration tests (no extra deps)
├── .env.example                   ← Copy → .env and fill in values
├── .gitignore
└── package.json
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set MONGODB_URI at minimum
```

### 3. Start MongoDB
```bash
# Local instance
mongod --dbpath /data/db

# Or use MongoDB Atlas (free tier) — just set MONGODB_URI in .env
```

### 4. Start the server
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server starts at **http://localhost:5000**

---

## 📡 API Endpoints

| Method   | Endpoint                     | Description                          |
|----------|------------------------------|--------------------------------------|
| `GET`    | `/health`                    | Server health check                  |
| `POST`   | `/api/contact`               | Submit contact form → saved to MongoDB |
| `GET`    | `/api/contact`               | List all submissions (paginated)     |
| `GET`    | `/api/contact/stats`         | Counts grouped by status             |
| `GET`    | `/api/contact/:id`           | Get single submission by ID          |
| `PATCH`  | `/api/contact/:id/status`    | Update status field                  |
| `DELETE` | `/api/contact/:id`           | Delete a submission                  |

---

## 📦 POST /api/contact — Request Body

```json
{
  "firstName": "John",
  "lastName":  "Doe",
  "email":     "john@example.com",
  "service":   "Website Development",
  "message":   "I need a website for my business."
}
```

**Required fields:** `firstName`, `email`, `message`

**`service` must be one of:**
- `Website Development`
- `AI Development`
- `Logo & Brand Design`
- `Full Package`
- `Something Custom`

### Success Response `201`
```json
{
  "success": true,
  "message": "Your message has been received! We will get back to you within 24 hours.",
  "data": {
    "id":        "664abc123def456789",
    "fullName":  "John Doe",
    "email":     "john@example.com",
    "service":   "Website Development",
    "createdAt": "2025-06-10T08:30:00.000Z"
  }
}
```

### Validation Error `422`
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email",   "message": "Please provide a valid email address" },
    { "field": "message", "message": "Message must be between 10 and 2000 characters" }
  ]
}
```

---

## 🗃 MongoDB Document Schema

Each contact form submission is stored as:

```json
{
  "_id":       "ObjectId",
  "firstName": "John",
  "lastName":  "Doe",
  "email":     "john@example.com",
  "service":   "Website Development",
  "message":   "I need a website...",
  "status":    "new",
  "ipAddress": "::1",
  "userAgent": "Mozilla/5.0 ...",
  "createdAt": "2025-06-10T08:30:00.000Z",
  "updatedAt": "2025-06-10T08:30:00.000Z"
}
```

**`status` lifecycle:** `new` → `read` → `replied` → `archived`

---

## 🔍 GET /api/contact — Query Parameters

| Param    | Type   | Default | Description                      |
|----------|--------|---------|----------------------------------|
| `page`   | number | `1`     | Page number                      |
| `limit`  | number | `20`    | Items per page                   |
| `status` | string | —       | Filter by status                 |
| `email`  | string | —       | Filter by email (partial match)  |
| `sort`   | string | `desc`  | `asc` or `desc` by createdAt     |

**Example:** `GET /api/contact?page=1&limit=10&status=new&sort=desc`

---

## 🧪 Running Tests

```bash
# Start the server first, then in a new terminal:
npm test
```

Tests cover: POST (valid + invalid), GET list, GET by ID, GET stats, PATCH status, DELETE.

---

## 🔒 Security Features

- **Helmet** — sets secure HTTP headers
- **CORS** — whitelist of allowed Angular origins
- **Rate limiting** — 10 form submissions / IP / 15 min; 100 global API calls / IP / 15 min
- **express-validator** — server-side input sanitisation and validation
- **Body size limit** — 10kb max per request
- **Mongoose validation** — schema-level field constraints

---

## ☁️ Deploy to Production

### MongoDB Atlas (recommended)
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Whitelist your server IP
3. Copy the connection string into `.env` as `MONGODB_URI`

### Render / Railway / Fly.io
```bash
# Set environment variables in the platform dashboard:
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```
