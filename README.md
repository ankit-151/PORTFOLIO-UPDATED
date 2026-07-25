# Ankit Portfolio — Full-Stack Application

A pixel-perfect portfolio website for **Ankit**, built with React, Node.js, Express, and MongoDB.

---

## 📁 Project Structure

```
Ankit - portfolio/
├── frontend/     # Public portfolio (React + Vite) — Port 5173
├── admin/        # Admin panel (React + Vite)       — Port 5174
└── backend/      # REST API (Node.js + Express)     — Port 5000
```

---

## 🚀 Quick Start

### 1. Start MongoDB
Make sure MongoDB is running locally on port `27017`.

### 2. Backend
```bash
cd backend
npm install
npm run seed      # Populate DB with Ankit's CV data (run once)
npm run dev       # Start API server on port 5000
```

### 3. Frontend (Public Portfolio)
```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

### 4. Admin Panel
```bash
cd admin
npm install
npm run dev       # http://localhost:5174
```

---

## 🔑 Admin Credentials

| Field    | Value                   |
|----------|-------------------------|
| Email    | `admin@portfolio.com`   |
| Password | `admin123`              |

> Change credentials in `backend/.env`

---

## 🗃️ Database (MongoDB)

Collections:
- `profiles` — Personal info, bio, social links, hero code
- `skills` — Tech stack with categories and proficiency
- `projects` — Portfolio projects with tags and links
- `experiences` — Work/experience timeline
- `certificates` — Professional certifications
- `achievements` — Stats and highlights
- `educations` — Academic background
- `trainings` — Self-learning and courses
- `contacts` — Contact form messages

---

## 🔧 Environment Variables (`backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ankit-portfolio  # Put your MongoDB Atlas connection string here for production
JWT_SECRET=your_secret_here
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=your_password_here
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

# SMTP Mail Settings (For contact form email and auto-replies)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

## 🌐 API Endpoints

| Method | Endpoint          | Auth | Description              |
|--------|-------------------|------|--------------------------|
| GET    | `/api/portfolio/all` | ❌  | All portfolio data       |
| POST   | `/api/auth/login` | ❌  | Admin login              |
| GET    | `/api/auth/verify`| ✅  | Verify JWT token         |
| GET/PUT| `/api/profile`    | ✅  | Profile CRUD             |
| GET/POST/PUT/DELETE | `/api/skills` | ✅ | Skills CRUD |
| GET/POST/PUT/DELETE | `/api/projects` | ✅ | Projects CRUD |
| GET/POST/PUT/DELETE | `/api/experience` | ✅ | Experience CRUD |
| GET/POST/PUT/DELETE | `/api/certificates` | ✅ | Certs CRUD |
| GET/POST/PUT/DELETE | `/api/achievements` | ✅ | Achievements CRUD |
| GET/POST/PUT/DELETE | `/api/education` | ✅ | Education CRUD |
| GET/POST/PUT/DELETE | `/api/training` | ✅ | Training CRUD |
| POST   | `/api/contact`    | ❌  | Submit contact form      |
| GET/PUT/DELETE | `/api/contact` | ✅ | Manage messages     |

---

## 🎨 Features

### Public Portfolio
- ✅ Matches Rishabh Tiwari template pixel-perfectly
- ✅ Dark/Light theme toggle (persisted)
- ✅ Animated hero with code snippet card
- ✅ Filterable skills section
- ✅ Project cards with hover overlays
- ✅ Animated stats counter
- ✅ Contact form
- ✅ Fully responsive

### Admin Panel
- ✅ JWT-protected login
- ✅ Dashboard with overview stats
- ✅ CRUD for all 8 sections
- ✅ Profile editor with all fields
- ✅ Skills manager with color picker
- ✅ Projects manager with tag/tech inputs
- ✅ Messages viewer with read/delete

---

## 🔮 Adding Your Own Database

To switch to a different database (PostgreSQL, MySQL, etc.):

1. Replace Mongoose models in `backend/models/` with your ORM models
2. Update `backend/routes/` to use your new DB queries
3. Keep the same API response format `{ success, data }` and the frontend/admin won't need changes
