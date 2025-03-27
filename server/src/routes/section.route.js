import { Router  } from "express";
import { createSection, deleteSection, getSection, updateSection } from "../controllers/section.controller.js";

const sectoinRouter = Router()

sectoinRouter.get('/section' ,getSection)

sectoinRouter.post('/section' ,createSection)

sectoinRouter.patch('/section/:id' ,updateSection)

sectoinRouter.delete('/section/:id' ,deleteSection)



export default sectoinRouter 