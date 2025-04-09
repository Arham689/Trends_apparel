import { Router } from "express";
import { protect } from "../controllers/auth.controller.js";
import { deleteSize, getSize, postSize, updateSize } from "../controllers/size.controller.js";
const sizeRoute = Router()

sizeRoute.get('/size' , protect , getSize )

sizeRoute.post('/size' , protect , postSize )

sizeRoute.patch('/size/:id' , protect , updateSize )

sizeRoute.delete('/size/:id' , protect , deleteSize )

export default sizeRoute