# Reading Recommendation System API

A NestJS-based API that allows users to track their reading progress and get book recommendations based on reading patterns.

## Features

- User Authentication (Register/Login)
- Role-based Authorization (Admin/User)
- Book Management
- Reading Progress Tracking
- Book Recommendations based on reading patterns

## Tech Stack

- NestJS (Backend Framework)
- PostgreSQL (Database)
- TypeORM (ORM)
- JWT (Authentication)
- Swagger (API Documentation)

## Prerequisites

- Node.js (v16 or later)
- PNPM
- PostgreSQL
- Docker (optional, for database)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd octane
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables in `.env`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/reading_recommendation
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

4. Start PostgreSQL using Docker:
```bash
docker-compose up -d
```

5. Start the application:
```bash
pnpm start:dev
```

## API Documentation

The API documentation is available at: `http://localhost:3000/api/docs`

### Key Endpoints

#### Authentication

1. Register a new user:
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123"
}
```
Note: The first registered user will automatically become an admin.

2. Login:
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Books Management (Admin Only)

1. Create a new book:
```bash
POST /api/books
Authorization: Bearer <token>
{
  "name": "The Great Gatsby",
  "numOfPages": 180
}
```

2. Get all books:
```bash
GET /api/books
```

3. Get book by ID:
```bash
GET /api/books/:id
```

#### Reading Progress

1. Submit reading interval:
```bash
POST /api/reading/intervals
Authorization: Bearer <token>
{
  "book_id": "<uuid>",
  "start_page": 1,
  "end_page": 30
}
```

2. Get top recommended books:
```bash
GET /api/reading/recommendations
```

## Database Schema

### Users
- id (UUID)
- email (string, unique)
- password (string, hashed)
- role (enum: 'user' | 'admin')
- createdAt (timestamp)
- updatedAt (timestamp)

### Books
- id (UUID)
- name (string)
- numOfPages (number)
- numOfReadPages (number)
- createdAt (timestamp)
- updatedAt (timestamp)

### ReadingIntervals
- id (UUID)
- userId (UUID, foreign key)
- bookId (UUID, foreign key)
- startPage (number)
- endPage (number)
- createdAt (timestamp)
- updatedAt (timestamp)

## Authentication Flow

1. User registers/logs in and receives a JWT token
2. Token must be included in Authorization header for protected routes
3. Role-based authorization ensures only admins can manage books

## Business Logic

1. Reading Progress:
   - Users can submit reading intervals for books
   - System tracks unique pages read per book
   - Pages are counted only once even if read multiple times

2. Recommendations:
   - Books are ranked by number of unique pages read
   - Top 5 most-read books are recommended

## Error Handling

The API implements comprehensive error handling:
- 400: Bad Request (Invalid input)
- 401: Unauthorized (Missing/invalid token)
- 403: Forbidden (Insufficient permissions)
- 404: Not Found (Resource doesn't exist)
- 409: Conflict (Email already exists)
- 500: Internal Server Error

## Development

### Running Tests
```bash
# unit tests
pnpm test

# e2e tests
pnpm test:e2e

# test coverage
pnpm test:cov
```

### Database Management
```bash
# Reset database
docker-compose down -v
docker-compose up -d
```

## Project Structure
```
src/
├── auth/                   # Authentication & Authorization
│   ├── dto/               # Data Transfer Objects
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/            # JWT & Role Guards
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── decorators/        # Custom Decorators
│   │   └── roles.decorator.ts
│   ├── strategies/        # Passport Strategies
│   │   └── jwt.strategy.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── auth.controller.ts
│
├── books/                 # Books Management
│   ├── dto/
│   │   └── create-book.dto.ts
│   ├── entities/
│   │   └── book.entity.ts
│   ├── books.module.ts
│   ├── books.service.ts
│   └── books.controller.ts
│
├── reading/              # Reading Progress
│   ├── dto/
│   │   └── submit-reading.dto.ts
│   ├── entities/
│   │   └── reading-interval.entity.ts
│   ├── reading.module.ts
│   ├── reading.service.ts
│   └── reading.controller.ts
│
├── users/               # User Management
│   ├── entities/
│   │   └── user.entity.ts
│   └── users.module.ts
│
├── config/             # Configuration
│   └── database.config.ts
│
├── app.module.ts       # Root Module
└── main.ts            # Application Entry Point
```

Each directory contains:
- `*.module.ts`: NestJS module definitions
- `*.controller.ts`: Route handlers
- `*.service.ts`: Business logic
- `*.entity.ts`: Database models
- `*.dto.ts`: Data transfer objects
- `*.guard.ts`: Route guards
- `*.decorator.ts`: Custom decorators
- `*.strategy.ts`: Authentication strategies

## Security Features

1. Password Hashing (bcrypt)
2. JWT-based Authentication
3. Role-based Authorization
4. Input Validation
5. Request Sanitization

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 