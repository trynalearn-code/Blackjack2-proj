import { createRoundRepo, checkIfRoundInProgressRepo } from "../repos/roundsRepo.js";
import { updatePlayerChips } from "../repos/playerRepo.js";

export async function createRoundService(player, bet) {
    const roundInProgress = await checkIfRoundInProgressRepo(player._id.toString())
    if (roundInProgress) throw new Error("player is already in the middle of a game")

    if (bet<=0) throw new Error("You must enter a positive number")
    if(bet>player.chips) throw new Error("You don't have enough chips")
    
    const newChips = player.chips-bet
    await updatePlayerChips(player._id, newChips)
}

