import { Router } from "express";
import { deleteLine, getLine, postLine, updateLine } from "../controllers/line.controller.js";
const lineRoute = Router()

lineRoute.get('/line' , getLine )

lineRoute.post('/line' , postLine )

lineRoute.patch('/line/:id' , updateLine )

lineRoute.delete('/line/:id' , deleteLine )

export default lineRoute