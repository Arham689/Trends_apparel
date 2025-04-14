import { Router } from "express";
import { protect } from "../controllers/auth.controller.js";
import { deleteOpearton, getOpearton, postOpearton, postUnit, updateOpearton } from "../controllers/operatoin.controller.js";

const opeartionRoute = Router() ; 

opeartionRoute.get('/operation' , protect , getOpearton )

opeartionRoute.post('/operation' , protect , postOpearton)

opeartionRoute.patch('/operation/:id' , protect , updateOpearton )

opeartionRoute.delete('/operation/:id' , protect , deleteOpearton )

opeartionRoute.post('/unit' , protect , postUnit )
export default opeartionRoute