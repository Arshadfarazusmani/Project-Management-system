import { api_response } from "../utils/api_response.js";
import { async_handler } from "../utils/async_handler.js";

const health_check= async_handler(async(req,res)=>{

    const data ={
        love : "Nastaran!!"
    }
    res.status(200).json(new api_response(200,"ok",data))
})

export{health_check}