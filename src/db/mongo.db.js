import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected mongoDB successfully.");
  } catch (error) {
    console.log("Connection to mongoDB failed.", error.message);
  }
};

export default connectToMongoDB;
