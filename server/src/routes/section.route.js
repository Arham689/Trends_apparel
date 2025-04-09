import { Router  } from "express";
import { createSection, deleteSection, getSection, updateSection } from "../controllers/section.controller.js";
import { protect } from "../controllers/auth.controller.js";

const sectoinRouter = Router()

sectoinRouter.get('/section' , protect , getSection)

sectoinRouter.post('/section' , protect , createSection)

sectoinRouter.patch('/section/:id' , protect , updateSection)

sectoinRouter.delete('/section/:id' , protect , deleteSection)



export default sectoinRouter 