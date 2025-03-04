# 🏡 Apartment Listing App - Quick Setup Guide  

This is a **full-stack apartment listing app** built with **NestJS (backend), Next.js (frontend), PostgreSQL, and Cloudinary**.  

---

## 🚀 Setup & Run the Project  

### 1️⃣ Clone the Repository  

### 2️⃣ Set Up Environment Variables
> backend/.en
```sh
# Database Config
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_NAME=nawy

# App Config
PORT=5000
JWT_SECRET=mysecretkey
saltRounds = 10

JWT_EXPIRES_IN=1h

CLOUDINARY_CLOUD_NAME = ds1ti1cyb
CLOUDINARY_API_KEY = 628293338998442
CLOUDINARY_API_SECRET = jhNLgUURnfxFRXLP3XgLysBV5UQ
```

### 3️⃣ Run the Project with Docker
```sh
docker-compose up --build
```
✅ This will start Frontend (Next.js), Backend (NestJS), and PostgreSQL.

##🌍 Access the Application
> Frontend: http://localhost:3000
> Backend API: http://localhost:5000
> Database: PostgreSQL runs on port 5432

## Project structure
```sh
apartment-listing-app/
│── backend/       # NestJS API (Backend)
│   ├── src/       # Main backend source code
│   ├── .env       # Backend environment variables (ignored in Git)
│   ├── Dockerfile # Docker setup for backend
│   ├── package.json # Backend dependencies
│
│── frontend/      # Next.js UI (Frontend)
│   ├── src/       # Main frontend source code
│   ├── .env.local # Frontend environment variables (ignored in Git)
│   ├── Dockerfile # Docker setup for frontend
│   ├── package.json # Frontend dependencies
│
│── docker-compose.yml   # Runs the entire project with Docker
│── README.md      # Setup Guide
```

