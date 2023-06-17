# Project Title

Authentication app

# Dependencies

- Node.js
- Express.js
- TypeScript
- TypeORM - for singleton services
- PostgreSQL
- TypeDI - for dependency injection
- PM2
- Docker
- Jest
- Supertest

# Description

Application where a user can register and login.
When a user creates a team he will be the admin of that team, he can updated the team, add members, remove members and also delete the team.
When an admin adds a new member in the team, the client will be notified.

# Getting Started

1. Docker local

- Docker compose up - will start the webserver and a dockerized Postgres DB & the Server
- Run: docker-compose -f docker-compose.local.yml up --build

2. Without docker

- clone the project
- npm i
- npm run dev or npm run watch
- npm run pm2 - to run the project with pm2

# Testing

1. For unit tests:

- cd server
- npm run test or npm run test:watch

2. Integration tests

- Run integration tests against a separate DB using Docker compose
- Run: docker-compose -f docker-compose.local.yml up --build

# Documentation

- http://localhost:8080/api-docs

# Postman collection
