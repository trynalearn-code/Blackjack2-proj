import { createPlayerController } from "../controller/playerController.js";
import { Router } from "express";
import { checkIdExists } from "../middleware/playermiddleware.js";
import { createRoundController } from "../controller/roundsController.js";

const router = Router()

router.post("/start-game", createPlayerController)

router.post("/start-round", checkIdExists, createRoundController)



export default router