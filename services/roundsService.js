import { createRoundRepo, checkIfRoundInProgressRepo, updateRoundCards, updateRoundStatus } from "../repos/roundsRepo.js";
import { updatePlayerChips } from "../repos/playerRepo.js";
import { drawCard, determineValue } from "../utils/cards.js";

export async function createRoundService(player, bet) {
    const roundInProgress = await checkIfRoundInProgressRepo(player._id.toString())
    if (roundInProgress) throw new Error("player is already in the middle of a game")

    if (bet<=0) throw new Error("You must enter a positive number")
    if(bet>player.chips) throw new Error("You don't have enough chips")
    
    const newChips = player.chips-bet
    await updatePlayerChips(player._id, newChips);

    const playerCards = [drawCard(), drawCard()]
    const dealerCards = [drawCard(), drawCard()]

    const round = {
        playerId:player._id.toString(),
        bet:bet,
        playerCards:playerCards,
        dealerCards:dealerCards,
        status:"in_progress",
        createdAt:new Date()
    }
    const result = await createRoundRepo(round)
    return {
        roundId:result.insertedId.toString(),
        playerCards:playerCards,
        dealerCard:dealerCards[0],
        chips:newChips
    }
}

export async function hitService(playerId) {
    const round = await checkIfRoundInProgressRepo(playerId)
    if (!round){
        throw new Error("Player has no active round")
    }
    const newCard = drawCard()
    round.playerCards.push(newCard)
    const playerScore = determineValue(round.playerCards)
    await updateRoundCards(round._id, round.playerCards)
    if(playerScore >21){
        await updateRoundStatus(round._id, "bust")

        return {
            playerCards:round.playerCards,
            playerScore:playerScore,
            status:"bust"
        }
    }
    return {
            playerCards:round.playerCards,
            playerScore:playerScore,
            status:"in_progress"
        }
    if(playerScore===21){
        await updateRoundStatus(round_id, "player_21")
        return {
            playerCards:round.playerCards,
            playerScore:playerScore,
            status:"player_21"
        }
    }
}