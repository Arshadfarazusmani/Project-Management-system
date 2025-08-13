import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
import { app } from "./app.js";


const port = process.env.port

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(port,()=>{
    console.log("Server stared !!!");
    
})


