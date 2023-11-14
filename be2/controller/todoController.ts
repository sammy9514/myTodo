import { Request, Response } from "express";
import { statusCode } from "../utils/statusCode";
import todoModel from "../model/todoModel";
import moment from "moment";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { task, time } = req.body;

    let timeLeft = Date.parse(time[1]) - Date.parse(time[0]);

    const todo = await todoModel.create({
      task,
      deadLine: moment(Date.parse(time[0])).format("LLLL"),
      left: timeLeft / 86400000,
    });

    let timing = setTimeout(async () => {
      await todoModel.findByIdAndUpdate(
        todo._id,
        {
          achieved: "Terminated",
        },
        { new: true }
      );

      clearTimeout(timing);
      console.log("done");
    }, time);

    return res.status(statusCode.CREATED).json({
      message: "Created",
      data: todo,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const viewTodos = async (req: Request, res: Response) => {
  try {
    const todo = await todoModel.find().sort({ createdAt: -1 });

    return res.status(statusCode.OK).json({
      message: "find",
      data: todo,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const viewOneTodo = async (req: Request, res: Response) => {
  try {
    const { todoID } = req.params;

    const todo = await todoModel.findById(todoID);

    return res.status(statusCode.OK).json({
      message: "find",
      data: todo,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const viewOneAndUpdateTodo = async (req: Request, res: Response) => {
  try {
    const { done } = req.body;
    const { todoID } = req.params;

    const check = await todoModel.findById(todoID);

    if (check?.done === "start") {
      const todo = await todoModel.findByIdAndUpdate(
        { _id: todoID },
        { done: "ongoing" },
        { new: true }
      );
      res.status(statusCode.OK).json({
        message: "Updated",
        data: todo,
      });
    } else if (check?.done === "ongoing") {
      const todo = await todoModel.findByIdAndUpdate(
        { _id: todoID },
        {
          done: "done",
          deadline: moment(new Date().getTime()).format("LLLL"),
        },
        { new: true }
      );

      return res.status(statusCode.CREATED).json({
        message: "find",
        data: todo,
      });
    }
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const viewOneAndDeleteTodo = async (req: Request, res: Response) => {
  try {
    const { task, time } = req.body;
    const { todoID } = req.params;

    const todo = await todoModel.findByIdAndDelete(todoID);

    return res.status(statusCode.CREATED).json({
      message: "find",
      data: todo,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
