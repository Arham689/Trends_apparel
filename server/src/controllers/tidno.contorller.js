import { TIDNO } from "../models/tIdno.models.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import customError from "../utils/CustomError.js";

export const getTidno = asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id ; 

    const tidnoData = await TIDNO.find({userId})
    
    if(!tidnoData){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : 'successful',
        data : {
            tidnoData
        }
    })
})

export const postTidno = asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id
    const data = await TIDNO.create({...req.body , userId });

    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(201).json(
        {
            message : 'successful',
            data
        }
    )
})

export const patchTidno = asyncErrorHandler(async (req , res , next )=>{
    const id = req.params.id
    if(!req.body.TIDNOName || !req.body.status){

        const err = new customError('All fields are required ' , 404 )
        return next(err)
    
    }

    const data = await TIDNO.findByIdAndUpdate(id , {
        TIDNOName : req.body.TIDNOName,
        status : req.body.status
    } , {new : true })
    
    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : "Data updated ",
        data :data 
    })
})

export const deleteTidno = asyncErrorHandler(async (req , res , next )=>{
    const id = req.params.id 

    const data = await TIDNO.findOneAndDelete({
        _id : id 
    })

    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : "successfull"
    })
})