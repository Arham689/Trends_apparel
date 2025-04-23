import {Router } from 'express'
import {protect} from '../controllers/auth.controller.js'
import { deleteSupervisor, getSupervisor, getSupervisorById, postSupervisor, updateSupervisor } from '../controllers/supervisor.controller.js'

const supervisorRotue = Router() 

supervisorRotue.get('/supervisor' , protect , getSupervisor )

supervisorRotue.post('/supervisor' , protect , postSupervisor )

supervisorRotue.patch('/supervisor/:id' , protect , updateSupervisor )

supervisorRotue.delete('/supervisor/:id' , protect , deleteSupervisor )

supervisorRotue.get('/supervisor/:id' , protect , getSupervisorById )

export default supervisorRotue 