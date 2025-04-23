import Supervisor from "../models/supervisor.models.js";
import { asyncErrorHandler } from '../utils/asyncErrorHandler.js'
import customError from "../utils/CustomError.js";

const requiredFields = [
    'supervisorName',
    'email',
    'password',
    'designation',
    'employeeId',
    'mobile',
    'address',
];
export const getSupervisor = asyncErrorHandler(async (req , res , next ) => {

    const userId = req.user._id ;

    const data  = await Supervisor.find({userId})

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const postSupervisor = asyncErrorHandler(async (req , res , next ) => {

    const userId = req.user._id;
    
    for (const field of requiredFields) {
        if (!req.body[field]) {
        return next(new customError(`${field} is required`, 400));
        }
    }

    const supervisor = new Supervisor({ ...req.body, userId });
    let data = await supervisor.save(); // returns a real Mongoose document

    res.status(201).json({
        message : 'successfull',
        data
    })
})

export const updateSupervisor = asyncErrorHandler(async (req , res , next ) => {
    const id = req.params.id;
    
    for (const field of requiredFields) {
        if (!req.body[field]) {
        return next(new customError(`${field} is required`, 400));
        }
    }
    
    const data = await Supervisor.findByIdAndUpdate(
        id,
        {
            ...req.body,
        },
        { new: true } // runValidators ensures that your schema rules are enforced on update
    );
    
    if (!data) {
        return next(new customError('Worker not found', 404));
    }
    
    res.status(200).json({
        message: 'Worker updated successfully',
        data: data,
    });
})

export const deleteSupervisor = asyncErrorHandler(async (req , res , next ) => {

    const id =  req.params.id 
    
    const data = await Supervisor.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(200).json({
        message : 'Deleted'
    })
})

export const getSupervisorById = asyncErrorHandler(async (req, res, next )=>{
    const id = req.params.id

    const data = await Supervisor.findOne({_id : id  })

    if(!data)
    {
        const err = new customError('Data _id not found ' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : 'successfull',
        data 
    })
})
