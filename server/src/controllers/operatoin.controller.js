import { Operation } from "../models/operation.model.js"
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js"
import customError from '../utils/CustomError.js'
import "../models/unittype.model.js";
import "../models/department.models.js";
import "../models/style.models.js";
import "../models/garment.models.js"
import { UnitType } from "../models/unittype.model.js";
export const getOpearton = asyncErrorHandler(async (req ,res , next ) => {
    const userId = req.user._id ;

    const data  = await Operation.find({userId})
    .populate('unitType')
    .populate('department')
    .populate('style')
    .populate('garment')

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const postOpearton = asyncErrorHandler(async (req ,res , next ) => {
    const userId = req.user._id;

    const operation = new Operation({ ...req.body, userId });
    let data = await operation.save(); // returns a real Mongoose document

    data = await data
    .populate([
        {path : 'unitType'},
        {path : 'department'},
        {path : 'style'},
        {path : 'garment'}
    ])

    res.status(201).json({
        message : 'successfull',
        data
    })
})

export const updateOpearton = asyncErrorHandler(async (req ,res , next ) => {
    const userId = req.user._id;

    const id =  req.params.id 

    const requiredFields = [
        'operationName',
        'rate',
        'unitType',
        'department',
        'style',
        'garment',
        'sam'
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return next(new customError(`${field} is required`, 400));
        }
    }

    const data =await Operation.findByIdAndUpdate(id , {
        ...req.body 
    },{new : true})
    .populate('unitType')
    .populate('department')
    .populate('style')
    .populate('garment')

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }

    res.status(200).json({
        message : 'successfull',
        data  : data 
    })
})

export const deleteOpearton = asyncErrorHandler(async (req ,res , next ) => {
    const userId = req.user._id;

    const id =  req.params.id 
    
    const data = await Operation.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(200).json({
        message : 'Deleted'
    })
})

export const postUnit = asyncErrorHandler(async (req , res, next )=>{
    const userId = req.user._id;

    const operation = new UnitType({ ...req.body, userId });
    let data = await operation.save(); // returns a real Mongoose document

    res.status(201).json({
        message : 'successfull',
        data
    })
})

