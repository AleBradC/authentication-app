import http from "http";
import config from "../config";
import app from "./app";
import connectDB from "./dataBase/connectionDB";

const port = config.port;

function startServer() {
  const server = http.createServer(app);

  connectDB
    .initialize()
    .then(() => {
      console.log("Data base has been initialized");

      // Start app
      server.listen(port, () => {
        console.log(`Listen on server ${port}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return server;
}

export default startServer;
