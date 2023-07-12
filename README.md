# Project Title

Authentication app

# Dependencies

Backend:

- Node.js
- Express.js
- TypeScript
- TypeORM - for singleton services
- PostgreSQL
- TypeDI - for dependency injection
- Docker
- Jest
- Supertest
- PM2 -> in progress
- Socket -> in progress

Frontend:

- React
- React router

# Description

Application where a user can register and login.
When a user creates a team he will be the admin of that team, he can updated the team, add members, remove members and also delete the team.
When an admin adds a new member in the team, the client will be notified.

# Getting Started

Setup:

1. Backend:

- install postgresql
- install docker for desktop
- clone the project
- cd server & npm i
- add .env file with the following details: NODE_ENV=development, PORT=8080, DB_PORT=5432, DB_PASSWORD=your_password, USERNAME=your_postgresql_password, LOCAL_DB_HOST=postgresql-local and also add TEST_DB_HOST=postgresql-test (will be useful for integration tests), ACCESS_TOKEN_SECRET (generate a random secret key)

2. Frontend:

- cd client and run npm i

Run the application:

- npm run dev -> to run the application in a docker container, docker compose up - will start the Server and Postgresql database

# Testing

1. Unit tests:

- cd server
- npm run test:unit

2. Integration tests (against a separate DB using Docker compose):

- cd server
- npm run test:integration - docker compose up - will start the Server and Postgres DB, in a different docker container created for the integration tests

# Documentation

- http://localhost:8080/api-docs

# Postman collection
