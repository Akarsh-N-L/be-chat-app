import express from "express";
import authRouter from "./auth.routes.js";
import messageRouter from "./message.routes.js";
import userRouter from "./user.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/message", messageRouter);
router.use("/users", userRouter);

export default router;
