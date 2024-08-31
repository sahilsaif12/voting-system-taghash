import express from "express";
import cors from "cors";
const app = express();
app.use(express.json())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.get('/', (req, res) =>{
    res.json({msg:"backend working......"})
})

import voterRoutes from './src/routes/voter.route.js'

app.use("/api/v1/voters",voterRoutes)

export default app