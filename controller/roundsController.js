import { createRoundService } from "../services/roundsService";

export async function createRoundController(req, res) {
    const player = req.player
    const bet = req.body.bet

    const result = await createRoundService(player, bet)
}