# Store Rating Platform

A full-stack web application where users can browse stores, submit ratings, and manage reviews with role-based authentication.

---

## Features

### Authentication
- User Signup & Login
- JWT Authentication
- Role-Based Access Control

### Roles

#### Admin
- Create Users
- Create Stores
- View Dashboard
- Manage Users & Stores

#### Normal User
- Browse Stores
- Submit Ratings
- Update Ratings
- Update Password

#### Store Owner
- View Store Ratings
- See Average Ratings
- View Users Who Rated Their Store

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcryptjs

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Railway MySQL

---

## Project Structure

```bash
fullStack_project/
│
├── frontend/
│   ├── src/
│   └── ...
│
├── server/
│   ├── controller/
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   └── ...
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port

JWT_SECRET=your_secret
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Vivan-1045/fullStack_project.git
```

---

## Backend Setup

```bash
cd server
npm install
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Deployment

### Backend
- Deploy on Render
- Connect Railway MySQL database
- Add environment variables in Render

### Frontend
- Deploy on Vercel
- Set Root Directory to `frontend`
- Add `VITE_API_URL`

---
