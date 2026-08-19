import { createPlayerRepo } from "../repos/playerRepo.js";

export async function createPlayerService() {
    const player = {
        chips:1000,
        createdAt:new Date()
    }
    const result = await createPlayerRepo(player)

    return {
        playerId:result.insertedId.toString(),
        chips:player.chips
    }
}

