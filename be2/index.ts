console.clear();
import express, { Application } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { mainConnection } from "./utils/dbconfig";

const port: number = 9100;

const app: Application = express();

app.use(express.json());
app.use(cors());

mainApp(app);

mainConnection();
let server = app.listen(port, () => {
  console.log("server is up and running", port);
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", reason);
  server.close(() => {
    process.exit(1);
  });
});
