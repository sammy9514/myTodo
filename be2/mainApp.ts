import { Application, Request, Response } from "express";
import { statusCode } from "./utils/statusCode";
import data from "./router/todoRouter";
export const mainApp = (app: Application) => {
  app.use("/api/v1", data);

  app.get("/", (req: Request, res: Response) => {
    try {
      res.status(statusCode.OK).json({
        message: "Reading default get",
      });
    } catch (error) {
      res.status(statusCode.BAD_REQUEST).json({
        message: "Error",
      });
    }
  });
};
