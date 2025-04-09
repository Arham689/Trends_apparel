import { Router } from "express";
import { protect } from "../controllers/auth.controller.js";
import { deleteColor, getColor, postColor, updateColor } from "../controllers/color.controller.js";

const colorRoute = Router() 

colorRoute.get('/color' , protect , getColor);

colorRoute.post('/color' , protect , postColor);

colorRoute.patch('/color/:id' , protect , updateColor);

colorRoute.delete('/color/:id' , protect , deleteColor);

export default colorRoute 