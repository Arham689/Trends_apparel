import { Router } from "express";
import { protect } from "../controllers/auth.controller.js";
import { getTidno , postTidno , patchTidno , deleteTidno } from "../controllers/tidno.contorller.js";
const tidnoRoute = Router() ; 

tidnoRoute.get('/tidno' , protect , getTidno );

tidnoRoute.post('/tidno' , protect , postTidno );

tidnoRoute.patch('/tidno/:id' , protect , patchTidno );

tidnoRoute.delete('/tidno/:id' , protect , deleteTidno );

export default tidnoRoute;