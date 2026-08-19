import db from "../db.js";
import { ObjectId } from "mongodb";

const players = db.collection("players")

export async function createPlayerRepo(player){
    return await players.insertOne(player)
}

export async function findPlayerByIdRepo(id) {
    return await players.findOne({
        _id:new ObjectId(id)
    })
}

export async function updatePlayerChips(playerId, chips) {
    return await players.updateOne(
        {_id:playerId},
        {$set:{chips:chips}}
    )
}