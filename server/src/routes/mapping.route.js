import {Router} from 'express'
import { protect  } from "../controllers/auth.controller.js";
import { deleteMapping, getMapping, getMappingWithId, getOperationsForBundle, postMapping, updateMapping } from '../controllers/mapping.contorller.js';

const mappingRoute = Router() 

mappingRoute.get('/mapping' , protect  , getMapping )

mappingRoute.get('/mapping/:id' , protect , getMappingWithId )

mappingRoute.post('/mapping' , protect  , postMapping )

mappingRoute.patch('/mapping/:id' , protect  , updateMapping )

mappingRoute.delete('/mapping/:id' , protect  , deleteMapping )

mappingRoute.get('/mapping-bundle'  , protect , getOperationsForBundle )

export default mappingRoute ; 