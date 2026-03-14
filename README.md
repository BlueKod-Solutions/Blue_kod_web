# BlueKod – Full Stack Website

A production-ready freelance tech website with:
- **Frontend** — Angular 17 + Angular Material (dark navy theme)
- **Backend** — Node.js + Express REST API
- **Database** — MongoDB via Mongoose (contact form submissions stored as JSON)

---

## 📁 Monorepo Structure

```
bluekod-full/
├── src/                          ← Angular 17 frontend
│   ├── app/
│   │   ├── components/           ← navbar, hero, services, why, about, contact, chatbot, footer
│   │   ├── models/               ← TypeScript interfaces
│   │   └── services/
│   │       ├── chatbot.service.ts
│   │       ├── contact.service.ts     ← HTTP POST to backend
│   │       └── scroll-reveal.service.ts
│   ├── environments/
│   │   ├── environment.ts             ← dev  → http://localhost:5000/api
│   │   └── environment.production.ts  ← prod → your deployed API URL
│   └── styles/global.scss
├── backend/                      ← Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/db.js               ← Mongoose connection
│   │   ├── controllers/contact.controller.js
│   │   ├── middleware/validate.js + errorHandler.js
│   │   ├── models/Contact.js          ← Mongoose schema
│   │   ├── routes/contact.routes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/api.test.js
│   ├── .env.example
│   └── package.json
├── angular.json
├── package.json
└── README.md
```

---

## ⚡ Quick Start (Full Stack)

### 1. Start MongoDB
```bash
mongod --dbpath /data/db
# Or use MongoDB Atlas free tier — see backend/README.md
```

### 2. Start the backend
```bash
cd backend
npm install
cp .env.example .env   # set MONGODB_URI if needed
npm run dev
# → http://localhost:5000
```

### 3. Start the Angular frontend
```bash
# from project root
npm install
ng serve
# → http://localhost:4200
```

### 4. Submit the form
Go to **http://localhost:4200**, scroll to Contact, fill the form → data saves to MongoDB.

---

## 🔄 Data Flow

```
User fills form (Angular)
  → ContactService.submitContact()
  → POST /api/contact (Express)
  → express-validator checks input
  → Mongoose Contact.save()
  → MongoDB stores JSON document
  → 201 response → Angular success state
```

---

## 📡 Key API Endpoint

```http
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "firstName": "John",
  "lastName":  "Doe",
  "email":     "john@example.com",
  "service":   "Website Development",
  "message":   "I need a website for my business."
}
```

See **backend/README.md** for the full API reference (GET, PATCH, DELETE, stats).

---

## 🏗 Production Build

```bash
ng build --configuration production   # → dist/bluekod/
cd backend && NODE_ENV=production npm start
```

Update `src/environments/environment.production.ts` with your live backend URL before building.
