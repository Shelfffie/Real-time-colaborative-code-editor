import db from "../config/database";

export const connectDb = async () => {
  try {
    await db.connect();
    console.log("Db connected!");
  } catch (error) {
    console.log("Error occured in connection.js during connection:", error);
  }
};
