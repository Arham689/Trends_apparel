import { Line } from "../models/lines.models.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import customError from "../utils/CustomError.js";
export const getLine = asyncErrorHandler(async (req , res , next ) => {
    const data = await Line.find({})

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const postLine = asyncErrorHandler(async (req, res , next )=>{
   
    const data =  await Line.create(req.body)

    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(201).json({
        message : "successfuly created",
    })

})

export const updateLine = asyncErrorHandler(async (req, res , next )=>{
    const id = req.params.id

    if(!req.body.lineName){
        const err = new customError('Data not found' , 400 )
        return next(err)
    }

    const data = await Line.findByIdAndUpdate(id , {
        lineName : req.body.lineName
    } , {new  : true })

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(201).json({
        message : "Update successfull",
        data : data 
    })
})

export const deleteLine = asyncErrorHandler(async (req, res , next )=>{
    const id = req.params.id

    const data = await Line.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }

    res.status(200).json({
        message : 'Deleted!'
    })
})

