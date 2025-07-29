import { Router } from "express";
import { getCoinHistoryData, getCoinsDataController, postHistory } from "../controllers/coins.controller.js";
import userRouter from "./users.routes.js";

const router = Router();

router.use("/auth", userRouter)
router.get("/coins", getCoinsDataController)
router.post("/history", postHistory)
router.get("/history/:coinId", getCoinHistoryData)

export default router;