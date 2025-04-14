import {Router } from 'express'
import { protect } from '../controllers/auth.controller.js'
import { deleteIssue, getIssue, postIssue, updateIssue } from '../controllers/machineIssue.controller.js'

const issueRoute = Router() 

issueRoute.get('/issue' , protect , getIssue )

issueRoute.post('/issue' , protect , postIssue )

issueRoute.patch('/issue/:id' , protect , updateIssue )

issueRoute.delete('/issue/:id' , protect , deleteIssue )

export default issueRoute 