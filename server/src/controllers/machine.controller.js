import {Machine} from "../models/machine.models.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import customError from "../utils/CustomError.js";

export const getMachine = asyncErrorHandler(async (req , res , next ) => {
    const userId = req.user._id ;

    const data  = await Machine.find({userId})

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const postMachine = asyncErrorHandler(async (req , res , next ) => {

    const userId = req.user._id;

    const machine = new Machine({ ...req.body, userId });
    let data = await machine.save(); // returns a real Mongoose document

    res.status(201).json({
        message : 'successfull',
        data
    })
})

export const updateMachine = asyncErrorHandler(async (req , res , next ) => {
    const id = req.params.id

    const data = await Machine.findByIdAndUpdate(id , {
        ...req.body
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

export const deleteMachine = asyncErrorHandler(async (req , res , next ) => {
    const id = req.params.id 
    
    const data = await Machine.findByIdAndDelete({_id : id })

    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : "Deleted"
    })
})
