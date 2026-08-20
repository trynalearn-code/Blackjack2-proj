import { createRoundRepo, checkIfRoundInProgressRepo, updateRoundCards, updateRoundStatus, updateDealerCards, findActiveRound } from "../repos/roundsRepo.js";
import { updatePlayerChips, findPlayerByIdRepo } from "../repos/playerRepo.js";
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
        const player = await findPlayerByIdRepo(playerId);
        const newChips = player.chips + round.bet * 2;
        await updatePlayerChips(player._id, newChips);
        await updateRoundStatus(round_id, "player_21")
        return {
            playerCards:round.playerCards,
            playerScore:playerScore,
            status:"player_21",
            chips:newChips
        }
    }
}

export async function standService(playerId) {
    const round = await findActiveRound(playerId);
    console.log("playerId:", playerId);

console.log("found round:", round);
    if (!round) {
        throw new Error("Player has no active round");
    }

    const player = await findPlayerByIdRepo(playerId);

    let dealerCards = round.dealerCards
    let dealerScore = determineValue(dealerCards)

    while (dealerScore < 17) {
        dealerCards.push(drawCard())
        dealerScore = determineValue(dealerCards)
    }

    const playerScore = determineValue(round.playerCards)

    await updateDealerCards(round._id, dealerCards)

    let status;
    let newChips = player.chips;

    if (dealerScore > 21) {
        status = "win"
        newChips += round.bet * 2;
    } else if (playerScore > dealerScore) {
        status = "win"
        newChips += round.bet * 2;
    } else if (playerScore < dealerScore) {
        status = "loss"
    } else {
        status = "push"
        newChips += round.bet
    }

    await updatePlayerChips(player._id, newChips);
    await updateRoundStatus(round._id, status);

    return {
        playerCards: round.playerCards,
        playerScore,
        dealerCards,
        dealerScore,
        status,
        chips: newChips
    }

}