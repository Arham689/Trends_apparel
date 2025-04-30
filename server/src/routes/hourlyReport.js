import {Router } from 'express'
import { deleteHourlyReport, getHourlyReport, getHourlyReportbyTaskId, postHourlyReport, updateHourlyReport } from '../controllers/hourlyReport.controller.js'
import {protect } from '../controllers/auth.controller.js'
const hourlyReportRoute = Router() 

hourlyReportRoute.get('/hourlyReport' , protect , getHourlyReport )

hourlyReportRoute.post('/hourlyReport' , protect , postHourlyReport )

hourlyReportRoute.post('/hourlyReport/:id' , protect , updateHourlyReport )

hourlyReportRoute.delete('/hourlyReport/:id' , protect , deleteHourlyReport )

hourlyReportRoute.get('/hourlyReport/:id' , protect , getHourlyReportbyTaskId )

export default hourlyReportRoute