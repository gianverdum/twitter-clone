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

### 1. Clone the repository

```bash
git clone git@github.com:gianverdum/twitter-clone.git
cd twitter-clone
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Rename and configure environment variables

Copy and rename the provided template:

```bash
cp .env-template .env
```

Then edit `.env` and set your credentials:

```env
POSTGRES_HOST=your_postgres_host
POSTGRES_PORT=your_postgres_port
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
JWT_SECRET=your_jwt_secret
```

### 4. Start development environment

```bash
make dev
```

> This builds and runs the backend using Docker.

### 5. Generate initial migration

Ensure `src/db/migrations/` is empty, then run:

```bash
make migration-generate
```

### 6. Run migrations

```bash
make migration-run
```

### 7. Test API calls

Install the **REST Client** VSCode extension and open:

```
backend/REST/requests.http
```

Click “Send Request” above each call to test the API.

---

## 📮 API Endpoints

> Use a tool like **Rest Client**, **Postman**, or **cURL** to interact with the endpoints.

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

> All endpoints (except user creation and login) require `Authorization: Bearer <JWT>`.

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

- Unit & e2e tests
- Pagination for listing endpoints
- Likes and retweets

---

## 📄 License

MIT © Gian Verdum