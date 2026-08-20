import { createPlayerController } from "../controller/playerController.js";
import { Router } from "express";
import { checkIdExists } from "../middleware/playermiddleware.js";
import { createRoundController, hitController, standController } from "../controller/roundsController.js";

const router = Router()

// console.log(createPlayerController())

router.post("/start-game", createPlayerController)

router.post("/start-round", checkIdExists, createRoundController)

router.post("/hit", checkIdExists, hitController);

router.post("/stand", checkIdExists, standController);

export default router