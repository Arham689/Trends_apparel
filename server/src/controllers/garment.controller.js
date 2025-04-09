import { Color } from "../models/color.model.js";
import { Style } from "../models/style.models.js";
import { Garment } from "../models/garment.models.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import customError from "../utils/CustomError.js";

export const getGarment = asyncErrorHandler(async (req , res , next ) => {
    const userId = req.user._id ;

    const data  = await Garment.find({userId})
    .populate('style')
    .populate('color')

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const postGarment = asyncErrorHandler(async (req ,res, next ) => {
    const userId = req.user._id;

    const garment = new Garment({ ...req.body, userId });
    let data = await garment.save(); // returns a real Mongoose document

    data = await data
    .populate([
        {path : 'style'},
        {path : 'color'}
    ])

    res.status(201).json({
        message : 'successfull',
        data
    })
})

export const updateGarment = asyncErrorHandler(async (req ,res, next ) => {
    const id =  req.params.id 

    if(!req.body.garmentName || !req.body.style || !req.body.orderQuantity || !req.body.color ){
        const err = new customError('All fields are require' , 404)
        return next(err)
    }

    const data =await Garment.findByIdAndUpdate(id , {
        garmentName : req.body.garmentName,
        style : req.body.style,
        orderQuantity :req.body.orderQuantity ,
        color : req.body.color  
    },{new : true}).populate('style').populate('color')

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }

    res.status(200).json({
        message : 'successfull',
        data  : data 
    })
})

export const deleteGarment = asyncErrorHandler(async (req ,res, next ) => {
    const id =  req.params.id 
    
    const data = await Garment.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(200).json({
        message : 'Deleted'
    })
})

