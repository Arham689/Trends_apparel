import {Router} from 'express'
import {protect} from '../controllers/auth.controller.js'
import { deleteWorker, getWorker, getWorkerById, postWorker, updateWorker } from '../controllers/worker.controller.js';

const workerRoute = Router() ; 

workerRoute.get('/worker' , protect ,getWorker )

workerRoute.post('/worker' , protect ,postWorker )

workerRoute.patch('/worker/:id' , protect ,updateWorker )

workerRoute.delete('/worker/:id' , protect ,deleteWorker )

workerRoute.get('/worker/:id' , protect  , getWorkerById )

export default workerRoute 