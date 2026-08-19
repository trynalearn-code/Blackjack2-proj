import express from "express"
import "dotenv/config"
import db from "./db.js"

const app = express()
app.use(express.json())

app.listen(3000, ()=>{console.log("listening on port 3000")})

// import express from "express";
// import db from "./db.js";

// const app = express();

// app.get("/", async (req, res) => {
//     const result = await db.collection("test").insertOne({
//         message: "Hello from blackjack"
//     });

//     res.json({
//         success: true,
//         id: result.insertedId
//     });
// });

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });