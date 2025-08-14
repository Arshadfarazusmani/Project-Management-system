import dotenv from "dotenv"
dotenv.config({
    path:".env"
})
import { app } from "./app.js";
import { connectDB } from "./db/db.js";


const port = process.env.port

connectDB().then(()=>{

    app.listen(port,()=>{
    console.log("Server stared !!!");
    
})


}).catch((err)=>{
    console.log("Db connection error !!!",err);
    
})



