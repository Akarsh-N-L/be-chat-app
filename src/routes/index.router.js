import express from "express";
import authRouter from "./auth.routes.js";
import messageRouter from "./message.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/message", messageRouter);

export default router;
