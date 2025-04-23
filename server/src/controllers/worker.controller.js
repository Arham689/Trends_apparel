import { Worker } from "../models/worker.models.js";
import { asyncErrorHandler } from '../utils/asyncErrorHandler.js'
import customError from "../utils/CustomError.js";

const requiredFields = [
    'workerName',
    'employeeId',
    'mobileNo',
    'designation',
    'address',
    'city'
];
export const getWorker = asyncErrorHandler(async(req ,res , next )=>{
    const userId = req.user._id ;

    const data  = await Worker.find({userId}).populate('operations')

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const postWorker = asyncErrorHandler(async(req ,res , next )=>{
    const userId = req.user._id;

    const worker = new Worker({ ...req.body, userId });
    let data = await worker.save(); // returns a real Mongoose document
    
    for (const field of requiredFields) {
        if (!req.body[field]) {
        return next(new customError(`${field} is required`, 400));
        }
    }

    data = await data
    .populate([
        {path : 'operations'},
    ])

    res.status(201).json({
        message : 'successfull',
        data
    })
})


export const updateWorker = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user._id;
    const id = req.params.id;
    
    for (const field of requiredFields) {
        if (!req.body[field]) {
        return next(new customError(`${field} is required`, 400));
        }
    }
    
    const data = await Worker.findByIdAndUpdate(
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
});

export const deleteWorker = asyncErrorHandler(async(req ,res , next )=>{

    const id =  req.params.id 
    
    const data = await Worker.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(200).json({
        message : 'Deleted'
    })
})

export const getWorkerById = asyncErrorHandler(async (req, res, next )=>{
    const id = req.params.id

    const data = await Worker.findOne({_id : id  })

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