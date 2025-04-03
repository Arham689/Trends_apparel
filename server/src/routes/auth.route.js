import { Router } from "express";
import { logIn, protect, signUp  } from "../controllers/auth.controller.js";

const authRoute = Router() ; 

authRoute.post('/logIn' , logIn )

authRoute.post('/signUp' , signUp)

authRoute.get('/protectedPage' , protect , (req ,res )=>{
    res.status(200).json({valid : true})
    return ;
})
export default authRoute 