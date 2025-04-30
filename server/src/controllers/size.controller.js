
import { Size } from "../models/size.models.js";

import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import customError from "../utils/CustomError.js";
export const getSize = asyncErrorHandler(async (req , res , next ) => {
    const userId = req.user._id

    const data = await Size.find({userId})

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const postSize = asyncErrorHandler(async (req, res , next )=>{
    const userId = req.user._id;
    const data =  await Size.create({...req.body , userId })

    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(201).json({
        message : "successfuly created",
        data
    })

})

export const updateSize = asyncErrorHandler(async (req, res , next )=>{
    const id = req.params.id

    if(!req.body.sizeName){
        const err = new customError('Data not found' , 400 )
        return next(err)
    }

    const data = await Size.findByIdAndUpdate(id , {
        sizeName : req.body.sizeName
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

export const deleteSize = asyncErrorHandler(async (req, res , next )=>{
    const id = req.params.id

    const data = await Size.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }

    res.status(200).json({
        message : 'Deleted!'
    })
})

