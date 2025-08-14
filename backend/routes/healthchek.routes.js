import { Router } from "express";
import { health_check } from "../controllers/healthchek.controllers.js";


const router = Router() 

router.route("/").get(health_check)

export default router