import express from "express";   

const route = express.Router() 

route.get('/test' , (req , res )=>{
    res.send("hello from test")
})

export default route;