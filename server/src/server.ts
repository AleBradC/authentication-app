import http from "http";
import config from "../config";
import app from "./app";
import connectDB from "./dataSource";

const server = http.createServer(app);

// Initialize the database connection
connectDB
  .initialize()
  .then(() => {
    console.log("1. Connection to Postgres database has been initialized!");

    // Start the server
    server.listen(config.port, () => {
      console.log(`2. Listening on server ${config.port}`);
    });
  })
  .catch((error) => {
    console.error(
      `3. Error during Postgres initialization on host ${config.db_host}:${config.db_port}!`,
      error
    );
  });
