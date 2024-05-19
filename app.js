const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const indexRouter = require("./src/routes/index.router");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", indexRouter);
app.use("/health-check", (req, res) => {
  res.send("chat app backend working..");
});

dotenv.config();
const port = process.env.PORT || 6666;

app.listen(port, () => {
  console.log("Server running on port " + port + " 😁");
});
