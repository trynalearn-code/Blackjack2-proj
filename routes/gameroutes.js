import { createPlayerController } from "../controller/playerController.js";
import { Router } from "express";

const router = Router()

router.post("/start-game", createPlayerController)

export default router