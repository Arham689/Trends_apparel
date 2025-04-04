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