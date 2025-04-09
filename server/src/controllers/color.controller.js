import { Color } from "../models/color.model.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import customError from "../utils/CustomError.js";

export const getColor =  asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id
    
    const colorData = await Color.find({userId})
    
    if(!colorData){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : 'successful',
        data : {
            colorData
        }
    })
})

export const postColor = asyncErrorHandler(async (req , res , next) =>{
    const userId = req.user._id
    const data = await Color.create({...req.body , userId });

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

export const updateColor = asyncErrorHandler(async (req, res , next ) => {
    const id = req.params.id
    if(!req.body.colorName || !req.body.status){

        const err = new customError('Data not found' , 404 )
        return next(err)
    
    }

    const data = await Color.findByIdAndUpdate(id , {
        colorName : req.body.colorName,
        status : req.body.status
    } , {new : true })
    
    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : "Data updated ",
        data : data
    })
})

export const deleteColor = asyncErrorHandler(async (req , res , next ) =>{
    const id = req.params.id 

    const data = await Color.findOneAndDelete({
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