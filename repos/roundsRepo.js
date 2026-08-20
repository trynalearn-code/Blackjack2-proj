import db from "../db.js";


const rounds = db.collection("rounds")

export async function createRoundRepo(round) {
    return await rounds.insertOne(round)
} 

export async function checkIfRoundInProgressRepo(playerId) {
    return await rounds.findOne({
        playerId:playerId,
        status:"in_progress"
    })
}

export async function updateRoundCards(roundId, playerCards){
    return await rounds.updateOne({_id:roundId}, {$set:{playerCards:playerCards}})
}

export async function updateRoundStatus(roundId, status){
    return await rounds.updateOne({_id:roundId}, {$set:{status:status}})
}