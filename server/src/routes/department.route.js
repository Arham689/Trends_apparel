import  {Router} from 'express'
import {protect} from '../controllers/auth.controller.js'
import { deleteDepartment, getDepartment, postDepartment, updateDepartment } from '../controllers/department.controller.js';
const departmentroute = Router() ; 

departmentroute.get('/departments' , protect , getDepartment )

departmentroute.post('/departments' ,protect , postDepartment )

departmentroute.patch('/departments/:id' ,protect , updateDepartment )

departmentroute.delete('/departments/:id' , protect , deleteDepartment )

export default departmentroute
