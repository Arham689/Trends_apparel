import express from "express"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import route from "./routes/test.routs.js"
import { dbconnect } from "./config/db.js"
import departmentroute from './routes/department.route.js'
import customError from './utils/CustomError.js'
import globalErrorHandler from "./controllers/errorController.js"
import lineRoute from "./routes/line.route.js"
import sectoinRouter from "./routes/section.route.js"
import authRoute from "./routes/auth.route.js"
import dotenv from 'dotenv'
import tidnoRoute from "./routes/tidno.route.js"
import sytleRoute from "./routes/style.route.js"
import colorRoute from "./routes/color.router.js"
import garmentRoute from "./routes/garment.route.js"
import sizeRoute from "./routes/size.route.js"
import opeartionRoute from "./routes/operation.route.js"
import mappingRoute from "./routes/mapping.route.js"
import machineRotue from "./routes/machine.route.js"
import issueRoute from "./routes/machineIssue.route.js"
import workerRoute from "./routes/wokrer.router.js"
import supervisorRotue from "./routes/supervisor.route.js"
import bundleRoute from "./routes/bundle.route.js"

dotenv.config() 
const app = express() 
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
    credentials: true,
};
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(cors(corsOptions));

dbconnect();
//global error handler
//env

app.use('/api/v1' , route)  
app.use('/api/v1' , departmentroute)
app.use('/api/v1' , lineRoute)
app.use('/api/v1' , sectoinRouter)
app.use('/api/v1' , tidnoRoute )
app.use('/api/v1' , sytleRoute )
app.use('/api/v1' , colorRoute)
app.use('/api/v1' , garmentRoute )
app.use('/api/v1' , sizeRoute)
app.use('/api/v1' , opeartionRoute )
app.use('/api/v1' , mappingRoute )
app.use('/api/v1' , machineRotue)
app.use('/api/v1' , issueRoute)
app.use('/api/v1' , workerRoute)
app.use('/api/v1' , supervisorRotue)
app.use('/api/v1' , bundleRoute)

app.use('/api/auth' , authRoute)

app.get('/', (req, res) => {
    res.send('Hello!')
});

app.all('*' ,(req ,res, next) => {
    // handler for defaultes path 

    // res.status(404).json({
    //     status : 'fail',
    //     message : `can't find the ${req.originalUrl} on the server `
    // })

    // const err = new Error(`can't find the ${req.originalUrl} on the server`) // message 
    // err.statusCode = 404 
    // err.status = 'fail'

    const err = new customError(`can't find the ${req.originalUrl} on the server` , 404);
    next(err)
} )

app.use(globalErrorHandler)

app.listen( process.env.PORT , ()=>{
    console.log("server started ")
})