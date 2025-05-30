
# 🐦 Twitter Clone - Fullstack Project

This is a fullstack Twitter Clone built with **NestJS**, **PostgreSQL**, and **TypeScript** on the backend, and **React**, **Vite**, and **TailwindCSS** on the frontend. It supports user authentication, post creation, and a dynamic comment system with threaded replies.

---

## 🚀 Features

- User registration and login (JWT-based authentication)
- Post creation with title and content
- Commenting system with nested replies (up to 2 levels)
- Feed with sorted posts and relative timestamps
- Protected routes with route guarding
- Responsive layout using TailwindCSS
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
- **shadcn/ui**
- **React Router DOM**
- **Axios**
- **React Hook Form**

---

## 📦 Project Structure

```
/backend
  ├── src
  │   ├── auth        # JWT login & strategy
  │   ├── user        # User module
  │   ├── post        # Post module
  │   ├── comment     # Comment module with parent/child support
  │   ├── config      # Configuration (env, constants)
  │   └── db          # TypeORM migrations

/frontend
  ├── src
  │   ├── api         # Axios instances and API calls
  │   ├── assets      # Static assets
  │   ├── auth        # Auth context and hook
  │   ├── components  # UI components (including CommentList)
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

### 3. Install frontend dependencies and run

```bash
cd ../frontend
npm install
make dev
```

> Make sure to set `VITE_API_URL` in a `.env` file or in the Vercel dashboard if deploying.

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

- `POST /comments`
- Nested replies supported (via `parentId`)
- Loaded with `comments.replies`, `comments.replies.author`, and `comments.replies.parent`

> All endpoints (except login and registration) require `Authorization: Bearer <token>`.

---

## 🧩 Frontend Highlights

- ✅ Login and Register screens
- ✅ Feed page (sorted by newest first)
- ✅ New Post page
- ✅ Comments with nesting and reply forms
- ✅ Navigation menu and user dropdown
- ✅ Logout and token expiration handling
- ✅ Page Not Found screen with emoji and redirect
- ✅ Responsive design and layout

---

## 🐳 Makefile Shortcuts

### Backend

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

### Frontend

```bash
make dev      # Start frontend dev container
make clean    # Clean up frontend container and images
make shell    # Access the frontend container shell
make status   # Check frontend container status
```

---

## ✅ To Do

- Post likes and retweets
- Infinite scroll
- Unit and integration tests

---

## 📄 License

MIT © Gian Verdum
