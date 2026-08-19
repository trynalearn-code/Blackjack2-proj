import { createPlayerController } from "../controller/playerController.js";
import { Router } from "express";
import { checkIdExists } from "../middleware/playermiddleware.js";

const router = Router()

router.post("/start-game", createPlayerController)




export default router