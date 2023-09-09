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

Follow these steps to get started with the project:
Without installing Postgresql

1. Clone the project
2. Run `npm install`, to install all the server & client dependencies
3. `cd server`
4. Create an `.env` file in the server directory and add the following:

   ```env
    PORT=8080
    DB_PORT=5432

    ACCESS_TOKEN_SECRET = <your_secret_token>
   ```

   All the password, db name or username are already added in the files because the application will be running inside a docker container and there is no need to install any tool locally

5. run `start:docker` to run the server & data base in a docker container
6. `cd client` & run `npm run start` to start the client (in progress)

# Testing

1. Unit tests:

- `cd server`
- `npm run test:unit`

2. Integration tests (against a separate DB using Docker compose):

- `cd server`
- `npm run test:integration` - docker compose up - will start the Server and Postgres DB, in a different docker container created for the integration tests

## Documentation

- http://localhost:8080/api-docs
