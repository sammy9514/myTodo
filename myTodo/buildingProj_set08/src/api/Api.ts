import axios from "axios";

const URL = "http://localhost:9100/api/v1";

export const createData = async (data: any) => {
  try {
    return await axios.post(`${URL}/create-todo`, data);
  } catch (error) {
    console.log(error);
  }
};

export const readAllData = async () => {
  try {
    return await axios.get(`${URL}/view-todo`).then((res: any) => {
      return res.data.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (taskId: any) => {
  try {
    return await axios.patch(`${URL}/update-todo/${taskId}`).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOne = async (todoId: any) => {
  try {
    return await axios.delete(`${URL}/delete-todo/${todoId}`).then((res) => {
      return res;
    });
  } catch (error) {
    console.log(error);
  }
};
