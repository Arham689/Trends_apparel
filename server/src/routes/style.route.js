import { Router } from "express";
import { protect } from "../controllers/auth.controller.js";
import { deletestyle, getstyle, patchstyle, poststyle } from "../controllers/style.controller.js";

const sytleRoute = Router()  

sytleRoute.get('/style' , protect , getstyle )

sytleRoute.post('/style' , protect , poststyle )

sytleRoute.patch('/style/:id' , protect , patchstyle )

sytleRoute.delete('/style/:id' , protect , deletestyle )

export default sytleRoute