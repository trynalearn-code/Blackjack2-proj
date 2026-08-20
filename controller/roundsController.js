import { createRoundService, hitService, standService } from "../services/roundsService.js";

export async function createRoundController(req, res) {
    const player = req.player
    const bet = req.body.bet

    const result = await createRoundService(player, bet)
       return res.status(201).json({
        success: true,
        data: result
    })
}

export async function hitController(req, res) {
    try {
        const playerId = req.player._id.toString()
        const result = await hitService(playerId)
        return res.status(201).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export async function standController(req, res) {
    try {
        const playerId = req.player._id.toString()

        const result = await standService(playerId)

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
