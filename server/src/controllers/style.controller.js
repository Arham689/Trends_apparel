import { Style } from "../models/style.models.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import customError from "../utils/CustomError.js";
import { TIDNO } from "../models/tIdno.models.js";

export const getstyle = asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id ; 

    const styleData = await Style.find({userId}).populate('Tidno')
    
    if(!styleData){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : 'successful',
        data : {
            styleData
        }
    })
})

export const poststyle = asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id
    let data = (await Style.create({...req.body , userId })).populate('Tidno');   
    // refer sectoin controller for easy understanding
    data = await data 

    
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

export const patchstyle = asyncErrorHandler(async (req , res , next )=>{
    const id =  req.params.id 

    if(!req.body.styleName || !req.body.Tidno || !req.body.status ){
        const err = new customError('All fields are require' , 404)
        return next(err)
    }

    const data = await Style.findByIdAndUpdate(id , {
        styleName : req.body.styleName,
        Tidno : req.body.Tidno,
        status : req.body.status
    },{new : true}).populate('Tidno')

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }

    res.status(200).json({
        message : 'successfull',
        data  : data 
    })
})

export const deletestyle = asyncErrorHandler(async (req , res , next )=>{
    const id =  req.params.id 
    
    const data = await Style.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(200).json({
        message : 'Deleted'
    })
})
