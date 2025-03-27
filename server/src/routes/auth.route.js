import { Router } from "express";
import { logIn, signUp  } from "../controllers/auth.controller.js";

const authRoute = Router() ; 

authRoute.post('/logIn' , logIn )

authRoute.post('/signUp' , signUp)

export default authRoute 