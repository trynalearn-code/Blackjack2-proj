import express from "express"
import "dotenv/config"
import db from "./db.js"
import router from "./routes/gameroutes.js"


const app = express()
app.use(express.json())
app.use(router)

app.listen(3000, ()=>{console.log("listening on port 3000")})

