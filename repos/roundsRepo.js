import db from "../db.js";


const rounds = db.collection("rounds")

export async function createRoundRepo(round) {
    return await rounds.insertOne(round)
} 

export async function checkIfRoundInProgress(playerId) {
    return await rounds.findOne({
        playerId:playerId,
        status:"in_progress"
    })
}