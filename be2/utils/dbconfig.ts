// import mongoose from "mongoose";

// const URL = "mongodb://127.0.0.1:27017/todosDB";

// export const mainConnection = async () => {
//   try {
//     await mongoose.connect(URL).then(() => {
//       console.log("Database is now connected🤞🏿");
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

import mongoose from "mongoose";

const URL = "mongodb://127.0.0.1:27017/toto";

export const mainConnection = async () => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("done");
    });
  } catch (error) {
    console.log(error);
  }
};
