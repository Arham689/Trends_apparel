import { Router } from "express";
import { deleteLine, getLine, postLine, updateLine } from "../controllers/line.controller.js";
import { protect } from "../controllers/auth.controller.js";
const lineRoute = Router()

lineRoute.get('/line' , protect , getLine )

lineRoute.post('/line' , protect , postLine )

lineRoute.patch('/line/:id' , protect , updateLine )

lineRoute.delete('/line/:id' , protect , deleteLine )

export default lineRoute