import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import indexRouter from "./src/routes/index.router.js";
import connectToMongoDB from "./src/db/mongo.db.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/health-check", (req, res) => {
  res.send("chat app backend working..");
});

dotenv.config();
const port = process.env.PORT || 6666;

app.listen(port, async () => {
  await connectToMongoDB();
  console.log("Server running on port " + port + " 😁");
});


// try{
//   console.log("[] ");
//   res.status(200).json({
//     success: true,
//     message: "",
//     data:{}
//   })
// } catch (err) {
//   console.log([`[] Error while . ${err}`]);
//   res.status(500).json({
//     success: false,
//     message: `something went wrong`,
//   })
// }
