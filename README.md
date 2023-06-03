# Project Title

Authentication app

# Dependencies

- Node.js
- Express.js
- TypeScript
- TypeORM - for singleton services
- PostgresSQL
- TypeDI - for dependency injection
- PM2
- Docker
- Jest

# Description

Application where a user can register and login.
When a user creates a team he will be the admin of that team, he can updated the team, add members, remove members and also delete the team.
When an admin adds a new member in the team, the client will be notified.

# Getting Started

- clone the project
- npm i
- npm run dev or npm run watch
- npm run pm2 - to run the project with pm2

# Testing

docker-compose -f docker-compose.local.yaml up --build

<!-- - Integration tests: can run tests against a local DB with npm run test-local
- Docker compose up - will start the webserver and a dockerized Postgres DB (Postgres DB container must run on a non-default port to not collide with local Postgres instance)
- Easy configuration options for different use cases - run local, test local, test with docker, docker-compose -->

# Documentation

- http://localhost:8080/api-docs
