import {Router} from "express"
import { upload } from "../middleware/multer.middleware.js";
import { RegisterUser } from "../controllers/auth.controllers.js";


const user_router=Router();

user_router.route("/register").post(
    upload.fields(
        [{
            name:"avatar",
            maxCount:1 
        }]
    ),RegisterUser
    
)

export {user_router}