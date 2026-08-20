import { createRoundService } from "../services/roundsService.js";

export async function createRoundController(req, res) {
    const player = req.player
    const bet = req.body.bet

    const result = await createRoundService(player, bet)
       return res.status(201).json({
        success: true,
        data: result
    })
}