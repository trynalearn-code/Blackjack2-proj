import db from "../db.js";

const players = db.collection("players")

export async function createPlayerRepo(player){
    return await players.insertOne(player)
}