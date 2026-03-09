import db from "../config/database";

export const connectDb = async () => {
  try {
    console.log("POSTGRES_PASSWORD:", process.env.POSTGRES_PASSWORD);
    console.log("POSTGRES_USER:", process.env.POSTGRES_USER);
    console.log("POSTGRES_HOST:", process.env.POSTGRES_HOST);
    await db.connect();
    console.log("Db connected!");
  } catch (error) {
    console.log("Error occured in connection.js during connection:", error);
  }
};
