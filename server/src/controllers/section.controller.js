import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { Section } from "../models/sections.models.js";
import customError from "../utils/CustomError.js";

export const getSection = asyncErrorHandler( async (req , res , next )=>{
    const userId = req.user._id
    const data  = await Section.find({userId}).populate('lineName')

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const createSection = asyncErrorHandler(async (req ,res, next ) => {
    const userId = req.user._id;
    let data = await Section.create({...req.body , userId })
    data = await data.populate('lineName')
    res.status(201).json({
        message : 'successfull',
        data
    })
})

export const updateSection = asyncErrorHandler(async (req ,res, next ) => {
    const id =  req.params.id 

    if(!req.body.sectionName || !req.body.lineName ){
        const err = new customError('All fields are require' , 404)
        return next(err)
    }

    const data =await Section.findByIdAndUpdate(id , {
        sectionName : req.body.sectionName,
        lineName : req.body.lineName
    },{new : true}).populate('lineName')

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }

    res.status(200).json({
        message : 'successfull',
        data  : data 
    })
})

export const deleteSection = asyncErrorHandler(async (req ,res, next ) => {
    const id =  req.params.id 
    
    const data = await Section.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(200).json({
        message : 'Deleted'
    })
})

