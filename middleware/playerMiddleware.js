import { findPlayerByIdRepo } from "../repos/playerRepo.js";

export async function checkIdExists(req, res, next) {
    const playerId = req.headers["x-player-id"]
    const player = await findPlayerByIdRepo(playerId)
    
    if (!player){
        return res.status(401).json({
            success:false,
            message:"no id inputted"
        })
    }
    
    if (!playerId){
        return res.status(401).json({
            success:false,
            message:"no player with that id found"
        })
    }
    req.player = player
    next()
}