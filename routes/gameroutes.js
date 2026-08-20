import { createPlayerController } from "../controller/playerController.js";
import { Router } from "express";
import { checkIdExists } from "../middleware/playermiddleware.js";
import { createRoundController, hitController } from "../controller/roundsController.js";

const router = Router()

// console.log(createPlayerController())

router.post("/start-game", createPlayerController)

router.post("/start-round", checkIdExists, createRoundController)

router.post("/hit", checkIdExists, hitController);


export default router