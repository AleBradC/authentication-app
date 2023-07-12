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

Setup:

- install docker for desktop
- clone the project
- npm i
- cd server & cd client and run npm i

Run the application:

- npm run dev -> to run in a docker container (Docker compose up - will start the Server and Postgres DB, both of them are dockerized)

# Testing

1. Unit tests:

- cd server
- npm run test:unit

2. Integration tests (against a separate DB using Docker compose)

- cd server
- npm run test:integration

# Documentation

- http://localhost:8080/api-docs

# Postman collection
