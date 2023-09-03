# Authentication app

## Dependencies

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

- in progress

- React
- React router

## Description

Application where a user can register and login.
When a user creates a team he will be the admin of that team, he can updated the team, add members, remove members and also delete the team.
When an admin adds a new member in the team, the client will be notified.

## Getting Started

A. Run the application locally, without Docker:

1. Clone the project
2. Run `npm install`, to install all the server & client dependencies
3. Install postgresql and a tool for DB management like Postico 2
4. Create an `.env` file in the server directory and add the following:

   ```env
    PORT=8080
    DB_PORT=5432

    LOCAL_DB_HOST=localhost

    ACCESS_TOKEN_SECRET = <your_secret_token>

    USERNAME = <your_postgresql_username>
    DB_PASSWORD = <your_db_password>
   ```

5. Make sure DB is setup and is running
6. To start the application run `npm run watch`, this will start both server and client

B. Run the application in a docker container

# Testing

1. Unit tests:

- `cd server`
- `npm run test:unit`

2. Integration tests (against a separate DB using Docker compose):

- `cd server`
- `npm run test:integration` - docker compose up - will start the Server and Postgres DB, in a different docker container created for the integration tests

## Documentation

- http://localhost:8080/api-docs
