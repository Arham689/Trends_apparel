import { Router } from "express";
import { protect } from "../controllers/auth.controller.js";
import { deleteGarment, getGarment, postGarment, updateGarment } from "../controllers/garment.controller.js";

const garmentRoute = Router() ; 

garmentRoute.get('/garment-code' , protect , getGarment )

garmentRoute.post('/garment-code' , protect , postGarment )

garmentRoute.patch('/garment-code/:id' , protect , updateGarment )

garmentRoute.delete('/garment-code/:id' , protect , deleteGarment )

export default garmentRoute ; 