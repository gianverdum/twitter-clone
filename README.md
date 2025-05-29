# 🐦 Twitter Clone - Fullstack Project

This is a fullstack Twitter Clone built with **NestJS**, **PostgreSQL**, and **TypeScript** on the backend, and **React**, **Vite**, and **TailwindCSS** on the frontend. It supports user authentication, post creation, and feed display.

---

## 🚀 Features

- User registration and login (JWT-based authentication)
- Post creation with title and content
- Protected routes with route guarding
- Responsive layout using TailwindCSS
- Feed with sorted posts and relative timestamps
- Top navigation menu with routing
- Page not found (404) handling with a fun UI

---

## 🛠️ Tech Stack

### Backend

- **NestJS**
- **PostgreSQL**
- **TypeORM**
- **Docker & Docker Compose**
- **Jest** (tests in progress)

### Frontend

- **React**
- **Vite**
- **TypeScript**
- **TailwindCSS**
- **React Router DOM**
- **Axios**

---

## 📦 Project Structure

```
/backend
  ├── src
  │   ├── auth        # JWT login & strategy
  │   ├── user        # User module
  │   ├── post        # Post module
  │   ├── comment     # Comment module
  │   ├── config      # Configuration (env, constants)
  │   └── db          # TypeORM migrations

/frontend
  ├── src
  │   ├── api         # Axios instances and API calls
  │   ├── assets      # Static assets
  │   ├── auth        # Auth context and hook
  │   ├── components  # UI components
  │   ├── layouts     # Page layout wrapper
  │   ├── lib         # Utility functions
  │   ├── pages       # Application pages
  │   ├── routes      # Router configuration
  │   └── types       # Shared TypeScript types
```

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone git@github.com:gianverdum/twitter-clone.git
cd twitter-clone
```

### 2. Install backend dependencies

```bash
cd backend
npm install
cp .env-template .env
# Edit .env and set DB and JWT settings
make dev
make migration-generate
make migration-run
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📮 API Endpoints

Refer to `backend/REST/requests.http` or Swagger documentation.

### Auth

- `POST /auth/login`

### Users

- CRUD operations

### Posts

- `POST /posts`
- `GET /posts`

### Comments

- In progress

> All endpoints (except login and registration) require `Authorization: Bearer <token>`.

---

## 🧩 Frontend Highlights

- ✅ Login and Register screens
- ✅ Feed page (sorted by newest first)
- ✅ New Post page
- ✅ Navigation menu and user dropdown
- ✅ Logout and token expiration handling
- ✅ Page Not Found screen with emoji and redirect
- ✅ Responsive design and layout

---

## 🐳 Makefile Shortcuts

```bash
make dev                  # Start dev environment
make prod                 # Build for production
make status               # Check container status
make shell                # Enter backend container
make migration-generate   # Generate migration
make migration-run        # Run migrations
make migration-revert     # Revert last migration
make migration-drop       # Drop schema
```

---

## ✅ To Do

- Comments module
- Post likes and retweets
- Infinite scroll
- Unit and integration tests

---

## 📄 License

MIT © Gian Verdum