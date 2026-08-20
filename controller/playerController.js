import { createPlayerService } from "../services/playerService.js";

export async function createPlayerController(req, res) {
    try {
        const player = await createPlayerService()
        console.log({ res })
        return res.status(201).json(player)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}