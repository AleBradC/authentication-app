import http from "http";
import app from "./app";
import connectDB from "./dataSource";
import dbConfig from "../config/index";

const server = http.createServer(app);

// Initialize the database connection
connectDB
  .initialize()
  .then(() => {
    console.log(
      `1. Connection to Postgresql database has been initialized on host ${dbConfig.db_host}:${dbConfig.db_port}`
    );

    // Start the server
    server.listen(dbConfig.port, () => {
      console.log(`2. Listening on server ${dbConfig.port}`);
    });
  })
  .catch((error) => {
    console.error(
      `3. Error during Postgres initialization on host ${dbConfig.db_host}:${dbConfig.db_port}!`,
      error
    );
  });
