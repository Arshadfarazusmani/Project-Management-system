import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

const port = process.env.port

console.log(port);
