import {protect } from '../controllers/auth.controller.js'
import { MachineIssue } from '../models/machineIssue.models.js'
import { asyncErrorHandler } from '../utils/asyncErrorHandler.js'
import customError from '../utils/CustomError.js';

export const getIssue = asyncErrorHandler(async (req , res , next )=>{

    const userId = req.user._id ;

    const data  = await MachineIssue.find({userId})

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const postIssue = asyncErrorHandler(async (req , res , next )=>{

    const userId = req.user._id;
    if(!req.body.issueName || !req.body.issueCode ) 
    {
        return res.status(404).json({
            message : "not found ",
        })
    }

    const machine = new MachineIssue({ ...req.body, userId });
    let data = await machine.save(); // returns a real Mongoose document

    res.status(201).json({
        message : 'successfull',
        data
    })
})

export const updateIssue = asyncErrorHandler(async (req , res , next )=>{
    const id = req.params.id

    const data = await MachineIssue.findByIdAndUpdate(id , {
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

export const deleteIssue = asyncErrorHandler(async (req , res , next )=>{
    const id = req.params.id 
    
    const data = await MachineIssue.findByIdAndDelete({_id : id })

    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : "Deleted"
    })
})