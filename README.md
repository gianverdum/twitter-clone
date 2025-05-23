
# 🐦 Twitter Clone - Backend API

This is the backend API for a simplified Twitter clone built with **NestJS**, **TypeORM**, and **PostgreSQL**. It supports user registration, login, posting content, and commenting, with JWT-based authentication.

## 🚀 Features

- User registration and authentication
- JWT token-based authorization
- CRUD operations for users, posts, and comments
- Protected routes using `@nestjs/passport`
- Swagger API documentation
- PostgreSQL database with TypeORM migrations

---

## 🛠️ Tech Stack

- **NestJS**
- **PostgreSQL**
- **TypeORM**
- **Docker & Docker Compose**
- **Jest** for testing (in progress)

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
```

---

## 🔧 Setup Instructions

### 1. Clone and install

```bash
git clone git@github.com:gianverdum/twitter-clone.git
cd twitter-clone
make dev DIR=backend
```

> This will build and start the backend in development mode.

### 2. Environment Variables

Create a `.env` file inside `/backend`:

```env
POSTGRES_HOST=your_host
POSTGRES_PORT=your_port
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name

JWT_SECRET=yourSecretKeyHere
```

---

## 📮 API Endpoints

> Use a tool like **Rest Client**, **Postman** or **cURL** to interact with the endpoints.

### 🔐 Auth

```http
POST /auth/login
```

### 👤 Users

```http
POST /users
GET /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
```

### 📝 Posts

```http
POST /posts
GET /posts
GET /posts/:id
PATCH /posts/:id
DELETE /posts/:id
```

### 💬 Comments

```http
POST /comments
GET /comments
GET /comments/:id
PATCH /comments/:id
DELETE /comments/:id
```

All endpoints (except user creation and login) require `Authorization: Bearer <JWT>`.

---

## 🐳 Docker & Make

Use Makefile targets:

```bash
make dev DIR=backend           # Start dev environment
make prod DIR=backend          # Build for production
make status DIR=backend        # Check container status
make shell                     # Enter backend container
make migration-generate        # Generate migration
make migration-run             # Run migrations
```

---

## ✅ To Do

- Unit & e2e tests
- Pagination for listing endpoints
- Likes and retweets

---

## 📄 License

MIT © Gian Verdum
