import db from "../db.js";

const players = db.collection("players")

export async function createPlayer(){
    return await players.insertOne(player)
}