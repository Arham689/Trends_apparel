import {Router } from 'express'
import { protect } from "../controllers/auth.controller.js";
import { deleteMachine , getMachine, postMachine, updateMachine } from '../controllers/machine.controller.js';
const machineRotue = Router() ; 

machineRotue.get('/machine' , protect , getMachine )

machineRotue.post('/machine' , protect , postMachine )

machineRotue.patch('/machine/:id' , protect , updateMachine )

machineRotue.delete('/machine/:id' , protect , deleteMachine )

export default machineRotue